// sonify.mjs — number → sound. The seed §B "the mesh sings" as running code.
// Every fold gets ONE stable pentatonic pitch. The REGISTER comes from fall-remember's chamber
// (LSH routing → similar folds share a register → "a family sounds like a family" is real, not a
// claimed coincidence). A path plays as a melody; a path's COHERENCE sets the κ sound/rest ratio,
// so a traversal that HOLDS resolves as music and a broken one piles up as noise. Node + browser.
import { embed, chamber } from './fall-remember.mjs';

export const KAPPA = (Math.sqrt(5) - 1) / 2;               // 1/φ ≈ 0.618 — the sound-to-silence ratio (seed §B)
const PENTA = [0, 2, 4, 7, 9];                             // C major pentatonic — "no wrong notes"; the estate stays consonant
const OCT_BASE = 48, OCTAVES = 4;                          // MIDI C3..C7

// deterministic fold-signature — a stable number from the fold's identity. Same fold = same number, forever.
export function sig(text) {
  let h = 0x811c9dc5 >>> 0; const s = String(text || '').toLowerCase();
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}

// number → a stable pentatonic note. Register = the fall-remember chamber (family); degree within = the signature.
export function pitch(fold) {
  const name = typeof fold === 'string' ? fold : fold.name;
  const ch = chamber(embed(name));                        // 0..11 — register from the NAME (the family identity: deepgram-* cluster)
  const degree = Math.min(OCTAVES * 5 - 1, ch + (sig(name) % 3));   // family band + a small fine position within it
  const midi = OCT_BASE + Math.floor(degree / 5) * 12 + PENTA[degree % 5];
  return { name, midi, hz: 440 * Math.pow(2, (midi - 69) / 12), chamber: ch, sig: sig(name) };
}

// a PATH (a traversal from fall-remember) → the melody + a COHERENCE score.
// coherence = smoothness: a kin/family path moves in small steps (music); a scattered path leaps (broken).
export function path(folds) {
  const notes = folds.map(pitch);
  let jump = 0; for (let i = 1; i < notes.length; i++) jump += Math.abs(notes[i].midi - notes[i - 1].midi);
  const meanJump = notes.length > 1 ? jump / (notes.length - 1) : 0;
  const coherence = 1 - Math.min(1, meanJump / 24);       // 1 = tight family (holds), 0 = scattered (broken)
  const restRatio = 0.382 * coherence;                    // coherent → κ-complement rest (intelligible); broken → ~0 rest (notes pile = noise)
  return { notes, coherence, restRatio, holds: coherence >= 0.5 };
}
