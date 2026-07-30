# Disrupting supply chain attacks on npm and GitHub Actions

**Date:** 2026-07-28
**URL:** https://github.blog/security/supply-chain-security/disrupting-supply-chain-attacks-on-npm-and-github-actions/
**Verdict:** HIGH

### Core News Story

- **Security Enhancements in npm and GitHub Actions**: GitHub has implemented multiple security improvements across npm and GitHub Actions to disrupt supply chain attacks, including preventive account protection, safer defaults for workflow triggers, and controls to limit CI/CD attack surfaces.

- **Key Measures**:
  - **npm**: Added 72-hour read-only mode for high-impact accounts after email/2FA changes, introduced staged publishing with mandatory approval/2FA, and disabled install scripts by default in npm v12 to block credential exfiltration.
  - **GitHub Actions**: Changed `actions/checkout` defaults to prevent untrusted fork code execution, introduced workflow execution policies, and added a read-only cache for untrusted triggers to limit privilege escalation.

- **Detection & Response Tools**: New features like self-service credential revocation, expanded revocation API support (including OAuth/App tokens), and Dependabot’s 3-day package cooldown to slow malware spread while prioritizing critical security updates.

---
**Verdict for Software Developers (AI-Assisted Engineering/Dev Focused)**:
**HIGH** – Critical for securing CI/CD pipelines and open-source dependencies, but dense with implementation details. A busy developer should prioritize the npm v12 install-script changes and GitHub Actions workflow policies as immediate action items. The rest can be skimmed for awareness unless directly managing high-risk repositories.
