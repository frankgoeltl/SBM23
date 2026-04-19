// SBM23 Browser Simulator — Copyright (C) 2026 Frank Goeltl, Dick Hamill and contributors.
// Licensed under the GNU General Public License v3.0 or later.
// This program comes with ABSOLUTELY NO WARRANTY. See the LICENSE file for details.

// Build switch/lamp/coil control panel — compact grouped layout
function buildPlayfield() {
  const pf = document.getElementById('playfield');

  function section(title) {
    const h = document.createElement('h3');
    h.textContent = title;
    h.style.cssText = "font-family:'Oswald',sans-serif;font-size:12px;font-weight:600;color:#D42A80;margin:14px 0 6px;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid rgba(0,0,0,0.06);padding-bottom:4px;";
    pf.appendChild(h);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px;';
    pf.appendChild(wrap);
    return wrap;
  }

  function swBtn(parent, sw, label) {
    const b = document.createElement('button');
    b.textContent = label;
    b.dataset.sw = sw;
    b.title = 'SW ' + sw;
    b.style.cssText = "font-family:'Oswald',sans-serif;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.04em;padding:5px 9px;cursor:pointer;border-radius:6px;border:1px solid rgba(0,0,0,0.1);color:#1A1A1A;background:#FAFAF7;transition:all 0.15s;";
    b.addEventListener('mouseenter', () => { b.style.background='#fff'; b.style.borderColor='#D42A80'; b.style.color='#D42A80'; });
    b.addEventListener('mouseleave', () => { b.style.background='#FAFAF7'; b.style.borderColor='rgba(0,0,0,0.1)'; b.style.color='#1A1A1A'; });
    parent.appendChild(b);
    return b;
  }

  function lampDot(parent, id, label) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:3px 7px;';
    const dot = document.createElement('div');
    dot.id = 'lamp-' + id;
    dot.dataset.lamp = id;
    dot.className = 'lamp';
    dot.style.cssText = 'width:16px;height:16px;border-radius:50%;background:#ddd;position:static;flex-shrink:0;border:2px solid #bbb;';
    const lbl = document.createElement('span');
    lbl.textContent = label;
    lbl.style.cssText = "font-family:'Space Mono',monospace;font-size:9px;color:#6a6660;white-space:nowrap;";
    wrap.appendChild(dot);
    wrap.appendChild(lbl);
    parent.appendChild(wrap);
  }

  // === SWITCHES (compact) ===
  const s1 = section('Targets — S·I·L·V·E·R·B·A·L·L·M·A·N·I·A');
  swBtn(s1, SW_TOP_S, 'S'); swBtn(s1, SW_TOP_I, 'I'); swBtn(s1, SW_TOP_L, 'L');
  swBtn(s1, SW_TOP_V, 'V'); swBtn(s1, SW_LEFT_E, 'E'); swBtn(s1, SW_LEFT_R, 'R');
  swBtn(s1, SW_LEFT_B, 'B'); swBtn(s1, SW_RIGHT_A, 'A');
  swBtn(s1, SW_UPPER_L_SIDE, 'L'); swBtn(s1, SW_LOWER_L_SIDE, 'L');
  swBtn(s1, SW_LEFT_OUTLANE_M, 'M'); swBtn(s1, SW_LEFT_INLANE_A, 'A');
  swBtn(s1, SW_CENTER_TARGET, 'N'); swBtn(s1, SW_RIGHT_INLANE_I, 'I');
  swBtn(s1, SW_RIGHT_OUTLANE_A, 'A');

  const s2 = section('Lanes & Horseshoe');
  swBtn(s2, SW_TOP_LEFT, 'Top L'); swBtn(s2, SW_TOP_CENTER, 'Top C');
  swBtn(s2, SW_TOP_RIGHT, 'Top R'); swBtn(s2, SW_REBOUNDS, '50pt');
  swBtn(s2, SW_HOOP_ROLLOVER, 'Horseshoe');
  swBtn(s2, SW_KICKER_ROLLOVER, 'Kicker');

  const s3 = section('Spinners · Bumpers · Slings');
  swBtn(s3, SW_LEFT_SPINNER, 'Spin L'); swBtn(s3, SW_RIGHT_SPINNER, 'Spin R');
  swBtn(s3, SW_LEFT_BUMPER, 'Bump L'); swBtn(s3, SW_CENTER_BUMPER, 'Bump C');
  swBtn(s3, SW_RIGHT_BUMPER, 'Bump R');
  swBtn(s3, SW_LEFT_SLING, 'Sling L'); swBtn(s3, SW_RIGHT_SLING, 'Sling R');

  const s4 = section('Drain · Tilt');
  swBtn(s4, SW_OUTHOLE, 'Drain'); swBtn(s4, SW_TILT, 'Tilt');

  // === LAMPS (compact inline) ===
  const l1 = section('Lamps — Spellout');
  l1.style.gap = '2px';
  'SILVERBALLMANIA'.split('').forEach((ch, i) => lampDot(l1, 'spell-'+i, ch));

  const l2 = section('Lamps — Targets');
  l2.style.gap = '2px';
  ['S','I','L','V','E','R','B','A','L','L','M','A','N','I','A'].forEach((n, i) =>
    lampDot(l2, 'standup-'+i, n));

  const l3 = section('Lamps — Features');
  l3.style.gap = '2px';
  lampDot(l3, 'tl-outer', 'Outer Lit');
  lampDot(l3, 'tl-center', 'Center Lit');
  lampDot(l3, 'lspin', 'Spin L');
  lampDot(l3, 'rspin', 'Spin R');
  lampDot(l3, '15k', '15K');
  lampDot(l3, '30k', '30K');
  lampDot(l3, 'special', 'Special');
  lampDot(l3, 'bx2', '2X');
  lampDot(l3, 'bx3', '3X');
  lampDot(l3, 'bx4', '4X');
  lampDot(l3, 'bx5', '5X');
  lampDot(l3, 'kicker', 'Kicker');
  lampDot(l3, 'eb', 'EB');
  lampDot(l3, 'again', 'Again');

  // Event log
  const lLog = section('Event Log');
  lLog.style.cssText = 'display:block;';
  const logDiv = document.createElement('div');
  logDiv.id = 'log';
  lLog.appendChild(logDiv);

  // Hidden head lamps (needed by lamp system)
  'SILVERBALL'.split('').forEach((ch, i) => {
    const d = document.createElement('div');
    d.id = 'lamp-head-'+i; d.dataset.lamp = 'head-'+i;
    d.className = 'lamp'; d.style.display = 'none';
    pf.appendChild(d);
  });
  ['highscore','gameover','tilt','match'].forEach(k => {
    const d = document.createElement('div');
    d.id = 'hl-'+k; d.className = 'head-lamp'; d.style.display = 'none';
    pf.appendChild(d);
  });
}
