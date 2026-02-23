# claude-code-digest

A GitHub Actions workflow that runs every morning at 09:00 CST, fetches the latest issues, pull requests, and releases from [anthropics/claude-code](https://github.com/anthropics/claude-code), and publishes a Chinese-language daily digest as a GitHub Issue and a committed Markdown file.

## Features

- Fetches issues, pull requests, and releases updated in the last 24 hours
- Summarizes community highlights, feature trends, and developer pain points using Claude
- Publishes output as a GitHub Issue and commits a Markdown file to `digests/`
- Runs on a daily schedule via GitHub Actions; supports manual triggering

## Setup

### 1. Fork this repository

### 2. Add Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|--------|-------------|
| `ANTHROPIC_API_KEY` | API key — works with both Anthropic and Kimi Code |
| `ANTHROPIC_BASE_URL` | API endpoint override. Set to `https://api.kimi.com/coding/` for Kimi Code; leave unset for Anthropic |

> `GITHUB_TOKEN` is provided automatically by GitHub Actions.

### 3. Enable the workflow

Confirm the workflow is enabled in the **Actions** tab.

To test immediately, go to **Actions → Daily Claude Code Digest → Run workflow**.

## Running locally

```bash
npm install

export GITHUB_TOKEN=ghp_xxxxx
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
export ANTHROPIC_API_KEY=sk-kimi-xxxxxxxx
export DIGEST_REPO=your-username/claude-code-digest  # optional; omit to only write the file

npm start
```

## Output format

Each digest follows this structure (written in Chinese):

```
# Claude Code 社区日报 YYYY-MM-DD

## 今日速览        — Top 2–3 highlights of the day
## 版本发布        — New releases (omitted if none)
## 社区热点 Issues — 3–5 notable issues with context
## 重要 PR 进展    — 3–5 important PRs
## 功能需求趋势    — Community feature request trends
## 开发者关注点    — Common pain points and feedback
```

Historical digests are stored in [`digests/`](./digests/). Published issues are tagged [`digest`](../../issues?label=digest).

## Schedule

Default cron `"0 1 * * *"` = **01:00 UTC = 09:00 CST**.

To change the time, edit the cron expression in `.github/workflows/daily-digest.yml`:

| CST  | UTC cron       |
|------|----------------|
| 08:00 | `0 0 * * *`  |
| 09:00 | `0 1 * * *`  |
| 10:00 | `0 2 * * *`  |
