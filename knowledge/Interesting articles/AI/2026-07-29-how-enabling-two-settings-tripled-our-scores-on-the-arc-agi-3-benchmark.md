# How enabling two settings tripled our scores on the ARC-AGI-3 benchmark

**Date:** 2026-07-29
**URL:** https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
**Verdict:** HIGH

- **Key Insight**: Poor performance on the ARC-AGI-3 benchmark (7.8% score) for GPT-5.6 Sol was **not due to the model itself**, but because the harness discarded private reasoning after each action and used rolling truncation, forcing the model to "relearn" the game every turn. This highlights how **harness design and API settings** can overshadow model capabilities in benchmarks.

- **Solution Impact**: Enabling **retained reasoning** (keeping private thoughts in context) and **compaction** (efficient context management) tripled the score (from 13.3% to 38.3%) and cut output tokens by **6x**. The model could now remember past insights, apply coherent strategies, and act faster.

- **Actionable Takeaway**: For developers using OpenAI’s API, **switch to the Responses API**, enable **retained reasoning**, and use **compaction** to match production-grade performance. Generic harnesses (like ARC’s default) often fail to reflect real-world use.

**Verdict for busy developers**: **HIGH**
This is a rare, critical insight—most AI engineering content is noise, but this directly impacts how you evaluate and deploy AI models. The recommendations are **immediately actionable** and could save weeks of debugging poor model performance. Prioritize this.
