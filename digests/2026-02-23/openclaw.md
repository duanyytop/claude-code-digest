# OpenClaw 项目动态日报 2026-02-23

> 数据来源: [openclaw/openclaw](https://github.com/openclaw/openclaw) | Issues: 500 | PRs: 500 | 生成时间: 2026-02-23 12:46 UTC

# OpenClaw 项目日报 | 2026-02-23

## 1. 今日速览

OpenClaw 今日呈现**极高活跃度**，24小时内 Issues 和 PR 各更新 500 条，形成 250:250 的健康开闭比例。v2026.2.22 版本发布后，社区围绕 **Mistral 提供商支持** 和 **浏览器扩展认证机制变更** 产生大量适配反馈。核心痛点集中在：Chrome 扩展 HMAC 令牌迁移导致的认证失败、Telegram/WhatsApp 等渠道插件的加载回归、以及 Windows 环境下的多项稳定性问题。项目维护节奏紧凑，已有 127 个 PR 完成合并/关闭，373 个待审 PR 显示社区贡献持续高涨。

---

## 2. 版本发布

### v2026.2.22 — "Mistral & Auto-Update" [🔗](https://github.com/openclaw/openclaw/releases/tag/v2026.2.22)

| 维度 | 详情 |
|:---|:---|
| **新增功能** | • **Mistral 提供商支持**：完整集成 Mistral API，包含内存嵌入（memory embeddings）和语音支持（#23845，@vincentkoc）<br>• **自动更新器**：新增 `update.auto.*` 配置，支持包安装场景下的稳定通道自动更新，默认关闭，带滚动延迟和抖动控制 |
| **破坏性变更** | ⚠️ **Chrome 扩展认证机制变更**：浏览器中继（Browser Relay）从"原始 gateway token"切换为 **HMAC-SHA256 派生令牌**（`HMAC(gatewayToken, "openclaw-extension-relay-v1:<port>")`），导致旧扩展配置失效 |
| **迁移注意事项** | • 扩展用户需重新配置：在 Chrome 扩展选项页使用派生令牌而非原始 `gateway.auth.token`<br>• 文档滞后问题：官方文档仍指示使用原始令牌，已引发大量 #24358/#24387/#24430 类 issue |

---

## 3. 项目进展

### 已合并/关闭的关键 PR（24h 内）

| PR | 作者 | 核心贡献 | 项目推进 |
|:---|:---|:---|:---|
| [#24482](https://github.com/openclaw/openclaw/pull/24482) | @mcaxtr | TTS: ElevenLabs `voiceId` 回归测试与诊断日志 | 解决长期存在的 voiceId 配置无效问题（#14764），提升 TTS 可靠性 |
| [#24431](https://github.com/openclaw/openclaw/pull/24431) | @s1korrrr | CI: 为 skills-python 作业添加 PyYAML 依赖 | 修复 CI 测试失败，保障技能开发工作流 |
| [#24329](https://github.com/openclaw/openclaw/pull/24329) | @merc1305 | CI: 同上（重复提交后关闭） | — |
| [#24410](https://github.com/openclaw/openclaw/pull/24410) | @chilu18 | CI: 同上 | — |
| [#24400](https://github.com/openclaw/openclaw/pull/24400) | @AcorpBG | Qwen3 FastAPI TTS 提供商（清理后合并） | 扩展本地 TTS 生态，支持语音风格指令 |
| [#24120](https://github.com/openclaw/openclaw/pull/24120) | @tenequm | OpenRouter: 移除冲突的 `reasoning_effort` 参数 | 修复 MiniMax M2.5 等推理模型 400 错误（#24119） |
| [#24230](https://github.com/openclaw/openclaw/pull/24230) | @aasmoth | 版本匹配修复（CLI vs Gateway） | 解决更新后版本不一致的诊断混乱 |
| [#23366](https://github.com/openclaw/openclaw/pull/23366) | @Amateur0x1 | 飞书文档：补充 `cardkit:card:write` 权限说明 | 完善中文本地化文档 |
| [#23977](https://github.com/openclaw/openclaw/pull/23977) | @danielpradilla | Node system.run 权限修复 | 修复 macOS→Linux 网关的 wildcard 授权失效 |
| [#23551](https://github.com/openclaw/openclaw/pull/23551) | @sunil-sadasivan | 社区插件：openclaw-sentinel 安全监控 | 扩展生态，提供 osquery 驱动的端点安全监控 |

**整体推进评估**：今日合并聚焦 **CI 稳定性、TTS 可靠性、认证兼容性** 三大主题，为 v2026.2.22 的广泛部署扫清障碍。Qwen3-TTS 和 Mistral 的连续合入显示多模态能力持续扩展。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论 | 👍 | 核心诉求 | 分析 |
|:---|:---:|:---:|:---|:---|
| [#23066](https://github.com/openclaw/openclaw/issues/23066) | 20 | 17 | Ubuntu 24.04 安装失败：`inappropriate ioctl for device` | **安装体验痛点**：官方 one-liner 脚本在主流 Linux 发行版失效，阻碍新用户入门 |
| [#17019](https://github.com/openclaw/openclaw/issues/17019) | 27 | 31 | `400 Item 'rs_...' of type 'reasoning' was provided without its required following item` | **推理模型兼容性**：Claude 推理块序列化问题长期未根治，影响高级用户 |
| [#8576](https://github.com/openclaw/openclaw/issues/8576) | 29 | 7 | `@openclaw/feishu` 安装错误 | **国际化生态**：飞书插件作为中国用户主要入口，维护状态不透明 |
| [#7309](https://github.com/openclaw/openclaw/issues/7309) | 5 | 12 | DeepSeek API 一级支持 | **模型多样性需求**：用户希望原生 DeepSeek 而非 OpenAI-compatible 变通方案 |
| [#13248](https://github.com/openclaw/openclaw/issues/13248) | 7 | 12 | 完整 MCP（Model Context Protocol）支持 | **协议标准化**：社区期待与 Claude Desktop 等工具的互操作性 |

### 高反应 PRs

| PR | 👍 | 意义 |
|:---|:---:|:---|
| [#24472](https://github.com/openclaw/openclaw/pull/24472) | 待定 | `exec` 工具支持 `cmd` 别名，解决 Ollama 本地模型兼容性问题 |
| [#24471](https://github.com/openclaw/openclaw/pull/24471) | 待定 | 土耳其语停用词过滤，国际化持续扩展 |

---

## 5. Bug 与稳定性

### 按严重程度排列

| 严重度 | Issue | 描述 | 状态 | Fix PR |
|:---|:---|:---|:---|:---|
| 🔴 **P0-崩溃/阻断** | [#24236](https://github.com/openclaw/openclaw/issues/24236) | 全新安装后 **0/37 插件加载**，所有渠道插件不可用 | 开放 | [#24428](https://github.com/openclaw/openclaw/pull/24428) 待审 |
| 🔴 **P0-认证失效** | [#24358](https://github.com/openclaw/openclaw/issues/24358) [#24387](https://github.com/openclaw/openclaw/issues/24387) [#24430](https://github.com/openclaw/openclaw/issues/24430) | Chrome 扩展 HMAC 令牌变更导致 **"Gateway token rejected"** | 开放 | [#24436](https://github.com/openclaw/openclaw/pull/24436) [#24437](https://github.com/openclaw/openclaw/pull/24437) [#24418](https://github.com/openclaw/openclaw/pull/24418) 待审 |
| 🟡 **P1-功能退化** | [#24395](https://github.com/openclaw/openclaw/issues/24395) | v2026.2.22 **所有渠道插件被禁用**，回滚至 2026.2.19 恢复 | 开放 | [#24407](https://github.com/openclaw/openclaw/pull/24407) 待审 |
| 🟡 **P1-数据丢失** | [#23307](https://github.com/openclaw/openclaw/issues/23307) | 升级时 `${ENV_VAR}` 被解析为明文，配置迁移破坏安全实践 | 开放 | [#24379](https://github.com/openclaw/openclaw/pull/24379) 待审 |
| 🟡 **P1-平台兼容** | [#24263](https://github.com/openclaw/openclaw/issues/24263) | Windows 上 WhatsApp 渠道配置 **"Unrecognized key: enabled"** | 开放 | — |
| 🟢 **P2-体验问题** | [#24465](https://github.com/openclaw/openclaw/issues/24465) | npm 全局安装后 Control UI **404** | 开放 | — |
| 🟢 **P2-文档滞后** | [#24477](https://github.com/openclaw/openclaw/issues/24477) | `config.get` 泄露敏感环境变量值 | 开放 | [#24479](https://github.com/openclaw/openclaw/pull/24479) 待审 |

**稳定性评估**：v2026.2.22 存在 **渠道插件加载机制的重大回归**，影响面覆盖 Telegram、Discord、WhatsApp 等核心场景。建议维护者优先合并 #24428、#24407 等修复。

---

## 6. 功能请求与路线图信号

| 功能请求 | Issue | 已有 PR | 纳入可能性 |
|:---|:---|:---|:---:|
| **任务型智能模型路由** | [#19166](https://github.com/openclaw/openclaw/issues/19166) | — | ⭐⭐⭐ 高：与现有 model-router 插件架构契合 |
| **代理级工具权限限制** | [#24372](https://github.com/openclaw/openclaw/issues/24372) | [#24361](https://github.com/openclaw/openclaw/pull/24361) 待审 | ⭐⭐⭐ 高：安全硬需求，PR 已提供实现 |
| **代理级 memory.md/SOUL.md** | [#24207](https://github.com/openclaw/openclaw/issues/24207) | — | ⭐⭐⭐ 高：多代理场景基础能力 |
| **Cron 失败重试策略** | [#24355](https://github.com/openclaw/openclaw/issues/24355) | [#24435](https://github.com/openclaw/openclaw/pull/24435) 待审 | ⭐⭐⭐ 高：可靠性改进，PR 就绪 |
| **GitHub 原生渠道** | [#24386](https://github.com/openclaw/openclaw/issues/24386) | — | ⭐⭐☆ 中：生态扩展，需评估维护成本 |
| **手机适配 WebUI** | [#22590](https://github.com/openclaw/openclaw/issues/22590) | — | ⭐⭐☆ 中：中国用户痛点，已有 hooks 基础 |
| **MCP 完整支持** | [#13248](https://github.com/openclaw/openclaw/issues/13248) | — | ⭐⭐☆ 中：协议标准，已有 mcporter 基础 |
| **DeepSeek 一级支持** | [#7309](https://github.com/openclaw/openclaw/issues/7309) | — | ⭐⭐☆ 中：可通过 OpenAI-compatible 变通，优先级待定 |

---

## 7. 用户反馈摘要

### 真实痛点

> *"每条 Telegram 用户消息触发 2 条回复，间隔约 1 秒"* — [#24280](https://github.com/openclaw/openclaw/issues/24280)，@kdsz001  
> **场景**：生产环境消息重复投递，严重影响用户体验

> *"在中国常见的代理网络场景下，Fake-IP 模式导致 web_fetch 被 SSRF 拦截"* — [#24452](https://github.com/openclaw/openclaw/issues/24452)，@reallinzc  
> **场景**：国内用户特殊网络环境下的功能阻断

> *"Agent 频繁停止并报告 API key 过期，但几分钟后同一 provider 又正常工作"* — [#24362](https://github.com/openclaw/openclaw/issues/24362)，@fwends  
> **场景**：误判导致的服务可用性幻觉

### 满意之处

- Mistral 提供商的快速集成（#23845）
- 自动更新器的稳定性设计（滚动延迟+抖动）

### 不满之处

- **文档-实现不同步**：Chrome 扩展认证变更未同步更新文档
- **Windows 二等公民**：多项功能在 Windows 平台表现劣于 macOS/Linux
- **配置迁移风险**：升级过程可能破坏现有配置结构

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 天数 | 严重性 | 提醒 |
|:---|:---:|:---|:---|
| [#3460](https://github.com/openclaw/openclaw/issues/3460) | 26+ | 国际化基础设施 | **i18n 框架就绪但官方表态"无带宽支持多语言"**，社区 PR 持续提交但缺乏合并信号 |
| [#2597](https://github.com/openclaw/openclaw/issues/2597) | 27+ | 上下文管理 | 上下文使用百分比显示请求，与今日 [#24165](https://github.com/openclaw/openclaw/issues/24165) 压缩失效问题相关 |
| [#7175](https://github.com/openclaw/openclaw/issues/7175) | 21+ | 数据持久化 | 压缩前钩子请求，与 [#24352](https://github.com/openclaw/openclaw/issues/24352) 预会话结束钩子形成互补需求 |
| [#8255](https://github.com/openclaw/openclaw/issues/8255) | 20+ | 扩展性 | 文件写入后钩子，与技能系统深度集成需求 |

### 待审关键 PR 提醒

| PR | 天数 | 风险 |
|:---|:---:|:---|
| [#24467](https://github.com/openclaw/openclaw/pull/24467) | 0 | **外部内存后端审计跳过**，多作者 XL 规模，需仔细 review |
| [#24154](https://github.com/openclaw/openclaw/pull/24154) | 0 | **外部内存后端支持**，同样 XL 规模，与 #24467 存在潜在冲突 |
| [#24361](https://github.com/openclaw/openclaw/pull/24361) | 0 | **代理级技能过滤**，安全硬需求，建议优先 |
| [#24421](https://github.com/openclaw/openclaw/pull/24421) | 0 | **执行图运行时 v0**，架构级变更，需架构师 review |

---

**日报生成时间**：2026-02-23  
**数据来源**：GitHub API 实时抓取  
**项目健康度**：🟡 **活跃但需关注稳定性回归** — 高贡献量伴随 v2026.2.22 的适配阵痛，建议 48 小时内优先合并渠道插件加载修复。

---
*本日报由 [ai-cli-radar](https://github.com/duanyytop/ai-cli-radar) 自动生成。*