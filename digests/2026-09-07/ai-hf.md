# Hugging Face 热门模型周报 2026-09-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-07 00:18 UTC

---

### **今日亮点**

截至2026年9月7日，Hugging Face 生态系统仍由高性能多模态与量化大模型主导，其中 **Qwen3.8-27B** 变体在受欢迎程度和下载量上均遥遥领先。GGUF 量化版本的激增——尤其是来自 *unsloth*、*HauhauCS* 和 *DavidAU* 等贡献者的工作——标志着社区正强力推动向本地化、可访问推理的转型。与此同时，**Lightricks/LTX-2.5** 作为业界领先的图像生成视频模型，已获得超150万次下载，凸显出对生成式视频工具日益增长的需求。值得注意的是，如 *OBLITERATUS/Qwen3.8-27B-OBLITERATED* 与 *dealignai/GLM-5.3-CYBERSECURITY-FP8* 等模型，反映出人们对无审查、高度专业化的微调模型兴趣不断上升。

---

### **热门模型**

#### 🧠 语言模型（LLMs、聊天模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,126 | 6,190,807 | 领军级270亿参数模型，具备强大的多模态与对话能力；是HF上下载量最高的模型之一。 |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,737 | 410,074 | 基于MoE架构的高效文本生成模型，专为速度与可扩展性优化；属于快速崛起的GLM-5.3系列。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,707 | 14,612,342 | 尽管问世已久，仍被广泛使用；仍是轻量级文本生成与微调任务的基准模型。 |
| [tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | 腾讯“混元”系列大模型，针对长上下文推理与流式推理进行优化。 |

#### 🎨 多模态与生成模型（图像、视频、音频、文本转X）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,961 | 1,526,928 | 强大的图像转视频扩散模型，可从静态图像生成电影级视频质量内容；当前增长最快的视频生成模型。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,967 | 4,986,349 | 顶级图像转视频与文本转视频模型，基于扩散流水线构建；在创意内容生成领域广受欢迎。 |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 744 | 209,191 | 具备闪速注意力与多模态推理能力的先进视觉语言模型；深度求索V4系列的关键成员。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,943 | 432,966 | 针对实时交互优化，增强视觉理解与对话连贯性；是Qwen3.8系列的重大升级。 |

#### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,566 | 253,029,336 | 语义相似度任务中最广泛使用的嵌入模型；因速度快、体积小，被各类NLP应用广泛信赖。 |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 2,989 | 52,338,347 | 仍是分类、检索与零样本任务中的基础性NLP模型，使用率极高。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | 训练于3亿小时多语言语音数据的模型；适用于低资源语言的自动语音识别（ASR）支持。 |
| [microsoft/VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 114 | 889 | 专为低延迟实时转录设计的流式ASR模型；微软VibeVoice套件的一部分。 |

#### 📦 微调与量化模型（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞数 | 下载量 | 简述 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,584 | 10,311,462 | Qwen3.8-27B 最受欢迎的GGUF版本；通过 llama.cpp 实现快速本地推理，极大提升了可访问性。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 979 | 1,568,315 | 极端激进的无审查微调版本，结合MTP优化；体现了社区驱动下对无限制模型的追求趋势。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 247 | 211,018 | 极其复杂的多层次微调，融合去审查、编程与叙事生成功能——象征着极端定制化方向的典型代表。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 749 | 287,720 | 精简优化的无审查GGUF变体，强调自由与性能；反映了对无过滤模型需求的增长。 |

---

### **生态信号**

2026年9月的 Hugging Face 生态系统清晰地呈现出向 **可访问性、专业化与去中心化** 的转变。Qwen 与 GLM 系列正凭借量化后的 GGUF 发布获得显著增长——由 *unsloth*、*HauhauCS* 与 *DavidAU* 等社区推动，使高性能推理可在消费级硬件上实现。这标志着从依赖专有云API转向自托管、可定制模型的趋势。**无审查及“抹除版”微调模型**（如 *OBLITERATUS*、*dealignai*）的兴起，反映出在特定创意与技术领域中对绕过安全过滤器模型的强烈需求。与此同时，**多模态生成**，尤其是基于 LTX-2.5 与 MiniMax-H3 的图像转视频技术，正在迅速发展，下载量已超越传统大语言模型。以 *all-MiniLM-L6-v2* 为代表的嵌入模型仍是基础，但 *TimesFM* 与 *VibeVoice-ASR* 等新架构在时间序列预测与实时语音处理中的采用率持续攀升。总体而言，生态系统正变得更加碎片化，但也更民主化——开放权重模型不再仅是基准，更是创新的平台。

---

### **值得探索**

1. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** – 下载量突破150万，该图像转视频模型在生成视频领域实现突破。适合希望从静态图像生成电影级高质量输出的创作者，也特别适合测试本地推理工作流。

2. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** – 截至今日，HF上下载量最高的模型，代表了本地大模型部署的黄金标准。其GGUF格式可通过 llama.cpp 轻松运行，是注重性能与隐私的开发者不可错过的首选。

3. **[HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)** – 社区驱动模型演进的典范。对于研究者或高级用户探索边界型AI行为，该模型提供了关于微调极限与用户定制潜力的深刻洞见。

---
*本日报由 [agents-radar](https://github.com/duanyytop/agents-radar) 自动生成。*