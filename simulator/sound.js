// Web Audio API synth sounds
let audioCtx = null;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, duration, type='square', vol=0.15) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function playSound(id) {
  switch(id) {
    case 'spinner_low':  playTone(200, 0.05, 'square', 0.1); break;
    case 'spinner_high': playTone(500, 0.08, 'square', 0.15); break;
    case 'bumper':       playTone(300+Math.random()*200, 0.06, 'triangle'); break;
    case 'sling':        playTone(250, 0.04, 'triangle', 0.1); break;
    case 'rollover':     playTone(440, 0.1, 'sine', 0.12); break;
    case 'letter':       playTone(660, 0.15, 'sine', 0.2); break;
    case 'skill_shot':   playTone(880, 0.3, 'sine', 0.2); break;
    case 'horseshoe':    playTone(550, 0.2, 'triangle', 0.18); break;
    case 'bonus_x':      playTone(700, 0.2, 'square', 0.15); break;
    case 'completion':   playTone(1000, 0.4, 'sine', 0.2); break;
    case 'tilt_warn':    playTone(150, 0.3, 'sawtooth', 0.2); break;
    case 'tilt':         playTone(80, 0.5, 'sawtooth', 0.3); break;
    case 'bonus_1k':     playTone(440, 0.04, 'square', 0.1); break;
    case 'bonus_over':   playTone(220, 0.3, 'triangle', 0.15); break;
    case 'drain':        playTone(120, 0.4, 'sawtooth', 0.2); break;
    case 'credit':       playTone(600, 0.15, 'sine', 0.15); break;
    case 'start':        playTone(800, 0.2, 'sine', 0.2); break;
    case 'match':        playTone(350, 0.08, 'square', 0.12); break;
    case 'kicker':       playTone(400, 0.15, 'triangle', 0.18); break;
    case 'collect':      playTone(750, 0.25, 'sine', 0.2); break;
    case '50pt':         playTone(330, 0.05, 'square', 0.08); break;
    case 'unlit':        playTone(180, 0.08, 'triangle', 0.08); break;
  }
}
