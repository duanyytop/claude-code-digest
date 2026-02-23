/**
 * Daily digest for multiple AI CLI GitHub repositories + OpenClaw project.
 * Fetches recent issues, PRs, and releases; generates per-repo summaries,
 * a cross-tool CLI comparative analysis, and a standalone OpenClaw report.
 *
 * Env vars:
 *   ANTHROPIC_API_KEY   - API key (Anthropic or Kimi Code)
 *   ANTHROPIC_BASE_URL  - Endpoint override (e.g. https://api.kimi.com/coding/)
 *   ANTHROPIC_MODEL     - Model name (default: claude-sonnet-4-6)
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RepoConfig {
  /** Short identifier used for filenames */
  id: string;
  /** GitHub owner/repo slug */
  repo: string;
  /** Human-readable display name */
  name: string;
  /**
   * Fetch multiple pages until items older than `since` are reached.
   * Use for high-volume repos with many daily updates.
   */
  paginated?: boolean;
}

interface GitHubUser {
  login: string;
}

interface GitHubLabel {
  name: string;
}

interface GitHubReactions {
  "+1": number;
}

interface GitHubItem {
  number: number;
  title: string;
  state: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  comments: number;
  reactions?: GitHubReactions;
  body?: string | null;
  html_url: string;
  pull_request?: unknown;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body?: string | null;
  published_at: string;
}

