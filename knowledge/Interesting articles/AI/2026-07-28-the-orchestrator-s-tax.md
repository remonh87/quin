# The Orchestrator's Tax

**Date:** 2026-07-28
**URL:** https://martinfowler.com/articles/orchestrator-tax.html
**Verdict:** HIGH

### **Key Takeaways from "The Orchestrator's Tax"**

- **Hidden Orchestrator Costs**: The biggest inefficiency in multi-agent LLM workflows isn’t the agents themselves but the orchestrator’s **context pollution**—keeping unnecessary raw transcripts and intermediate reasoning in memory, which degrades future decision-making. Status polling (e.g., dumping full agent transcripts) adds avoidable overhead.

- **Cognitive Locality Matters**: Splitting tasks too finely forces agents to **rebuild the same mental model** (e.g., re-reading files, re-understanding architecture), defeating the purpose of parallelism. Tasks sharing knowledge should stay grouped to avoid redundant work.

- **Practical Rules for Efficiency**: The author distilled lessons into a `CLAUDE.md` file with actionable rules:
  - Limit agents per wave (2–4), consolidate tasks sharing files/conventions.
  - Avoid status polling; fetch only what’s needed.
  - Block repository-wide `git` ops in concurrent agents.
  - Treat overlapping file ownership as a signal to merge tasks.

---

### **Verdict for a Busy Software Developer**
**HIGH** – *But only if you’re actively using multi-agent LLM workflows.*

**Why?**
- **Directly actionable**: The rules (e.g., limiting agents, avoiding context pollution) can immediately improve your AI-assisted sessions.
- **Underrated insight**: Most devs focus on token costs; this highlights the **real bottleneck**—orchestrator memory/attention.
- **Martin Fowler’s credibility**: While anecdotal, his patterns align with observable pain points in LLM orchestration.

**Critical Caveats:**
- **Model/tool-specific**: Tailored to Claude Code/Sonnet 5; may not generalize to other setups.
- **No hard metrics**: Costs are self-reported by the orchestrator, not instrumented.
- **Overhead of rules**: Adding too many standing instructions (e.g., approval gates) risks creating new bureaucracy.

**Bottom Line:** If you’re knee-deep in AI agents, skim the **rules section** and **context pollution warnings**. Skip the rest if you’re pressed for time—it’s not a universal law, but the core ideas are worth stealing.
