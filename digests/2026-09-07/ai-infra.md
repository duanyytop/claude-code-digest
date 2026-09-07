# AI 基础设施日报 2026-09-07

> 生成时间: 2026-09-07 00:18 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# **跨项目AI基础设施生态报告 – 2026-09-07**

---

### **1. 生态概览**  
AI推理与服务生态正进入高度专业化与硬件融合的新阶段，下一代GPU（尤其是NVIDIA Blackwell SM120/GB10）正在推动所有主要项目的架构创新。vLLM、SGLang和Unsloth正积极优化混合模型（Mamba/GDN）、稀疏注意力及统一内存系统，而llama.cpp与Ollama则聚焦轻量级部署与跨平台可访问性。高吞吐、多节点基础设施平台与消费级本地运行时之间已形成明显分野——各自针对从云规模大模型网关到边缘设备的不同应用场景。

---

### **2. 活跃度对比**  

| 项目       | 当前开放问题数 (Today) | 当日合并的PR数 (Today) | 发布状态         |
|---------------|---------------------|--------------------|------------------------|
| **vLLM**      | 8                   | 12                 | 无                   |
| **SGLang**    | 15                  | 7                  | 无新版本发布         |
| **llama.cpp** | 14                  | 6                  | `b10830`, `b10829`, `b10823` |
| **Ollama**    | 11                  | 0                  | 无                   |
| **LiteLLM**   | 12                  | 5                  | `v1.101.0-rc.1` (RC)   |
| **Unsloth**   | 12                  | 6                  | 无新版本发布         |

> ✅ *洞察：* vLLM在开发活跃度上领先，紧随其后的是SGLang与Unsloth。尽管存在高严重性稳定性问题，Ollama却表现出极低的开发活动——表明其核心工程投入可能已停滞。

---

### **3. 模型支持竞赛**  

| 新模型 / 架构     | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**       | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **DeepSeek-V4-Flash**        | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash**            | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **Spark2_5ForCausalLM**      | ❌   | ❌     | ✅        | ⚠️ (待定) | ❌      | ❌      |
| **Gemma 3/4 (sm120/sm121)**  | ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **EXL3 (ExLlamaV3)**         | ❌   | ❌     | ❌        | ❌     | ❌      | ✅      |

> 🏆 **排行榜**：  
> - **vLLM** 在Blackwell架构上对最新旗舰模型（`Qwen3.8`、`DeepSeek-V4`、`GLM-5.3`）的支持处于领先地位。  
> - **llama.cpp** 在原生架构集成方面占优（如Spark2_5）。  
> - **Unsloth** 通过EXL3后端率先支持MoE——这是其独特差异化优势。

---

### **4. 性能前沿**  

| 优化重点         | vLLM                              | SGLang                            | llama.cpp                         | Ollama                          | LiteLLM                           | Unsloth                             |
|----------------------------|-----------------------------------|-----------------------------------|-----------------------------------|----------------------------------|-----------------------------------|-------------------------------------|
| **KV缓存效率**    | 基于UUID的缓存机制、抢占支持    | 广播优化、池化策略                | QKV融合、懒加载模式               | 前缀缓存截断错误                | 缓存控制注入                      | 共享缓存抢占（PR #10301）           |
| **批处理与吞吐**  | 稀疏注意力、混合Mamba/GDN        | TP/DP流水线优化                   | Flash注意力调优                   | Vulkan内存失败                  | 自适应路由                        | 多Spark异步路由                     |
| **量化**           | SM120上的NVFP4、FP8              | b12x GEMM、FP4自动选择             | Q4_K/Q5_K多矩阵乘法               | MLX前缀缓存税                   | 成本感知路由                      | EXL3（MoE + 2–8位）                |
| **分布式服务**    | ROCm CI、MLA后端                 | 双Spark集群                       | 有限支持                          | ❌                               | 多租户代理                        | 流水线训练、双Spark架构             |
| **内核级调优**    | 索引器预算、内存安全              | DSA主机层、Triton内核              | RDNA4、gfx1201优化                 | Flash注意力崩溃（GPU）          | 流式支出日志                      | Torchcodec钉定                     |

> 🔥 **核心趋势**：  
> - **统一内存与稀疏注意力**已成为大规模性能的核心要素（vLLM/SGLang）。  
> - **MoE与混合架构**正迅速普及，由Unsloth的EXL3与vLLM对Mamba/GDN的支持引领。  
> - **量化效率**不再仅关乎体积——更与正确性绑定（如llama.cpp中修复GDN归一化问题）。

---

### **5. 层级定位**  

