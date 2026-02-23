/**
 * Daily digest for multiple AI CLI GitHub repositories.
 * Fetches recent issues, PRs, and releases; generates per-repo summaries
 * and a cross-tool comparative analysis via the Anthropic SDK.
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

const REPOS: RepoConfig[] = [
  { id: "claude-code", repo: "anthropics/claude-code",      name: "Claude Code"   },
  { id: "codex",       repo: "openai/codex",                name: "OpenAI Codex"  },
  { id: "gemini-cli",  repo: "google-gemini/gemini-cli",    name: "Gemini CLI"    },
  { id: "kimi-cli",    repo: "MoonshotAI/kimi-cli",         name: "Kimi Code CLI" },
  { id: "opencode",    repo: "anomalyco/opencode",          name: "OpenCode"      },
  { id: "qwen-code",   repo: "QwenLM/qwen-code",            name: "Qwen Code"     },
];

const GITHUB_TOKEN = requireEnv("GITHUB_TOKEN");
const DIGEST_REPO  = process.env["DIGEST_REPO"] ?? "";
const MODEL        = process.env["ANTHROPIC_MODEL"] ?? "claude-sonnet-4-6";

const GITHUB_HEADERS: Record<string, string> = {
  Authorization:       `Bearer ${GITHUB_TOKEN}`,
  Accept:              "application/vnd.github+json",
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

async function fetchRecentItems(
  repo: string,
  itemType: "issues" | "pulls",
  since: Date,
): Promise<GitHubItem[]> {
  const params: Record<string, string> = {
    state: "all", sort: "updated", direction: "desc", per_page: "50",
  };
  // /pulls does not support `since`; filter client-side instead
  if (itemType === "issues") params["since"] = since.toISOString();

  const items = await githubGet<GitHubItem[]>(
    `https://api.github.com/repos/${repo}/${itemType}`,
    params,
  );
  return itemType === "pulls"
    ? items.filter((i) => new Date(i.updated_at) >= since)
    : items;
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
  // 422 = label already exists
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
}

async function createGitHubIssue(title: string, body: string): Promise<string> {
  await ensureLabel("digest", "0075ca");
  const resp = await fetch(`https://api.github.com/repos/${DIGEST_REPO}/issues`, {
    method: "POST",
    headers: { ...GITHUB_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, labels: ["digest"] }),
  });
  if (!resp.ok) throw new Error(`Failed to create issue: ${await resp.text()}`);
  const data = (await resp.json()) as { html_url: string };
  return data.html_url;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

function formatItem(item: GitHubItem): string {
  const labels    = item.labels.map((l) => l.name).join(", ");
  const labelStr  = labels ? ` [${labels}]` : "";
  const body      = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis  = (item.body ?? "").length > 300 ? "..." : "";
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

function buildRepoPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
): string {
  const issuesText = issues.map(formatItem).join("\n") || "无";
  const prsText    = prs.map(formatItem).join("\n") || "无";
  const releasesText = releases.length
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
  console.log(`  Tracking ${REPOS.length} repos: ${REPOS.map((r) => r.id).join(", ")}`);

  // 1. Fetch all repos in parallel
  const fetched = await Promise.all(
    REPOS.map(async (cfg) => {
      const [issuesRaw, prs, releases] = await Promise.all([
        fetchRecentItems(cfg.repo, "issues", since),
        fetchRecentItems(cfg.repo, "pulls", since),
        fetchRecentReleases(cfg.repo, since),
      ]);
      const issues = issuesRaw.filter((i) => !i.pull_request);
      console.log(`  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`);
      return { cfg, issues, prs, releases };
    }),
  );

  // 2. Generate per-repo summaries in parallel (skip repos with no activity)
  const digests: RepoDigest[] = await Promise.all(
    fetched.map(async ({ cfg, issues, prs, releases }) => {
      const hasData = issues.length || prs.length || releases.length;
      if (!hasData) {
        console.log(`  [${cfg.id}] No activity, skipping LLM call`);
        return { config: cfg, issues, prs, releases, summary: "过去24小时无活动。" };
      }
      console.log(`  [${cfg.id}] Calling LLM for individual summary...`);
      const summary = await callLlm(buildRepoPrompt(cfg, issues, prs, releases, dateStr));
      return { config: cfg, issues, prs, releases, summary };
    }),
  );

  // 3. Generate comparative analysis
  console.log("  Calling LLM for comparative analysis...");
  const comparison = await callLlm(buildComparisonPrompt(digests, dateStr));

  // 4. Save individual reports
  const footer = (repo: string) =>
    DIGEST_REPO
      ? `\n\n---\n*本日报由 [ai-cli-radar](https://github.com/${DIGEST_REPO}) 自动生成。*`
      : "";

  for (const d of digests) {
    const header =
      `# ${d.config.name} 社区日报 ${dateStr}\n\n` +
      `> 数据来源: [${d.config.repo}](https://github.com/${d.config.repo}) | 生成时间: ${utcStr} UTC\n\n`;
    const filepath = saveFile(header + d.summary + footer(d.config.repo), dateStr, `${d.config.id}.md`);
    console.log(`  Saved ${filepath}`);
  }

  // 5. Save comparative report
  const repoLinks = digests
    .map((d) => `- [${d.config.name}](./${d.config.id}.md) — [${d.config.repo}](https://github.com/${d.config.repo})`)
    .join("\n");
  const comparisonContent =
    `# AI CLI 工具社区动态横向对比 ${dateStr}\n\n` +
    `> 生成时间: ${utcStr} UTC\n\n` +
    `## 覆盖工具\n\n${repoLinks}\n\n---\n\n` +
    comparison +
    footer("comparison");
  const indexPath = saveFile(comparisonContent, dateStr, "index.md");
  console.log(`  Saved ${indexPath}`);

  // 6. Create GitHub issue (comparative analysis + links)
  if (DIGEST_REPO) {
    const issueBody =
      comparisonContent +
      `\n\n## 各工具详细日报\n\n` +
      digests
        .map((d) => `- **${d.config.name}**: [查看详细日报](https://github.com/${DIGEST_REPO}/blob/master/digests/${dateStr}/${d.config.id}.md)`)
        .join("\n");
    const issueUrl = await createGitHubIssue(`📊 AI CLI 工具社区动态日报 ${dateStr}`, issueBody);
    console.log(`  Created issue: ${issueUrl}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
