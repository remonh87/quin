# How Datadog built a “universal machine tool” for Claude Code | Claude by Anthropic

**Date:** 2026-07-21
**URL:** https://claude.com/blog/how-datadog-built-a-universal-machine-tool-for-claude-code
**Verdict:** MEDIUM

- **Datadog’s adoption**: Uses Claude Code for 2/3 of production code, handling bug fixes, large refactors, system replacements, and building entire systems from scratch.

- **Temper framework**: Built a "universal machine tool" called Temper where agents produce specifications (not code) verified by a deterministic kernel through four layers of analysis before deployment.

- **Key innovation**: Explicit control logic as data (state machines) enabling hot-reloads under policy, eliminating drift between verified specs and running systems.

**Verdict: MEDIUM**
While the verification-first approach is insightful, Temper requires heavy infrastructure investment most developers won’t replicate. The core lesson—prioritize verification over generation—is valuable, but the implementation details are overkill for typical projects. Save this for when you’re scaling agentic workflows beyond basic coding tasks.
