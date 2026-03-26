function ctx() {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

function tone(ac: AudioContext, freq: number, start: number, dur: number, type: OscillatorType = "sine", vol = 0.25) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + start);
  gain.gain.setValueAtTime(vol, ac.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + dur);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + dur);
}

export function playCorrect() {
  try {
    const ac = ctx();
    tone(ac, 523, 0,    0.15);
    tone(ac, 659, 0.12, 0.15);
    tone(ac, 784, 0.24, 0.25);
  } catch { /* silently fail if no audio */ }
}

export function playWrong() {
  try {
    const ac = ctx();
    tone(ac, 330, 0,    0.2, "sawtooth", 0.18);
    tone(ac, 247, 0.18, 0.25, "sawtooth", 0.14);
  } catch { /* silently fail */ }
}

export function playVictory() {
  try {
    const ac = ctx();
    const melody: [number, number][] = [
      [523, 0], [523, 0.1], [523, 0.2],
      [698, 0.32], [523, 0.5], [698, 0.62], [880, 0.74],
    ];
    melody.forEach(([f, t]) => tone(ac, f, t, 0.28, "triangle", 0.28));
    // Bass drum thump
    tone(ac, 80,  0,    0.35, "sine", 0.4);
    tone(ac, 80,  0.5,  0.35, "sine", 0.4);
    tone(ac, 80,  1.0,  0.35, "sine", 0.4);
  } catch { /* silently fail */ }
}
