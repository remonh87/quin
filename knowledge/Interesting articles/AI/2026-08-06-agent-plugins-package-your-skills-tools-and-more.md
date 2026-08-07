# Agent Plugins package your skills, tools, and more

**Date:** 2026-08-06
**URL:** https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/
**Verdict:** MEDIUM

- **Core Problem Solved**: Agent Plugins 1.0.0 addresses the portability issue of AI agent skills and MCP servers by introducing a vendor-neutral, open specification for packaging these components into a standardized, portable format. This eliminates the need for forking and maintaining multiple copies of similar components across different clients.

- **Key Innovation**: The specification defines a minimal, fixed directory structure (`plugin.json`, `skills/`, `mcp.json`) and manifest format, ensuring components are portable while allowing clients to extend functionality in a non-portable namespace (`com.example.client/`). It deliberately avoids defining installation, security, or UX policies, deferring these to client-specific implementations.

- **Ecosystem Integration**: Agent Plugins is part of a larger ecosystem, including Agentic Resource Discovery (ARD) for finding plugins and AI Catalog for describing them. Google is integrating support into its products like Agents CLI and Data Agent Kit, with more products expected to follow.

**Verdict**: **MEDIUM**
- **Why Not High?** The article is informative but lacks deep technical details, code examples, or immediate practical value for a busy developer. It’s a high-level overview of a new specification with potential but requires further exploration to assess real-world applicability.
- **Critical Note**: While the problem is real and the solution promising, the specification is still nascent. Most developers won’t need to adopt it immediately unless they’re heavily invested in AI agent ecosystems. The value is medium for now, but worth revisiting in 6–12 months as adoption grows.
