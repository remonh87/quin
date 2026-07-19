---
name: portfolio-rebalancer
description: Turns a cash amount plus Remon's current portfolio holdings into a concrete "buy this ETF, this much" recommendation, using knowledge/Investments/Desired asset allocation.md as the target blueprint. Use this whenever Remon says things like "I have €X to invest", "how should I split this bonus", "rebalance my portfolio", "what should I buy with this", or pastes his current holdings and asks where new money should go — even if he doesn't say "asset allocation" or "rebalance" explicitly. Only recommends ETFs Remon already holds for a given asset class (never invents a new ticker) and explicitly flags any target asset class that has no matching existing ETF in his portfolio. Always shows the full recommendation and its reasoning before Remon acts on it — this is advice, not an order to execute.
---

# Portfolio Rebalancer

Takes a cash amount Remon wants to invest, plus his current holdings, and
recommends how to split that cash across his *existing* ETFs so the portfolio
moves toward the targets in `knowledge/Investments/Desired asset allocation.md`.
Read that file fresh each time rather than relying on memory of past
percentages — Remon edits it independently of this skill.

This skill never executes a trade (no brokerage MCP exists here) — its only
output is a recommendation for Remon to act on himself.

## Step 1: Pin down the two inputs

You need **the amount to invest** and **the current portfolio** (each holding
as a ticker + € amount, e.g. "€5k VWCE, €1.2k gold ETF, €400 crypto"). If
either is missing from Remon's message, ask for both in a single batched
question rather than assuming a number or reusing a portfolio from an earlier
conversation — a stale portfolio produces a wrong recommendation.

## Step 2: Map each holding to a blueprint asset class

Read `knowledge/Investments/Desired asset allocation.md` for the current
target rows (Equities, Bonds, Gold, Commodities, Crypto, or whatever rows
exist — don't hardcode this list, the file is the source of truth).

For each holding Remon gave you, decide which row it belongs to. Well-known
broad ETFs are usually unambiguous (a global equity tracker → Equities, a
gold ETC → Gold). If a holding's class isn't obvious from its name, or Remon
already told you the class alongside the ticker, use that — but if you're
genuinely unsure, ask rather than guess. A misclassified holding throws off
every percentage in the recommendation, so this is worth a quick check when
in doubt, not a silent assumption.

If a single asset class has more than one existing ETF, note that — you'll
need it in Step 5.

## Step 3: Work out the current allocation

- `current_total` = sum of all holdings
- For each class: `current_€` = sum of holdings mapped to it, `current_%` =
  `current_€ / current_total`

Sanity-check this against what Remon expects (e.g. if his holdings are wildly
different from what he described verbally, flag it) but don't block on
small rounding differences.

## Step 4: Waterfall the new cash into underweight classes first

This follows the "eat that frog" principle already used for calendar/task
priority: fix the biggest gap first rather than spreading thin everywhere.

1. `final_total` = `current_total` + amount to invest.
2. For each class: `target_€` = `target_%` (from the blueprint) × `final_total`,
   and `gap_€` = `target_€` − `current_€`. A negative gap means that class is
   already at or above target — it gets none of the new cash.
3. Rank classes by how underweight they are, most underweight first — compare
   `current_%` (from Step 3) against the blueprint's `target_%`, largest
   shortfall in percentage points first.
4. Walk down that ranking assigning cash: give each class enough to close its
   `gap_€` completely before moving to the next one. Stop once the cash runs
   out.

One non-obvious consequence of computing `gap_€` against `final_total`: the
gaps across *all* classes always sum to exactly the cash amount (targets sum
to 100%, so `Σ target_€ = final_total`, and `Σ gap_€ = final_total −
current_total` = the cash). So a real "leftover after every class hits
target" can only happen if the portfolio was already exactly on target before
this contribution — in that edge case, split the cash pro-rata to `target_%`.
In every other case the cash runs out partway down the ranking: the classes
at the top (most underweight) reach their exact target, and the class where
the money runs out gets only a partial top-up — say so plainly rather than
implying every class landed on target. A large enough contribution can still
carry every class to exact target (including ones that looked "least
underweight," since they need real € to keep pace with a bigger total) — that
outcome is correct, not a sign the ranking was ignored.

Show your work (the gap table) — Remon should be able to see *why* the money
went where it did, not just the final numbers.

## Step 5: Turn each class's allocation into an actual ETF buy

For each class receiving money:

- **One existing ETF for that class** → recommend that ticker for the full
  amount.
- **Multiple existing ETFs for that class** → split proportionally to how
  Remon already holds them within that class (preserves his existing
  sub-allocation), and say that's the assumption — he may want a different
  split.
- **No existing ETF for that class** → do not invent one. Say explicitly that
  this class has no matching ETF in his current portfolio, show how much
  *would* go there, and ask what ticker to use (or let him decide to skip it
  for now). This is the "if something is missing, tell me" case — it's the
  point of the skill, not a failure state.

## Step 6: Present the recommendation

One table, covering every blueprint class:

| Asset class | Current % | Target % | Gap | New cash → this class | ETF(s) to buy |

Followed by a short note on the resulting allocation after the buy (so Remon
can see the after-state, not just the delta), and any missing-ETF flags from
Step 5 called out clearly, not buried in the table.

Nothing here touches a live system, so no confirmation step is needed before
"executing" — the output *is* the deliverable. Don't add a summary beyond
this table + notes per `working-style.md`.
