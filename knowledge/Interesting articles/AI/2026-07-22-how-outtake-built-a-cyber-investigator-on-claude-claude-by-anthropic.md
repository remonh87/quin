# How Outtake built a cyber investigator on Claude | Claude by Anthropic

**Date:** 2026-07-22
**URL:** https://claude.com/blog/how-outtake-built-a-cyber-investigator-on-claude
**Verdict:** MEDIUM

- **Core Insights from the Article**:
  - **Agent Development Process**: Outtake built a cyber investigation agent in 4 stages—first understanding "what good looks like" by running real investigations, then prototyping in Claude Code, graduating to the Agent SDK for production, and finally implementing automated evals for rapid iteration.
  - **Key Architectural Principles**:
    - **Tools & Memory**: Filesystem + bash are sufficient for agent memory and flexibility, enabling agents to improvise and recover from failures.
    - **Guardrails Over Prompts**: Hardcode orchestration-level constraints in the harness, not in prompts, to avoid prompt bloat and ensure stability.
    - **Evals for Speed**: Automated evals accelerate development by replacing manual reviews of long agent transcripts, enabling faster iteration and model upgrades.
  - **Security Considerations**: Agents operating in adversarial environments (e.g., cybersecurity) require sandboxing (e.g., "blastbox" approach) to contain potential breaches from prompt injection or malicious inputs.

- **Actionable Takeaways for Developers**:
  - **Start with Domain Expertise**: Define "good" outcomes *before* coding by running the task manually or consulting experts—this sets a fixed reference for all iterations.
  - **Progressive Complexity**: Begin with simple tools (e.g., filesystem/bash) and automate incrementally; avoid over-engineering early.
  - **Evals as a Development Accelerator**: Implement lightweight evals *early* to automate feedback loops, even if imperfect. Manual reviews don’t scale for long-running agents.

- **Critical Limitation**:
  - The article is **highly specific to cybersecurity agents** and Claude’s ecosystem. While the *patterns* (evals, guardrails, harness design) are transferable, the domain-specific details (e.g., sandboxing for prompt injection) may not apply to most software development contexts.

---
**Verdict for a Busy Developer**:
**MEDIUM**
- **Why Not HIGH?** The article’s value is diluted by its niche focus (cybersecurity agents) and reliance on Claude’s proprietary tools (Agent SDK). While the *principles* (evals, harness design) are broadly useful, the implementation details are too domain-specific to justify the time investment for most developers.
- **Who Should Read It?** Only developers actively building **long-running, agentic systems** (e.g., autonomous tools, AI copilots) or those working in **adversarial environments** (e.g., security, fraud detection). For others, the ROI is too low.
- **Critical Note**: The article’s emphasis on *automated evals* and *harness design* is valuable, but the same insights can be gleaned from more general agent-design resources (e.g., papers on agent frameworks) without the cybersecurity overhead. Skip unless you’re directly tackling agentic systems.
