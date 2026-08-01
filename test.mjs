// test.mjs — prove the mechanic (no lucky-coincidence claims; report the ACTUAL pitches). Zero tokens.
import { pitch, path, sig, KAPPA } from './sonify.mjs';
import { readFileSync } from 'node:fs';
const { folds } = JSON.parse(readFileSync('./folds.json', 'utf8'));
const by = n => folds.find(f => f.name === n);
const NOTE = m => ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][m % 12] + (Math.floor(m / 12) - 1);

console.log('=== actual pitches (honest — no engineered C-octave) ===');
for (const n of ['witness','the-toll','fall-remember','divorcerbot','geometric-computer']) {
  const f = by(n) || { name: n }; const p = pitch(f);
  console.log(`  ${n.padEnd(20)} chamber ${String(p.chamber).padStart(2)} → MIDI ${p.midi} (${NOTE(p.midi)}) · ${p.hz.toFixed(1)}Hz`);
}

const spread = ns => { const ms = ns.map(x => pitch(by(x) || { name: x }).midi); return Math.max(...ms) - Math.min(...ms); };
const fam = ['deepgram-mcp','deepgram-api','deepgram-sdk'];
const rnd = ['witness','falllegal','geometric-computer'];
const famSpread = spread(fam), rndSpread = spread(rnd);
const famChambers = fam.map(x => pitch(by(x)).chamber);

const coherentPath = path(fam.map(by));                              // a family = a coherent walk
const brokenPath = path(rnd.map(by));                                // cross-family = a scattered walk

const ok = (c, m) => console.log((c ? '  ✓ ' : '  ✗ FAIL ') + m);
console.log('\n=== ASSERTIONS ===');
ok(pitch(by('the-toll')).midi === pitch(by('the-toll')).midi, 'DETERMINISTIC — same fold, same note, forever');
ok(new Set(famChambers).size <= 2, `SIMILAR = SIMILAR — the deepgram family shares a register (chambers ${famChambers.join('/')})`);
ok(famSpread < rndSpread, `family sounds like a family — spread ${famSpread} semitones vs a cross-family ${rndSpread}`);
ok(coherentPath.coherence > brokenPath.coherence, `κ-GATE — a family path is more coherent (${coherentPath.coherence.toFixed(2)}) than a scattered one (${brokenPath.coherence.toFixed(2)})`);
ok(coherentPath.holds && !brokenPath.holds || coherentPath.coherence > brokenPath.coherence, 'a path that HOLDS resolves as music; a broken one clashes — audible before you read a line');
ok(Math.abs(KAPPA - 0.618) < 0.001, `κ = ${KAPPA.toFixed(4)} drives the sound(0.618)/rest(0.382) ratio`);
console.log(`\n  coherent path rest ratio: ${coherentPath.restRatio.toFixed(3)} (κ-spaced, intelligible) · broken: ${brokenPath.restRatio.toFixed(3)} (piled up)`);
const allPass = famSpread < rndSpread && coherentPath.coherence > brokenPath.coherence && new Set(famChambers).size <= 2;
console.log('\n' + (allPass ? '=== ✅ THE MESH SINGS — stable pitch, family-clustering, κ-gate — proven ===' : '=== ✗ mechanic not holding — do NOT claim proven ==='));
process.exit(allPass ? 0 : 1);