| 项目       | 主要层级                     | 核心差异化                                                                 |
|---------------|-----------------------------------|-------------------------------------------------------------------------------------|
| **vLLM**      | 高性能推理引擎 | 行业标准的大规模低延迟服务；强GPU内核聚焦。   |
| **SGLang**    | 推理引擎 + 运行时        | 积极推进Blackwell优化；混合推测解码；配置重构。 |
| **llama.cpp** | 本地运行时 / 可移植推理  | 跨平台可移植性；以GGUF为先的设计；适用于边缘、iGPU、Apple Silicon场景。 |
| **Ollama**    | LLM网关 / CLI工具             | 开发者友好界面；可观测性、稳定性与扩展性薄弱。        |
| **LiteLLM**   | LLM API网关 / 代理层      | 多提供商抽象；成本追踪；通过cosign签名实现安全。            |
| **Unsloth**   | 训练/微调 + 推理   | 全栈平台：压缩、训练、导出、Studio UI；原生支持MoE。          |

> 📌 **定位洞察**：  
> - **vLLM/SGLang** 在**云原生推理引擎**领域占据主导地位。  
> - **llama.cpp** 仍是**本地、嵌入式或受限环境**的首选。  
> - **Unsloth** 正构建一个**全栈AI生产力平台**，弥合训练与推理之间的鸿沟。  
> - **Ollama** 作为**开发者入门层**尚可，但缺乏企业级可靠性。  
> - **LiteLLM** 是**多云编排层**的关键角色，对成本敏感、供应商无关部署至关重要。

---

### **6. 趋势信号**  

#### 🔍 **从今日活动提取的关键行业趋势**：
1. **以硬件为中心的优化已成为基本要求**  
   所有头部项目均瞄准SM120/GB10与集成GPU。`NVFP4`、`统一内存`、`稀疏注意力`等特性已不再是实验性功能——而是基础架构组成部分。

2. **混合架构正成为主流标准**  
   结合Mamba、GDN与MTP的模型已进入主流。vLLM与SGLang正积极修复此类配置中的缓存缺失与非确定性问题——这对强化学习/智能体工作流至关重要。

3. **可观测性与可信度正成为关键需求**  
   LiteLLM的cosign签名镜像与Prometheus指标请求反映出对供应链完整性与监控的日益增长的需求。Ollama缺乏`/metrics`接口，是生产环境使用的严重警示。

4. **稳定性优先于新奇性**  
   尽管功能快速迭代，但高严重性回归问题（如Ollama中的JSON拆分错误、SGLang的静默崩溃）表明：**可靠性仍落后于创新速度**。

5. **本地与云端差距持续扩大**  
   尽管vLLM/SGLang致力于大规模分布式推理，llama.cpp与Unsloth则强调**低开销、本地执行**——这一趋势因Apple Silicon、AMD iGPU及T-Head PPU支持而加速。

---

### ✅ **应用开发者建议**  
- **生产级、可扩展推理**且使用Blackwell GPU时，选择vLLM或SGLang。  
- **边缘、移动端或纯CPU部署**且使用量化模型时，使用llama.cpp。  
- **避免将Ollama用于关键任务负载**，因其存在未解决的JSON拆分问题及MLX重预填充延迟。  
- **仅在需要多提供商路由与成本控制时才使用LiteLLM**——务必修补自适应路由崩溃问题。  
- **密切监控Unsloth**——其EXL3后端支持MoE微调，但Windows代码完整性阻断与Ollama同步错误可能破坏工作流。  
- **始终验证推测解码输出**——混合模型边缘情况（如首次重复缓存缺失）可能导致智能体行为无声退化。

> 🛠 **最终提示**： “直接本地运行”的时代已经结束。当今的AI基础设施要求**硬件感知调优、类型安全与可观测性**——而不仅仅是模型访问。优先选择具备活跃稳定性修复与健全测试的平台。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-07

## **Today's Highlights**  
vLLM 持续推进对下一代硬件和混合架构的支持，针对高并发及稀疏注意力场景下 `Qwen3.8-Flash-Next` 与 `DeepSeek-V4-Flash` 的非确定性问题提供了关键修复。新提交解决了集成 GPU（SM120/GB10）上的显存耗尽问题，改进了多模态基于 UUID 的缓存机制，并扩展了 MLA 后端的 ROCm CI 覆盖范围。

## **Releases & Breaking Changes**  
过去 24 小时内未报告发布或破坏性变更。

