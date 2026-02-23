/**
 * agents-radar: daily digest for AI CLI tools and OpenClaw.
 *
 * Env vars:
 *   ANTHROPIC_API_KEY   - API key (Anthropic or Kimi Code)
 *   ANTHROPIC_BASE_URL  - Endpoint override (e.g. https://api.kimi.com/coding/)
 *   ANTHROPIC_MODEL     - Model name (default: claude-sonnet-4-6)
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 */

import {
  type RepoConfig,
  fetchRecentItems,
  fetchRecentReleases,
  createGitHubIssue,
} from "./github.ts";
import {
  type RepoDigest,
  buildCliPrompt,
  buildOpenclawPrompt,
  buildComparisonPrompt,
} from "./prompts.ts";
import { callLlm, saveFile, autoGenFooter } from "./report.ts";

// ---------------------------------------------------------------------------
// Repo config
// ---------------------------------------------------------------------------

/** AI CLI tools — included in per-tool digests and cross-tool comparison. */
const CLI_REPOS: RepoConfig[] = [
  { id: "claude-code", repo: "anthropics/claude-code",   name: "Claude Code"   },
  { id: "codex",       repo: "openai/codex",             name: "OpenAI Codex"  },
  { id: "gemini-cli",  repo: "google-gemini/gemini-cli", name: "Gemini CLI"    },
  { id: "kimi-cli",    repo: "MoonshotAI/kimi-cli",      name: "Kimi Code CLI" },
  { id: "opencode",    repo: "anomalyco/opencode",       name: "OpenCode"      },
  { id: "qwen-code",   repo: "QwenLM/qwen-code",         name: "Qwen Code"     },
];

/** OpenClaw — high-volume project tracked separately with its own prompt. */
const OPENCLAW: RepoConfig = {
  id: "openclaw",
  repo: "openclaw/openclaw",
  name: "OpenClaw",
  paginated: true,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");
  requireEnv("ANTHROPIC_API_KEY");

  const now     = new Date();
  const since   = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const utcStr  = now.toISOString().slice(0, 16).replace("T", " ");
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  const baseUrl = process.env["ANTHROPIC_BASE_URL"] ?? "api.anthropic.com";
  console.log(`[${now.toISOString()}] Starting digest | endpoint: ${baseUrl}`);

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
      fetchedCli.map(async ({ cfg, issues, prs, releases }): Promise<RepoDigest> => {
        const hasData = issues.length || prs.length || releases.length;
        if (!hasData) {
          console.log(`  [${cfg.id}] No activity, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: "过去24小时无活动。" };
        }
        console.log(`  [${cfg.id}] Calling LLM for summary...`);
        const summary = await callLlm(buildCliPrompt(cfg, issues, prs, releases, dateStr));
        return { config: cfg, issues, prs, releases, summary };
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

  const footer = autoGenFooter();

  // ── 4. Build merged CLI digest (comparison + per-tool details) ─────────────

  const repoLinks = cliDigests
    .map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`)
    .join("\n");

  const toolSections = cliDigests
    .map((d) => [
      `<details>`,
      `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
      ``,
      d.summary,
      ``,
      `</details>`,
    ].join("\n"))
    .join("\n\n");

  const digestContent =
    `# AI CLI 工具社区动态日报 ${dateStr}\n\n` +
    `> 生成时间: ${utcStr} UTC | 覆盖工具: ${cliDigests.length} 个\n\n` +
    `${repoLinks}\n\n` +
    `---\n\n` +
    `## 横向对比\n\n` +
    comparison +
    `\n\n---\n\n` +
    `## 各工具详细报告\n\n` +
    toolSections +
    footer;

  console.log(`  Saved ${saveFile(digestContent, dateStr, "ai-cli.md")}`);

  // ── 5. Save OpenClaw report ────────────────────────────────────────────────

  const { issues: ocIssues, prs: ocPrs, releases: ocReleases } = fetchedOpenclaw;
  const openclawContent =
    `# OpenClaw 项目动态日报 ${dateStr}\n\n` +
    `> 数据来源: [openclaw/openclaw](https://github.com/openclaw/openclaw) | ` +
    `Issues: ${ocIssues.length} | PRs: ${ocPrs.length} | 生成时间: ${utcStr} UTC\n\n` +
    openclawSummary + footer;
  console.log(`  Saved ${saveFile(openclawContent, dateStr, "openclaw.md")}`);

  // ── 6. Create GitHub issues ────────────────────────────────────────────────

  if (digestRepo) {
    const cliUrl = await createGitHubIssue(`📊 AI CLI 工具社区动态日报 ${dateStr}`, digestContent, "digest");
    console.log(`  Created CLI issue: ${cliUrl}`);

    const openclawUrl = await createGitHubIssue(`🦞 OpenClaw 项目动态日报 ${dateStr}`, openclawContent, "openclaw");
    console.log(`  Created OpenClaw issue: ${openclawUrl}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
