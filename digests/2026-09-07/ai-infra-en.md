# AI Infrastructure Digest 2026-09-07

> Generated: 2026-09-07 00:18 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# **Cross-Project AI Infrastructure Ecosystem Report – 2026-09-07**

---

### **1. Ecosystem Overview**  
The AI inference and serving ecosystem is entering a phase of high specialization and hardware convergence, with next-gen GPUs (especially NVIDIA Blackwell SM120/GB10) driving architectural innovation across all major projects. vLLM, SGLang, and Unsloth are aggressively optimizing for hybrid models (Mamba/GDN), sparse attention, and unified memory systems, while llama.cpp and Ollama focus on lightweight deployment and cross-platform accessibility. A clear divide has emerged between high-performance, multi-node infrastructure platforms and consumer-grade local runtimes—each targeting distinct use cases from cloud-scale LLM gateways to edge devices.

---

### **2. Activity Comparison**  

| Project       | Issues Open (Today) | PRs Merged (Today) | Release Status         |
|---------------|---------------------|--------------------|------------------------|
| **vLLM**      | 8                   | 12                 | None                   |
| **SGLang**    | 15                  | 7                  | No new release         |
| **llama.cpp** | 14                  | 6                  | `b10830`, `b10829`, `b10823` |
| **Ollama**    | 11                  | 0                  | None                   |
| **LiteLLM**   | 12                  | 5                  | `v1.101.0-rc.1` (RC)   |
| **Unsloth**   | 12                  | 6                  | No new release         |

> ✅ *Insight:* vLLM leads in active development velocity, followed closely by SGLang and Unsloth. Ollama shows minimal activity despite high-severity stability issues—indicating potential stagnation in core engineering efforts.

---

### **3. Model Support Race**  

| New Model / Architecture     | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|------------------------------|------|--------|-----------|--------|---------|---------|
| **Qwen3.8-Flash-Next**       | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **DeepSeek-V4-Flash**        | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **GLM-5.3-Flash**            | ✅   | ✅     | ❌        | ❌     | ❌      | ❌      |
| **Spark2_5ForCausalLM**      | ❌   | ❌     | ✅        | ⚠️ (Pending) | ❌      | ❌      |
| **Gemma 3/4 (sm120/sm121)**  | ✅   | ❌     | ❌        | ❌     | ❌      | ❌      |
| **EXL3 (ExLlamaV3)**         | ❌   | ❌     | ❌        | ❌     | ❌      | ✅      |

> 🏆 **Leaderboard**:  
> - **vLLM** leads in support for latest flagship models (`Qwen3.8`, `DeepSeek-V4`, `GLM-5.3`) on Blackwell.  
> - **llama.cpp** holds an edge in native architecture integration (e.g., Spark2_5).  
> - **Unsloth** is pioneering MoE support via EXL3 backend—a unique differentiator.

---

### **4. Performance Frontier**  

