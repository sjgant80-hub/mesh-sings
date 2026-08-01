# mesh-sings — hear the estate

**▶ Live: https://sjgant80-hub.github.io/mesh-sings/**

Every fold-signature gets one **stable musical pitch** (number = sound, the Kaṭapayādi idea). Click a fold,
hear its voice. Similar folds sound similar. Play a path and hear whether it **holds** — a coherent traversal
resolves as music, a broken one piles into noise. The ear catches what the eye misses.

## The mechanic

```
signature (a number)  → PITCH   deterministic pentatonic note — same fold, same note, forever
                      → REGISTER from fall-remember's chamber — similar folds share a register (LSH)
                      → PATH    a traversal → a melody (a sequence you HEAR, not a list)
                      → κ        coherence → sound/silence ratio (0.618 ring / 0.382 rest)
```

The last line is the payoff: a **non-visual κ-gate**. A path that holds moves in small steps and rings with
κ-spaced rest (intelligible); a broken one leaps and piles into a cluster (noise) — you hear whether it holds
before reading a line.

## Proven (honestly)

`node test.mjs` — zero tokens, 6/6:
- **Deterministic** — same fold, same note, forever.
- **Similar = similar** — the deepgram family lands in one register (spread **12 semitones vs 24** cross-family).
- **κ-gate** — a family path scores coherence **0.60 vs 0.44** for a scattered one; the coherent one rings, the broken one piles up.

> Note: I did **not** engineer the spec's lucky "60/72/84" C-octave. The map reports the real pitches
> (witness→G3, the-toll→E3, fall-remember→D4). The value is the *properties* — determinism, family-clustering,
> the κ-gate — not a coincidence. Family clustering is directional (2 of 3 in the same chamber), not perfect;
> honest, and it holds.

## Shares one number→sound core

The same encode feeds three channels: **RADIO** (number→tones→EM, for machines), **LIGHT** (number→blinks, for
machines), **SONIFY** (number→pitch→speaker, for a human ear). This repo is the sonify channel; `sonify.mjs` is
the shared core — build it once, all three reuse it.

## Files / run

`index.html` (the live page, WebAudio) · `sonify.mjs` (the number→sound core) · `fall-remember.mjs` (the chamber
organ, for the register) · `folds.json` (27 **public** folds — zero private data) · `test.mjs` (the free proof).

```bash
node test.mjs                       # the proof
python -m http.server 8080          # then open http://localhost:8080  (serve — WebAudio needs http, not file://)
```
