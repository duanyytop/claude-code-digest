# OpenClaw 生态日报 2026-02-28

> Issues: 500 | PRs: 500 | 覆盖项目: 10 个 | 生成时间: 2026-02-28 03:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 | 2026-02-28

---

## 1. 今日速览

OpenClaw 今日保持**极高活跃度**，24小时内产生 **500 条 Issues 更新**（386 新开/活跃，114 关闭）和 **500 条 PR 更新**（364 待合并，136 已合并/关闭），无新版本发布。社区焦点集中在**安装部署问题**（pnpm/npm 全局安装路径验证）、**多通道稳定性**（Feishu、Telegram、Discord）以及**安全架构**（API 密钥保护、技能安装钩子）。值得注意的是，v2026.2.26 引入的插件路径安全验证与 pnpm 全局安装产生冲突，成为今日最高频的阻塞性问题。

---

## 2. 版本发布

**无新版本发布**（最新版本仍为 2026.2.26）

> ⚠️ 已知问题：v2026.2.26 的插件路径安全验证导致 pnpm 全局安装失败，社区正在紧急修复中。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 作者 | 核心改进 | 关联 Issue |
|:---|:---|:---|:---|
| [#29264](https://github.com/openclaw/openclaw/pull/29264) | @paceyw | Feishu 通道自动将本地图片路径文本转换为图片消息 | 修复图片路径泄露为纯文本问题 |
| [#28529](https://github.com/openclaw/openclaw/pull/28529) | @cowboy129 | Feishu 通道新增反应事件监听（im.message.reaction.created/deleted） | 实现被动响应用户表情反应 |
| [#24978](https://github.com/openclaw/openclaw/pull/24978) | @mcaxtr | 恢复 Feishu dmPolicy 默认值为 "open"，修复 v2026.2.14 引入的破坏性变更 | [#17741](https://github.com/openclaw/openclaw/issues/17741) |
| [#29374](https://github.com/openclaw/openclaw/pull/29374) | @obviyus | Android 节点能力清单重构，统一运行时标志 | 减少能力漂移风险 |
| [#16284](https://github.com/openclaw/openclaw/pull/16284) | @Yaxuan42 | Feishu 多账户凭证隔离，支持按账户参数路由工具凭证 | 修复多账户配置冲突 |

**整体进展**：Feishu 通道成为今日重点优化对象，完成反应事件全链路、图片消息体验、多账户隔离三大改进；Android 移动端架构持续打磨。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| Issue | 评论 | 核心诉求 | 状态 |
|:---|:---|:---|:---|
| [#4855](https://github.com/openclaw/openclaw/issues/4855) Control UI assets not found on npm global install | 37 | **全局安装路径解析失败** — `resolveControlUiDistIndexPath` 无法定位打包资源，影响所有 npm 全局安装用户 | ✅ 已关闭 |
| [#19184](https://github.com/openclaw/openclaw/issues/19184) OpenAI Responses 400 error loop on gpt-5.2 | 23 | **推理模型兼容性** — gpt-5.2 的 reasoning 类型项缺失后续项导致无限循环 | ✅ 已关闭 |
| [#21653](https://github.com/openclaw/openclaw/issues/21653) Custom API providers 4096-token context window 限制 | 19 | **自定义提供商配置体验** — 默认上下文窗口过低导致代理立即失败 | 🔴 开放中 |
| [#4544](https://github.com/openclaw/openclaw/issues/4544) Cannot change model to Ollama Deepseek-r1 | 17 | **本地模型切换体验** — 从云端模型切换到本地 Ollama 模型的命令识别问题 | ✅ 已关闭 |
| [#7631](https://github.com/openclaw/openclaw/issues/7631) Windows: `openclaw plugins install` spawn EINVAL | 16 | **Windows 插件安装阻塞** — child_process spawn 参数在 Windows 下不兼容 | 🔴 开放中，无 PR |

**背后诉求分析**：安装部署体验（全局安装、Windows 兼容性）和**模型配置智能化**（自动检测上下文窗口、平滑切换本地/云端模型）是用户最迫切的两大痛点。

---

## 5. Bug 与稳定性

### 🔴 严重（阻塞功能/数据安全）

| Issue | 描述 | 影响范围 | Fix PR |
|:---|:---|:---|:---|
| [#28175](https://github.com/openclaw/openclaw/issues/28175) [#28122](https://github.com/openclaw/openclaw/issues/28122) | **pnpm 全局安装被安全验证阻断** — "unsafe plugin manifest path" 错误，v2026.2.26 回归 | 所有 pnpm 全局安装用户 | 🔄 社区讨论中，建议临时使用 npm |
| [#28877](https://github.com/openclaw/openclaw/issues/28877) | **macOS 应用变为 arm64-only**，Intel Mac 无法启动 | Intel Mac 用户 | 🔍 需构建修复 |
| [#26207](https://github.com/openclaw/openclaw/issues/26207) | **v2026.2.24 代理配置失效** — `setGlobalDispatcher` 破坏所有出站 HTTP 代理 | 需代理访问的用户（如 GFW 环境） | 🔍 需回滚或修复 |
| [#27053](https://github.com/openclaw/openclaw/issues/27053) | **输入指示器无限持续** — PR #25886 引入的 keepalive 功能回归 | 所有使用打字指示器的通道 | 🔍 需修复 |
| [#28386](https://github.com/openclaw/openclaw/issues/28386) | **minimax-portal OAuth 401**，v2026.2.26 回归，v2026.2.24 正常 | minimax 用户 | 🔍 需调查 |

### 🟡 中等（功能受限/体验下降）

| Issue | 描述 | 状态 |
|:---|:---|:---|
| [#29134](https://github.com/openclaw/openclaw/issues/29134) | Windows ACP runtime backend 报告 unavailable，但 acpx CLI 正常 | 开放中 |
| [#23538](https://github.com/openclaw/openclaw/issues/23538) | Anthropic setup-token auth 返回 401，隔离环境可复现 | 开放中 |
| [#27921](https://github.com/openclaw/openclaw/issues/27921) | Cron jobs `mode:announce` 发送重复消息 | 开放中 |
| [#27409](https://github.com/openclaw/openclaw/issues/27409) | Discord REST API "fetch failed"，代理配置无效 | 开放中 |

---

## 6. 功能请求与路线图信号

### 用户强烈诉求的新功能

| Issue/PR | 功能 | 用户动机 | 纳入可能性评估 |
|:---|:---|:---|:---|
| [#18677](https://github.com/openclaw/openclaw/issues/18677) | **Security Scan Hook API for skill:install** | 技能安装前安全扫描，防止恶意代码 | ⭐⭐⭐⭐⭐ 高 — 与 VirusTotal 集成已提及，社区安全焦点 |
| [#7916](https://github.com/openclaw/openclaw/issues/7916) | **加密 API 密钥 / 密钥管理** | 当前明文存储 `auth-profiles.json` 和 `openclaw.json` | ⭐⭐⭐⭐⭐ 高 — 安全路线图核心 |
| [#9443](https://github.com/openclaw/openclaw/issues/9443) | **预构建 Android APK 发布** | 用户无法自行编译 Android 配套应用 | ⭐⭐⭐⭐☆ 中高 — 有 PR #29374 重构基础 |
| [#29308](https://github.com/openclaw/openclaw/pull/29308) | **企业微信 (WeCom) 通道插件** | 中国企业 IM 集成需求 | ⭐⭐⭐⭐☆ 中高 — PR 已提交，功能完整 |
| [#28691](https://github.com/openclaw/openclaw/pull/28691) | **网关仪表盘 Terminal + FileExplore** | 无需 SSH 直接管理主机 | ⭐⭐⭐⭐☆ 中高 — 大型 PR 待审 |
| [#29319](https://github.com/openclaw/openclaw/pull/29319) | **Evolution Framework - 自主持续学习** | 40-60 轮自主探索会话，安全机制 | ⭐⭐⭐☆☆ 中 — 社区示例，需评估生产就绪性 |
| [#25480](https://github.com/openclaw/openclaw/pull/25480) | **Guardian 安全层** — 工具调用黑名单 + LLM 意图验证 | 两阶段危险操作验证 | ⭐⭐⭐⭐⭐ 高 — 直接回应 #18677 诉求 |

**路线图信号**：安全架构（密钥加密、技能扫描、Guardian 层）和**企业级通道**（WeCom、Feishu 深度优化）是明确的下一个版本重点。

---

## 7. 用户反馈摘要

### 💬 真实痛点

> *"pnpm global install should be supported as documented"* — [#28175](https://github.com/openclaw/openclaw/issues/28175)
> 
> **核心不满**：官方文档承诺的 pnpm 支持在 v2026.2.26 被安全验证破坏，用户被迫回退到 npm。

> *"Model context window too small (4096 tokens). Minimum is 16000"* — [#21653](https://github.com/openclaw/openclaw/issues/21653)
> 
> **配置体验缺陷**：自定义 API 提供商的默认配置过于保守，新手用户无法理解为何代理"突然失败"。

> *"Intel Macs with 'You can't open the application because this application is not supported on this Mac'"* — [#28877](https://github.com/openclaw/openclaw/issues/28877)
> 
> **发布质量**：版本发布未验证多架构构建，导致用户设备被"误伤"。

### ✅ 满意场景

- Feishu 反应事件监听 [#28529](https://github.com/openclaw/openclaw/pull/28529) 被快速合并，企业用户认可响应速度
- 多账户凭证隔离 [#16284](https://github.com/openclaw/openclaw/pull/16284) 解决了长期困扰的权限混淆问题

---

## 8. 待处理积压

### ⚠️ 长期未响应的重要事项

| Issue/PR | 天数 | 问题 | 行动建议 |
|:---|:---|:---|:---|
| [#11829](https://github.com/openclaw/openclaw/issues/11829) | 20天 | **API 密钥泄露给 LLM 的系统性风险** — 模型目录序列化、聊天历史暴露、工具响应泄露 | 需维护者确认路线图优先级 |
| [#16521](https://github.com/openclaw/openclaw/issues/16521) | 14天 | **错误分类器误报** — `sanitizeUserFacingText()` 基于正则的启发式分类导致账单/速率限制误判 | 标记为 `good first issue` 或分配重构 |
| [#18470](https://github.com/openclaw/openclaw/issues/18470) | 12天 | **网关死锁** — 活跃 Agent 回合期间调用内部命令导致阻塞 | 需核心维护者调查并发模型 |
| [#20222](https://github.com/openclaw/openclaw/issues/20222) | 10天 | **Google Chat webhook 无限重启循环** — v2026.2.17 回归，无错误日志 | 需添加调试日志或回滚调查 |
| [#15582](https://github.com/openclaw/openclaw/issues/15582) | 15天 | **Remote CDP (Browserless) 端口冲突误判** | 需 Windows/WSL2 环境复现 |

---

**日报生成时间**：2026-02-28  
**数据来源**：GitHub API (openclaw/openclaw)

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告
**分析日期：2026-02-28**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正经历**从"单点工具"向"多通道平台"的关键跃迁**。头部项目（OpenClaw、NanoBot、PicoClaw）日均处理 20-40 个 PR，社区焦点高度集中于**MCP 协议集成**（5+ 项目推进）、**企业 IM 深度适配**（飞书/钉钉/Discord/Telegram 全覆盖）及**安全架构加固**（密钥加密、技能沙箱、审计日志）。与此同时，**资源效率**成为新竞争维度——ZeroClaw 以 <5MB 内存占用对标 OpenClaw 的 1.5GB，引发迁移讨论；**Windows 原生支持**从边缘需求升级为差异化核心能力。整体生态呈现"功能扩张与质量巩固并行、头部集中与长尾细分共存"的特征。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | 版本发布 | 健康度评估 | 阶段定位 |
|:---|:---:|:---:|:---:|:---|:---|
| **OpenClaw** | 500 更新（386 活跃/114 关闭） | 500 更新（364 待合并/136 已处理） | ❌ 无 | 🟡 **高活跃、高积压** — 合并率 27%，pnpm 全局安装回归阻塞部分用户 | 质量巩固期 |
| **ZeroClaw** | 41 关闭（82% 关闭率） | 50 更新（3 合并/47 待审，合并率 6%） | ❌ 无 | 🟡 **高吞吐、审查瓶颈** — Issue 清理高效，但 PR 积压严重 | 快速迭代期 |
| **LobsterAI** | 28 更新（21 活跃/7 关闭） | 21 更新（16 合并/5 待审，合并率 76%） | ✅ v0.1.22 | 🟢 **健康迭代** — 合并率高，Ollama 体验优化响应迅速 | 快速迭代期 |
| **NanoBot** | 32 更新（25 活跃/7 关闭） | 72 更新（32 已处理/40 待合并） | ❌ 无 | 🟡 **高活跃、高积压** — PR 积压 40 个，合流压力显著 | 功能扩张期 |
| **PicoClaw** | 29 更新（16 活跃/13 关闭） | 91 更新（34 已处理/57 待合并） | ❌ 无 | 🟡 **极高活跃、极高积压** — 57 个待合并 PR 为生态之最 | 功能扩张期 |
| **NanoClaw** | 数据未披露 | 37 更新（8 已处理/29 待合并） | ❌ 无 | 🟡 **架构重构驱动** — #500 可插拔通道重构成为引力中心 | 架构转型期 |
| **IronClaw** | 6 更新（5 活跃/1 关闭） | 27 更新（13 已处理/14 待审，合并率 48%） | ❌ 无（v0.13.0 待发布） | 🟢 **健康节奏** — 审查效率均衡，测试体系里程碑 | 稳定性巩固期 |
| **TinyClaw** | 1 新开 | 8 更新（4 已处理/4 待审） | ❌ 无 | 🟢 **早期健康** — 插件系统落地，企业需求开始浮现 | 平台化起步期 |
| **ZeptoClaw** | 2 更新（1 新开/1 关闭） | 2 更新（1 合并/1 待审） | ❌ 无 | 🟢 **稳健推进** — MCP stdio 传输层里程碑 | 基础设施深耕期 |
| **EasyClaw** | 1 关闭 | 0 更新 | ✅ v1.5.11/v1.5.12 连续发布 | 🟡 **低活跃、文档维护** — 功能性提交停滞，版本透明度不足 | 稳定观察期 |

---

## 3. OpenClaw 在生态中的定位

| 维度 | OpenClaw 特征 | 生态对比 |
|:---|:---|:---|
| **社区规模** | **绝对领先** — 500 Issues/PR 日更新量约为第 2 名（PicoClaw 91 PR）的 5-6 倍 | 生态最大单一项目，但合并率 27% 低于 LobsterAI（76%）、IronClaw（48%） |
| **技术路线** | **TypeScript/Node 生态 + 插件化架构** — pnpm/npm 工具链、技能（skill）市场、Control UI 可视化 | 对比：ZeroClaw（Rust/极致性能）、NanoBot（Python/学术研究导向）、IronClaw（Rust/WASM 沙箱） |
| **核心优势** | ① **通道覆盖最全** — Feishu/Telegram/Discord/Slack/WhatsApp 企业级深度集成<br>② **生态工具链成熟** — 技能市场、定时任务、多账户隔离<br>③ **企业场景验证** — 多账户凭证隔离、反应事件监听等生产级特性 | 对比：LobsterAI 追赶中（网易小蜜蜂、火山引擎），PicoClaw 通道数量接近但稳定性落后 |
| **当前短板** | ① **安装体验回归** — v2026.2.26 安全验证阻断 pnpm 全局安装<br>② **架构重量** — 1.5GB RAM 占用 vs ZeroClaw <5MB，引发迁移讨论（ZeroClaw #88）<br>③ **审查效率** — 364 个待合并 PR 反映治理带宽瓶颈 | 对比：IronClaw 测试体系更成熟（1,724 测试），ZeptoClaw MCP 双模式传输领先 |
| **差异化锚点** | **"企业级多通道 AI 操作平台"** — 强调 IM 深度集成、团队协作、可视化控制 | 非竞品：ZeroClaw（个人轻量）、NanoBot（学术/Windows 原生）、IronClaw（WASM 安全沙箱） |

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与进展 |
|:---|:---|:---|
| **MCP 协议集成** | ZeptoClaw ✅、PicoClaw（#282）、NanoBot、OpenClaw | ZeptoClaw 今日完成 stdio 传输层里程碑；PicoClaw PR #282 待审；社区共识：MCP 是工具生态标准化的关键基础设施 |
| **企业 IM 深度适配** | OpenClaw、LobsterAI、NanoBot、PicoClaw、ZeroClaw、NanoClaw | **飞书**：反应事件（OpenClaw #28529）、流式卡片（NanoBot #1080）、多账户隔离（OpenClaw #16284）<br>**钉钉/企业微信**：低门槛接入诉求强烈（LobsterAI #102、PicoClaw #872）<br>**Telegram**：语音转录（ZeroClaw #1469）、话题支持（NanoClaw #564）、端点热切换（ZeptoClaw #193） |
| **安全架构加固** | OpenClaw、IronClaw、TinyClaw、PicoClaw | **密钥加密**（OpenClaw #7916，IronClaw 已支持环境变量隔离）<br>**技能安装安全扫描**（OpenClaw #18677、#25480 Guardian 层）<br>**插件沙箱/超时控制**（TinyClaw #149、#150） |
| **Windows 原生支持** | ZeroClaw、NanoBot、LobsterAI、OpenClaw | ZeroClaw/NanoBot 将 Windows 兼容性作为核心差异化；OpenClaw 因 WSL 依赖被对比为"二等公民"（#1265） |
| **本地模型/Ollama 优化** | LobsterAI、IronClaw、PicoClaw、OpenClaw | LobsterAI #149 今日大幅优化模型 ID 歧义；IronClaw #400 模型名截断待修复；核心痛点：配置门槛、超时处理、上下文窗口检测 |
| **会话隔离/多租户** | TinyClaw（#144）、NanoBot（#1302）、OpenClaw | 从个人工具向团队部署演进的关键需求：Per-thread 上下文隔离、工作区沙箱、配置热重载 |

---

## 5. 差异化定位分析

| 项目 | 核心功能侧重 | 目标用户画像 | 技术架构特征 |
|:---|:---|:---|:---|
| **OpenClaw** | 企业多通道协作、技能市场、可视化控制 | 技术团队、DevOps、需要 IM 深度集成的企业 | Node/TS，插件化，Control UI，重量型全功能平台 |
| **ZeroClaw** | 极致资源效率、Rust 性能、快速启动 | 边缘计算、资源受限环境、对 1.5GB→5MB 敏感的用户 | Rust，零运行时依赖，轻量二进制，审查瓶颈待解 |
| **LobsterAI** | 国产模型适配（通义/火山/MiniMax）、定时任务、个人自动化 | 中国开发者、阿里云生态用户、IFTTT 替代需求 | Electron 桌面应用，国产云厂商优先集成，迭代极快 |
| **NanoBot** | Windows 原生、学术研究、多 Agent 编排 | Windows 开发者、高校研究团队、需要开箱即用的个人用户 | Python，HKUDS 学术背景，Windows 兼容性为核心卖点 |
| **IronClaw** | WASM 安全沙箱、可编程工具调用（PTC）、NEAR AI 生态 | 安全敏感场景、区块链/Web3 开发者、需要审计追踪的企业 | Rust，WASM 通道隔离，libSQL 持久化，测试驱动 |
| **PicoClaw** | 多通道覆盖（追求数量）、SOUL.md 记忆系统、自托管 | 极客用户、隐私优先者（Signal 需求 #41）、多 IM 重度用户 | Go，通道系统重构中（#621），内存/上下文压缩攻坚 |
| **ZeptoClaw** | MCP 基础设施、传输层抽象、开发者工具链 | AI 基础设施开发者、需要自定义工具集成的工程师 | Rust，McpTransport trait 架构，HTTP/stdio 双模式 |
| **TinyClaw** | 插件系统（Events+Hooks）、3D avatar 可视化、快速原型 | 创意开发者、需要可视化反馈的交互场景 | 早期 TypeScript，插件生态起步，monorepo 转型中 |
| **NanoClaw** | WhatsApp 中心（向多通道转型）、语音安全、宗教/文化模式 | WhatsApp 重度用户、特定文化场景需求者 | TypeScript，#500 架构重构关键期，Signal 作为隐私替代 |
| **EasyClaw** | 简化配置、百炼/阿里云 Coding Plan 集成 | 国内初级开发者、寻求 OpenClaw 轻量替代的用户 | 低活跃度，版本透明度不足，生态位模糊 |

---

## 6. 社区热度与成熟度分层

```
【快速迭代期】功能扩张为主，合并率高，新特性密集落地
├── LobsterAI（v0.1.22，合并率 76%，国产模型适配激进）
├── ZeroClaw（Issue 关闭率 82%，PR 审查瓶颈，CJK 稳定性攻坚）
└── TinyClaw（插件系统里程碑，企业需求浮现）

【功能扩张期】高活跃但积压严重，架构债务累积
├── PicoClaw（91 PR/日，57 待合并，通道数量竞赛）
└── NanoBot（72 PR/日，40 待合并，多 Agent 架构待官方回应）

【质量巩固期】审查节奏健康，测试/稳定性优先
├── IronClaw（48% 合并率，1,724 测试里程碑，PTC 性能优化）
└── OpenClaw（27% 合并率，pnpm 回归修复，安全验证回调）

【架构转型期】核心重构进行中，生态扩展受阻塞
└── NanoClaw（#500 可插拔通道重构，Signal/WhatsApp 并行，29 PR 待审）

【基础设施深耕期】聚焦单一技术点，稳健推进
└── ZeptoClaw（MCP stdio 里程碑，低活跃但高完成度）

【稳定观察期】维护模式，功能性停滞
└── EasyClaw（连续文档版本，无代码提交，透明度风险）
```

---

## 7. 值得关注的趋势信号

| 趋势信号 | 数据支撑 | 对开发者的参考价值 |
|:---|:---|:---|
| **"内存效率"成为新竞争维度** | ZeroClaw #88 获 20 👍，"1.5GB→5MB"成为迁移核心动力；OpenClaw 被对比为"太重" | 资源受限场景（边缘、IoT、多实例部署）需优先考虑 Rust/Go 技术栈；Electron/Node 架构需论证必要性 |
| **MCP 协议成为工具生态事实标准** | 5+ 项目推进，ZeptoClaw 完成双模式传输，PicoClaw #282 待审 | 新工具集成应优先实现 MCP 服务端/客户端，而非定制协议；stdio 模式对本地 CLI 工具生态关键 |
| **Windows 原生支持从"兼容"升级为"差异化"** | NanoBot #1265 明确对比 OpenClaw WSL 依赖；ZeroClaw Windows 修复密集 | 企业 Windows 环境部署是未被满足的大市场；WSL 依赖成为负面体验标签 |
| **"实时模型切换"揭示运维体验缺口** | ZeptoClaw #193、NanoBot #1292 同期涌现，明确对标 OpenClaw `/models` 设计 | 生产环境需要运行时弹性，而非静态配置；限流/故障场景下的降级策略成为刚需 |
| **会话隔离需求标志着"个人→团队"跃迁** | TinyClaw #144、NanoBot #1302 企业级需求浮现 | 多租户架构需前置设计：thread/topic 级别的上下文隔离、工作区沙箱、配置热重载 |
| **CJK/中文场景成为稳定性试金石** | ZeroClaw UTF-8 截断 Panic、PowerShell 编码、Agent 意图识别失效形成问题集群 | 国际化测试不能仅依赖 ASCII 数据；中文语境下的工具调用、意图识别需专项优化 |
| **安全架构从"功能"变为"准入门槛"** | OpenClaw #18677 技能扫描、IronClaw PTC 安全审计、TinyClaw 插件门禁堆叠 PR | 企业采购将要求可证明的安全模型：密钥加密、技能签名、沙箱超时、操作审计 |

---

**报告生成时间**：2026-02-28  
**分析覆盖**：10 个活跃开源项目，2,847 条 GitHub 活动数据

---

## 同赛道项目详细报告

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 | 2026-02-28

## 1. 今日速览

ZeroClaw 今日呈现**高活跃度、高吞吐**的开发态势：24小时内关闭41个Issues（82%关闭率），但PR合并率仅6%（3/50），显示团队聚焦于Issue清理而代码审查存在积压。社区讨论热度集中在**多用户TOTP安全架构**、**Windows平台编译修复**及**中文/CJK场景稳定性**三大主题。值得注意的是，ROS2集成、GitHub原生通道等机器人/开发者场景需求持续涌现，项目正从"单一操作员工具"向"企业级多租户平台"演进。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的关键 PR

| PR | 作者 | 核心贡献 | 项目推进意义 |
|:---|:---|:---|:---|
| [#2145](https://github.com/zeroclaw-labs/zeroclaw/pull/2145) | @theonlyhennygod | **GitHub Copilot 入驻交互式引导向导** | 补齐主流AI供应商覆盖，降低新用户配置门槛 |
| [#2143](https://github.com/zeroclaw-labs/zeroclaw/pull/2143) | @theonlyhennygod | 硬件定位文案更新："$10硬件"→"任意硬件" | 消除市场误解，强化跨平台轻量化定位 |
| [#2140](https://github.com/zeroclaw-labs/zeroclaw/pull/2140) | @theonlyhennygod | README精简，文档迁移至专用系统 | 改善首次访问体验，建立可维护的文档架构 |

**整体进展评估**：今日合并以**用户体验优化**为主，核心功能（如Matrix通道、经济代理系统、WASM插件）仍处PR队列待审，代码审查带宽是主要瓶颈。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues

| Issue | 评论 | 核心诉求 | 背后信号 |
|:---|:---:|:---|:---|
| [#1856](https://github.com/zeroclaw-labs/zeroclaw/issues/1856) | 7 | 多用户TOTP注册与RBAC权限 | **企业共享环境需求爆发**：从"单操作员"向"团队级"安全模型演进 |
| [#2055](https://github.com/zeroclaw-labs/zeroclaw/issues/2055) | 6 | `channel-matrix`特性编译失败 | Matrix协议支持刚上线即遇稳定性问题，功能标志系统需加固 |
| [#88](https://github.com/zeroclaw-labs/zeroclaw/issues/88) | 6 | OpenClaw→ZeroClaw迁移功能清单 | **生产级用户入场**：RAM占用优化（1.5GB→<5MB）是核心迁移动力，但功能完整性存疑 |
| [#1469](https://github.com/zeroclaw-labs/zeroclaw/issues/1469) | 6 | Telegram语音转录不触发 | 多媒体处理通道的异步事件可靠性问题 |

### 👍 社区反应最强烈

- [#527](https://github.com/zeroclaw-labs/zeroclaw/issues/527) **25👍** - 官方安全声明与反欺诈预警（@chumyin 发布）
- [#88](https://github.com/zeroclaw-labs/zeroclaw/issues/88) **20👍** - 迁移阻塞清单（持续获得生产用户关注）

---

## 5. Bug 与稳定性

### 按严重程度排列

| 等级 | Issue | 描述 | 状态 | Fix PR |
|:---:|:---|:---|:---:|:---:|
| **S0** | [#2055](https://github.com/zeroclaw-labs/zeroclaw/issues/2055) | `channel-matrix`特性编译失败 | ✅ 已关闭 | 已修复 |
| **S0** | [#2066](https://github.com/zeroclaw-labs/zeroclaw/issues/2066) | Docker构建失败：模板文件缺失 | ✅ 已关闭 | 已修复 |
| **S0** | [#2083](https://github.com/zeroclaw-labs/zeroclaw/issues/2083) | Debian 12 glibc版本不兼容 | ✅ 已关闭 | 需验证 |
| **S1** | [#2072](https://github.com/zeroclaw-labs/zeroclaw/issues/2072) | Windows网页Agent仅返回标签不执行操作 | ✅ 已关闭 | [#2056](https://github.com/zeroclaw-labs/zeroclaw/pull/2056) 待审 |
| **S1** | [#2060](https://github.com/zeroclaw-labs/zeroclaw/issues/2060) | UTF-8多字节字符截断Panic | ✅ 已关闭 | [#2075](https://github.com/zeroclaw-labs/zeroclaw/pull/2075) 待审 |
| **S1** | [#2062](https://github.com/zeroclaw-labs/zeroclaw/issues/2062) | Docker `--locked`标志与自定义特性冲突 | ✅ 已关闭 | 已修复 |
| **S1** | [#2105](https://github.com/zeroclaw-labs/zeroclaw/issues/2105) | Agent承诺执行但实际停止 | ✅ 已关闭 | [#2146](https://github.com/zeroclaw-labs/zeroclaw/pull/2146) 待审 |
| **S2** | [#2107](https://github.com/zeroclaw-labs/zeroclaw/issues/2107) | Anthropic模型视觉检测失效 | ✅ 已关闭 | 已修复 |
| **S2** | [#2041](https://github.com/zeroclaw-labs/zeroclaw/issues/2041) / [#2032](https://github.com/zeroclaw-labs/zeroclaw/issues/2032) | Windows编译失败（重复报告） | ✅ 已关闭 | [#2056](https://github.com/zeroclaw-labs/zeroclaw/pull/2056) 待审 |
| **S2** | [#2048](https://github.com/zeroclaw-labs/zeroclaw/issues/2048) | 飞书WebSocket连接正常但消息无响应 | ✅ 已关闭 | 已修复 |

**关键模式**：**CJK/中文场景稳定性**成为今日焦点——UTF-8截断Panic、PowerShell中文编码、Agent意图识别失效（中文语境下"承诺执行但停止"）形成问题集群，反映国际化测试覆盖不足。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 成熟度 | 纳入可能性 |
|:---|:---|:---:|:---:|
| **GitHub原生通道** | [#2079](https://github.com/zeroclaw-labs/zeroclaw/issues/2079) | 需求阶段 | ⭐⭐⭐⭐⭐ 高（与项目定位高度契合） |
| **ROS2集成架构** | [#1835](https://github.com/zeroclaw-labs/zeroclaw/issues/1835) | 讨论阶段 | ⭐⭐⭐⭐☆ 高（机器人场景明确） |
| **经济代理系统（Phase 1）** | [#2134](https://github.com/zeroclaw-labs/zeroclaw/pull/2134) | PR待审 | ⭐⭐⭐⭐☆ 高（架构级特性） |
| **WASM插件基础** | [#1363](https://github.com/zeroclaw-labs/zeroclaw/pull/1363) | PR待审（2月22日） | ⭐⭐⭐⭐☆ 高（扩展性基础设施） |
| **Matrix通道Cron投递** | [#2035](https://github.com/zeroclaw-labs/zeroclaw/pull/2035) | PR待审 | ⭐⭐⭐⭐☆ 高（补全通道矩阵） |
| **飞书原生Cron投递** | [#1715](https://github.com/zeroclaw-labs/zeroclaw/issues/1715) | 需求阶段 | ⭐⭐⭐☆☆ 中（企业用户诉求） |
| **Perplexity过滤（GCG攻击检测）** | [#1811](https://github.com/zeroclaw-labs/zeroclaw/issues/1811) | 需求阶段 | ⭐⭐⭐☆☆ 中（安全增强） |
| **Slack速率限制优化** | [#1839](https://github.com/zeroclaw-labs/zeroclaw/issues/1839) | 需求阶段 | ⭐⭐⭐☆☆ 中（可靠性优化） |

**路线图信号**：企业级特性（RBAC、审计、经济追踪）与开发者体验（GitHub通道、Copilot支持）形成双轮驱动，**"AI原生DevOps助手"**定位清晰。

---

## 7. 用户反馈摘要

### ✅ 满意点
- **资源效率**："[OpenClaw] 1.5GB RAM → ZeroClaw <5MB"（[#88](https://github.com/zeroclaw-labs/zeroclaw/issues/88)）——核心差异化价值获验证
- **响应速度**：Issue关闭率高，社区响应积极

### ❌ 痛点
| 痛点 | 来源 | 影响 |
|:---|:---|:---|
| **Windows"二等公民"体验** | [#2041](https://github.com/zeroclaw-labs/zeroclaw/issues/2041), [#2032](https://github.com/zeroclaw-labs/zeroclaw/issues/2032), [#2072](https://github.com/zeroclaw-labs/zeroclaw/issues/2072) | 阻碍企业Windows环境部署 |
| **glibc版本激进** | [#2084](https://github.com/zeroclaw-labs/zeroclaw/issues/2084), [#2083](https://github.com/zeroclaw-labs/zeroclaw/issues/2083) | Ubuntu 22.04/Debian 12无法运行，与"轻量"定位矛盾 |
| **中文场景可靠性** | [#2060](https://github.com/zeroclaw-labs/zeroclaw/issues/2060), [#2105](https://github.com/zeroclaw-labs/zeroclaw/issues/2105), [#2146](https://github.com/zeroclaw-labs/zeroclaw/pull/2146) | CJK用户生产环境阻塞 |
| **激活系统困惑** | [#2022](https://github.com/zeroclaw-labs/zeroclaw/issues/2022) | 开源项目出现"激活"提示引发信任疑虑 |

### 🎯 使用场景
- **机器人/ROS2集成**（[#1835](https://github.com/zeroclaw-labs/zeroclaw/issues/1835)）：边缘计算资源受限环境
- **多AI子代理编排**（[#88](https://github.com/zeroclaw-labs/zeroclaw/issues/88)）：Claude Code会话管理
- **企业IM集成**：飞书、钉钉、QQ群聊（中国市场需求显著）

---

## 8. 待处理积压

### ⚠️ 需维护者关注

| 类型 | 条目 | 滞留时间 | 风险 |
|:---|:---|:---:|:---|
| **PR** | [#1363](https://github.com/zeroclaw-labs/zeroclaw/pull/1363) WASM插件基础 | 6天 | 架构级特性，阻塞扩展生态 |
| **PR** | [#2134](https://github.com/zeroclaw-labs/zeroclaw/pull/2134) 经济代理系统 | 1天 | XL体量，需深度架构审查 |
| **PR** | [#2139](https://github.com/zeroclaw-labs/zeroclaw/pull/2139) Codex传输层优化 | 1天 | 高风险，影响核心稳定性 |
| **Issue** | [#88](https://github.com/zeroclaw-labs/zeroclaw/issues/88) 迁移阻塞清单 | 13天 | 20👍生产用户，需官方路线图回应 |
| **Issue** | [#2079](https://github.com/zeroclaw-labs/zeroclaw/issues/2079) GitHub原生通道 | 1天 | 高价值特性，建议快速评估可行性 |

**建议行动**：优先审查 [#2056](https://github.com/zeroclaw-labs/zeroclaw/pull/2056)（Windows修复，解阻塞S1级问题）→ [#2075](https://github.com/zeroclaw-labs/zeroclaw/pull/2075)（UTF-8安全截断）→ [#1363](https://github.com/zeroclaw-labs/zeroclaw/pull/1363)（插件基础设施）。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 | 2026-02-28

> **项目地址**: [gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)  
> **项目定位**: AI 智能体与个人 AI 助手工具

---

## 1. 今日速览

EasyClaw 今日活跃度**中等偏低**。核心动态为连续发布两个补丁版本（v1.5.11、v1.5.12），显示维护者正在快速迭代修复。社区侧仅有 1 条 Issue 关闭，无新增 PR 活动，整体处于**版本发布后的稳定观察期**。值得注意的是，连续两个小版本发布可能暗示 v1.5.10 存在紧急问题需要热修复，建议关注版本差异。

---

## 2. 版本发布

### 🔖 v1.5.12 & v1.5.11 连续发布

| 版本 | 发布时间 | 说明 |
|:---|:---|:---|
| [v1.5.12](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.5.12) | 2026-02-27 | 安装文档更新（macOS Gatekeeper 指引） |
| [v1.5.11](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.5.11) | 2026-02-27 | 同上 |

**更新内容分析**：
- 两个版本发布说明**完全一致**，均为 macOS 安装故障排查文档
- 未提供具体代码变更日志（CHANGELOG 缺失）
- **推测**：v1.5.11 可能存在发布问题（如二进制文件上传失败），故紧急推送 v1.5.12

**⚠️ 关键缺失**：版本间实际代码差异未公开，用户无法判断是否需要升级。建议维护者补充：
- 具体修复的 Bug 列表
- 各版本二进制文件校验值（SHA256）

---

## 3. 项目进展

**今日无代码合并活动**（PR: 0 合并 / 0 关闭）

| 指标 | 数值 | 状态 |
|:---|:---|:---|
| 待合并 PR | 0 | 🟢 无积压 |
| 今日合并 | 0 | ⚪ 无进展 |
| 代码提交活跃度 | 低 | 仅版本标签推送 |

**评估**：项目今日**未产生功能性进展**，处于文档维护与版本管理阶段。

---

## 4. 社区热点

### 🔥 唯一活跃 Issue：[#2](https://github.com/gaoyangz77/easyclaw/issues/2) 模型列表同步问题

| 属性 | 详情 |
|:---|:---|
| 状态 | ✅ **已关闭** |
| 作者 | @slowayear |
| 评论数 | 3 |
| 涉及版本 | v1.5.10 (Windows) |
| 核心诉求 | 百炼 Coding Plan 接入后，客户端模型列表与官方支持列表不匹配 |

**问题本质**：第三方 AI 平台（百炼/阿里云）的模型可用性数据与 EasyClaw 客户端缓存/硬编码列表存在同步延迟或过滤逻辑差异。

**社区信号**：
- 用户期望**实时同步**官方模型列表，而非手动更新客户端
- 企业/开发者场景下，模型可用性直接影响工作流（Coding Plan 为付费功能）

---

## 5. Bug 与稳定性

| 严重程度 | 问题 | 状态 | 追踪 |
|:---|:---|:---|:---|
| 🔶 **中** | 百炼 Coding Plan 模型列表不匹配 | ✅ **已修复**（v1.5.11+） | [#2](https://github.com/gaoyangz77/easyclaw/issues/2) |
| 🔷 **低** | macOS Gatekeeper 误报"文件已损坏" | 📝 **文档缓解** | [v1.5.12 发布说明](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.5.12) |

**稳定性评估**：
- 无崩溃或数据丢失报告
- macOS 签名问题为**长期已知限制**，文档缓解非根治方案，建议推进 Apple Developer 签名

---

## 6. 功能请求与路线图信号

**今日无新增功能请求**（Issues: 0 新开）

**从 #2 衍生的潜在需求**：
| 需求 | 用户场景 | 实现难度 | 优先级信号 |
|:---|:---|:---|:---|
| 动态模型列表刷新 | 多平台 API 密钥切换时自动同步 | 中 | ⭐⭐⭐ 高（付费用户痛点）|
| 平台官方模型状态指示 | 区分"可用/限流/deprecated" | 低 | ⭐⭐⭐ 高 |
| 企业版模型白名单 | 团队统一管理可用模型 | 中 | ⭐⭐ 中（B端需求）|

---

## 7. 用户反馈摘要

### 痛点提炼（来自 [#2](https://github.com/gaoyangz77/easyclaw/issues/2) 讨论）

| 维度 | 具体内容 |
|:---|:---|
| **功能预期落差** | 用户订阅百炼 Coding Plan 后，期望立即看到全部官方支持模型，实际列表缺失导致"付费功能不可用"的感知 |
| **信息不透明** | 无法判断是客户端缓存问题、平台 API 限制，还是配置错误 |
| **版本迭代感知** | 用户主动跟进至 v1.5.10 仍遇问题，显示补丁版本沟通不足 |

### 满意度信号
- ✅ 维护者响应速度较快（24 小时内关闭）
- ❌ 关闭 Issue 未说明具体修复版本，用户需自行验证

---

## 8. 待处理积压

| 类型 | 描述 | 风险 | 建议行动 |
|:---|:---|:---|:---|
| **技术债务** | 缺乏公开 CHANGELOG | 用户升级决策困难，信任损耗 | 建立自动化变更日志生成 |
| **平台适配** | macOS 未签名应用持续引发支持负担 | 新用户流失，口碑影响 | 申请 Apple Developer 账号（$99/年）|
| **文档缺口** | 版本差异说明缺失（v1.5.11 vs v1.5.12） | 社区困惑 | 补充 release notes 或撤回冗余版本 |

---

## 健康度评分

| 维度 | 评分 | 说明 |
|:---|:---|:---|
| 发布节奏 | ⭐⭐⭐⭐☆ | 快速迭代，但需提升透明度 |
| 社区响应 | ⭐⭐⭐⭐☆ | Issue 关闭及时，沟通细节待加强 |
| 代码活跃度 | ⭐⭐☆☆☆ | 今日无功能性提交 |
| 文档完整性 | ⭐⭐⭐☆☆ | 安装指引有改善，变更日志缺失 |
| **综合** | **3.0/5** | 稳定维护期，需警惕"发布疲劳" |

---

*日报生成时间：2026-02-28*  
*数据来源：GitHub API / 公开 Release / Issue 追踪*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 | 2026-02-28

---

## 1. 今日速览

LobsterAI 今日保持**高频迭代节奏**，24小时内处理 **28 条 Issues**（关闭 7 条）和 **21 条 PR**（合并 16 条），并发布 **v0.1.22** 版本。社区活跃度极高，核心痛点集中在 **Ollama 本地模型兼容性**、**Windows 系统适配** 及 **IM 机器人集成体验** 三大领域。开发团队响应迅速，当日即合并多项关键修复，但 Ollama 连接问题、飞书/钉钉企业认证门槛、Mac M1 安装失败等问题仍待彻底解决。项目整体处于**快速功能扩展期**，稳定性修复与多平台适配是近期主旋律。

---

## 2. 版本发布

### v0.1.22 已发布
| 属性 | 详情 |
|:---|:---|
| **版本号** | v0.1.22 |
| **发布日期** | 2026-02-27 |
| **Release 链接** | https://github.com/netease-youdao/LobsterAI/releases/tag/v0.1.22 |

#### 核心更新
| 功能 | 说明 | 关联 PR |
|:---|:---|:---|
| **应用自动更新** | 支持客户端检测并安装新版本，解决此前"必须手动卸载旧版"的痛点 | [#154](https://github.com/netease-youdao/LobsterAI/pull/154), [#155](https://github.com/netease-youdao/LobsterAI/pull/155) |
| **定时任务 IM 通知增强** | 支持富媒体发送（图片/文件等），通知目标持久化存储 | [#147](https://github.com/netease-youdao/LobsterAI/pull/147) |
| **关于页面** | 新增应用信息展示页面 | [#159](https://github.com/netease-youdao/LobsterAI/pull/159) |

#### 迁移注意事项
- **覆盖安装问题**：[#169](https://github.com/netease-youdao/LobsterAI/issues/169) 显示部分用户仍需先卸载旧版才能安装，自动更新机制或存在边界 case
- **配置丢失风险**：[#163](https://github.com/netease-youdao/LobsterAI/issues/163) 报告更新后飞书绑定信息被清空，建议用户升级前备份配置

---

## 3. 项目进展

### 今日合并的关键 PR（16 条）

| PR | 作者 | 核心贡献 | 影响评估 |
|:---|:---|:---|:---|
| [#149](https://github.com/netease-youdao/LobsterAI/pull/149) | @btc69m979y-dotcom | **Ollama 体验大优化**：修复模型编辑表单歧义（"模型名称"→实际模型ID如`qwen3:8b`），默认 baseUrl 改为 `/v1` 兼容 OpenAI 格式 | ⭐⭐⭐ 解决社区最痛痛点 |
| [#172](https://github.com/netease-youdao/LobsterAI/pull/172) | @sysusugan | **Antigravity OAuth 集成**：新增 OAuth 子系统，支持第三方登录与模型同步 | ⭐⭐⭐ 扩展生态接入能力 |
| [#162](https://github.com/netease-youdao/LobsterAI/pull/162) | @Doge2077 | **多自定义模型配置**：支持配置多个 Custom 提供商，避免同名模型冲突 | ⭐⭐⭐ 企业私有化部署友好 |
| [#158](https://github.com/netease-youdao/LobsterAI/pull/158) | @renhongchao | **网易小蜜蜂接入**：新增 XiaomifengGateway，支持网易小蜜蜂个人数字助理交互 | ⭐⭐⭐ 网易生态内打通 |
| [#152](https://github.com/netease-youdao/LobsterAI/pull/152) | @liugang519 | **定时任务 Chat 管理**：新增查看/修改/删除/启停任务的 HTTP API 与 Skill 脚本 | ⭐⭐ 提升任务管理灵活性 |
| [#128](https://github.com/netease-youdao/LobsterAI/pull/128) | @Aoxiang-001 | **云信 NIM 增强**：富媒体消息（图片/音频/视频/文件）、配置热更新、账号白名单 | ⭐⭐ IM 能力全面升级 |
| [#160](https://github.com/netease-youdao/LobsterAI/pull/160) | @fisherdaddy | **修复 WebSearch 中文乱码** | ⭐⭐ 稳定性修复 |
| [#167](https://github.com/netease-youdao/LobsterAI/pull/167) | @fisherdaddy | **修复自定义邮箱高级设置 Bug** | ⭐⭐ 邮箱功能可用性提升 |
| [#132](https://github.com/netease-youdao/LobsterAI/pull/132) | @btc69m979y-dotcom | **Moonshot Coding Plan + 智谱修复**：支持 Kimi 编程模式，修复智谱 Anthropic 格式兼容 | ⭐⭐ 多模型提供商支持 |
| [#107](https://github.com/netease-youdao/LobsterAI/pull/107) | @btc69m979y-dotcom | **火山引擎接入**：支持 Anthropic/OpenAI 双协议，含 Coding Plan 模式 | ⭐⭐ 国产云厂商覆盖 |
| [#115](https://github.com/netease-youdao/LobsterAI/pull/115) | @btc69m979y-dotcom | **修复 Windows 系统命令找不到**：确保 System32 目录和环境变量传递 | ⭐⭐ Windows 兼容性关键修复 |
| [#104](https://github.com/netease-youdao/LobsterAI/pull/104) | @btc69m979y-dotcom | **修复 MiniMax API 兼容**：合并多 system 消息，修复模型识别 | ⭐⭐ 第三方 API 稳定性 |
| [#157](https://github.com/netease-youdao/LobsterAI/pull/157) | @btc69m979y-dotcom | **修复 Moonshot Coding Plan 端点切换** | ⭐⭐ 功能完整性 |
| [#103](https://github.com/netease-youdao/LobsterAI/pull/103) | @btc69m979y-dotcom | **修复 Windows 文件选择器层级问题** | ⭐ 体验优化 |
| [#154](https://github.com/netease-youdao/LobsterAI/pull/154), [#155](https://github.com/netease-youdao/LobsterAI/pull/155) | @liuzhq1986 | **应用自动更新功能** | ⭐⭐⭐ 版本管理基础设施 |

**整体进展评估**：今日合并 PR 覆盖 **6 大维度**——本地模型体验（Ollama）、企业生态接入（小蜜蜂、Antigravity）、多模型提供商（火山、MiniMax、Moonshot、智谱）、IM 能力（NIM 富媒体）、定时任务管理、Windows 兼容性。项目正从"功能可用"向"体验完善"快速演进。

---

## 4. 社区热点

### 讨论最活跃的 Issues（按评论数排序）

| 排名 | Issue | 评论 | 核心诉求 | 状态 |
|:---|:---|:---:|:---|:---|
| 1 | [#30](https://github.com/netease-youdao/LobsterAI/issues/30) Ollama 模型 ID 误导性 | 6 | **文档/UX 问题**：用户困惑于"模型名称"必须完全匹配 Ollama 实际模型名（如`qwen3:8b`）才能连接 | ✅ 已关闭 |
| 2 | [#89](https://github.com/netease-youdao/LobsterAI/issues/89) 邮箱添加失败 | 5 | **功能可用性**：163/QQ 邮箱 IMAP/SMTP 配置后测试失败，且功能定位不清晰（技能用 vs IM 聊天用） | 🔴 开放 |
| 3 | [#102](https://github.com/netease-youdao/LobsterAI/issues/102) 飞书/钉钉需企业审核，求低门槛 IM 方案 | 3 | **准入门槛**：个人开发者无法快速接入飞书/钉钉机器人，呼吁 QQ 机器人等替代方案 | 🔴 开放 |
| 4 | [#13](https://github.com/netease-youdao/LobsterAI/issues/13) Ollama 无法使用 | 4 | **基础功能阻断**：配置测试成功但保存后提示无 API | ✅ 已关闭 |
| 5 | [#18](https://github.com/netease-youdao/LobsterAI/issues/18) SiliconCloud 接口崩溃 | 3 | **第三方 API 兼容**：Cowork 引擎进程退出 | ✅ 已关闭 |

### 背后诉求分析
- **Ollama 本地部署是核心场景**：3 个高活跃 Issue 均涉及 Ollama，用户强烈希望降低 Token 成本，但配置门槛和稳定性问题持续困扰
- **IM 接入的"最后一公里"**：企业 IM 需要组织审核，个人开发者被挡在门外，社区渴望更开放的接入方式
- **配置即用的体验期待**：用户期望"填完参数就能用"，而非深入理解模型 ID、API 格式等底层概念

---

## 5. Bug 与稳定性

### 今日报告的 Bug（按严重程度排序）

| 严重程度 | Issue | 描述 | 复现环境 | Fix PR |
|:---|:---|:---|:---|:---:|
| 🔴 **P0-阻断** | [#153](https://github.com/netease-youdao/LobsterAI/issues/153) | **MacBook Pro M1 安装 ARM64 版后无法打开** | MacBook Pro (13-inch, M1, 2020) | ❌ 无 |
| 🔴 **P0-阻断** | [#144](https://github.com/netease-youdao/LobsterAI/issues/144) | **Win11 报错 404 Not found，完全无法使用** | Windows 11 | ❌ 无 |
| 🟡 **P1-严重** | [#164](https://github.com/netease-youdao/LobsterAI/issues/164) | **Windows 下 bash 命令 GBK 编码乱码，AI 无法推进工作** | Windows + 中文系统 | ❌ 无（建议用 PowerShell） |
| 🟡 **P1-严重** | [#150](https://github.com/netease-youdao/LobsterAI/issues/150) | **Ollama 本地部署无法使用**（v0.1.22 仍有问题） | 通用 | [#149](https://github.com/netease-youdao/LobsterAI/pull/149) 部分修复 |
| 🟡 **P1-严重** | [#174](https://github.com/netease-youdao/LobsterAI/issues/174) | **Ollama 长时间无响应/Request timed out**（0.1.17-0.1.22 均未成功） | 通用 | ❌ 无 |
| 🟡 **P1-严重** | [#175](https://github.com/netease-youdao/LobsterAI/issues/175) | **私有云模型 Max_tokens 参数报错** | DeepSeek/Qwen3 私有化部署 | ❌ 无 |
| 🟡 **P1-严重** | [#173](https://github.com/netease-youdao/LobsterAI/issues/173) | **飞书 IM 消息阻塞堆积，需重启恢复** | 飞书集成 | ❌ 无 |
| 🟡 **P1-严重** | [#163](https://github.com/netease-youdao/LobsterAI/issues/163) | **更新后飞书绑定信息丢失** | v0.1.22 升级 | ❌ 无 |
| 🟡 **P1-严重** | [#165](https://github.com/netease-youdao/LobsterAI/issues/165) | **飞书语音消息（voice）无法接收** | 飞书集成 | ❌ 无 |
| 🟡 **P1-严重** | [#166](https://github.com/netease-youdao/LobsterAI/issues/166) | **Lobster 无法识别用户来源（客户端 vs 飞书）** | 多通道场景 | ❌ 无 |
| 🟢 **P2-一般** | [#169](https://github.com/netease-youdao/LobsterAI/issues/169) | **无法实现覆盖安装，需先卸载** | Windows | ✅ [#154](https://github.com/netease-youdao/LobsterAI/pull/154), [#155](https://github.com/netease-youdao/LobsterAI/pull/155) |
| 🟢 **P2-一般** | [#146](https://github.com/netease-youdao/LobsterAI/issues/146) | **Windows 内置 mail 技能调用失败** | Windows 11, v0.1.21 | ❌ 无 |
| 🟢 **P2-一般** | [#148](https://github.com/netease-youdao/LobsterAI/issues/148) | **Midscene 技能执行报错（截图失败）** | Windows + 本地沙箱 | ❌ 无 |
| 🟢 **P2-一般** | [#151](https://github.com/netease-youdao/LobsterAI/issues/151) | **无法给 Telegram bot 发送图片/文件** | Telegram 集成 | ❌ 无 |
| 🟢 **P2-一般** | [#156](https://github.com/netease-youdao/LobsterAI/issues/156) | **Telegram 沟通时没有 typing 状态** | Telegram 集成 | ❌ 无 |
| 🟢 **P2-一般** | [#161](https://github.com/netease-youdao/LobsterAI/issues/161) | **无法通过会话更改工作目录** | Telegram bot | ❌ 无 |

### 回归风险警示
- **Ollama 问题反复**：[#30](https://github.com/netease-youdao/LobsterAI/issues/30), [#13](https://github.com/netease-youdao/LobsterAI/issues/13) 关闭后，[#150](https://github.com/netease-youdao/LobsterAI/issues/150), [#174](https://github.com/netease-youdao/LobsterAI/issues/174) 报告新问题，说明修复未完全覆盖场景
- **飞书集成稳定性**：消息阻塞、语音不支持、上下文识别失败等多点问题暴露，IM 通道健壮性需加强

---

## 6. 功能请求与路线图信号

### 今日新增功能请求

| Issue | 需求 | 用户场景 | 可行性评估 |
|:---|:---|:---|:---|
| [#176](https://github.com/netease-youdao/LobsterAI/issues/176) | **任务记录分组、笔记功能、Skill 内置编辑、TODO 列表** | 任务管理、知识沉淀、工作流闭环 | ⭐⭐⭐ 高优先级，与产品定位契合 |
| [#168](https://github.com/netease-youdao/LobsterAI/issues/168) | **内置强数学能力 Skill** | 科研、工程计算场景 | ⭐⭐ 中等，可依赖外部模型能力 |
| [#102](https://github.com/netease-youdao/LobsterAI/issues/102) | **QQ 机器人等低门槛 IM 接入** | 个人开发者绕过企业审核 | ⭐⭐⭐ 高优先级，社区呼声强烈 |
| [#161](https://github.com/netease-youdao/LobsterAI/issues/161) | **会话中动态更改工作目录** | Telegram 等 IM 场景灵活操作 | ⭐⭐ 中等，技术实现简单 |

### 路线图信号
- **近期可能落地**（已有 PR 或强关联）：
  - 多自定义模型配置 → [#162](https://github.com/netease-youdao/LobsterAI/pull/162) 已提交
  - 任务管理增强 → [#152](https://github.com/netease-youdao/LobsterAI/pull/152) 已合并基础能力
  - 小蜜蜂接入 → [#158](https://github.com/netease-youdao/LobsterAI/pull/158) 已提交
  
- **中期规划信号**：
  - 笔记功能、TODO 列表：与有道云笔记生态协同潜力大
  - 数学 Skill：可考虑集成 WolframAlpha 或专用数学模型

---

## 7. 用户反馈摘要

### 真实痛点（引用原声）

| 场景 | 用户原声 | 情感 |
|:---|:---|:---:|
| **Ollama 反复失败** | "从0.1.17版到现在0.1.22，就没有一次成功的" | 😠 挫败 |
| **更新丢配置** | "调教了七八个定时任务，全白调教" | 😠 愤怒 |
| **Windows 乱码** | "bash命令行返回大量乱码，以至于windows系统下AI模型无法推进工作" | 😠 阻断 |
| **企业 IM 门槛** | "飞书机器人和钉钉机器人都需要企业组织审核" | 😕 困惑 |
| **配置歧义** | "这ID必须得和模型名子一样，才能得到反回值" | 😕 困惑 |

### 满意点
- **迭代速度认可**："龙虾最近每天一个版本，看得出来在非常快速地解决问题"
- **功能潜力期待**：对定时任务、多 IM 接入等能力表示兴趣

### 关键使用场景
1. **低成本本地部署**：Ollama + 开源模型是高频诉求，用于降低 Agent Token 消耗
2. **个人自动化**：定时任务 + IM 通知，替代 IFTTT/快捷指令
3. **跨平台工作流**：Windows 开发环境 + 飞书/钉钉移动端的协同

---

## 8. 待处理积压

### 需维护者关注的重要 Issue

| Issue | 创建时间 | 问题 | 优先级 | 建议动作 |
|:---|:---:|:---|:---:|:---|
| [#153](https://github.com/netease-youdao/LobsterAI/issues/153) | 02-27 | Mac M1 安装失败 | 🔴 P0 | 验证 ARM64 构建签名/公证 |
| [#144](https://github.com/netease-youdao/LobsterAI/issues/144) | 02-27 | Win11 404 错误 | 🔴 P0 | 排查 Claude Code 进程启动失败 |
| [#174](https://github.com/netease-youdao/LobsterAI/issues/174) | 02-28 | Ollama 长期无响应 | 🟡 P1 | 复现并增加超时/重试机制 |
| [#102](

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 | 2026-02-28

## 1. 今日速览

ZeptoClaw 今日保持中等活跃度，核心维护者 @qhkm 推进了 MCP（Model Context Protocol）基础设施的关键里程碑——stdio 传输层实现已合并落地。社区贡献者 @superhero75 提出 Telegram 场景下的 LLM 端点动态切换需求，反映出多模型部署场景下的真实痛点。依赖维护 PR 仍在等待合并，供应链安全加固工作 pending。整体项目处于功能迭代期，MCP 生态集成能力持续增强。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### ✅ 已合并/关闭 PR

| PR | 作者 | 核心贡献 | 项目推进价值 |
|:---|:---|:---|:---|
| [#192](https://github.com/qhkm/zeptoclaw/pull/192) | @qhkm | **MCP stdio 传输层完整实现** | 里程碑级进展：完成传输抽象（McpTransport trait）、双模式支持（HTTP/stdio）、客户端重构、服务发现注册全链路打通 |

**技术细节：**
- 引入 `McpTransport` trait 实现传输层解耦
- 新增 `StdioTransport` 支持本地进程通信场景
- `McpClient` 重构为传输无关架构，支持 `new_stdio()` 构造与优雅关闭
- MCP 服务发现机制扩展，支持显式传输类型标注

**意义：** 该 PR 实现了 [2026-02-27 技术规划文档](https://github.com/qhkm/zeptoclaw/blob/main/docs/plans/2026-02-27-mcp-stdio-transport.md) 的完整落地，使 ZeptoClaw 成为少数同时支持 HTTP 和 stdio 双模式 MCP 的 AI 助手框架，为接入本地工具生态（如 Claude Desktop、各类 CLI 工具）奠定基础。

---

## 4. 社区热点

### 🔥 最活跃讨论：LLM 端点动态切换需求

| Issue | 作者 | 热度指标 | 核心诉求 |
|:---|:---|:---|:---|
| [#193](https://github.com/qhkm/zeptoclaw/issues/193) | @superhero75 | 新开 1 条评论 | **移动场景下的模型/端点热切换能力** |

**深度分析：**

该需求揭示了生产环境中的典型痛点：
- **场景：** 用户通过 Telegram 使用 ZeptoClaw 时遭遇 LLM 服务商速率限制
- **痛点：** 当前架构缺乏运行时端点切换机制，被迫中断对话或等待配额恢复
- **诉求：** 仿照 OpenClaw 设计，通过 `/models` 列出可用端点、`/model <name>` 即时切换

**技术挑战预判：**
- 状态管理：对话上下文跨端点迁移的一致性保证
- 配置热重载：无需重启服务的动态配置更新
- 故障转移：自动降级与重试策略设计

**路线图信号：** 该功能与 ZeptoClaw 的多模态、多提供商架构方向高度契合，建议纳入 v0.x 优先级评估。

---

## 5. Bug 与稳定性

**今日无新增 Bug 报告或崩溃 Issue**

| 类别 | 数量 | 状态 |
|:---|:---|:---|
| 崩溃/严重缺陷 | 0 | - |
| 功能回归 | 0 | - |
| 性能问题 | 0 | - |

> 注：依赖更新 PR #183 包含 clippy 警告修复，属于预防性代码质量改进。

---

## 6. 功能请求与路线图信号

| Issue | 类型 | 纳入可能性评估 | 关键依赖 |
|:---|:---|:---|:---|
| [#193](https://github.com/qhkm/zeptoclaw/issues/193) Telegram LLM 端点热切换 | 交互增强 | ⭐⭐⭐⭐☆ 高 | 配置系统重构、会话状态管理 |
| [#191](https://github.com/qhkm/zeptoclaw/issues/191) MCP stdio 传输 | 基础设施 | ✅ **已完成** | - |

**下一版本候选功能推断：**

基于今日合并的 MCP stdio 能力，项目可能向以下方向延伸：
1. **MCP 工具市场/注册表：** 标准化工具发现与分发机制
2. **多 LLM 路由层：** 智能负载均衡与故障转移（与 #193 诉求呼应）
3. **本地优先部署：** 结合 stdio 传输的离线/隐私敏感场景支持

---

## 7. 用户反馈摘要

### 从 #193 提炼的真实痛点

> *"Most llm endpoints have rate limit, it is difficult to switch to another model/endpoint on the road"*

| 维度 | 反馈内容 |
|:---|:---|
| **使用场景** | 移动场景（Telegram）、多服务商部署、速率限制规避 |
| **满意点** | ZeptoClaw 的 Telegram 集成已满足基础交互需求 |
| **不满意点** | 运维灵活性不足：端点切换需重启或修改配置文件 |
| **竞品参照** | 明确提及 OpenClaw 的 `/models` + `/model` 命令设计作为期望基准 |

**产品洞察：** 用户将 ZeptoClaw 定位为"可随身携带的 AI 助手"，移动场景下的弹性与韧性成为差异化竞争点。

---

## 8. 待处理积压

### ⏳ 需要维护者关注的长期事项

| PR/Issue | 创建时间 | 状态 | 风险/行动建议 |
|:---|:---|:---|:---|
| [#183](https://github.com/qhkm/zeptoclaw/pull/183) Update dependencies | 2026-02-26 | **Open，待合并** | 🔶 **供应链安全优先级**<br>包含：cargo/npm/Docker/Actions 全链路更新、Dependabot 配置、supply chain 加固（pinning + cooldown）。建议 48h 内 review，避免依赖漂移。 |

---

## 附录：数据速查

| 指标 | 数值 |
|:---|:---|
| 24h Issues 更新 | 2（新开 1 / 关闭 1） |
| 24h PR 更新 | 2（待合并 1 / 已合并 1） |
| 版本发布 | 0 |
| 活跃贡献者 | 2（@qhkm, @superhero75, @reneleonhardt） |

---

*报告生成时间：2026-02-28*  
*数据来源：GitHub API / ZeptoClaw 官方仓库*

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 | 2026-02-28

## 1. 今日速览

NanoBot 今日保持**高活跃度**，24小时内 Issues 更新 32 条（25 活跃/7 关闭）、PR 更新 72 条（40 待合并/32 已处理），无新版本发布。社区聚焦**稳定性修复**（空消息崩溃、上下文重复）与**多平台适配**（飞书流式输出、QQ 消息回复、Discord 语音），同时安全类 PR（敏感数据脱敏）和开发者体验改进（Token 用量统计、CI 镜像构建）同步推进。整体项目处于**功能扩张期**，但积压 PR 达 40 个，合流压力显著。

---

## 2. 版本发布

**无** — 今日未发布新版本。

---

## 3. 项目进展

### 已合并/关闭的关键 PR

| PR | 作者 | 核心贡献 | 影响 |
|:---|:---|:---|:---|
| [#1239](https://github.com/HKUDS/nanobot/pull/1239) | @tanishra | **修复 Matrix 频道初始化** — 补全 ChannelManager 配置与实例化逻辑 | 解决 Matrix 频道完全不可用问题，对应 Issue #1300 |
| [#1293](https://github.com/HKUDS/nanobot/pull/1293) | @Re-bin | **Mistral API 兼容性修复** — 生成 9 位字母数字 tool_call_id | 修复 Mistral 模型多轮对话失败问题 |
| [#1200](https://github.com/HKUDS/nanobot/pull/1200) | @intelliot | **心跳测试架构更新** — 适配两阶段 tool-call 架构，移除废弃 HEARTBEAT_OK_TOKEN | 解决测试代码与主架构脱节问题（对应 Issue #1221） |
| [#1242](https://github.com/HKUDS/nanobot/issues/1242) | @rcolomina | **Telegram 多图消息修复** — 正确处理 media_group_id 分组消息 | 解决仅保存最后一张图片的 Bug |

**整体推进**：基础设施（测试、CI、频道适配）稳固，核心 Agent 架构向**可观测性**（Token 统计）和**安全性**（数据脱敏）演进。

---

## 4. 社区热点

### 高讨论 Issues

| 排名 | Issue | 评论 | 核心诉求 | 分析 |
|:---|:---|:---:|:---|:---|
| 1 | [#215 飞书无法建立长连接](https://github.com/HKUDS/nanobot/issues/215) | 20 | 飞书事件订阅配置后仍显示"未建立长连接" | **企业用户阻塞性问题**，配置文档与运行时行为存在 gap，需明确长连接与回调模式区别 |
| 2 | [#1240 llama3.3-70b-instruct 无限循环响应](https://github.com/HKUDS/nanobot/issues/1240) | 13 | 模型响应不停止，后台持续重复提问 | **严重稳定性问题**，可能涉及 stop token 或 tool 循环终止逻辑缺陷 |
| 3 | [#222 多 Agent 设置支持](https://github.com/HKUDS/nanobot/issues/222) | 6 👍5 | 询问多 Agent 架构支持状态及文档 | **架构级需求**，社区对复杂工作流编排有明确期待，需官方 Roadmap 回应 |
| 4 | [#1265 Windows 实测对比 OpenClaw 建议](https://github.com/HKUDS/nanobot/issues/1265) | 4 | 肯定 NanoBot Windows 原生支持优势，建议强化差异化 | **战略信号** — Windows 用户体验是核心竞争优势，建议优先保障 |

### 高价值 PR 讨论

| PR | 亮点 | 状态 |
|:---|:---|:---|
| [#1080 飞书 CardKit 流式输出](https://github.com/HKUDS/nanobot/pull/1080) | 实时流式卡片+媒体嵌入，企业场景体验质变 | 待合并（与 #215 问题相关） |
| [#1238 AgentSkills.io 标准兼容](https://github.com/HKUDS/nanobot/pull/1238) | 生态互操作性突破，可复用 HuggingFace/Anthropic 技能库 | 待合并 |
| [#1305 敏感数据自动脱敏](https://github.com/HKUDS/nanobot/pull/1305) | 安全合规关键能力，三层防护设计 | 待合并（与 #1249 重复，需协调） |

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | Fix PR | 状态 |
|:---|:---|:---|:---|:---|
| 🔴 **Critical** | [#1240](https://github.com/HKUDS/nanobot/issues/1240) | llama3.3-70b 无限循环，需强制中断 | 无 | **待调查** — 疑似 tool 循环终止条件失效 |
| 🔴 **Critical** | [#1309](https://github.com/HKUDS/nanobot/pull/1309) | Telegram 空消息导致崩溃循环 + 上下文重复 | [#1309](https://github.com/HKUDS/nanobot/pull/1309) | **待合并** — 已定位 Moonshot/Kimi K2.5 大上下文场景 |
| 🟡 **High** | [#1267](https://github.com/HKUDS/nanobot/issues/1267) | 智谱 AI (zhipu) provider 无法工作，报余额不足 | 无 | 待验证 — 可能为配置格式或 API 变更 |
| 🟡 **High** | [#1225](https://github.com/HKUDS/nanobot/issues/1225) | deepseek-reasoner 请求格式错误，缺失 reasoning_content | 无 | 待修复 — 推理模型适配不完整 |
| 🟡 **High** | [#1274](https://github.com/HKUDS/nanobot/issues/1274) | Windows 绝对路径正则截断，合法命令被误拦截 | 无 | 待修复 — 工作区隔离安全策略缺陷 |
| 🟡 **High** | [#1303](https://github.com/HKUDS/nanobot/issues/1303) | `content: null` 消息污染会话历史，导致后续请求失败 | 无 | **新报告** — 边缘 case 处理缺失 |
| 🟢 **Medium** | [#1192](https://github.com/HKUDS/nanobot/issues/1192) | Bifrost MCP Gateway Code Mode 400 错误 | 无 | 外部兼容性问题 |
| 🟢 **Medium** | [#1174](https://github.com/HKUDS/nanobot/issues/1174) | 本地模型内存合并耗时过长或失败 | 无 | 架构性能问题，需异步化或降级策略 |

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 技术方向 | 纳入可能性 |
|:---|:---|:---|:---|
| **OpenAI 兼容 API 端点** | [#1268](https://github.com/HKUDS/nanobot/issues/1268) | 将 NanoBot 包装为下游工具可接入的服务 | ⭐⭐⭐ 高 — 生态位扩展关键 |
| **每会话工作区隔离** | [#1302](https://github.com/HKUDS/nanobot/issues/1302) | 多用户/多任务文件系统沙箱 | ⭐⭐⭐ 高 — 安全与多租户基础 |
| **Telegram 实时模型切换** | [#1292](https://github.com/HKUDS/nanobot/issues/1292) | 运行时切换 LLM 端点应对限流 | ⭐⭐⭐ 高 — 运维体验刚需 |
| **Web 聊天界面** | [#1297](https://github.com/HKUDS/nanobot/pull/1297) | Flask + SSE 多会话 Web UI | ⭐⭐⭐ 高 — PR 已提交，待 review |
| **Discord 语音/TTS** | [#1306](https://github.com/HKUDS/nanobot/pull/1306) | 音频输入转录 + 语音回复 | ⭐⭐⭐ 高 — PR 已提交 |
| **Cursor/GH CLI 集成** | [#1299](https://github.com/HKUDS/nanobot/pull/1299) | 配置化接入 Cursor 编码工作流 | ⭐⭐ 中 — 依赖外部工具安装 |
| **模型自主结束回合** | [#1246](https://github.com/HKUDS/nanobot/pull/1246) | 显式 `end_turn` tool 提升任务完成度 | ⭐⭐ 中 — 行为设计需验证 |
| **多模型 Provider 故障转移** | [#1201](https://github.com/HKUDS/nanobot/pull/1201) | 主模型失败时自动降级备用模型 | ⭐⭐ 中 — 可靠性增强 |

---

## 7. 用户反馈摘要

### ✅ 满意点
- **Windows 原生支持**（[#1265](https://github.com/HKUDS/nanobot/issues/1265)）：相比 OpenClaw 需 WSL，NanoBot 开箱即用，安装成功率与响应速度更优
- **技能安装灵活性**：`nanobot` 技能系统经调教后可用性高于竞品

### ❌ 痛点
- **企业 IM 适配文档不足**：飞书长连接配置（[#215](https://github.com/HKUDS/nanobot/issues/215)）、钉钉群聊回复私发（[#1045](https://github.com/HKUDS/nanobot/issues/1045)）等问题缺乏清晰指引
- **Windows 边缘体验**："有时候会有问题"（[#1251](https://github.com/HKUDS/nanobot/issues/1251)），路径处理、权限等细节待打磨
- **模型适配碎片化**：智谱、DeepSeek 推理模型、Mistral 等均有兼容性问题，Provider 生态维护成本高
- **会话/内存管理**：大上下文场景下合并失败（[#1174](https://github.com/HKUDS/nanobot/issues/1174)）、历史消息污染（[#1176](https://github.com/HKUDS/nanobot/issues/1176)）影响长期使用

### 💡 场景洞察
- **移动运维需求**：用户希望通过 Telegram 实时切换模型（[#1292](https://github.com/HKUDS/nanobot/issues/1292)），而非 SSH 登录修改配置 —— 暗示需要**更完善的移动端管理界面**

---

## 8. 待处理积压

| 类型 | 条目 | 创建时间 | 风险 | 建议动作 |
|:---|:---|:---:|:---|:---|
| Issue | [#215 飞书长连接](https://github.com/HKUDS/nanobot/issues/215) | 2026-02-06 (22天) | 企业用户流失 | 指派专人，结合 #1080 PR 验证并关闭 |
| Issue | [#222 多 Agent 支持](https://github.com/HKUDS/nanobot/issues/222) | 2026-02-06 (22天) | Roadmap 模糊 | 官方回应架构规划，转化社区贡献 |
| Issue | [#1131 CI Test Coverage](https://github.com/HKUDS/nanobot/issues/1131) | 2026-02-24 (4天) | 质量基建缺失 | 明确 CI 策略，补充文档 |
| PR | [#126 Docker 镜像自动构建](https://github.com/HKUDS/nanobot/pull/126) | 2026-02-05 (23天) | 发布效率瓶颈 | Review 并合并，建立官方镜像渠道 |
| PR | [#1080 飞书流式输出](https://github.com/HKUDS/nanobot/pull/1080) | 2026-02-24 (4天) | 企业体验提升受阻 | 优先 review，解决 #215 关联问题 |
| PR | [#1238 AgentSkills.io 兼容](https://github.com/HKUDS/nanobot/pull/1238) | 2026-02-26 (2天) | 生态扩展窗口期 | 快速 review，抢占技能标准话语权 |

---

**日报生成时间**: 2026-02-28  
**数据来源**: HKUDS/nanobot GitHub 公开活动

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 | 2026-02-28

## 1. 今日速览

PicoClaw 今日保持**高强度开发节奏**，24小时内产生 **29 条 Issues 更新**（16 活跃/新开，13 关闭）和 **91 条 PR 更新**（57 待合并，34 已合并/关闭），无新版本发布。项目核心关注点集中在**多通道扩展**（WhatsApp、WeCom、Google Chat、HTTP）、**MCP 协议集成**、以及**稳定性修复**（内存泄漏、工具调用上下文丢失）。社区对 Model Context Protocol (#290) 和 Signal 通道 (#41) 需求强烈，反映出用户对开放生态和隐私优先平台的期待。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 已合并/关闭的重要 PRs

| PR | 作者 | 核心贡献 | 项目推进 |
|:---|:---|:---|:---|
| [#860](https://github.com/sipeed/picoclaw/pull/860) | @jayzen33 | **增强系统提示词**：明确指示 Agent 更新 SOUL.md 和 USER.md | 解决长期存在的"Agent 不记忆用户信息"痛点，提升个性化体验 |
| [#476](https://github.com/sipeed/picoclaw/pull/476) | @harshbansal7 | **Telegram 消息分块**：实现 4096 字符安全截断，保留 Markdown 结构 | 解决 Discord/Telegram 长消息崩溃问题，通道稳定性里程碑 |
| [#840](https://github.com/sipeed/picoclaw/pull/840) | @omrikiei | **修复 Telegram 用户名白名单回归**：恢复 senderID 带用户名的传递 | 修复 #164 引入的安全功能失效问题 |
| [#622](https://github.com/sipeed/picoclaw/pull/622) | @JaviLib | **HTTP 通道**（持续迭代中）：内置 Goldmark 渲染的 Web 界面 | 降低新用户入门门槛，实现"安装即访问" |

**整体评估**：今日合并聚焦于**用户体验修复**（记忆、消息长度、白名单）和**基础设施**（Web 界面），项目向生产就绪迈出扎实一步。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论数 | 核心诉求 | 深层信号 |
|:---|:---|:---|:---|
| [#88](https://github.com/sipeed/picoclaw/issues/88) Chromebook 安装指南 | 10 | 文档缺失，Chromebook 用户无法入门 | **新兴市场用户群体**被忽视，需扩展安装文档覆盖度 |
| [#680](https://github.com/sipeed/picoclaw/issues/680) GLM 默认 api_base 硬编码 | 9 | 配置灵活性不足，多提供商切换困难 | 配置系统架构债务，provider 解析逻辑需重构 |
| [#100](https://github.com/sipeed/picoclaw/issues/100) "无响应"消息困扰 | 9 | OpenRouter 模型返回空内容，用户体验差 | 需要更好的**模型输出质量检测**和**优雅降级**机制 |
| [#545](https://github.com/sipeed/picoclaw/issues/545) 任务委托后多回复 | 8 | 多 Agent 协作时的消息风暴 | **多 Agent 架构**的副作用显现，需引入协调机制 |

### 高优先级路线图议题

| Issue | 👍 | 战略意义 |
|:---|:---|:---|
| [#290](https://github.com/sipeed/picoclaw/issues/290) **MCP 协议支持** | 4 | 生态扩展核心，已有 PR #282 在推进 |
| [#41](https://github.com/sipeed/picoclaw/issues/41) **Signal 通道** | 4 | 隐私优先用户的关键需求，尚无实现 |
| [#621](https://github.com/sipeed/picoclaw/issues/621) 通道系统重构 | 4 | 架构层面解决通道扩展性问题，83% 完成 |

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 问题描述 | 状态 |
|:---|:---|:---|:---|
| 🔴 **高** | [#870](https://github.com/sipeed/picoclaw/issues/870) | `forceCompression` 破坏工具调用/响应配对，导致 400 错误 | **待修复**，影响长对话场景 |
| 🔴 **高** | [#884](https://github.com/sipeed/picoclaw/pull/884) | WhatsApp Native 通道内存泄漏（QR 循环阻塞、goroutine 泄漏） | **PR 已提交**，待合并 |
| 🔴 **高** | [#781](https://github.com/sipeed/picoclaw/pull/781) | ExecTool 正则错误导致"Fail-Open"安全漏洞 | **PR 开放**，安全关键 |
| 🟡 **中** | [#794](https://github.com/sipeed/picoclaw/issues/794) | Codex API 400 Bad Request（Device Auth 模式） | 待调查，可能为 headers 问题 |
| 🟡 **中** | [#778](https://github.com/sipeed/picoclaw/issues/778) | 摘要丢失工具调用上下文 | **PR #829 修复中** |
| 🟡 **中** | [#888](https://github.com/sipeed/picoclaw/issues/888) | `picoclaw cron` CLI 不保存任务到 jobs.json | **已关闭**，需验证修复 |
| 🟢 **低** | [#565](https://github.com/sipeed/picoclaw/issues/565) | Telegram `/list models` 提示更新 config.yaml（实际为 .json） | **已关闭** |

**稳定性趋势**：内存管理和上下文压缩是今日焦点，反映项目进入**长会话稳定性**攻坚阶段。

---

## 6. 功能请求与路线图信号

### 用户强烈需求（无现成 PR）

| Issue | 需求 | 纳入可能性 | 阻碍 |
|:---|:---|:---|:---|
| [#41](https://github.com/sipeed/picoclaw/issues/41) Signal 通道 | 隐私优先消息平台 | ⭐⭐⭐⭐⭐ | 需 signal-cli 集成，工作量中等 |
| [#99](https://github.com/sipeed/picoclaw/issues/99) WhatsApp 通道 | 已关闭，但需求持续 | ⭐⭐⭐⭐☆ | 官方 API 限制，社区方案存在 |
| [#850](https://github.com/sipeed/picoclaw/issues/850) Webhook 消息 | 外部系统事件通知 | ⭐⭐⭐⭐☆ | 需设计认证机制 |
| [#869](https://github.com/sipeed/picoclaw/issues/869) 服务启停命令 | 运维便利性 | ⭐⭐⭐☆☆ | 与现有 systemd PR #879 重叠 |

### 已有 PR 支撑的功能（高概率下一版本）

| PR | 功能 | 状态 |
|:---|:---|:---|
| [#282](https://github.com/sipeed/picoclaw/pull/282) | **MCP 工具支持** + Docker 部署 | 开放，评论活跃 |
| [#879](https://github.com/sipeed/picoclaw/pull/879) | **自调试技能** + Systemd 服务 | 开放，稳定性导向 |
| [#872](https://github.com/sipeed/picoclaw/pull/872) | **企业微信 AIBot 通道** | 开放，测试完整 |
| [#830](https://github.com/sipeed/picoclaw/pull/830) | **Google Chat 通道** | 开放 |
| [#822](https://github.com/sipeed/picoclaw/pull/822) | **通义千问 OAuth + 扫码登录** | 开放，降低国内用户门槛 |

---

## 7. 用户反馈摘要

### 😊 满意点
- **多通道覆盖**：用户对 Telegram、Discord 集成满意度高，"tiny beast"昵称体现喜爱 (#99)
- **CLI 交互**：单次任务执行流畅，配置即用的体验受认可

### 😤 痛点
| 痛点 | 典型反馈 | 来源 |
|:---|:---|:---|
| **配置复杂** | "调来调去哪哪都不对"——MiniMax/GLM 等国内模型配置困难 | #878, #795, #680 |
| **长对话崩溃** | 消息分块前频繁触发长度限制，Discord/Telegram 报错 | #285, #545 |
| **记忆缺失** | Agent 不主动更新 SOUL.md/USER.md，用户需反复说明偏好 | #860 修复前 |
| **文档滞后** | Chromebook 无安装指南，配置示例与实际文件格式不符 | #88, #565 |
| **摘要质量差** | "Summary contains no relevant context"——工具调用历史丢失 | #778 |

### 💡 使用场景洞察
- **企业用户**：需要 WeCom (#872)、Google Chat (#830) 等企业 IM 集成
- **隐私敏感用户**：Signal (#41) 需求强烈，拒绝 Telegram/WhatsApp
- **国内开发者**：通义千问、MiniMax、GLM 等国产模型适配是刚需
- **运维场景**：Systemd 服务化 (#879)、Webhook 事件通知 (#850) 需求浮现

---

## 8. 待处理积压

### 长期未响应的重要议题

| Issue | 创建时间 | 最后更新 | 风险 | 建议行动 |
|:---|:---|:---|:---|:---|
| [#290](https://github.com/sipeed/picoclaw/issues/290) MCP 协议支持 | 2026-02-16 | 今日 | ⭐⭐⭐⭐⭐ 生态战略 | 协调 PR #282 评审，明确合并时间表 |
| [#41](https://github.com/sipeed/picoclaw/issues/41) Signal 通道 | 2026-02-11 | 今日 | ⭐⭐⭐⭐☆ 隐私用户流失 | 标记 `help wanted` 或纳入路线图 |
| [#348](https://github.com/sipeed/picoclaw/issues/348) 通用附件支持 | 2026-02-17 | 今日 | ⭐⭐⭐⭐☆ 功能完整性 | 与通道重构 #621 协调设计 |
| [#868](https://github.com/sipeed/picoclaw/issues/868) 双层架构建议 | 今日 | 今日 | ⭐⭐⭐⭐☆ 架构演进 | 技术评审，回应 nanobot 参考 |
| [#297](https://github.com/sipeed/picoclaw/issues/297) 螳螂虾 Logo 设计 | 2026-02-16 | 今日 | ⭐⭐☆☆☆ 品牌 | 社区设计征集或外包 |

### PR 评审瓶颈

- **57 个待合并 PR** 中，需优先关注：
  - 安全修复：#781（Fail-Open 漏洞）
  - 稳定性：#884（内存泄漏）、#829（上下文丢失）
  - 生态扩展：#282（MCP）、#872（WeCom）

---

**报告生成时间**：2026-02-28  
**数据来源**：GitHub API /sipeed/picoclaw  
**下次关注**：MCP PR 合并进展、Signal 通道社区响应、国内模型配置文档完善

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 | 2026-02-28

## 1. 今日速览

NanoClaw 今日呈现**高强度开发态势**，37 个 PR 更新（29 个待合并、8 个已处理）显示出社区贡献的爆发式增长。核心架构重构 #500（可插拔多通道架构）持续演进，带动 Signal、Discord、Telegram 等通道技能的密集迭代。稳定性方面，WhatsApp 连接恢复、容器执行失败等问题获得针对性修复，但缺乏用户级任务取消机制的安全隐患被首次暴露。整体项目健康度良好，技术债务清理与功能扩展并行推进。

---

## 2. 版本发布

**无新版本发布**

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 作者 | 核心贡献 | 项目推进意义 |
|:---|:---|:---|:---|
| [#568](https://github.com/qwibitai/nanoclaw/pull/568) | @nickpourazima | **通道无关的交互抽象层**（已关闭，被 #569 取代） | 为统一跨通道交互（反应、回复、投票等）奠定接口基础 |
| [#339](https://github.com/qwibitai/nanoclaw/pull/339) | @tglowaski | **iMessage 通道**（已关闭） | 苹果生态集成尝试，虽关闭但积累了容器化 iMessage 的经验 |
| [#547](https://github.com/qwibitai/nanoclaw/pull/547) | @jonazri | **Shabbat 模式** 🕯️（已关闭） | 文化包容性创新，展示项目对特殊场景需求的响应能力 |
| [#511](https://github.com/qwibitai/nanoclaw/pull/511) | @jonazri | **语音识别技能**（PyAnnote 说话人识别）（已关闭） | 安全层增强，防止语音指令被第三方冒用 |
| [#515](https://github.com/qwibitai/nanoclaw/pull/515) | @jonazri | **Perplexity Research 技能**（已关闭） | 集成深度研究能力，扩展代理的信息获取维度 |
| [#509](https://github.com/qwibitai/nanoclaw/pull/509) | @jonazri | **WhatsApp 表情反应技能**（已关闭） | 非语言反馈通道，改善长任务的用户感知体验 |
| [#563](https://github.com/qwibitai/nanoclaw/pull/563) | @antonlobanovskiy | **Discord 技能邀请流程修复**（已关闭） | 解决 OAuth2 流程断裂，降低新用户接入门槛 |

**整体进展评估**：今日关闭的 7 个 PR 集中在**用户体验优化**（Discord 邀请流程）、**安全加固**（语音识别）、**功能扩展**（研究能力、表情反应）三个维度。值得注意的是，多个创新性功能（Shabbat 模式、语音安全层）虽被关闭，但其代码可能已被吸收或等待重构后重新提交，显示出社区对代码质量的坚持。

---

## 4. 社区热点

### 高关注度 PR 分析

| PR | 热度指标 | 核心诉求分析 |
|:---|:---|:---|
| [#500](https://github.com/qwibitai/nanoclaw/pull/500) | 架构重构核心，带动 4+ 衍生 PR | **技术债务清理**：将硬编码的 WhatsApp 中心架构解耦为可插拔通道系统，这是项目从"WhatsApp 机器人框架"进化为"多通道 AI 代理平台"的关键跃迁 |
| [#569](https://github.com/qwibitai/nanoclaw/pull/569) | 替代 #568，今日新建 | **跨通道交互统一**：社区成员 @Fritzzzz1 在 #499 中提出的"以通用方式解决所有通道的交互功能"诉求得到响应，#569 以技能包形式实现反应、引用回复、投票等能力 |
| [#499](https://github.com/qwibitai/nanoclaw/pull/499) | Signal 通道实现 | **隐私优先替代方案**：通过 signal-cli 守护进程提供 TCP JSON-RPC 接口，满足对 WhatsApp 隐私政策敏感的用户需求，可与 WhatsApp 并行运行 |
| [#566](https://github.com/qwibitai/nanoclaw/pull/566) | WhatsApp 稳定性专项 | **生产环境韧性**：针对 405 速率限制错误实现指数退避，将认证失败从致命错误降级为可恢复状态，直接回应 #553 报告的场景 |

**社区动态洞察**：今日 PR 流呈现明显的**"架构重构驱动"特征**——#500 的 pluggable channels 重构成为引力中心，Signal (#499)、通道交互 (#569) 均围绕此架构展开。这表明社区已形成"先统一抽象，再扩展实现"的技术共识，项目正从快速原型阶段进入工程化成熟阶段。

---

## 5. Bug 与稳定性

| 问题 | 来源 | 严重程度 | 状态 | 影响范围 |
|:---|:---|:---|:---|:---|
| **容器执行在 WhatsApp 连接恢复后失败** | [#553](https://github.com/qwibitai/nanoclaw/issues/553) | 🔴 **高** | 待修复，无 PR | VPN 切换场景下的核心工作流断裂：无 VPN 启动 → WhatsApp 连接失败 → 启用 VPN 恢复连接 → 容器执行异常 |
| **缺乏用户级任务取消机制** | [#554](https://github.com/qwibitai/nanoclaw/issues/554) | 🔴 **高（安全）** | 待修复，无 PR | 破坏性指令（如"删除所有邮件"）一旦启动无法中断，存在不可逆操作风险 |
| Discord 状态/代码不同步导致静默失败 | [#488](https://github.com/qwibitai/nanoclaw/pull/488) | 🟡 中 | **修复 PR 待合并** | OAuth 流程中的状态验证缺失 |
| Telegram 状态/代码不匹配 | [#424](https://github.com/qwibitai/nanoclaw/pull/424) | 🟡 中 | **修复 PR 待合并** | 类似 #488 的通道特定问题 |
| Docker 权限检测缺失 | [#512](https://github.com/qwibitai/nanoclaw/pull/512) | 🟡 中 | **修复 PR 待合并** | 用户不在 docker 组时的诊断困难 |

**稳定性趋势**：WhatsApp 相关稳定性问题获得密集关注（#566 退避策略、#565 PID 锁防止重复实例），但 #553 揭示的**连接状态与容器执行的生命周期耦合问题**尚未有针对性修复。#554 暴露的**安全架构缺陷**（无取消机制）需要核心团队优先响应。

---

## 6. 功能请求与路线图信号

| 需求信号 | 来源 | 实现可能性评估 | 纳入下一版本信号强度 |
|:---|:---|:---|:---|
| **通道无关的交互抽象** | #499 评论 → #568 → #569 | ⭐⭐⭐⭐⭐ 高 | **强** - 已以技能包形式实现，架构层面 #500 提供支撑 |
| **Signal 作为隐私替代通道** | #499 | ⭐⭐⭐⭐☆ 高 | **强** - PR 已提交，与 #500 架构兼容 |
| **Avian LLM 提供商支持** | [#549](https://github.com/qwibitai/nanoclaw/pull/549) | ⭐⭐⭐⭐☆ 高 | **强** - 技能包形式，OpenAI 兼容 API 降低集成成本 |
| **Telegram 话题（Topics）支持** | [#564](https://github.com/qwibitai/nanoclaw/pull/564) | ⭐⭐⭐☆☆ 中 | 中 - 企业/社区场景需求，待评估与核心架构的耦合度 |
| **Shabbat/宗教模式** | #547（已关闭） | ⭐⭐☆☆☆ 低-中 | 弱 - 创新性强但受众窄，可能以社区技能形式存在 |
| **语音安全层** | #511（已关闭） | ⭐⭐⭐⭐☆ 高 | **强** - 安全关键功能，关闭可能意味着重构后重新提交 |

**路线图推断**：下一版本（若基于 #500 重构）的核心叙事将是**"多通道 AI 代理平台"**，Signal 集成和通道交互统一是标志性功能。LLM 提供商多元化（Avian 等）通过技能包机制持续扩展。安全功能（语音验证、任务取消）需要核心架构支持，可能成为重构后的优先项。

---

## 7. 用户反馈摘要

### 真实痛点（来自 Issues）

| 痛点 | 来源 | 场景还原 |
|:---|:---|:---|
| **网络环境切换导致服务不可用** | #553 | 用户在中国等网络受限地区，需频繁切换 VPN，但 NanoClaw 对连接中断的恢复处理不完善，导致"连接恢复后容器执行仍失败" |
| **破坏性操作无刹车机制** | #554 | 用户意识到代理可能误解指令并执行危险操作（如批量删除），但系统未提供"紧急停止"按钮，产生失控焦虑 |

### 使用场景洞察

- **多通道需求强烈**：用户不满足于 WhatsApp 单一通道，Signal (#499)、Discord (#562)、Telegram (#564) 的并行开发显示用户群体分布在不同通讯生态
- **自托管复杂性**：Docker 权限问题 (#512)、OAuth 流程困惑 (#562, #563) 反复出现，表明目标用户（技术爱好者）在部署环节仍遇摩擦
- **文化/宗教场景定制化**：#547 Shabbat 模式虽关闭，但展示了用户对"代理行为可编程约束"的兴趣（时间、地点、身份等维度的策略控制）

### 满意度/不满意度

| 维度 | 评估 |
|:---|:---|
| ✅ 功能丰富度 | 高 - 研究能力、语音处理、多通道等扩展迅速 |
| ⚠️ 稳定性 | 中 - 连接恢复、状态同步等问题影响生产信心 |
| ❌ 安全可控感 | 低 - 缺乏取消机制让用户对代理的自主性感到不安 |

---

## 8. 待处理积压

### 需要维护者关注的高价值 PR

| PR | 创建时间 | 积压风险 | 关注理由 |
|:---|:---|:---|:---|
| [#500](https://github.com/qwibitai/nanoclaw/pull/500) | 2026-02-25 | ⚠️ 中 | 架构重构核心，29 个待合并 PR 中大量依赖此基础，延迟将阻塞整个生态扩展 |
| [#412](https://github.com/qwibitai/nanoclaw/pull/412) | 2026-02-23 | 🔴 **高** | 主机授权透传功能，改善首次设置体验，已积压 5 天 |
| [#424](https://github.com/qwibitai/nanoclaw/pull/424) | 2026-02-23 | 🔴 **高** | Telegram 状态修复，与 #488 为同类问题，应合并以保持一致性 |

### 需要响应的安全 Issue

| Issue | 风险 | 建议行动 |
|:---|:---|:---|
| [#554](https://github.com/qwibitai/nanoclaw/issues/554) | 用户无法中断危险操作 | 核心团队应在 #500 重构中预留取消信号通道，或设计紧急停止协议 |

---

**日报生成时间**：2026-02-28  
**数据来源**：GitHub API / qwibitai/nanoclaw  
**分析师**：AI 智能体与开源项目分析系统

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 | 2026-02-28

## 1. 今日速览

IronClaw 今日保持**高活跃度**，24小时内产生 **27 个 PR 更新**（13 个已合并/关闭，14 个待审）和 **6 个 Issues 更新**（5 个活跃，1 个关闭）。核心进展集中在三大方向：**WASM 通道能力扩展**（文件附件、广播消息）、**可编程工具调用（PTC）基础设施**落地，以及**开发者体验优化**（自动配置检测、自定义数据目录）。项目正从"功能搭建期"向"稳定性与生态扩展期"过渡，PR 合并率 48% 显示代码审查节奏健康。

---

## 2. 版本发布

**无新版本发布**

v0.13.0 发布 PR #385 仍处于开放状态，包含 API 破坏性变更（`constructible_struct_adds_field`），预计近期合并。

---

## 3. 项目进展

### 今日合并/关闭的关键 PR（13 个）

| PR | 作者 | 核心贡献 | 项目推进意义 |
|:---|:---|:---|:---|
| [#404](https://github.com/nearai/ironclaw/pull/404) | @henrypark133 | Web 端斜杠命令自动补全 + `/status` `/list` 命令修复 + 聊天输入锁定修复 | **交互体验质变**：18 个命令支持 Tab 补全，解决长期存在的"命令可见但不可用"问题 |
| [#398](https://github.com/nearai/ironclaw/pull/398) | @henrypark133 | Routine 通知全通道投递修复 | **可靠性关键修复**：WASM 通道（Telegram/Slack）通知从"静默丢失"变为"可靠送达" |
| [#353](https://github.com/nearai/ironclaw/pull/353) | @zmanian | 自动化 QA 体系：424 个新测试、CI 矩阵、Docker 构建、模式验证器 | **工程基础设施里程碑**：测试覆盖率从 1,300 → 1,724，系统性预防回归 |
| [#382](https://github.com/nearai/ironclaw/pull/382) | @henrypark133 | 工具调用持久化、待审批状态恢复、UTF-8 截断崩溃修复 | **数据完整性**：线程切换不再丢失上下文，消除生产环境 panic |
| [#397](https://github.com/nearai/ironclaw/pull/397) | @ibhagwan | `IRONCLAW_BASE_DIR` 环境变量支持（LazyLock 缓存） | **部署灵活性**：支持多代理隔离部署，突破 `~/.ironclaw` 硬编码限制 |
| [#399](https://github.com/nearai/ironclaw/pull/399) | @henrypark133 | libSQL 自动检测（`ironclaw.db` 存在时） | **云原生适配**：解决 NEAR AI 云实例的配置鸡生蛋问题 |
| [#391](https://github.com/nearai/ironclaw/pull/391) | @henrypark133 | Web UI Routine 跨通道可见性修复 | **一致性修复**：Telegram 创建的 Routine 可在 Web 端管理 |
| [#146](https://github.com/nearai/ironclaw/pull/146) | @ztsalexey | rig-core 后端模型自动发现 | **易用性**：OpenAI/Ollama 后端不再显示空模型列表 |
| [#128](https://github.com/nearai/ironclaw/pull/128) | @panosAthDBX | 配置诊断统一化（回应 @ilblackdragon 反馈） | **可维护性**：消除配置解析的 ad-hoc 默认逻辑 |
| [#371](https://github.com/nearai/ironclaw/pull/371) | @BroccoliFin | `--help` 增强（彩色输出、示例、快照测试） | **开发者体验**：关闭 #285 |
| [#66](https://github.com/nearai/ironclaw/pull/66) | @dj-ryan | 架构图更新 | **文档清晰度** |
| [#405](https://github.com/nearai/ironclaw/pull/405) | @jmhdevbot-hue | Word 工具（已关闭，未合并） | — |

**整体推进评估**：今日合并的 PR 覆盖**用户体验**（Web 补全）、**可靠性**（通知投递、数据持久化）、**工程成熟度**（测试体系、配置灵活性）三大维度，项目健康度显著提升。

---

## 4. 社区热点

### 最活跃讨论

| 议题 | 热度指标 | 核心诉求分析 |
|:---|:---|:---|
| [#407 Ideas from Hermes Agent worth adopting](https://github.com/nearai/ironclaw/issues/407) | 👍 0, 💬 2, 催生 PR #408 | **架构对标焦虑**：社区主动研究竞品 Hermes Agent，提出可借鉴模式——工具元数据注册、LLM 驱动的技能发现、内存分层。已直接转化为 PTC（可编程工具调用）实现 |
| [#409 WASM 通道文件/图片附件支持](https://github.com/nearai/ironclaw/pull/409) | XL 规模, 新贡献者 | **多媒体能力缺口**：Telegram 发图、文档传输是用户高频需求，PR 实现 HTTP 工具下载 → WASM 通道附件的完整链路 |
| [#408 可编程工具调用（PTC）](https://github.com/nearai/ironclaw/pull/408) | XL 规模, 资深贡献者 | **性能优化诉求**：工具链式调用无需 LLM 往返，响应延迟从秒级降至毫秒级，对自动化工作流关键 |

**社区信号**：用户不再满足于"能跑"，开始追求**响应速度**（PTC）、**多媒体能力**（附件）、**竞品功能对齐**（Hermes 研究），显示用户群体从早期采用者向更广泛开发者扩展。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 状态 | 影响范围 | Fix PR |
|:---|:---|:---|:---|:---|
| 🔴 **高** | [#400 openai_compatible 后端截断模型名](https://github.com/nearai/ironclaw/issues/400) | **开放** | Ollama 用户无法使用 `llama3.2` 等带点版本号模型 | 无 |
| 🟡 **中** | [#406 Discord/WhatsApp 缺少 build.sh，安装向导不显示](https://github.com/nearai/ironclaw/issues/406) | **开放** | 新用户无法通过向导启用 Discord/WhatsApp 通道 | 无 |
| 🟡 **中** | [#148 Discord 签名验证缺失 + Capabilities 头不匹配](https://github.com/nearai/ironclaw/issues/148) | **已关闭** | Discord 交互端点无法验证，发现功能失效 | 已修复（今日关闭） |

**稳定性评估**：两个开放 Bug 均影响**新用户上手路径**（模型选择、通道启用），建议优先处理。#400 的模型名解析问题可能源于简单的字符串 split 逻辑，修复成本低但影响面广。

---

## 6. 功能请求与路线图信号

| 需求 | Issue/PR | 实现状态 | 纳入下一版本概率 |
|:---|:---|:---|:---|
| **可编程工具调用（PTC）** | #408 | PR 已提交，XL 规模 | ⭐⭐⭐⭐⭐ **极高** — 架构级特性，已完整实现 |
| **WASM 通道文件附件** | #409 | PR 已提交，XL 规模 | ⭐⭐⭐⭐⭐ **极高** — 代码完整，待 review |
| **SimpleX Chat 通道** | [#402](https://github.com/nearai/ironclaw/issues/402) | 需求阶段，有技术方案 | ⭐⭐⭐⭐☆ **高** — 契合"安全优先"定位，社区有实现意愿 |
| **Avian LLM 提供商** | [#396](https://github.com/nearai/ironclaw/pull/396) | PR 已提交，M 规模 | ⭐⭐⭐⭐☆ **高** — 跟随 Tinfoil 模式，低风险 |
| **Slack Socket Mode** | #333 | PR 开放中，XL 规模，2 月 23 日 | ⭐⭐⭐☆☆ **中** — NAT 友好连接需求明确，但规模较大 |
| **Claude Code CLI 登录** | [#386](https://github.com/nearai/ironclaw/issues/386) | 需求阶段 | ⭐⭐☆☆☆ **低** — 需 Anthropic 配合，非技术可控 |
| **OpenTelemetry 可观测性** | #334 | PR 开放中，XL 规模，2 月 23 日 | ⭐⭐⭐☆☆ **中** — 工具调用审计已移除，范围收缩中 |

---

## 7. 用户反馈摘要

### 真实痛点

| 来源 | 痛点 | 场景 |
|:---|:---|:---|
| #400 @RikaGoldberg | Ollama 本地模型名被截断 | 使用 `llama3.2` 时后端变成 `llama3`，404 错误 |
| #406 @KemonoNeco | 通道"隐形"——有代码无构建脚本 | 安装向导不显示 Discord/WhatsApp，用户以为未实现 |
| #398 修复背景 | Routine 通知"静默丢失" | 用户创建定时任务后收不到 Telegram 通知，误以为未触发 |
| #397 @ibhagwan | 硬编码 `~/.ironclaw` 限制多代理部署 | 需要隔离多个代理的数据/配置 |

### 满意点

- **配置灵活性提升**：#399 的 libSQL 自动检测解决云实例启动失败
- **Web 交互改善**：斜杠补全和命令修复提升效率

### 不满意/困惑

- 竞品功能对标意识觉醒（#407 Hermes 研究），暗示"IronClaw 是否落后"
- Claude Code CLI 集成诉求（#386）显示用户对官方工具链的偏好

---

## 8. 待处理积压

| 项目 | 创建时间 | 风险 | 提醒 |
|:---|:---|:---|:---|
| [#333 Slack Socket Mode](https://github.com/nearai/ironclaw/pull/333) | 2026-02-23 | 企业防火墙/NAT 场景刚需 | 5 天无更新，需维护者 review 决策 |
| [#334 OpenTelemetry](https://github.com/nearai/ironclaw/pull/334) | 2026-02-23 | 可观测性基础设施 | 范围已收缩，需确认是否继续推进 |
| [#400 模型名截断](https://github.com/nearai/ironclaw/issues/400) | 昨日 | 影响 Ollama 核心用户群 | 无 assignee，建议标记 `good first issue` |
| [#386 Claude Code CLI](https://github.com/nearai/ironclaw/issues/386) | 2 天前 | 需产品决策 | 建议官方回应可行性 |

---

**日报生成时间**：2026-02-28  
**数据范围**：过去 24 小时 GitHub 活动

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw 项目动态日报 | 2026-02-28

---

## 1. 今日速览

TinyClaw 今日呈现**高活跃度开发态势**，24小时内产生 **8 个 PR**（4 开 4 闭）和 **1 个新 Issue**，无版本发布。核心进展集中在**插件系统正式落地**（PR #127 合并）、**多平台线程支持修复**（Discord/Telegram）以及**架构级重构**（monorepo 提案）。社区开始关注**会话隔离**这一企业级需求，标志着项目从基础功能向生产就绪演进。

---

## 2. 版本发布

**无新版本发布**

> 注：PR #148 版本号提升至 0.0.7 已被关闭，推测维护者选择延后发布或整合更多变更后统一发版。

---

## 3. 项目进展

### ✅ 已合并/关闭的关键 PR

| PR | 作者 | 核心贡献 | 项目推进意义 |
|:---|:---|:---|:---|
| [#127](https://github.com/TinyAGI/tinyclaw/pull/127) | @steven1522 | **插件系统正式落地**：Events（状态广播）+ Hooks（消息转换） | 架构里程碑：TinyClaw 从单一工具进化为**可扩展平台**，支持 3D  avatar 可视化、频道格式转换等生态扩展 |
| [#146](https://github.com/TinyAGI/tinyclaw/pull/146) | @jlia0 | #127 的 rebase 冲突解决版本（已关闭，#127 优先合并） | 确保插件系统干净合入主线 |
| [#145](https://github.com/TinyAGI/tinyclaw/pull/145) | @jlia0 | **技能文件管理修复**：复制替代符号链接，统一 `TINYCLAW_HOME` 行为 | 解决跨环境部署痛点（容器/CI 场景），消除技能文件漂移风险 |
| [#148](https://github.com/TinyAGI/tinyclaw/pull/148) | @jlia0 | 版本号 bump 0.0.7（已关闭） | — |

**今日项目成熟度跃升**：插件系统 + 技能管理修复构成 **v0.0.7 的核心交付物**，多平台适配进入精细化阶段。

---

## 4. 社区热点

| 热度指标 | 条目 | 分析 |
|:---|:---|:---|
| **架构级讨论** | [#147 Monorepo 重构](https://github.com/TinyAGI/tinyclaw/pull/147) | @jlia0 提出代码库结构转型，暗示项目规模扩张、模块化需求显现，可能为后续插件市场/多包管理铺路 |
| **企业级需求浮现** | [#144 会话隔离](https://github.com/TinyAGI/tinyclaw/issues/144) | 多租户场景核心痛点：Telegram Topic 与 Discord Thread 上下文串扰，需 `--session-id` + `--resume` 机制 |
| **插件安全加固** | [#149](https://github.com/TinyAGI/tinyclaw/pull/149) + [#150](https://github.com/TinyAGI/tinyclaw/pull/150) | @mczabca-boop 堆叠式 PR：超时控制、元数据清洗、插件门禁，反映生产环境对**沙箱安全**的硬性要求 |

**诉求洞察**：社区正从"能用"转向"好用且安全"，企业部署场景（隔离、审计、超时控制）成为新焦点。

---

## 5. Bug 与稳定性

| 严重程度 | 问题 | 状态 | Fix PR |
|:---|:---|:---|:---|
| 🔴 **高** | Discord/Telegram 线程回复错乱、队列 PATH 解析失败 | **待合并** | [#142](https://github.com/TinyAGI/tinyclaw/pull/142) |
| 🟡 **中** | 插件 Hook 无超时机制 → 可能导致主进程阻塞 | **待合并** | [#149](https://github.com/TinyAGI/tinyclaw/pull/149) |
| 🟡 **中** | 技能文件符号链接在容器环境失效 | **已修复** | [#145](https://github.com/TinyAGI/tinyclaw/pull/145) ✅ |

> **风险预警**：#142 涉及多平台核心交互逻辑，建议优先 review 合并以保障用户体验。

---

## 6. 功能请求与路线图信号

| 需求来源 | 功能 | 可行性评估 | 版本预测 |
|:---|:---|:---|:---|
| [#144](https://github.com/TinyAGI/tinyclaw/issues/144) | **Per-thread 会话隔离** | ⭐⭐⭐⭐⭐ 高：架构上需扩展 `-c` 参数，与现有 session 管理耦合度中等 | v0.0.8 |
| [#147](https://github.com/TinyAGI/tinyclaw/pull/147) | **Monorepo 重构** | ⭐⭐⭐⭐☆ 高：基础设施变更，#127 合并后时机成熟 | v0.1.0（破坏性变更） |
| [#149](https://github.com/TinyAGI/tinyclaw/pull/149) + [#150](https://github.com/TinyAGI/tinyclaw/pull/150) | **OpenViking 插件 + 安全加固** | ⭐⭐⭐⭐⭐ 高：堆叠 PR 已就绪，#149 为基座 | v0.0.7 或 v0.0.8 |

**路线图信号**：项目正从 MVP 向 **平台化 + 企业级** 演进，安全、隔离、可扩展性成为下一阶段的三大支柱。

---

## 7. 用户反馈摘要

> 基于 Issue #144 的原始需求提炼

| 维度 | 反馈 |
|:---|:---|
| **痛点** | "Telegram topic 和 Discord thread 打到同一个 agent，上下文互相污染" —— 多频道部署时的**会话隔离缺失** |
| **使用场景** | 团队级部署：不同项目/话题需独立记忆，但共享同一后端资源 |
| **期望行为** | `--session-id <uuid>` 显式指定会话 + `--resume` 恢复特定上下文 |
| **满意度暗示** | 用户主动提出详细方案（含 CLI 设计），表明对项目长期投入意愿高 |

---

## 8. 待处理积压

| 条目 | 创建时间 | 状态 | 提醒 |
|:---|:---|:---|:---|
| [#142](https://github.com/TinyAGI/tinyclaw/pull/142) Discord/Telegram/队列修复 | 今日 | 🔴 **待合并** | 影响核心用户体验，建议 48h 内 review |
| [#147](https://github.com/TinyAGI/tinyclaw/pull/147) Monorepo 重构 | 今日 | 🟡 **待决策** | 需维护者确认架构方向，建议发起 RFC 讨论 |
| [#144](https://github.com/TinyAGI/tinyclaw/issues/144) 会话隔离 | 今日 | 🟡 **待响应** | 企业级需求，建议标记 `enhancement` + `help wanted` 或纳入里程碑 |

---

**项目健康度评分：🟢 良好**  
- 活跃度：高（8 PR/日）  
- 代码流动：健康（核心功能持续合入）  
- 社区参与：上升（企业场景需求涌现）  
- 风险点：#142 多平台修复待合并，monorepo 决策需明确

</details>

---
*本日报由 [agents-radar](https://github.com/duanyytop/agents-radar) 自动生成。*