| Optimization Focus         | vLLM                              | SGLang                            | llama.cpp                         | Ollama                          | LiteLLM                           | Unsloth                             |
|----------------------------|-----------------------------------|-----------------------------------|-----------------------------------|----------------------------------|-----------------------------------|-------------------------------------|
| **KV Cache Efficiency**    | UUID-based caching, preemption    | Broadcast optimization, pooling   | Fuse-QKV, lazy mode               | Prefix-cache truncation bug      | Cache control injection           | Shared cache preemption (PR #10301) |
| **Batching & Throughput**  | Sparse attention, hybrid Mamba/GDN| TP/DP pipeline optimization       | Flash attention tuning            | Vulkan memory failure            | Adaptive Router                   | Multi-Spark async routing             |
| **Quantization**           | NVFP4, FP8 on SM120                | b12x GEMM, FP4 auto-selection     | Q4_K/Q5_K multi-matmul            | MLX prefix-cache tax             | Cost-aware routing                | EXL3 (MoE + 2–8-bit)                |
| **Distributed Serving**    | ROCm CI, MLA backends             | Two-Spark clustering              | Limited                           | ❌                               | Multi-tenant proxy                | Pipeline training, two-Spark        |
| **Kernel-Level Tuning**    | Indexer budget, memory safety     | DSA host-tier, triton kernels     | RDNA4, gfx1201 optimizations      | Flash attention crash (GPU)      | Streaming spend logging           | Torchcodec pinning                  |

> 🔥 **Top Trends**:  
> - **Unified memory and sparse attention** are now central to performance at scale (vLLM/SGLang).  
> - **MoE and hybrid architectures** are gaining traction, led by Unsloth’s EXL3 and vLLM’s Mamba/GDN support.  
> - **Quantization efficiency** is no longer just about size—it’s tied to correctness (e.g., GDN normalization fix in llama.cpp).

---

### **5. Layer Positioning**  

| Project       | Primary Layer                     | Key Differentiators                                                                 |
|---------------|-----------------------------------|-------------------------------------------------------------------------------------|
| **vLLM**      | High-performance inference engine | Industry standard for large-scale, low-latency serving; strong GPU kernel focus.   |
| **SGLang**    | Inference engine + runtime        | Aggressive Blackwell optimization; hybrid speculative decoding; config refactoring. |
| **llama.cpp** | Local runtime / portable inference  | Cross-platform portability; GGUF-first design; ideal for edge, iGPU, Apple Silicon. |
| **Ollama**    | LLM gateway / CLI tool             | Developer-friendly interface; weak in observability, stability, and scaling.        |
| **LiteLLM**   | LLM API gateway / proxy layer      | Multi-provider abstraction; cost tracking; security via cosign signing.            |
| **Unsloth**   | Training/fine-tuning + inference   | Full-stack platform: compression, training, export, Studio UI; MoE-ready.          |

> 📌 **Positioning Insight**:  
> - **vLLM/SGLang** dominate the **cloud-native inference engine** space.  
> - **llama.cpp** remains the go-to for **local, embedded, or constrained environments**.  
> - **Unsloth** is building a **full-stack AI productivity platform**, bridging training and inference.  
> - **Ollama** functions as a **developer-onboarding layer**, but lacks enterprise-grade reliability.  
> - **LiteLLM** serves as a **multi-cloud orchestration layer**, essential for cost-aware, provider-agnostic deployments.

---

### **6. Trend Signals**  

#### 🔍 **Key Industry Trends Extracted from Today’s Activity**:
1. **Hardware-Centric Optimization Is Now Table Stakes**  
   All top projects now target SM120/GB10 and integrated GPUs. Features like `NVFP4`, `unified memory`, and `sparse attention` are no longer experimental—they’re foundational.

2. **Hybrid Architectures Are Becoming Standard**  
   Models combining Mamba, GDN, and MTP are now mainstream. Projects like vLLM and SGLang are actively fixing cache misses and non-determinism in these configurations—critical for RL/agent workflows.

3. **Observability and Trust Are Emerging as Critical Requirements**  
   LiteLLM’s cosign-signed images and Prometheus metrics request reflect growing demand for supply chain integrity and monitoring. Ollama’s lack of `/metrics` is a red flag for production use.

4. **Stability Over Novelty**  
   Despite rapid feature rollouts, high-severity regressions (e.g., JSON splitting in Ollama, silent crashes in SGLang) highlight that **reliability is still lagging behind innovation**.

5. **Local vs Cloud Divide Widens**  
   While vLLM/SGLang push for massive-scale distributed inference, llama.cpp and Unsloth emphasize **low-footprint, local execution**—a trend accelerated by Apple Silicon, AMD iGPUs, and T-Head PPU support.

---

### ✅ **Recommendations for Application Developers**  
- **Choose vLLM or SGLang** for production-grade, scalable inference on Blackwell GPUs.  
- **Use llama.cpp** for edge, mobile, or CPU-only deployments with quantized models.  
- **Avoid Ollama for mission-critical workloads** due to unresolved JSON splitting and MLX re-prefill delays.  
- **Leverage LiteLLM** only if you need multi-provider routing with cost controls—ensure you patch the adaptive router crash.  
- **Monitor Unsloth carefully**—its EXL3 backend enables MoE fine-tuning, but Windows code integrity blocks and Ollama sync bugs may break workflows.  
- **Always validate speculative decoding outputs**—hybrid model edge cases (e.g., first-repeat cache miss) can silently degrade agent behavior.

> 🛠 **Final Note**: The era of “just run it locally” is over. Today’s AI infrastructure demands **hardware-aware tuning, type safety, and observability**—not just model access. Prioritize platforms with active stability fixes and robust testing.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-07

## **Today's Highlights**  
vLLM continues to advance its support for next-gen hardware and hybrid architectures, with critical fixes for non-determinism in `Qwen3.8-Flash-Next` and `DeepSeek-V4-Flash` under high concurrency and sparse attention. New PRs address GPU memory exhaustion on integrated GPUs (SM120/GB10), improve multi-modal UUID-based caching, and expand ROCm CI coverage for MLA backends.

## **Releases & Breaking Changes**  
None reported in the last 24 hours.

## **New Model & Hardware Support**  
- ✅ **GLM-5.3-Flash**: Now supports `FLASHINFER_MLA_SPARSE_SM120` without requiring manual `index_topk=2044` config edits via PR [#55563](https://github.com/vllm-project/vllm/pull/55563).  
- ✅ **Gemma 3/4 (sm120/sm121)**: NVFP4 KV cache now enabled on consumer/SoC Blackwell GPUs via FlashInfer FA2 path ([PR #46329](https://github.com/vllm-project/vllm/pull/46329)).  
- ✅ **ROCm MLAs**: Expanded CI testing for `ROCM_AITER_FA` and `FLASH_ATTN` prefill backends ([PR #55611](https://github.com/vllm-project/vllm/pull/55611)).  
- ✅ **Multi-modal UUID Caching**: Media cache keys now use UUIDs derived from URLs, enabling cross-request reuse and early skip of loading/decoding ([PR #55616](https://github.com/vllm-project/vllm/pull/55616), [#55583](https://github.com/vllm-project/vllm/pull/55583)).

## **Performance & Optimization**  
- 🔥 **Sparse Attention Memory Safety**: PR [#55572](https://github.com/vllm-project/vllm/pull/55572) lowers default indexer logits budget on unified-memory GPUs (e.g., GB10/DGX Spark), preventing OOM during long prefills.  
- 🚀 **Hybrid Mamba/GDN + MTP**: Fixes first-repeat prefix cache miss issue on Qwen3.8-27B-FP8 models ([Issue #53504](https://github.com/vllm-project/vllm/issues/53504)).  
- ⚙️ **KV Cache Efficiency**: PR [#55603](https://github.com/vllm-project/vllm/pull/55603) improves error messaging around `gpu_memory_utilization`, clarifying attention backend impact.  
- 📊 **Mypy Enforcement**: Progress toward full static type checking in tests; PR [#55485](https://github.com/vllm-project/vllm/pull/55485) resolves "medium-hard" test directory mypy errors.

## **Stability & Regressions**  
| Severity | Issue | Description | Fix Status |
|--------|-------|-------------|------------|
| Critical | [#54521](https://github.com/vllm-project/vllm/issues/54521) | Non-deterministic greedy decoding in `Qwen3.8-Flash-Next` at `temperature=0` when context nears `indexer_budget` | In progress |
| Critical | [#53257](https://github.com/vllm-project/vllm/issues/53257) | Non-deterministic output in `DeepSeek-V4-Flash` at `temperature=0`, scaling with concurrency | In progress |
| High | [#55571](https://github.com/vllm-project/vllm/issues/55571) | CUDA illegal memory access ("Out Of Range Address") on RTX PRO 5000 (SM120) under sustained load with FP8 model | Workaround: `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager` |
| High | [#53504](https://github.com/vllm-project/vllm/issues/53504) | First repeat misses prefix cache in hybrid Mamba/GDN model with MTP speculative decoding | PR pending: [#55617](https://github.com/vllm-project/vllm/pull/55617) |
| Medium | [#51977](https://github.com/vllm-project/vllm/issues/51977) | `openai_harmony.HarmonyError: unexpected tokens remaining in message header` on `gpt-oss-120b` with tool calling | Open |

## **What This Means for Application Developers**  
- **Avoid non-determinism in production**: If using `Qwen3.8-Flash-Next` or `DeepSeek-V4-Flash` with `temperature=0`, ensure prompt length stays below `indexer_budget` or apply workarounds (`--enforce-eager`).  
- **Leverage new caching optimizations**: Multi-modal requests can now skip redundant media decoding via `VLLM_EARLY_UUID_LOOKUPS` and UUID-based cache lookups.  
- **Monitor GPU memory on integrated devices**: On GB10/DGX Spark systems, consider lowering `indexer_logits_budget` or disabling sparse attention if encountering OOMs.  
- **Prepare for stricter typing**: With ongoing mypy enforcement in tests, expect tighter type checks in future releases—ensure your custom ops and extensions are type-safe.  
- **Watch for speculative decoding edge cases**: Hybrid GDN/Mamba models may silently degrade with TurboQuant + MTP; validate outputs rigorously in RL/agent workflows.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

---

### **1. Today's Highlights**  
SGLang continues its aggressive push toward Blackwell GPU (SM120) and Apple Silicon support, with critical performance optimizations for `DeepSeek-V4` and `GLM-5.3-Flash` on high-end hardware. Key PRs include defaulting to FlashInfer’s `b12x` NVFP4 GEMM on SM120 and a major refactor of config namespace declarations for better maintainability.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, ongoing changes to configuration and backend selection may impact users deploying models with `--fp4-gemm-backend auto`, `--enable-unified-memory`, or custom speculative decoding strategies (e.g., `NEXTN` → `EAGLE` aliasing). Developers using `DeepSeek-V4` or `GLM-5.3-Flash` should monitor [PR #38170](https://github.com/sgl-project/sglang/pull/38170) and [Issue #38236](https://github.com/sgl-project/sglang/issues/38236).

---

### **3. New Model & Hardware Support**  
- ✅ **Apple Silicon (M-series)**: Active roadmap ([#19137](https://github.com/sgl-project/sglang/issues/19137), [#32321](https://github.com/sgl-project/sglang/issues/32321)) with proposed Torch-owned SRT path and MLX export; no binary release yet.  
- ✅ **T-Head PPU (ZW810/810e/890p)**: Official roadmap initiated ([#37519](https://github.com/sgl-project/sglang/issues/37519)) — first-class upstream support planned.  
- ✅ **DGX Spark (GB10, SM121, aarch64)**: Partial support via `sglang-kernel` wheels now tracked in [#29317](https://github.com/sgl-project/sglang/issues/29317); missing SM121 aarch64 wheels remain unresolved.  
- ✅ **Qwen3.8-Flash-Next NVFP4**: Verified recipes added for 1x/2x DGX Spark and RTX PRO 6000 ([PR #37995](https://github.com/sgl-project/sglang/pull/37995)).

---

### **4. Performance & Optimization**  
- 🚀 **Blackwell Unified Memory**: PR [#37926](https://github.com/sgl-project/sglang/pull/37926) closes decode performance gap vs static pool — unified memory now only **1.96% slower** than static pool on B300 (Kimi-Linear, TP2/DCP2).  
- ⚡ **FlashInfer GEMM Selection**: PR [#38170](https://github.com/sgl-project/sglang/pull/38170) defaults to `b12x` NVFP4 GEMM on SM120, enabling faster cold-weight computation for `DeepSeek-V4` and `GLM-5.3-Flash`.  
- 🔁 **KV Broadcast Optimization**: PR [#37950](https://github.com/sgl-project/sglang/pull/37950) reduces redundant inter-node KV transfers in Prefill CP → Decode TP setups by having one rank pull and relay over NVLink.  
- 🧩 **Config Refactor**: PRs [#38113](https://github.com/sgl-project/sglang/pull/38113), [#38114](https://github.com/sgl-project/sglang/pull/38114) unify config declaration logic — improves readability and maintainability across backends.

---

### **5. Stability & Regressions**  
*Critical issues reported today (ranked by severity):*  
1. **GLM-5.3-Flash crashes at startup under pipeline parallelism** ([#36906](https://github.com/sgl-project/sglang/issues/36906)) — `KeyError: 'residual'` — blocking deployment on TP configurations.  
2. **GLM-5.3-Flash DSA host-tier load-back corrupts generation** ([#38031](https://github.com/sgl-project/sglang/issues/38031)) — even without speculative decoding, causing dropped tool calls and degenerate repetition loops (8×H100, TP8).  
3. **MiniMax-M3 W4A16 compressed tensors output all-NUL tokens** ([#38143](https://github.com/sgl-project/sglang/issues/38143)) — failure on Triton MiniMaxSparse path; works correctly on vLLM.  
4. **DeepSeek-V4 long-context prefill fails with illegal memory access** ([#37892](https://github.com/sgl-project/sglang/issues/37892)) — `topk_v1.cuh:348` crash in DSA indexer kernel.  
5. **DRAFT KV pool budget uses `tp_size` instead of `attn_tp_size`** ([#38202](https://github.com/sgl-project/sglang/issues/38202)) — causes OOM under DP attention in Kimi-K3.  

> 🔍 *Note:* Several regressions are linked to `GLM-5.3-Flash` and `DeepSeek-V4` on Blackwell GPUs — developers should avoid `--dsa-prefill-backend triton` until fixes land.

---

### **6. What This Means for Application Developers**  
- **Avoid `--speculative-algorithm NEXTN`** with `DeepSeek-V4` until [PR #38236](https://github.com/sgl-project/sglang/issues/38236) is resolved — it currently fails due to hook resolution order.  
- **Use `--enable-unified-memory` cautiously** on Blackwell; while performance is nearly parity with static pools, verify stability under high concurrency.  
- **Monitor GLM-5.3-Flash deployments** — multiple active bugs affect correctness and stability; consider pinning to `v0.5.16` or earlier until [Issue #37524](https://github.com/sgl-project/sglang/issues/37524) is closed.  
- **For Apple Silicon and T-Head PPU**, expect early-stage support — contributions welcome via the respective roadmaps.  
- **Leverage new documentation** ([PR #37995](https://github.com/sgl-project/sglang/pull/37995)) for verified Qwen3.8-Flash-Next NVFP4 configs on DGX Spark and RTX PRO 6000.  

> ✅ *Best Practice:* Always test speculative decoding workflows with `--tokenizer-worker-num=1` to avoid OTel tracing gaps ([#38210](https://github.com/sgl-project/sglang/issues/38210)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

**llama.cpp Digest – 2026-09-07**

---

### **1. Today's Highlights**  
The latest updates focus on refining inference stability and performance across diverse backends, with key improvements to quantized model handling and GPU kernel optimizations. Notably, support for the Spark2_5ForCausalLM architecture has been added, and critical fixes have been made to GDN normalization and KV cache behavior in flash attention kernels.

---

### **2. Releases & Breaking Changes**  
- `b10830`: Added `--fuse-qkv` flag during HF-to-GGUF conversion to fuse Q/K/V projections into a single QKV tensor, improving memory efficiency and reducing kernel launches. [PR #22780](https://github.com/ggml-org/llama.cpp/pull/22780)  
- `b10829`: Fixed GDN (Gated Delta Net) normalization from `max` to `rsqrt` to align with Flash-Linear-Attention’s definition: `l2norm(x) = x * rsqrt(sum(x*x) + eps)` — crucial for correctness in models using gated delta nets. [PR #28068](https://github.com/ggml-org/llama.cpp/pull/28068)  
- `b10823`: Introduced `--log-jsonl` for structured logging output, replacing `unknown` with `none` in log messages. [PR #28437](https://github.com/ggml-org/llama.cpp/pull/28437)

---

### **3. New Model & Hardware Support**  
- **Model Support**: Full end-to-end integration for `Spark2_5ForCausalLM` (renamed from `spark3`) including GGUF conversion, tokenizer pre-tokenizer, architecture registration, and tensor mapping. [PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868)  
- **Hardware Backends**:  
  - Metal: Added missing FA-vec tunings for M2 Max GPUs. [PR #28458](https://github.com/ggml-org/llama.cpp/pull/28458)  
  - OpenCL/CUDA: Improved weight packing selection for `q4_K`, `q5_K` multi-matmul operations. [PR #28402](https://github.com/ggml-org/llama.cpp/pull/28402)  
  - Vulkan: Fixed mmproj sharding load logic for split GGUFs. [PR #28517](https://github.com/ggml-org/llama.cpp/pull/28517)

---

### **4. Performance & Optimization**  
- **Flash Attention Tuning**: Ongoing work on RDNA4 (gfx1201) optimizations for `Q6_K` and `Q2_K` via PR #25940 and #28102, targeting improved single-token decode throughput on AMD R9700 PRO.  
- **Lazy Mode Refactor**: PR #28326 redefines `--lazy-mode auto` to intelligently select optimal loading strategy based on system profile, resolving regressions seen on iGPU systems (e.g., `qwen4exp` prefill halving).  
- **Preliminary Fix**: PR #28136 introduces direct reads for Qwen4Exp’s PLE table, promising >2x prefill speedup on GB10 hardware.  
- **Memory Efficiency**: `--fuse-qkv` reduces overhead in attention computation, especially beneficial for long-context generation.

---

### **5. Stability & Regressions**  
- **Critical Regression**: `--lazy-mode auto` halves prefill throughput (~50% drop) on `qwen4exp` with Vulkan on AMD iGPU due to improper TENSOR_READ_LAZY handling. [Issue #28160](https://github.com/ggml-org/llama.cpp/issues/28160)  
- **Kernel Crash**: CUDA/HIP flash-attention skips interior `-INF` blocks in KQ mask, causing prompt processing drops of 42–54% on long sequences when `--kv-unified` is used. [Issue #28495](https://github.com/ggml-org/llama.cpp/issues/28495)  
- **Grammar Parsing Failures**: Nested JSON schema with `maxLength >= 2000` or empty object causes unparseable GBNF grammar, breaking tool calling. [Issues #25746, #25923](https://github.com/ggml-org/llama.cpp/issues/25746), [PR #28518](https://github.com/ggml-org/llama.cpp/pull/28518) fixes enum parsing bug.  
- **Crash on Intel iGPU**: Vulkan driver watchdog silently cancels submissions, leading to embedding collapse without error. [Issue #27634](https://github.com/ggml-org/llama.cpp/issues/27634)

---

### **6. What This Means for Application Developers**  
- **Use `--fuse-qkv`** when converting models to reduce memory footprint and improve latency, especially in high-throughput or low-memory environments.  
- **Avoid `--lazy-mode auto` on AMD iGPUs** until PR #28326 is merged; prefer `large` or `all` modes for stable performance.  
- **Validate tool-call grammars** carefully if using large `maxLength` or nested objects — expect parsing failures unless patched via recent PRs.  
- **Monitor for context-length regression** under `--kv-unified` on CUDA/HIP; consider disabling it for long sequences until kernel fix lands.  
- **Leverage new Spark2_5 support** for Hugging Face-based deployment workflows involving this architecture.  

> 🔗 [GitHub Repository](https://github.com/ggml-org/llama.cpp) | [Website: llama.app](https://llama.app)

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

---

### **1. Today's Highlights**  
The Ollama ecosystem continues to face critical stability challenges, particularly with cloud-hosted models and MLX-backed inference on Apple Silicon. Key issues include intermittent JSON output splitting in `minimax-m3:cloud`, persistent "Stopping..." states with `muse-glimmer:30b-mlx`, and a regression in Vulkan backend memory handling for large AMD iGPU workloads. Meanwhile, developer demand for observability grows stronger, with a prominent feature request for a Prometheus `/metrics` endpoint gaining traction.

---

### **2. Releases & Breaking Changes**  
*No new releases or breaking changes reported in the last 24 hours.*

---

### **3. New Model & Hardware Support**  
- **New model architecture support requested**: Native support for `spark2_5` (used by Spark-X2.5-4B/1.7B) is pending — currently unsupported despite successful download (`#18195`)[^1].  
- **Hardware backend issue**: Vulkan backend fails to load 66GB models on AMD iGPUs due to a regression since v0.32.12 (`#18272`)[^2].  
- **MLX-specific performance penalty**: Prefix-cache restoration on MLX runner is truncated to multiples of 8192 tokens, causing a fixed 17–27s re-prefill delay after cold prompts (`#18267`)[^3].

---

### **4. Performance & Optimization**  
- **Persistent re-prefill tax**: MLX users face a 17–27 second overhead per cold prompt due to prefix-cache alignment logic (`#18267`)[^3].  
- **Flash attention crash**: `qwen3-coder:30b` with Blackwell GPU (sm_120) crashes during warmup despite successful memory allocation (`#18276`)[^4].  
- **Missing metrics endpoint**: No built-in `/metrics` endpoint for Prometheus monitoring; community PR exists but remains unmerged (`#16998`)[^5].  

---

### **5. Stability & Regressions**  
| Severity | Issue | Description | Link |
|---------|------|-------------|------|
| 🔴 High | Cloud model output split | `minimax-m3:cloud` intermittently splits JSON between `reasoning` and `content`, rendering responses unusable (`#17987`)[^6] |
| 🔴 High | Persistent "Stopping..." state | `muse-glimmer:30b-mlx` gets stuck in "Stopping..." state on macOS M4, even after restart (`#18269`)[^7] |
| 🔴 High | Vulkan memory failure | Loading 66GB model on AMD iGPU fails with “Not enough memory for command submission” post-v0.32.12 (`#18272`)[^2] |
| 🟡 Medium | Tool call parser failure | `gemma4:12b` emits malformed `BEGIN_ARG/END_ARG` syntax leading to degenerate loop (`#18275`)[^8] |
| 🟡 Medium | Model name validation too short | 80-character limit prevents pulling long Hugging Face model names (`#18274`)[^9] |

> ✅ *Note*: No fix PRs submitted for high-severity issues today. The `#16998` metrics PR remains open.

---

### **6. What This Means for Application Developers**  
- **Avoid `:cloud` tags for mission-critical workflows** until `minimax-m3:cloud` JSON splitting is resolved (`#17987`). Use local models where possible.  
- **Be cautious with MLX backends** — expect ~20 seconds of overhead per cold start due to prefix-cache truncation (`#18267`). Optimize agent prompt design accordingly.  
- **Monitor for silent failures**: Models like `muse-glimmer:30b-mlx` may appear active but are unresponsive — implement health checks via `ollama ps` or custom scripts.  
- **Prepare for future observability**: With growing demand for `/metrics`, consider building internal telemetry around `ollama run` latency and error rates, as official metrics remain unavailable.  
- **Use `OLLAMA_KEEP_ALIVE` cautiously** — it does not prevent `muse-glimmer:30b-mlx` from stalling (`#18269`). Validate model uptime independently.

---

[^1]: [Issue #18195 – spark2_5 architecture support](https://github.com/ollama/ollama/issues/18195)  
[^2]: [Issue #18272 – Vulkan memory failure on AMD iGPU](https://github.com/ollama/ollama/issues/18272)  
[^3]: [Issue #18267 – MLX prefix-cache re-prefill tax](https://github.com/ollama/ollama/issues/18267)  
[^4]: [Issue #18276 – Flash attention crash on Blackwell GPUs](https://github.com/ollama/ollama/issues/18276)  
[^5]: [PR #16998 – Add /metrics endpoint](https://github.com/ollama/ollama/pull/16998)  
[^6]: [Issue #17987 – Minimax-M3:cloud JSON split](https://github.com/ollama/ollama/issues/17987)  
[^7]: [Issue #18269 – muse-glimmer:30b-mlx stuck in "Stopping..."](https://github.com/ollama/ollama/issues/18269)  
[^8]: [Issue #18275 – gemma4 tool call parser failure](https://github.com/ollama/ollama/issues/18275)  
[^9]: [Issue #18274 – Model name length limit](https://github.com/ollama/ollama/issues/18274)

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest – 2026-09-07**

---

### **1. Today's Highlights**  
The latest release candidate `v1.101.0-rc.1` introduces enhanced security via cosign-signed Docker images, reinforcing trust in production deployments. Critical stability fixes address persistent crashes in the Adaptive Router (`gammavariate: alpha and beta must be > 0.0`) and streaming spend logging failures, both of which were blocking key use cases. A growing number of issues highlight challenges in multi-tenant proxy configurations, particularly around budget enforcement, cache scoping, and OAuth2 flow behavior.

---

### **2. Releases & Breaking Changes**  
- **`v1.101.0-rc.1` (Release Candidate)**: All Docker images are now signed with [cosign](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0), ensuring integrity and provenance. Use `docker pull --platform=linux/amd64` for compatibility.
- **`v1.100.0`**: Stable release with no breaking changes; recommended for production upgrades.
- **Note**: Upgrade from `1.95.1` to `1.99.0+` may break managed OAuth2 flows—see [#39665](https://github.com/BerriAI/litellm/issues/39665) for details.

---

### **3. New Model & Hardware Support**  
- Added support for **Qwen3.7-Max** via DashScope’s Anthropic-compatible API (`qwen3.7-max`, provider: `anthropic`). See [PR #29920](https://github.com/BerriAI/litellm/pull/29920).
- **Foundry Local** added as a first-class OpenAI-compatible provider with SDK integration and official branding. See [PR #29449](https://github.com/BerriAI/litellm/pull/29449).
- **Bedrock Mantle**: SigV4/IAM auth now supported on `/openai/v1/responses` route (PR #29711), enabling secure IAM-only EKS deployments.

---

### **4. Performance & Optimization**  
No new performance benchmarks or kernel optimizations were landed today. However:
- Streaming response handling now preserves `cache_control_injection_points` for Qwen models (PR #29335), improving caching consistency.
- ECS logging support introduced via `LITELLM_ECS_LOGS` env var (PR #29689), enabling structured ingestion into Elastic Stack and Datadog ECS mode.

---

### **5. Stability & Regressions**  
**Critical (High Severity):**
- **Adaptive Router Crash After Restart**: `gammavariate: alpha and beta must be > 0.0` due to invalid persisted state. Fixed in [PR #29398](https://github.com/BerriAI/litellm/pull/29398).  
- **Streaming Spend Logs Fail Silently**: `dict object has no attribute 'usage'` causes uncharged requests. Fixed in [PR #29943](https://github.com/BerriAI/litellm/pull/29943).

**Medium Severity:**
- **Guardrail Errors Surface as 500s Instead of 400s**: Custom code guardrails throw internal server errors. See [Issue #29436](https://github.com/BerriAI/litellm/issues/29436).
- **Zero-Cost Models Blocked by Max Budget Hook**: Internal users hit budget limits even for free models. Fixed in [PR #29918](https://github.com/BerriAI/litellm/pull/29918).
- **Prometheus Shows `Inf` Remaining Budget**: Despite configured budgets. See [Issue #29937](https://github.com/BerriAI/litellm/issues/29937).

---

### **6. What This Means for Application Developers**  
- **Upgrade Immediately if Using Adaptive Router or Streaming Responses**: The `gammavariate` crash and silent spend logging failure can lead to revenue loss and service outages. Apply patches from PRs #29398 and #29943.
- **Validate Multi-Tenant Configurations**: Be cautious with `max_budget`, `internal_user` roles, and `cache_control` — current behavior may expose bugs in cross-team resource sharing (see #29955, #29912).
- **Use Signed Images for Production**: Enforce image verification using `cosign verify` to prevent supply chain compromise.
- **Avoid Third-Party Callback Endpoints**: Remove `webhook-test.com` examples from configs (PR #29791); use `example.com` instead.
- **Monitor OAuth2 Flow Behavior**: Upgrades post-`1.96` may redirect users to LiteLLM UI instead of vendor auth pages (see #39665).

> ✅ **Recommended Action**: Review all open issues labeled `bug`, `proxy`, `llm translation`, and `stale`. Prioritize fixes related to cost tracking, authentication, and request routing.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

**Unsloth Digest – 2026-09-07**

---

### **1. Today's Highlights**  
Unsloth continues to expand its inference and training infrastructure with major progress on multi-node DGX Spark support, including two-Spark orchestration and pipeline training via PR #10280 and #10323. A key UI/UX improvement landed in PR #10405 and #10407, fixing cross-platform icon alignment issues across display scales. Meanwhile, the team is actively addressing Windows code integrity blocks (PR #10404, #10408) that prevent Studio from launching on systems with Smart App Control enabled.

---

### **2. Releases & Breaking Changes**  
*No new releases in the last 24 hours.*  
However, ongoing changes include:
- **Explicit consent required for FP8/FP4 compression exports** (PR #9405, #9554): `llm-compressor` installation now requires explicit user approval; automatic pip install has been disabled.
- **Hub runtime/config decoupling** (PR #9886): Hub now focuses solely on model/dataset discovery, removing embedded configuration logic—breaking change for internal workflows.

> 🔗 [PR #9405](https://github.com/unslothai/unsloth/pull/9405) | [PR #9554](https://github.com/unslothai/unsloth/pull/9554) | [PR #9886](https://github.com/unslothai/unsloth/pull/9886)

---

### **3. New Model & Hardware Support**  
- **EXL3 (ExLlamaV3) backend added** (PR #7115): Now supports 2/3/4/6/8-bit quantization and MoE models—offering lower memory usage than bitsandbytes and enabling fine-tuning of Mixture-of-Experts architectures.
- **aarch64 container images requested** (Issue #4198): Community demand growing for native ARM64 builds to simplify deployment on Apple Silicon and cloud ARM clusters.
- **Gemma3, Qwen3.5, and Mistral Small 3.1** continue to be tested under various configurations, with stability issues reported (see Issue #4160, #3996, #2261).

> 🔗 [PR #7115](https://github.com/unslothai/unsloth/pull/7115) | [Issue #4198](https://github.com/unslothai/unsloth/issues/4198)

---

### **4. Performance & Optimization**  
- **Two-Spark clustering with async replica router** (PR #10323): Enables efficient load balancing across paired DGX Sparks over ConnectX-7 200GbE, reducing idle time and improving throughput in large-scale training.
- **KV preemption for shared cache** (PR #10301): Allows multiple parallel chats to share a unified KV cache without eviction conflicts—critical for high-concurrency inference workloads.
- **Torchcodec compatibility guard updated** (PR #7474): Ensures correct torch version pinning (e.g., torch 2.11) to avoid silent mismatches in CUDA builds.

> 🔗 [PR #10323](https://github.com/unslothai/unsloth/pull/10323) | [PR #10301](https://github.com/unslothai/unsloth/pull/10301) | [PR #7474](https://github.com/unslothai/unsloth/pull/7474)

---

### **5. Stability & Regressions**  
High-severity issues reported today:
1. **Windows code integrity blocks break Studio launch** (PR #10404, #10408): Users with Smart App Control enabled face "Bad Image" errors due to signature verification. Fixes in progress.
2. **Ollama integration corrupts model inventory** (Issue #9986): Models pulled via `ollama pull` are mislabeled as “source: unknown”, causing schema crashes and exclusion from Studio’s inventory.
3. **Qwen3.5 packing causes unstable gradients** (Issue #4160): Nan gradient norms observed during training even with batch size 1 on 96GB VRAM—potential precision or kernel issue.
4. **LLM export fails on CPU-only machines** (Issue #5008): Installer fails regardless of `--no-torch`, blocking chat-only GGUF use cases on CPUs.

> 🔗 [Issue #9986](https://github.com/unslothai/unsloth/issues/9986) | [Issue #4160](https://github.com/unslothai/unsloth/issues/4160) | [Issue #5008](https://github.com/unslothai/unsloth/issues/5008) | [PR #10404](https://github.com/unslothai/unsloth/pull/10404)

---

### **6. What This Means for Application Developers**  
- **Use EXL3 for MoE and low-memory deployments**: The new ExLlamaV3 backend offers superior flexibility for quantizing and training Mixture-of-Experts models like Mixtral variants.
- **Prepare for consent-driven compression**: Future `llm-compressor` exports will require opt-in—ensure your automation pipelines handle `install_missing_dependencies=True`.
- **Avoid GPU offload on Windows with Smart App Control**: If deploying Unsloth Studio on enterprise Windows machines, disable Smart App Control or use signed bundles.
- **Monitor Ollama integration**: Avoid relying on Studio’s Ollama sync until #9986 is resolved—models may not appear or fail to load.
- **Plan for multi-node DGX Spark workflows**: With two-Spark support now in development, scale out training jobs efficiently using pipeline training and unified KV caching.

> 📌 *Recommendation*: Pin your dependency versions carefully—especially torch and torchcodec—to avoid silent mismatches (see PR #7474).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/duanyytop/agents-radar).*