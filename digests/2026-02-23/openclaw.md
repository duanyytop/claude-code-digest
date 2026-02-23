# OpenClaw 项目动态日报 2026-02-23

> 数据来源: [openclaw/openclaw](https://github.com/openclaw/openclaw) | Issues: 500 | PRs: 500 | 生成时间: 2026-02-23 13:19 UTC

# OpenClaw 项目动态日报 | 2026-02-23

## 1. 今日速览

OpenClaw 今日呈现**极高活跃度**，24小时内 Issues 更新 500 条（新开/活跃 247，关闭 253），PR 更新 500 条（待合并 366，已合并/关闭 134），版本发布 1 个。社区聚焦于 **v2026.2.22 版本的适配问题**——大量用户反馈 Chrome 扩展浏览器中继认证变更（HMAC 派生令牌）、Telegram/WhatsApp 等频道插件加载异常、以及 Windows 环境下的配置验证问题。同时，Mistral 提供商支持正式上线，多语言内存搜索扩展（土耳其语、丹麦语等）持续推进。项目整体健康度良好，但需关注版本发布后的回归问题处理效率。

---

## 2. 版本发布

### v2026.2.22: openclaw 2026.2.22
**发布链接**: https://github.com/openclaw/openclaw/releases/tag/v2026.2.22

| 变更项 | 详情 |
|--------|------|
| **新增功能** | **Mistral 提供商支持** (#23845) — 包含内存嵌入和语音支持 |
| **核心更新** | 新增可选内置自动更新器 (`update.auto.*`)，默认关闭，支持稳定版延迟+抖动和测试版每小时检查 |
| **破坏性变更** | **浏览器扩展中继认证机制变更** — 从原始网关令牌改为 HMAC-SHA256 派生令牌，导致大量用户配置失效 |
| **迁移注意** | 用户需在 Chrome 扩展选项页重新配置令牌，或等待后续 PR 恢复向后兼容（见 #24489, #24436） |

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 作者 | 核心贡献 | 项目推进 |
|:---|:---|:---|:---|
| [#24479](https://github.com/openclaw/openclaw/pull/24479) | @merc1305 | **安全修复**: 在动态配置路径中脱敏敏感密钥（`env.GROQ_API_KEY` 等） | 解决 `config.get` 泄露 API 密钥问题，提升安全基线 |
| [#24471](https://github.com/openclaw/openclaw/pull/24471) | @gitwithuli | **国际化**: 添加土耳其语停用词过滤，扩展内存搜索多语言支持 | 内存搜索覆盖语言增至 6 种（西/葡/日/韩/阿/土） |
| [#24335](https://github.com/openclaw/openclaw/pull/24335) | @Kay-051 | **修复**: 防止 `thinking=low` 时推理内容泄露到 WhatsApp/Telegram | 解决 #24290 回归问题，提升消息隐私 |
| [#24413](https://github.com/openclaw/openclaw/pull/24413) | @justinhuangcode | **修复**: 停止将 macOS 菜单栏应用误识别为竞争网关服务 | 消除 #23846 误报，改善 macOS 用户体验 |
| [#24485](https://github.com/openclaw/openclaw/pull/24485) | @chilu18 | **修复**: 替换陈旧的 doctor/restart 命令提示 | 解决 #24351 和 #24220 的误导性 CLI 提示 |
| [#24431](https://github.com/openclaw/openclaw/pull/24431) | @s1korrrr | **CI 修复**: 在 skills-python 作业中安装 PyYAML | 修复 #24342 测试失败，保障技能系统 CI 稳定 |
| [#24410](https://github.com/openclaw/openclaw/pull/24410) | @chilu18 | **CI 修复**: 同上（重复提交，已合并） | — |

**整体推进**: 今日合并 PR 主要集中于**安全加固**（密钥脱敏）、**国际化扩展**（土耳其语）、**版本回归修复**（推理泄露、误报消除）和**基础设施稳定**（CI 修复）。项目在多语言支持和安全合规方面稳步前进，但 v2026.2.22 的认证变更引发的适配问题仍需大量社区资源消化。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论数 | 核心诉求 | 分析 |
|:---|:---|:---|:---|
| [#23861](https://github.com/openclaw/openclaw/issues/23861) | **10** | Raspberry Pi 安装失败：`npm install` 破坏系统 | **边缘设备部署痛点** — 用户报告 3 台 Pi 设备在安装过程中被破坏，反映 ARM/嵌入式环境的安装脚本健壮性不足 |
| [#8576](https://github.com/openclaw/openclaw/issues/8576) | **29** | Feishu 插件安装错误 `@openclaw/feishu` | **中国企业用户刚需** — 飞书集成问题长期未根治，29 条评论显示企业部署受阻，存在被竞品替代风险 |
| [#17019](https://github.com/openclaw/openclaw/issues/17019) | **27** | `400 Item 'rs_...' of type 'reasoning' was provided without its required following item` | **推理模型兼容性** — 高频技术错误，影响 Claude 等模型的推理功能，用户多次报告复发 |
| [#7309](https://github.com/openclaw/openclaw/issues/7309) | **5** | 支持 DeepSeek API 作为一等 LLM 提供商 | **国产模型需求** — 12 个 👍，用户希望原生支持 DeepSeek 而非手动配置，反映中国市场需求 |
| [#13248](https://github.com/openclaw/openclaw/issues/13248) | **7** | 完整 MCP（Model Context Protocol）支持 | **生态扩展需求** — 12 个 👍，用户注意到代码库已有 MCP 基础设施但缺乏用户级配置，希望解锁标准化工具调用 |

**背后诉求**: 社区核心矛盾在于 **"功能广度 vs. 稳定性深度"** — 用户既希望快速接入新模型（DeepSeek、Gemini 3.1）和协议（MCP），又受困于基础功能（安装、认证、频道插件）的回归问题。企业用户（Feishu、钉钉）的集成体验直接影响采用决策。

---

## 5. Bug 与稳定性

### 按严重程度排列

| 严重程度 | Issue | 描述 | 状态 | Fix PR |
|:---|:---|:---|:---|:---|
| **P0 - 阻断** | [#24395](https://github.com/openclaw/openclaw/issues/24395) | **所有频道插件在 v2026.2.22 中被禁用** — 配置写入 `channels.<id>.enabled` 但加载器读取 `plugins.entries.<id>.enabled` | 🔴 开放 | [#24428](https://github.com/openclaw/openclaw/pull/24428), [#24231](https://github.com/openclaw/openclaw/pull/24231) |
| **P0 - 阻断** | [#24358](https://github.com/openclaw/openclaw/issues/24358) | **Chrome 扩展中继认证失效** — HMAC 令牌变更导致 "Gateway token rejected" | 🔴 开放 | [#24489](https://github.com/openclaw/openclaw/pull/24489), [#24436](https://github.com/openclaw/openclaw/pull/24436), [#24437](https://github.com/openclaw/openclaw/pull/24437) |
| **P1 - 高** | [#24499](https://github.com/openclaw/openclaw/issues/24499) | OpenAI 适配器发送 `ROLE_UNSPECIFIED` 导致 Moonshot/Kimi API 400 错误 | 🟡 开放 | 无 |
| **P1 - 高** | [#24496](https://github.com/openclaw/openclaw/issues/24496) | Windows 11 ByteString 错误 — 字符值 1047 > 255 | 🟡 开放 | 无 |
| **P1 - 高** | [#24263](https://github.com/openclaw/openclaw/issues/24263) | WhatsApp 频道配置在 Windows 上损坏 — `Unrecognized key: "enabled"` | 🟡 开放 | [#24300](https://github.com/openclaw/openclaw/pull/24300) |
| **P2 - 中** | [#24494](https://github.com/openclaw/openclaw/issues/24494) | macOS 浏览器控制服务未监听端口 base+2 | 🟡 开放 | 无 |
| **P2 - 中** | [#24414](https://github.com/openclaw/openclaw/issues/24414) | 桌面应用"检查更新"显示旧版本为新版本 | 🟡 开放 | 无 |
| **P2 - 中** | [#24374](https://github.com/openclaw/openclaw/issues/24374) | MS Teams 频道 `startAccount` 立即 resolve 导致重启循环 | 🟡 开放 | [#24391](https://github.com/openclaw/openclaw/pull/24391) |

**稳定性评估**: v2026.2.22 发布引发 **2 个 P0 阻断性问题**（频道插件禁用、扩展认证失效），直接影响核心用户体验。已有 5+ PR 针对性修复，但合并节奏需加快。Windows 平台和第三方 API 适配（Moonshot）的回归测试覆盖不足。

---

## 6. 功能请求与路线图信号

| 功能请求 | 热度 | 技术可行性 | 纳入下一版本信号 |
|:---|:---|:---|:---|
| **DeepSeek 原生支持** (#7309) | 12 👍 | 高（OpenAI 兼容） | 🔶 可能 — 社区呼声高，需官方提供商注册 |
| **MCP 完整支持** (#13248) | 12 👍 | 中（基础设施存在） | 🔶 可能 — 代码库已有 `mcporter`，需用户配置层 |
| **任务级智能模型路由** (#19166) | 5 评论 | 中 | 🔶 可能 — 与现有 `model-router` 插件方向一致 |
| **reasoningDefault 配置键** (#24491, #24161) | 2 重复 | 高 | 🟢 高概率 — 简单配置扩展，PR 就绪 |
| **GitHub 原生频道** (#24386) | 0 👍 | 中 | 🔶 可能 — 企业场景，需 webhook + API 双向 |
| **手机适配 Web UI** (#22590) | 3 评论 | 中 | 🔶 可能 — 中国用户特定需求 |
| **代理级工具权限限制** (#24372) | 0 👍 | 中 | 🔶 可能 — 安全增强，多代理场景必需 |
| **会话归档/持久化** (#24066) | 2 评论 | 中 | 🔶 可能 — 与现有 compaction/memory 系统关联 |

**路线图信号**: 下一版本（v2026.2.23 或 v2026.3.x）可能聚焦：
1. **配置体验优化**（`reasoningDefault`、配置验证）
2. **中国生态适配**（DeepSeek、移动端 Web UI、Feishu 稳定）
3. **企业安全**（工具权限、会话隔离）

---

## 7. 用户反馈摘要

### 真实痛点

| 场景 | 反馈来源 | 核心不满 |
|:---|:---|:---|
| **版本升级后配置失效** | #24395, #24358, #24414 | "每次更新都破坏现有设置" — 信任损耗 |
| **多平台一致性差** | #24263 (Windows), #24494 (macOS) | "Windows 上总是更多问题" — 平台公平性质疑 |
| **错误信息误导** | #24220, #24351 | 建议的命令不存在，调试时间浪费 |
| **企业集成脆弱** | #8576 (Feishu), #24374 (MS Teams) | 企业 IM 集成不稳定，影响生产部署 |
| **安全与便利平衡** | #24384 (API 密钥泄露) | 状态消息泄露敏感信息，安全意识觉醒 |

### 满意点
- **多语言扩展积极**（土耳其语、丹麦语 PR 快速响应）
- **自动更新器上线**（长期请求的功能）
- **Mistral 支持及时**（新模型快速跟进）

---

## 8. 待处理积压

### 长期未响应的重要 Issue

| Issue | 创建时间 | 最后更新 | 风险 | 建议行动 |
|:---|:---|:---|:---|:---|
| [#3460](https://github.com/openclaw/openclaw/issues/3460) 国际化 (i18n) 与本地化支持 | 2026-01-28 | 今日 | 66 评论，0 👍，官方称"无带宽支持" | 设立社区翻译计划，官方提供技术框架 |
| [#5380](https://github.com/openclaw/openclaw/pull/5380) compaction 失败时保留最近消息 | 2026-01-31 | 今日 | 体验问题，用户数据丢失风险 | 评估合并，或纳入 compaction 重构 |
| [#7175](https://github.com/openclaw/openclaw/issues/7175) pre-compaction hook | 2026-02-02 | 今日 | 数据保护需求 | 与 #13032 (`session:before_end` hook) 统筹设计 |
| [#7598](https://github.com/openclaw/openclaw/issues/7598) 会话历史备份层 | 2026-02-03 | 今日 | 核心可靠性 | 优先级提升，关联 #24066 会话归档 |
| [#8255](https://github.com/openclaw/openclaw/issues/8255) 工作区文件 post-write hooks | 2026-02-03 | 今日 | 自动化工作流 | 评估与技能系统整合 |

**维护者提醒**: 积压 Issue 中 **#3460 国际化** 和 **#7598 会话备份** 属于架构级需求，建议在下个季度路线图中明确回应，避免社区贡献者因缺乏方向而流失。

---

*日报生成时间: 2026-02-23 | 数据来源: OpenClaw GitHub 仓库*

---
*本日报由 [agents-radar](https://github.com/duanyytop/agents-radar) 自动生成。*