## **New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash**：现已支持 `FLASHINFER_MLA_SPARSE_SM120`，无需手动修改 `index_topk=2044` 配置，通过 PR [#55563](https://github.com/vllm-project/vllm/pull/55563) 实现。  
- ✅ **Gemma 3/4 (sm120/sm121)**：通过 FlashInfer FA2 路径，在消费级/SoC Blackwell GPU 上启用了 NVFP4 KV 缓存 ([PR #46329](https://github.com/vllm-project/vllm/pull/46329))。  
- ✅ **ROCm MLAs**：扩展了 `ROCM_AITER_FA` 与 `FLASH_ATTN` 预填充后端的 CI 测试覆盖 ([PR #55611](https://github.com/vllm-project/vllm/pull/55611))。  
- ✅ **多模态 UUID 缓存**：媒体缓存键现在基于 URL 生成唯一标识符（UUID），支持跨请求复用并提前跳过加载/解码过程 ([PR #55616](https://github.com/vllm-project/vllm/pull/55616), [#55583](https://github.com/vllm-project/vllm/pull/55583))。

## **Performance & Optimization**  
- 🔥 **稀疏注意力内存安全性**：PR [#55572](https://github.com/vllm-project/vllm/pull/55572) 在统一内存 GPU（如 GB10/DGX Spark）上降低了默认索引器 logits 预算，防止长预填充阶段出现 OOM。  
- 🚀 **混合 Mamba/GDN + MTP**：修复了在 Qwen3.8-27B-FP8 模型上首次重复前缀缓存缺失的问题 ([Issue #53504](https://github.com/vllm-project/vllm/issues/53504))。  
- ⚙️ **KV 缓存效率**：PR [#55603](https://github.com/vllm-project/vllm/pull/55603) 改进了关于 `gpu_memory_utilization` 的错误提示信息，更清晰地说明了注意力后端的影响。  
- 📊 **Mypy 强制执行**：测试中向全量静态类型检查迈进；PR [#55485](https://github.com/vllm-project/vllm/pull/55485) 解决了“中等难度”测试目录中的 mypy 错误。

## **Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|-------|-------------|------------|
| Critical | [#54521](https://github.com/vllm-project/vllm/issues/54521) | `Qwen3.8-Flash-Next` 在 `temperature=0` 且上下文接近 `indexer_budget` 时，贪婪解码出现非确定性行为 | 进行中 |
| Critical | [#53257](https://github.com/vllm-project/vllm/issues/53257) | `DeepSeek-V4-Flash` 在 `temperature=0` 时输出非确定，随并发度升高而加剧 | 进行中 |
| High | [#55571](https://github.com/vllm-project/vllm/issues/55571) | 在持续负载下使用 FP8 模型时，RTX PRO 5000（SM120）出现 CUDA 非法内存访问（“地址越界”） | 临时解决方案：`VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager` |
| High | [#53504](https://github.com/vllm-project/vllm/issues/53504) | 混合 Mamba/GDN 模型结合 MTP 试探性解码时，首次重复命中前缀缓存失败 | PR 待审：[#55617](https://github.com/vllm-project/vllm/pull/55617) |
| Medium | [#51977](https://github.com/vllm-project/vllm/issues/51977) | 使用工具调用时，`gpt-oss-120b` 出现 `openai_harmony.HarmonyError: message header 中存在意外残留标记` | 已开放 |

## **What This Means for Application Developers**  
- **避免生产环境中的非确定性行为**：若使用 `Qwen3.8-Flash-Next` 或 `DeepSeek-V4-Flash` 且 `temperature=0`，请确保提示长度低于 `indexer_budget`，或采用临时方案（如 `--enforce-eager`）。  
- **充分利用新的缓存优化**：多模态请求现在可通过 `VLLM_EARLY_UUID_LOOKUPS` 和基于 UUID 的缓存查找跳过冗余的媒体解码。  
- **监控集成设备上的显存使用情况**：在 GB10/DGX Spark 系统上，若遇到 OOM，建议降低 `indexer_logits_budget` 或禁用稀疏注意力。  
- **为更严格的类型检查做好准备**：随着测试中持续推行 mypy 检查，未来版本将引入更严格的类型校验——请确保自定义算子和扩展组件具备类型安全性。  
- **关注试探性解码的边缘情况**：混合 GDN/Mamba 模型在启用 TurboQuant + MTP 时可能无声降级；在强化学习或代理工作流中务必严格验证输出结果。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### **1. 今日亮点**  
SGLang 正在积极推进对 Blackwell GPU（SM120）和 Apple Silicon 的支持，针对高端硬件对 `DeepSeek-V4` 和 `GLM-5.3-Flash` 进行关键性能优化。主要贡献包括：在 SM120 上默认启用 FlashInfer 的 `b12x` NVFP4 GEMM，以及对配置命名空间声明的大幅重构，以提升可维护性。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布。*  
然而，当前对配置和后端选择的调整可能会影响使用 `--fp4-gemm-backend auto`、`--enable-unified-memory` 或自定义推测解码策略（如 `NEXTN` → `EAGLE` 别名）部署模型的用户。使用 `DeepSeek-V4` 或 `GLM-5.3-Flash` 的开发者应关注 [PR #38170](https://github.com/sgl-project/sglang/pull/38170) 和 [Issue #38236](https://github.com/sgl-project/sglang/issues/38236)。

---

### **3. 新模型与硬件支持**  
- ✅ **Apple Silicon（M 系列）**：活跃开发路线图 ([#19137](https://github.com/sgl-project/sglang/issues/19137), [#32321](https://github.com/sgl-project/sglang/issues/32321))，提出由 Torch 主导的 SRT 路径及 MLX 导出方案；暂无二进制发布。  
- ✅ **平头哥 PPU（ZW810/810e/890p）**：正式启动官方路线图 ([#37519](https://github.com/sgl-project/sglang/issues/37519)) — 计划实现一级上游支持。  
- ✅ **DGX Spark（GB10, SM121, aarch64）**：通过 `sglang-kernel` 轮子实现部分支持，当前追踪于 [#29317](https://github.com/sgl-project/sglang/issues/29317)；缺少 SM121 aarch64 轮子的问题仍未解决。  
- ✅ **Qwen3.8-Flash-Next NVFP4**：已添加 1x/2x DGX Spark 与 RTX PRO 6000 的验证配方 ([PR #37995](https://github.com/sgl-project/sglang/pull/37995))。

---

### **4. 性能与优化**  
- 🚀 **Blackwell 统一内存**：PR [#37926](https://github.com/sgl-project/sglang/pull/37926) 解决了解码性能差距问题——在 B300 上（Kimi-Linear, TP2/DCP2），统一内存仅比静态池慢 **1.96%**。  
- ⚡ **FlashInfer GEMM 选择**：PR [#38170](https://github.com/sgl-project/sglang/pull/38170) 在 SM120 上默认启用 `b12x` NVFP4 GEMM，显著加快 `DeepSeek-V4` 与 `GLM-5.3-Flash` 的冷权重计算速度。  
- 🔁 **KV 广播优化**：PR [#37950](https://github.com/sgl-project/sglang/pull/37950) 通过让一个 rank 拉取并经 NVLink 中继，减少 Prefill CP → Decode TP 架构中的冗余跨节点 KV 传输。  
- 🧩 **配置重构**：PRs [#38113](https://github.com/sgl-project/sglang/pull/38113), [#38114](https://github.com/sgl-project/sglang/pull/38114) 统一配置声明逻辑——提升各后端间的可读性与可维护性。

---

### **5. 稳定性与回归问题**  
*今日报告的关键问题（按严重性排序）：*  
1. **GLM-5.3-Flash 在流水线并行下启动崩溃** ([#36906](https://github.com/sgl-project/sglang/issues/36906)) — `KeyError: 'residual'` — 阻碍 TP 配置下的部署。  
2. **GLM-5.3-Flash DSA 主机层级加载回传导致生成结果损坏** ([#38031](https://github.com/sgl-project/sglang/issues/38031)) — 即使未启用推测解码，也会引发工具调用丢失和退化循环（8×H100, TP8）。  
3. **MiniMax-M3 W4A16 压缩张量输出全为 NUL token** ([#38143](https://github.com/sgl-project/sglang/issues/38143)) — Triton MiniMaxSparse 路径失败；在 vLLM 上运行正常。  
4. **DeepSeek-V4 长上下文预填充因非法内存访问失败** ([#37892](https://github.com/sgl-project/sglang/issues/37892)) — DSA 索引器内核中 `topk_v1.cuh:348` 处崩溃。  
5. **DRAFT KV 池预算使用 `tp_size` 而非 `attn_tp_size`** ([#38202](https://github.com/sgl-project/sglang/issues/38202)) — 在 Kimi-K3 的 DP 注意力场景下导致 OOM。  

> 🔍 *注意：* 多个回归问题与 Blackwell GPU 上的 `GLM-5.3-Flash` 及 `DeepSeek-V4` 相关——开发者应避免在修复落地前使用 `--dsa-prefill-backend triton`。

---

### **6. 对应用开发者的启示**  
- **避免在 `DeepSeek-V4` 上使用 `--speculative-algorithm NEXTN`**，直到 [PR #38236](https://github.com/sgl-project/sglang/issues/38236) 解决——当前因钩子解析顺序问题而失败。  
- **在 Blackwell 上谨慎使用 `--enable-unified-memory`**；尽管性能接近静态池，仍需验证高并发下的稳定性。  
- **密切关注 GLM-5.3-Flash 部署**——多个活跃缺陷影响正确性和稳定性；建议锁定至 `v0.5.16` 或更早版本，直至 [Issue #37524](https://github.com/sgl-project/sglang/issues/37524) 关闭。  
- **对于 Apple Silicon 与 T-Head PPU**，请预期早期支持阶段——欢迎通过相应路线图提交贡献。  
- **利用新文档** ([PR #37995](https://github.com/sgl-project/sglang/pull/37995)) 获取在 DGX Spark 与 RTX PRO 6000 上经验证的 Qwen3.8-Flash-Next NVFP4 配置。  

> ✅ *最佳实践：* 始终使用 `--tokenizer-worker-num=1` 测试推测解码流程，以避免 OTel 追踪间隙 ([#38210](https://github.com/sgl-project/sglang/issues/38210))。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp 消息简报 – 2026-09-07**

---

### **1. 今日亮点**  
最新更新聚焦于在多种后端上优化推理的稳定性和性能，重点改进了量化模型处理及 GPU 内核优化。值得注意的是，新增对 `Spark2_5ForCausalLM` 架构的支持，并修复了 Flash Attention 内核中 GDN 归一化和 KV 缓存行为的关键问题。

---

### **2. 发布与破坏性变更**  
- `b10830`：在 HF 转 GGUF 过程中新增 `--fuse-qkv` 标志，将 Q/K/V 投影融合为单一的 QKV 张量，提升内存效率并减少内核调用次数。[PR #22780](https://github.com/ggml-org/llama.cpp/pull/22780)  
- `b10829`：将 GDN（门控差分网络）归一化从 `max` 改为 `rsqrt`，以与 Flash-Linear-Attention 的定义一致：`l2norm(x) = x * rsqrt(sum(x*x) + eps)` —— 对使用门控差分网络的模型正确性至关重要。[PR #28068](https://github.com/ggml-org/llama.cpp/pull/28068)  
- `b10823`：引入 `--log-jsonl` 用于结构化日志输出，将日志消息中的 `unknown` 替换为 `none`。[PR #28437](https://github.com/ggml-org/llama.cpp/pull/28437)

---

### **3. 新模型与硬件支持**  
- **模型支持**：完整集成 `Spark2_5ForCausalLM`（原名 `spark3`），涵盖 GGUF 转换、分词器预分词、架构注册及张量映射。[PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868)  
- **硬件后端**：  
  - Metal：为 M2 Max GPU 补齐缺失的 FA-vec 调优。[PR #28458](https://github.com/ggml-org/llama.cpp/pull/28458)  
  - OpenCL/CUDA：优化 `q4_K`、`q5_K` 多矩阵乘法操作的权重打包选择。[PR #28402](https://github.com/ggml-org/llama.cpp/pull/28402)  
  - Vulkan：修复分片 GGUF 的 mmproj 分块加载逻辑。[PR #28517](https://github.com/ggml-org/llama.cpp/pull/28517)

---

### **4. 性能与优化**  
- **Flash Attention 调优**：持续推进 RDNA4（gfx1201）架构下 `Q6_K` 与 `Q2_K` 的优化工作（通过 PR #25940 与 #28102），目标是在 AMD R9700 PRO 上提升单标记解码吞吐量。  
- **懒加载模式重构**：PR #28326 重新定义 `--lazy-mode auto`，使其可根据系统配置智能选择最优加载策略，解决 iGPU 系统上的性能退化问题（如 `qwen4exp` 预填充速度减半）。  
- **初步修复**：PR #28136 为 Qwen4Exp 的 PLE 表引入直接读取机制，预计在 GB10 硬件上实现超过 2 倍的预填充加速。  
- **内存效率**：`--fuse-qkv` 降低注意力计算开销，尤其适用于长上下文生成场景。

---

### **5. 稳定性与回归问题**  
- **严重回归**：在 AMD iGPU 上使用 Vulkan 时，`--lazy-mode auto` 导致 `qwen4exp` 的预填充吞吐量下降约 50%（减半），原因是 `TENSOR_READ_LAZY` 处理不当。[Issue #28160](https://github.com/ggml-org/llama.cpp/issues/28160)  
- **内核崩溃**：CUDA/HIP 的 Flash Attention 在 KQ 掩码中跳过内部 `-INF` 块，当启用 `--kv-unified` 时，长序列提示处理丢包率达 42–54%。[Issue #28495](https://github.com/ggml-org/llama.cpp/issues/28495)  
- **语法解析失败**：嵌套 JSON 模式中若 `maxLength >= 2000` 或对象为空，会导致不可解析的 GBNF 语法，破坏工具调用功能。[Issues #25746, #25923](https://github.com/ggml-org/llama.cpp/issues/25746), [PR #28518](https://github.com/ggml-org/llama.cpp/pull/28518) 修复枚举解析缺陷。  
- **Intel iGPU 崩溃**：Vulkan 驱动程序监视器静默取消提交，导致嵌入向量坍塌而无错误提示。[Issue #27634](https://github.com/ggml-org/llama.cpp/issues/27634)

---

### **6. 对应用开发者的启示**  
- **转换模型时使用 `--fuse-qkv`** 可减少内存占用并改善延迟，尤其适合高吞吐或低内存环境。  
- **在 AMD iGPU 上避免使用 `--lazy-mode auto`**，直到 PR #28326 合并；建议优先选用 `large` 或 `all` 模式以保证性能稳定。  
- **若使用大 `maxLength` 或嵌套对象，请谨慎验证工具调用语法**——除非已通过近期补丁修复，否则可能遭遇解析失败。  
- **在 CUDA/HIP 上使用 `--kv-unified` 时注意上下文长度性能退化**；长序列场景下建议暂时禁用该选项，直至内核修复上线。  
- **充分利用新推出的 Spark2_5 支持**，适用于基于 Hugging Face 的该架构部署流程。  

> 🔗 [GitHub 仓库](https://github.com/ggml-org/llama.cpp) | [官网: llama.app](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

### **1. 今日重点**  
Ollama 生态系统持续面临严峻的稳定性挑战，尤其在云端托管模型以及基于 MLX 的 Apple Silicon 推理场景。主要问题包括 `minimax-m3:cloud` 间歇性地将 JSON 输出拆分为 `reasoning` 与 `content` 两部分，导致响应不可用；`muse-glimmer:30b-mlx` 在 macOS M4 上持续处于“Stopping...”状态，即使重启后仍无法恢复；此外，v0.32.12 版本之后，Vulkan 后端在处理大型 AMD iGPU 工作负载时内存管理出现回归问题。与此同时，开发者对可观测性的需求日益增长，一个关键功能请求——提供 Prometheus `/metrics` 端点——正在获得越来越多的关注。

---

### **2. 发布与破坏性变更**  
*过去 24 小时内无新发布或破坏性变更报告。*

---

### **3. 新模型与硬件支持**  
- **新模型架构支持请求中**：`spark2_5`（用于 Spark-X2.5-4B/1.7B）原生支持尚未实现——尽管已可成功下载，但当前仍不被支持（#18195）[^1]。  
- **硬件后端问题**：由于自 v0.32.12 以来的回归问题，Vulkan 后端无法在 AMD iGPU 上加载 66GB 模型（#18272）[^2]。  
- **MLX 特定性能损耗**：在 MLX 运行器上，前缀缓存恢复被截断为 8192 的倍数，导致冷启动提示后固定出现 17–27 秒的重新预填充延迟（#18267）[^3]。

---

### **4. 性能与优化**  
- **持续的重新预填充开销**：由于前缀缓存对齐逻辑，MLX 用户在每次冷启动提示时需承受 17–27 秒的额外延迟（#18267）[^3]。  
- **Flash Attention 崩溃**：`qwen3-coder:30b` 在 Blackwell GPU（sm_120）上运行时，尽管内存分配成功，但在预热阶段仍会崩溃（#18276）[^4]。  
- **缺失指标端点**：缺乏内置的 Prometheus 监控 `/metrics` 端点；社区已有 PR 但尚未合并（#16998）[^5]。

---

### **5. 稳定性与回归问题**  
| 严重性 | 问题 | 描述 | 链接 |
|--------|------|------|------|
| 🔴 高 | 云模型输出拆分 | `minimax-m3:cloud` 间歇性地将 JSON 输出拆分至 `reasoning` 与 `content`，导致响应无法使用（#17987）[^6] |
| 🔴 高 | 持续“Stopping...”状态 | `muse-glimmer:30b-mlx` 在 macOS M4 上陷入“Stopping...”状态，即使重启也无法退出（#18269）[^7] |
| 🔴 高 | Vulkan 内存失败 | 在 AMD iGPU 上加载 66GB 模型时，自 v0.32.12 起出现“Command submission insufficient memory”错误（#18272）[^2] |
| 🟡 中 | 工具调用解析器失败 | `gemma4:12b` 输出格式错误的 `BEGIN_ARG/END_ARG` 语法，引发退化循环（#18275）[^8] |
| 🟡 中 | 模型名称验证过短 | 80 字符限制阻止了长 Hugging Face 模型名称的拉取（#18274）[^9] |

> ✅ *注意*：今日无针对高严重性问题的修复 PR 提交。`#16998` 指标端点 PR 仍处于开放状态。

---

### **6. 对应用开发者的启示**  
- **避免在关键工作流中使用 `:cloud` 标签**，直到 `minimax-m3:cloud` 的 JSON 拆分问题解决（#17987）；尽可能使用本地模型。  
- **谨慎使用 MLX 后端**——因前缀缓存截断，预计每次冷启动会有约 20 秒的开销；请相应优化代理提示设计。  
- **警惕静默失败**：如 `muse-glimmer:30b-mlx` 等模型可能看似活跃却无响应——建议通过 `ollama ps` 或自定义脚本实施健康检查。  
- **提前准备可观测性能力**：随着对 `/metrics` 端点的需求上升，建议自行构建围绕 `ollama run` 延迟与错误率的内部遥测体系，因官方指标仍不可用。  
- **谨慎使用 `OLLAMA_KEEP_ALIVE`**——它无法防止 `muse-glimmer:30b-mlx` 卡死（#18269）；务必独立验证模型运行时间。

---

[^1]: [Issue #18195 – spark2_5 架构支持](https://github.com/ollama/ollama/issues/18195)  
[^2]: [Issue #18272 – AMD iGPU 上 Vulkan 内存失败](https://github.com/ollama/ollama/issues/18272)  
[^3]: [Issue #18267 – MLX 前缀缓存重新预填充开销](https://github.com/ollama/ollama/issues/18267)  
[^4]: [Issue #18276 – Blackwell GPU 上 Flash Attention 崩溃](https://github.com/ollama/ollama/issues/18276)  
[^5]: [PR #16998 – 添加 /metrics 端点](https://github.com/ollama/ollama/pull/16998)  
[^6]: [Issue #17987 – Minimax-M3:cloud JSON 拆分](https://github.com/ollama/ollama/issues/17987)  
[^7]: [Issue #18269 – muse-glimmer:30b-mlx 卡在“Stopping...”](https://github.com/ollama/ollama/issues/18269)  
[^8]: [Issue #18275 – gemma4 工具调用解析器失败](https://github.com/ollama/ollama/issues/18275)  
[^9]: [Issue #18274 – 模型名称长度限制](https://github.com/ollama/ollama/issues/18274)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 摘要 – 2026-09-07**

---

### **1. 今日亮点**  
最新发布的候选版本 `v1.101.0-rc.1` 通过 cosign 签名的 Docker 镜像增强了安全性，进一步提升了生产环境部署的信任度。关键稳定性修复解决了自适应路由（`gammavariate: alpha and beta must be > 0.0`）中的持续崩溃问题以及流式支出日志记录失败问题，这两项问题此前已阻碍了核心使用场景。越来越多的问题反映出多租户代理配置面临的挑战，尤其是在预算控制、缓存作用域和 OAuth2 流程行为方面。

---

### **2. 发布与破坏性变更**  
- **`v1.101.0-rc.1`（发布候选版）**：所有 Docker 镜像现已通过 [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 签名，确保镜像完整性与来源可信。请使用 `docker pull --platform=linux/amd64` 以保证兼容性。  
- **`v1.100.0`**：稳定版本，无破坏性变更；推荐用于生产环境升级。  
- **注意**：从 `1.95.1` 升级至 `1.99.0+` 可能导致托管 OAuth2 流程中断——详情见 [#39665](https://github.com/BerriAI/litellm/issues/39665)。

---

### **3. 新模型与硬件支持**  
- 通过 DashScope 的 Anthropic 兼容 API 新增对 **Qwen3.7-Max** 的支持（模型名：`qwen3.7-max`，提供商：`anthropic`）。参见 [PR #29920](https://github.com/BerriAI/litellm/pull/29920)。  
- **Foundry Local** 作为首屈一指的 OpenAI 兼容服务提供商正式加入，支持 SDK 集成与官方品牌标识。参见 [PR #29449](https://github.com/BerriAI/litellm/pull/29449)。  
- **Bedrock Mantle**：在 `/openai/v1/responses` 路由上新增 SigV4/IAM 认证支持（PR #29711），实现仅 IAM 安全的 EKS 部署。

---

### **4. 性能与优化**  
今日未引入新的性能基准或内核优化。但：  
- 流式响应处理现在可保留 Qwen 模型的 `cache_control_injection_points`（PR #29335），提升缓存一致性。  
- 通过 `LITELLM_ECS_LOGS` 环境变量新增 ECS 日志支持（PR #29689），支持将结构化日志接入 Elastic Stack 与 Datadog ECS 模式。

---

### **5. 稳定性与回归问题**  
**严重（高优先级）：**  
- **重启后自适应路由崩溃**：因持久化状态异常触发 `gammavariate: alpha and beta must be > 0.0` 错误。已在 [PR #29398](https://github.com/BerriAI/litellm/pull/29398) 中修复。  
- **流式支出日志静默失败**：`dict object has no attribute 'usage'` 导致请求未计费。已在 [PR #29943](https://github.com/BerriAI/litellm/pull/29943) 中修复。

**中等优先级：**  
- **守卫规则错误以 500 返回而非 400**：自定义代码守卫抛出内部服务器错误。参见 [Issue #29436](https://github.com/BerriAI/litellm/issues/29436)。  
- **零成本模型被最大预算钩子阻断**：内部用户即使使用免费模型也触发预算限制。已在 [PR #29918](https://github.com/BerriAI/litellm/pull/29918) 中修复。  
- **Prometheus 显示 `Inf` 剩余预算**：尽管已配置预算。参见 [Issue #29937](https://github.com/BerriAI/litellm/issues/29937)。

---

### **6. 对应用开发者的启示**  
- **若使用自适应路由或流式响应，请立即升级**：`gammavariate` 崩溃与静默支出日志失败可能导致收入损失与服务中断。请应用来自 PR #29398 与 #29943 的补丁。  
- **验证多租户配置**：谨慎配置 `max_budget`、`internal_user` 角色与 `cache_control` —— 当前行为可能暴露跨团队资源共享中的潜在缺陷（参见 #29955、#29912）。  
- **生产环境使用签名镜像**：通过 `cosign verify` 强制镜像验证，防止供应链攻击。  
- **避免使用第三方回调端点**：从配置中移除 `webhook-test.com` 示例（PR #29791）；改用 `example.com`。  
- **监控 OAuth2 流程行为**：`1.96` 版本之后的升级可能导致用户被重定向至 LiteLLM UI 而非厂商认证页面（参见 #39665）。

> ✅ **建议操作**：审查所有标记为 `bug`、`proxy`、`llm translation` 与 `stale` 的开放问题。优先处理与成本追踪、认证及请求路由相关的修复。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-07**

---

### **1. 今日亮点**  
Unsloth 继续扩展其推理与训练基础设施，已在多节点 DGX Spark 支持方面取得重大进展，包括双 Spark 协调（PR #10280）和通过 PR #10323 实现的流水线训练。关键的 UI/UX 改进已合并至 PR #10405 与 #10407，修复了跨平台在不同缩放比例下图标对齐的问题。与此同时，团队正在积极处理阻止 Studio 在启用 Smart App Control 的 Windows 系统上启动的代码完整性拦截问题（PR #10404, #10408）。

---

### **2. 版本发布与破坏性变更**  
*过去 24 小时内无新版本发布。*  
但持续的变更包括：  
- **FP8/FP4 压缩导出需显式同意**（PR #9405, #9554）：`llm-compressor` 安装现需用户明确授权；自动 pip 安装功能已被禁用。  
- **Hub 运行时与配置解耦**（PR #9886）：Hub 现仅聚焦于模型/数据集发现，移除了嵌入式配置逻辑——对内部工作流为破坏性变更。

> 🔗 [PR #9405](https://github.com/unslothai/unsloth/pull/9405) | [PR #9554](https://github.com/unslothai/unsloth/pull/9554) | [PR #9886](https://github.com/unslothai/unsloth/pull/9886)

---

### **3. 新模型与硬件支持**  
- **新增 EXL3（ExLlamaV3）后端支持**（PR #7115）：现支持 2/3/4/6/8 位量化及 MoE 模型，内存占用低于 bitsandbytes，且支持对 Mixture-of-Experts 架构进行微调。  
- **请求 aarch64 容器镜像**（Issue #4198）：社区需求日益增长，希望提供原生 ARM64 构建，以简化在 Apple Silicon 及云上 ARM 集群的部署。  
- **Gemma3、Qwen3.5 与 Mistral Small 3.1** 正在多种配置下持续测试，报告存在稳定性问题（详见 Issue #4160, #3996, #2261）。

> 🔗 [PR #7115](https://github.com/unslothai/unsloth/pull/7115) | [Issue #4198](https://github.com/unslothai/unsloth/issues/4198)

---

### **4. 性能与优化**  
- **双 Spark 集群搭配异步副本路由**（PR #10323）：在 ConnectX-7 200GbE 网络下实现高效负载均衡，减少空闲时间，提升大规模训练吞吐量。  
- **共享缓存的 KV 预占机制**（PR #10301）：允许多个并行对话共享统一的 KV 缓存而无淘汰冲突——对高并发推理负载至关重要。  
- **Torchcodec 兼容性保护更新**（PR #7474）：确保正确锁定 torch 版本（如 torch 2.11），避免 CUDA 构建中出现无声版本不匹配问题。

> 🔗 [PR #10323](https://github.com/unslothai/unsloth/pull/10323) | [PR #10301](https://github.com/unslothai/unsloth/pull/10301) | [PR #7474](https://github.com/unslothai/unsloth/pull/7474)

---

### **5. 稳定性与回归问题**  
今日报告高严重性问题：  
1. **Windows 代码完整性拦截导致 Studio 启动失败**（PR #10404, #10408）：启用 Smart App Control 的用户因签名验证失败而遭遇“坏映像”错误。修复正在进行中。  
2. **Ollama 集成导致模型库存损坏**（Issue #9986）：通过 `ollama pull` 拉取的模型被错误标记为“source: unknown”，引发模式崩溃并被 Studio 库排除。  
3. **Qwen3.5 打包导致不稳定梯度**（Issue #4160）：即使在 96GB VRAM 上使用批量大小 1 训练，仍观察到 NaN 梯度范数——可能存在精度或内核问题。  
4. **纯 CPU 机器上 LLM 导出失败**（Issue #5008）：无论是否使用 `--no-torch`，安装程序均失败，阻碍了仅聊天场景下的 GGUF 在 CPU 上的使用。

> 🔗 [Issue #9986](https://github.com/unslothai/unsloth/issues/9986) | [Issue #4160](https://github.com/unslothai/unsloth/issues/4160) | [Issue #5008](https://github.com/unslothai/unsloth/issues/5008) | [PR #10404](https://github.com/unslothai/unsloth/pull/10404)

---

### **6. 对应用开发者的启示**  
- **在 MoE 与低内存部署中使用 EXL3**：新推出的 ExLlamaV3 后端为量化和训练 Mixtral 等 Mixture-of-Experts 模型提供了更优灵活性。  
- **准备应对受控压缩流程**：未来 `llm-compressor` 的导出将需要主动确认——请确保自动化流水线能处理 `install_missing_dependencies=True`。  
- **在启用了 Smart App Control 的 Windows 上避免 GPU 卸载**：若在企业级 Windows 机器上部署 Unsloth Studio，建议关闭 Smart App Control 或使用已签名的打包版本。  
- **监控 Ollama 集成状态**：在 #9986 修复前，请勿依赖 Studio 的 Ollama 同步功能——模型可能无法显示或加载失败。  
- **规划多节点 DGX Spark 工作流**：随着双 Spark 支持进入开发阶段，可利用流水线训练与统一 KV 缓存高效扩展训练任务。

> 📌 *建议*：谨慎锁定依赖版本——尤其是 torch 与 torchcodec，以避免无声版本不匹配（参见 PR #7474）。

</details>

---
*本日报由 [agents-radar](https://github.com/duanyytop/agents-radar) 自动生成。*