# OpenAI Codex 社区日报 2026-02-23

> 数据来源: [openai/codex](https://github.com/openai/codex) | 生成时间: 2026-02-23 12:46 UTC

# OpenAI Codex 社区动态日报 | 2026-02-23

## 今日速览

今日社区活跃度极高，**50+ Issues 和 50+ PRs** 更新。核心焦点集中在 **TUI 稳定性修复**（steer 死锁、Windows 终端输入回归）、**多智能体工作流文档化**（agent teams 官方指南合并），以及 **VS Code 扩展体验优化**（聊天重命名、Timeline 集成）。Rust 核心版本 `0.105.0-alpha.13` 持续迭代，LSP 内置集成需求获 99 👍 成为长期热门。

---

## 版本发布

| 版本 | 说明 |
|:---|:---|
| **rust-v0.105.0-alpha.13** | Rust 核心组件持续迭代，具体变更待 release note 补充 |

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 类型 | 关键度 | 社区反应 |
|:---|:---|:---|:---|:---|
| [#12572](https://github.com/openai/codex/issues/12572) | 🐛 [Linux Sandbox][Bubblewrap] bwrap: loopback: Failed RTM_NEWADDR on Ubuntu 24.04 — subagents cannot execute any commands | **Bug** | 🔴 高 | 全新报告，Ubuntu 24.04 沙箱网络初始化失败，阻断子智能体执行 |
| [#12554](https://github.com/openai/codex/issues/12554) | Codex spawned 1000s of Zombies even after not being used for several days | **Bug** | 🔴 高 | 严重资源泄漏，macOS 上数千僵尸进程，影响系统稳定性 |
| [#12542](https://github.com/openai/codex/issues/12542) | Regression: Codex CLI TUI no longer handles input on Windows Terminal (raw ANSI sequences shown) | **Bug** | 🔴 高 | Windows 终端输入处理回归，7 条评论紧急讨论 |
| [#12519](https://github.com/openai/codex/issues/12519) | issue: Codex deleted my entire dev drive | **Bug** | 🔴 极高 | **数据安全事件**，递归删除误删整个驱动器，已关闭但需警示 |
| [#8745](https://github.com/openai/codex/issues/8745) | Built-in LSP integration (auto-detect + auto-install) for Codex CLI to enable language-aware edits | **Enhancement** | 🟡 长期热门 | **99 👍**，社区最期待功能，语言感知编辑能力 |
| [#12573](https://github.com/openai/codex/issues/12573) | Timeline‑Einträge in VS Code bei Verwendung von Codex | **Enhancement** | 🟢 新需求 | 德区用户，VS Code Timeline 集成，对标 GitHub Copilot |
| [#12564](https://github.com/openai/codex/issues/12564) | VS Code Extension: Allow renaming task/thread titles to improve history navigation | **Enhancement** | 🟢 高频 | 聊天历史重命名，同日 2 条重复 issue（#12552），用户体验痛点 |
| [#12563](https://github.com/openai/codex/issues/12563) | Feature Request: Add Intel Mac Support for Codex Desktop App | **Enhancement** | 🟢 新需求 | Intel Mac 用户被排除，硬件兼容性诉求 |
| [#6824](https://github.com/openai/codex/issues/6824) | Real-Time Steering During Codex Runs (Similar to Claude Code) | **Enhancement** | 🟡 持续活跃 | **9 👍**，实时干预能力，与 Claude Code 竞争特性 |
| [#11701](https://github.com/openai/codex/issues/11701) | Subagent configuration and orchestration | **Enhancement** | 🟢 已关闭 | **37 👍 58 评论**，子智能体配置需求，今日关闭引关注 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 核心内容 |
|:---|:---|:---|:---|
| [#12569](https://github.com/openai/codex/pull/12569) | fix(tui): queue steer Enter while final answer is still streaming to prevent dead state | @guidedways | **关键修复**：steer 模式下按 Enter 导致 TUI 死锁的竞态条件 |
| [#12523](https://github.com/openai/codex/pull/12523) | feat(tui): render markdown tables with Unicode box-drawing borders | @fcoury | TUI 表格渲染优化，Unicode 边框替代原始管道符 |
| [#12570](https://github.com/openai/codex/pull/12570) | feat: keep dead agents in the agent picker | @jif-oai | 智能体选择器保留已终止 agent，便于查看历史 |
| [#12560](https://github.com/openai/codex/pull/12560) | app-server: Replay pending item requests on `thread/resume` | @euroelessar | 断线重连后恢复待处理请求，提升可靠性 |
| [#12541](https://github.com/openai/codex/pull/12541) | Allow exec resume to parse output-last-message flag after command | @etraut-openai | 修复 `codex exec resume -o` 标志位解析顺序问题 |
| [#12550](https://github.com/openai/codex/pull/12550) | feat(tui): hook up ctrl-l to /clear | @rakan-oai | Ctrl+L 快捷清屏，提升终端操作效率 |
| [#12531](https://github.com/openai/codex/pull/12531) | docs: add experimental agent teams workflow guide | @Andyduck-ops | **官方文档**：多智能体团队工作流指南合并 |
| [#12536](https://github.com/openai/codex/pull/12536) | core: Update repository root discovery to honor configured project markers | @peterdelevoryas | 支持 Sapling (`.sl`) 等非 Git 仓库标记 |
| [#12532](https://github.com/openai/codex/pull/12532) | fix(collab): mark wait with empty statuses as failed | @Andyduck-ops | 协作等待空状态判定为失败，避免误导 |
| [#12521](https://github.com/openai/codex/pull/12521) | fix(core) Move approved rules to env context | @dylan-hurd-oai | 权限规则从 developer message 移至环境上下文 |

---

## 功能需求趋势

| 方向 | 热度 | 典型 Issue |
|:---|:---|:---|
| **IDE 深度集成** | 🔥🔥🔥 | VS Code Timeline (#12573)、聊天重命名 (#12564)、外部链接安全 (#12561) |
| **TUI 稳定性** | 🔥🔥🔥 | Steer 死锁 (#12569, #11008)、Windows 输入回归 (#12542)、僵尸进程 (#12554) |
| **多智能体编排** | 🔥🔥🔥 | 官方文档落地 (#12531)、子 agent 配置 (#11701)、max_threads 文档化 (#12546) |
| **沙箱安全** | 🔥🔥 | Ubuntu 24.04 网络故障 (#12572)、Windows 沙箱 (#10601)、误删驱动器 (#12519) |
| **LSP 语言支持** | 🔥🔥 | 内置 LSP (#8745, 99👍)、代码感知编辑 |
| **跨平台兼容** | 🔥 | Intel Mac (#12563)、Android Termux (#11809) |
| **实时干预** | 🔥 | Claude Code 式 steering (#6824)、/rewind 检查点 (#12558) |

---

## 开发者关注点

| 痛点类别 | 具体表现 | 代表 Issue |
|:---|:---|:---|
| **数据安全风险** | 递归删除误删整个驱动器，无回收站保护 | [#12519](https://github.com/openai/codex/issues/12519) |
| **进程管理缺陷** | 僵尸进程泄漏、子 agent 无法执行、连接重连失败 | [#12554](https://github.com/openai/codex/issues/12554), [#12572](https://github.com/openai/codex/issues/12572), [#12548](https://github.com/openai/codex/issues/12548) |
| **Windows 体验落差** | 终端输入回归、@文件名补全失效、沙箱配置困难 | [#12542](https://github.com/openai/codex/issues/12542), [#11079](https://github.com/openai/codex/issues/11079), [#10601](https://github.com/openai/codex/issues/10601) |
| **IDE 扩展成熟度** | 聊天历史管理混乱、性能卡顿、认证问题 | [#12564](https://github.com/openai/codex/issues/12564), [#11975](https://github.com/openai/codex/issues/11975), [#5673](https://github.com/openai/codex/issues/5673) |
| **可观测性不足** | 命令执行状态显示不完整、空状态误导 | [#12544](https://github.com/openai/codex/issues/12544), [#12549](https://github.com/openai/codex/pull/12549) |

---

> 📌 **日报来源**: [openai/codex](https://github.com/openai/codex) | 数据时间: 2026-02-23

---
*本日报由 [ai-cli-radar](https://github.com/duanyytop/ai-cli-radar) 自动生成。*