interface RepoDigest {
  config: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  summary: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/** AI CLI tools — included in per-tool digests and cross-tool comparison */
const CLI_REPOS: RepoConfig[] = [
  { id: "claude-code", repo: "anthropics/claude-code",   name: "Claude Code"   },
  { id: "codex",       repo: "openai/codex",             name: "OpenAI Codex"  },
  { id: "gemini-cli",  repo: "google-gemini/gemini-cli", name: "Gemini CLI"    },
  { id: "kimi-cli",    repo: "MoonshotAI/kimi-cli",      name: "Kimi Code CLI" },
  { id: "opencode",    repo: "anomalyco/opencode",       name: "OpenCode"      },
  { id: "qwen-code",   repo: "QwenLM/qwen-code",         name: "Qwen Code"     },
];

/** OpenClaw — high-volume project tracked separately with its own prompt */
const OPENCLAW: RepoConfig = {
  id: "openclaw",
  repo: "openclaw/openclaw",
  name: "OpenClaw",
  paginated: true,
};

/** Maximum pages to fetch for paginated repos (100 items/page) */
const MAX_PAGES = 5;

const GITHUB_TOKEN = requireEnv("GITHUB_TOKEN");
const DIGEST_REPO  = process.env["DIGEST_REPO"] ?? "";
const MODEL        = process.env["ANTHROPIC_MODEL"] ?? "claude-sonnet-4-6";

const GITHUB_HEADERS: Record<string, string> = {
  Authorization:          `Bearer ${GITHUB_TOKEN}`,
  Accept:                 "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// ---------------------------------------------------------------------------
// GitHub API
// ---------------------------------------------------------------------------

async function githubGet<T>(url: string, params: Record<string, string> = {}): Promise<T> {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const resp = await fetch(u.toString(), { headers: GITHUB_HEADERS });
  if (!resp.ok) throw new Error(`GitHub API error ${resp.status} (${url}): ${await resp.text()}`);
  return resp.json() as Promise<T>;
}

/**
 * Fetch a single page of issues or pulls.
 * /issues supports `since`; /pulls does not and requires client-side filtering.
 */
async function fetchItemPage(
  repo: string,
  itemType: "issues" | "pulls",
  since: Date,
  page: number,
): Promise<GitHubItem[]> {
  const params: Record<string, string> = {
    state: "all", sort: "updated", direction: "desc",
    per_page: "100", page: String(page),
  };
  if (itemType === "issues") params["since"] = since.toISOString();

  const items = await githubGet<GitHubItem[]>(
    `https://api.github.com/repos/${repo}/${itemType}`,
    params,
  );
  return itemType === "pulls"
    ? items.filter((i) => new Date(i.updated_at) >= since)
    : items;
}

/**
 * Fetch items updated since `since`.
 * For paginated repos: keeps fetching pages until all items on a page are
 * older than `since`, or MAX_PAGES is reached.
 * For regular repos: fetches one page of 50.
 */
async function fetchRecentItems(
  cfg: RepoConfig,
  itemType: "issues" | "pulls",
  since: Date,
): Promise<GitHubItem[]> {
  if (!cfg.paginated) {
    const params: Record<string, string> = {
      state: "all", sort: "updated", direction: "desc", per_page: "50",
    };
    if (itemType === "issues") params["since"] = since.toISOString();
    const items = await githubGet<GitHubItem[]>(
      `https://api.github.com/repos/${cfg.repo}/${itemType}`,
      params,
    );
    return itemType === "pulls"
      ? items.filter((i) => new Date(i.updated_at) >= since)
      : items;
  }

  // Paginated: collect all items updated since `since`
  const all: GitHubItem[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const items = await fetchItemPage(cfg.repo, itemType, since, page);
    if (items.length === 0) break;
    all.push(...items);
    // For issues, the API already filters by `since`, so if we got a full
    // page of results it means there might be more.
    // For pulls, we check if the last item is still within the window.
    const lastItem = items[items.length - 1];
    if (lastItem && new Date(lastItem.updated_at) < since) break;
    if (items.length < 100) break; // last page
  }
  return all;
}

async function fetchRecentReleases(repo: string, since: Date): Promise<GitHubRelease[]> {
  const releases = await githubGet<GitHubRelease[]>(
    `https://api.github.com/repos/${repo}/releases`,
    { per_page: "10" },
  );
  return releases.filter((r) => new Date(r.published_at) >= since);
}

async function ensureLabel(name: string, color: string): Promise<void> {
  const resp = await fetch(`https://api.github.com/repos/${DIGEST_REPO}/labels`, {
    method: "POST",
    headers: { ...GITHUB_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  // 422 = label already exists — fine to ignore
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
}

async function createGitHubIssue(title: string, body: string, label: string): Promise<string> {
  await ensureLabel(label, label === "openclaw" ? "e11d48" : "0075ca");
  const resp = await fetch(`https://api.github.com/repos/${DIGEST_REPO}/issues`, {
    method: "POST",
    headers: { ...GITHUB_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, labels: [label] }),
  });
  if (!resp.ok) throw new Error(`Failed to create issue: ${await resp.text()}`);
  const data = (await resp.json()) as { html_url: string };
  return data.html_url;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

function formatItem(item: GitHubItem): string {
  const labels   = item.labels.map((l) => l.name).join(", ");
  const labelStr = labels ? ` [${labels}]` : "";
  const body     = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (item.body ?? "").length > 300 ? "..." : "";
  return [
    `#${item.number} [${item.state.toUpperCase()}]${labelStr} ${item.title}`,
    `  作者: @${item.user.login} | 创建: ${item.created_at.slice(0, 10)} | 更新: ${item.updated_at.slice(0, 10)} | 评论: ${item.comments} | 👍: ${item.reactions?.["+1"] ?? 0}`,
    `  链接: ${item.html_url}`,
    `  摘要: ${body}${ellipsis}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

function buildCliPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
): string {
  const issuesText    = issues.map(formatItem).join("\n") || "无";
  const prsText       = prs.map(formatItem).join("\n") || "无";
  const releasesText  = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : "无";

  return `你是一位专注于 AI 开发工具的技术分析师。请根据以下 GitHub 数据，生成 ${dateStr} 的 ${cfg.name} 社区动态日报。

# 数据来源: github.com/${cfg.repo}

## 最新 Releases（过去24小时）
${releasesText}

## 最新 Issues（过去24小时内更新，共${issues.length}条）
${issuesText}

## 最新 Pull Requests（过去24小时内更新，共${prs.length}条）
${prsText}

---

请生成一份结构清晰的中文日报，包含以下部分：

1. **今日速览** - 用2-3句话概括今天最重要的动态
2. **版本发布** - 如有新版本，总结更新内容；无则省略
3. **社区热点 Issues** - 挑选 10 个最值得关注的 Issue，说明为什么重要、社区反应如何
4. **重要 PR 进展** - 挑选 10 个重要的 PR，说明功能或修复内容
5. **功能需求趋势** - 从所有 Issues 中提炼出社区最关注的功能方向（如 IDE 集成、性能、新模型支持等）
6. **开发者关注点** - 总结开发者反馈中的痛点或高频需求

语言要求：简洁专业，适合技术开发者阅读。每个条目附上 GitHub 链接。
`;
}

function buildOpenclawPrompt(
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
): string {
  const issuesText   = issues.map(formatItem).join("\n") || "无";
  const prsText      = prs.map(formatItem).join("\n") || "无";
  const releasesText = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : "无";

  // Count open vs closed for context
  const openIssues   = issues.filter((i) => i.state === "open").length;
  const closedIssues = issues.filter((i) => i.state === "closed").length;
  const mergedPrs    = prs.filter((p) => p.state === "closed").length;
  const openPrs      = prs.filter((p) => p.state === "open").length;

  return `你是一位资深开源项目分析师，专注于跟踪大型开源项目的社区动态和项目进展。
请根据以下来自 OpenClaw (github.com/openclaw/openclaw) 的 GitHub 数据，生成 ${dateStr} 的项目动态日报。

# 数据概览
- 过去24小时 Issues 更新：${issues.length} 条（新开/活跃: ${openIssues}，已关闭: ${closedIssues}）
- 过去24小时 PR 更新：${prs.length} 条（待合并: ${openPrs}，已合并/关闭: ${mergedPrs}）
- 新版本发布：${releases.length} 个

## 最新 Releases
${releasesText}

## 最新 Issues（过去24小时内更新，共${issues.length}条）
${issuesText}

## 最新 Pull Requests（过去24小时内更新，共${prs.length}条）
${prsText}

---

请生成一份结构清晰的 OpenClaw 项目日报，包含以下部分：

1. **今日速览** - 用3-5句话概括项目今日整体状态，包括活跃度评估

2. **版本发布** - 如有新版本，详细说明更新内容、破坏性变更、迁移注意事项；无则省略

3. **项目进展** - 今日合并/关闭的重要 PR，说明推进了哪些功能或修复，项目整体向前迈进了多少

4. **社区热点** - 今日讨论最活跃、评论最多、反应最多的 Issues/PRs（附链接），分析背后的诉求

5. **Bug 与稳定性** - 今日报告的 Bug、崩溃、回归问题，按严重程度排列，标注是否已有 fix PR

6. **功能请求与路线图信号** - 用户提出的新功能需求，结合已有 PR 判断哪些可能被纳入下一版本

7. **用户反馈摘要** - 从 Issues 评论中提炼真实用户痛点、使用场景、满意/不满意的地方

8. **待处理积压** - 长期未响应的重要 Issue 或 PR，提醒维护者关注

语言要求：客观专业，数据驱动，突出项目健康度。每个条目附上 GitHub 链接。
`;
}

function buildComparisonPrompt(digests: RepoDigest[], dateStr: string): string {
  const sections = digests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n过去24小时无活动。`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  return `你是一位专注于 AI 开发工具生态的资深技术分析师。以下是 ${dateStr} 各主流 AI CLI 工具的社区动态摘要：

${sections}

---

请基于上述各工具的动态，生成一份横向对比分析报告，包含以下部分：

1. **生态全景** - 用3-5句话概括当前 AI CLI 工具整体发展态势
2. **各工具活跃度对比** - 以表格形式汇总各工具今日的 Issues 数、PR 数、Release 情况
3. **共同关注的功能方向** - 多个工具社区都在关注的需求（说明哪些工具、具体诉求）
4. **差异化定位分析** - 各工具在功能侧重、目标用户、技术路线上的差异
5. **社区热度与成熟度** - 哪些工具社区更活跃，哪些处于快速迭代阶段
6. **值得关注的趋势信号** - 从社区反馈中提炼出的行业趋势，对开发者有何参考价值

语言要求：简洁专业，有数据支撑，适合技术决策者和开发者阅读。
`;
}

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------

async function callLlm(prompt: string): Promise<string> {
  const client = new Anthropic();
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });
  const block = message.content[0];
  if (block?.type !== "text") throw new Error("Unexpected response type from LLM");
  return block.text;
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

const autoGenFooter = (label: string) =>
  DIGEST_REPO
    ? `\n\n---\n*本日报由 [ai-cli-radar](https://github.com/${DIGEST_REPO}) 自动生成。*`
    : "";

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const now     = new Date();
  const since   = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const utcStr  = now.toISOString().slice(0, 16).replace("T", " ");

  const baseUrl = process.env["ANTHROPIC_BASE_URL"] ?? "api.anthropic.com";
  console.log(`[${now.toISOString()}] Starting digest | endpoint: ${baseUrl} | model: ${MODEL}`);

  // ── 1. Fetch all repos in parallel ─────────────────────────────────────────

  const allConfigs = [...CLI_REPOS, OPENCLAW];
  console.log(`  Tracking: ${allConfigs.map((r) => r.id).join(", ")}`);

  const fetched = await Promise.all(
    allConfigs.map(async (cfg) => {
      const [issuesRaw, prs, releases] = await Promise.all([
        fetchRecentItems(cfg, "issues", since),
        fetchRecentItems(cfg, "pulls", since),
        fetchRecentReleases(cfg.repo, since),
      ]);
      const issues = issuesRaw.filter((i) => !i.pull_request);
      console.log(`  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`);
      return { cfg, issues, prs, releases };
    }),
  );

  const fetchedCli      = fetched.filter((f) => f.cfg.id !== OPENCLAW.id);
  const fetchedOpenclaw = fetched.find((f) => f.cfg.id === OPENCLAW.id)!;

  // ── 2. Generate CLI summaries + OpenClaw summary in parallel ───────────────

  const [cliDigests, openclawSummary] = await Promise.all([
    Promise.all(
      fetchedCli.map(async ({ cfg, issues, prs, releases }) => {
        const hasData = issues.length || prs.length || releases.length;
        if (!hasData) {
          console.log(`  [${cfg.id}] No activity, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: "过去24小时无活动。" } as RepoDigest;
        }
        console.log(`  [${cfg.id}] Calling LLM for summary...`);
        const summary = await callLlm(buildCliPrompt(cfg, issues, prs, releases, dateStr));
        return { config: cfg, issues, prs, releases, summary } as RepoDigest;
      }),
    ),
    (async () => {
      const { cfg, issues, prs, releases } = fetchedOpenclaw;
      const hasData = issues.length || prs.length || releases.length;
      if (!hasData) {
        console.log(`  [openclaw] No activity, skipping LLM call`);
        return "过去24小时无活动。";
      }
      console.log(`  [openclaw] Calling LLM for OpenClaw report...`);
      return callLlm(buildOpenclawPrompt(issues, prs, releases, dateStr));
    })(),
  ]);

  // ── 3. Generate CLI cross-tool comparison ──────────────────────────────────

  console.log("  Calling LLM for CLI comparative analysis...");
  const comparison = await callLlm(buildComparisonPrompt(cliDigests, dateStr));

  // ── 4. Save individual CLI reports ─────────────────────────────────────────

  for (const d of cliDigests) {
    const content =
      `# ${d.config.name} 社区日报 ${dateStr}\n\n` +
      `> 数据来源: [${d.config.repo}](https://github.com/${d.config.repo}) | 生成时间: ${utcStr} UTC\n\n` +
      d.summary + autoGenFooter("digest");
    console.log(`  Saved ${saveFile(content, dateStr, `${d.config.id}.md`)}`);
  }

  // ── 5. Save CLI comparison report ──────────────────────────────────────────

  const repoLinks = cliDigests
    .map((d) => `- [${d.config.name}](./${d.config.id}.md) — [${d.config.repo}](https://github.com/${d.config.repo})`)
    .join("\n");
  const comparisonContent =
    `# AI CLI 工具社区动态横向对比 ${dateStr}\n\n` +
    `> 生成时间: ${utcStr} UTC\n\n` +
    `## 覆盖工具\n\n${repoLinks}\n\n---\n\n` +
    comparison + autoGenFooter("digest");
  console.log(`  Saved ${saveFile(comparisonContent, dateStr, "index.md")}`);

  // ── 6. Save OpenClaw report ────────────────────────────────────────────────

  const { issues: ocIssues, prs: ocPrs, releases: ocReleases } = fetchedOpenclaw;
  const openclawContent =
    `# OpenClaw 项目动态日报 ${dateStr}\n\n` +
    `> 数据来源: [openclaw/openclaw](https://github.com/openclaw/openclaw) | ` +
    `Issues: ${ocIssues.length} | PRs: ${ocPrs.length} | 生成时间: ${utcStr} UTC\n\n` +
    openclawSummary + autoGenFooter("openclaw");
  console.log(`  Saved ${saveFile(openclawContent, dateStr, "openclaw.md")}`);

  // ── 7. Create GitHub issues ────────────────────────────────────────────────

  if (DIGEST_REPO) {
    // CLI digest issue
    const cliIssueBody =
      comparisonContent +
      `\n\n## 各工具详细日报\n\n` +
      cliDigests
        .map((d) => `- **${d.config.name}**: [查看详细日报](https://github.com/${DIGEST_REPO}/blob/master/digests/${dateStr}/${d.config.id}.md)`)
        .join("\n");
    const cliIssueUrl = await createGitHubIssue(
      `📊 AI CLI 工具社区动态日报 ${dateStr}`,
      cliIssueBody,
      "digest",
    );
    console.log(`  Created CLI issue: ${cliIssueUrl}`);

    // OpenClaw issue
    const openclawIssueUrl = await createGitHubIssue(
      `🦞 OpenClaw 项目动态日报 ${dateStr}`,
      openclawContent,
      "openclaw",
    );
    console.log(`  Created OpenClaw issue: ${openclawIssueUrl}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
