# The case for a cooldown: Why Dependabot now waits before issuing version updates

**Date:** 2026-07-23
**URL:** https://github.blog/security/supply-chain-security/the-case-for-a-cooldown-why-dependabot-now-waits-before-issuing-version-updates/
**Verdict:** MEDIUM

### Core News Story

- **Dependabot now defaults to a 3-day cooldown** before opening version update pull requests, giving maintainers time to vet new releases and reducing exposure to supply chain attacks where malicious versions are published and quickly adopted.
- **The change only affects version updates** (not security updates), as security updates must be applied immediately to address known vulnerabilities.
- **The default cooldown can be customized** via the `cooldown` configuration in `dependabot.yml`, balancing security with keeping dependencies reasonably up-to-date.

### Verdict
**MEDIUM** relevance and value for a software developer focused on AI-assisted engineering and software development. While security is critical, this article addresses dependency management best practices rather than AI-specific advancements or AI-assisted coding techniques. The busy developer may prioritize more directly relevant AI/ML updates.
