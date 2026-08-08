# Inference hooks: inline data loss prevention for Claude Enterprise | Claude by Anthropic

**Date:** 2026-08-05
**URL:** https://claude.com/blog/claude-enterprise-inference-hooks
**Verdict:** MEDIUM

- **New Feature Launch**: Claude Enterprise introduces *Inference hooks*, a real-time data loss prevention (DLP) system that inspects and enforces security policies on every prompt and tool call response before they reach Claude's models. This covers all enterprise surfaces (chat, Claude Code, Cowork) with a single enforcement layer.

- **Technical Implementation**: Every inference request routes through a signed WebSocket to a customer-controlled DLP server that returns allow/deny verdicts. Tool calls (including MCP connectors, skills, plugins) are similarly vetted before model processing, enabling granular security control.

- **Enterprise Focus**: Designed for compliance teams, inference hooks integrates with existing DLP tools (Netskope, Palo Alto, etc.) via an open webhook protocol. Available in beta today for Claude Enterprise customers with shadow mode and rollout controls.

**Verdict: MEDIUM**
While technically interesting for AI security architecture, this is an enterprise-focused compliance feature with limited direct impact on day-to-day AI-assisted development workflows. Only relevant if your organization uses Claude Enterprise and security teams require this level of DLP integration.
