# Run Ray on TPU, Part 2: Ray AI libraries

**Date:** 2026-07-24
**URL:** https://developers.googleblog.com/run-ray-on-tpu-part-2-ray-ai-libraries/
**Verdict:** MEDIUM

• **Ray Serve on TPU**: Explains how to deploy LLM inference on TPUs using Ray Serve with vLLM, emphasizing the critical `topology` field in YAML to ensure multi-host models stay within a single TPU slice. Missing this field causes silent hangs due to cross-slice communication failures.

• **Ray Data on TPU**: Introduces `iter_jax_batches()` for JAX-native, device-sharded batch loading, eliminating host-side NumPy-to-JAX copy bottlenecks. Handles ragged batches explicitly (drop/pad/raise), avoiding cryptic shape errors mid-run.

• **Ray Train on TPU**: Details `JaxTrainer` for distributed JAX training, where `topology` replaces manual mesh setup and `use_tpu=True` enables TPU-specific initialization. Warns against importing JAX at module scope—must be inside worker function to avoid device-init errors.

**Verdict**: **MEDIUM**
This is a niche but well-executed deep dive for developers already committed to TPU-based Ray workflows. For a busy developer focused on general AI-assisted engineering, the ROI is low unless TPUs are part of their immediate stack. The practical code snippets and warnings about common pitfalls are valuable, but the article’s specificity limits broader applicability.
