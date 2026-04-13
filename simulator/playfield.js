// Build switch/lamp/coil control panel for manual testing
function buildPlayfield() {
  const pf = document.getElementById('playfield');
  pf.style.width = '700px';
  pf.style.minWidth = '700px';
  pf.style.height = 'auto';
  pf.style.background = '#0d0d1a';
  pf.style.borderRadius = '8px';
  pf.style.padding = '12px';
  pf.style.overflow = 'visible';
  pf.style.position = 'relative';

  function section(title) {
    const h = document.createElement('h3');
    h.textContent = title;
    h.style.cssText = 'color:#c0a040;font-size:12px;margin:14px 0 6px;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #333;padding-bottom:4px;';
    pf.appendChild(h);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;';
    pf.appendChild(wrap);
    return wrap;
  }

  function swBtn(parent, sw, label) {
    const b = document.createElement('button');
    b.textContent = label;
    b.dataset.sw = sw;
    b.title = 'SW ' + sw + ': ' + label;
    b.style.cssText = 'padding:4px 8px;font-size:10px;font-family:inherit;cursor:pointer;border-radius:3px;border:1px solid #555;color:#fff;min-width:36px;';
    b.style.background = '#333';
    parent.appendChild(b);
    return b;
  }

  // === SWITCHES ===
  const s1 = section('Top Lanes & Rebounds');
  swBtn(s1, SW_TOP_LEFT, 'Top Left (05)');
  swBtn(s1, SW_TOP_CENTER, 'Top Center (04)');
  swBtn(s1, SW_TOP_RIGHT, 'Top Right (03)');
  swBtn(s1, SW_REBOUNDS, '50pt Rebounds (34)');

  const s2 = section('Standup Targets - SILVERBALL');
  swBtn(s2, SW_TOP_S, 'S (24)');
  swBtn(s2, SW_TOP_I, 'I (23)');
  swBtn(s2, SW_TOP_L, 'L (22)');
  swBtn(s2, SW_TOP_V, 'V (21)');
  swBtn(s2, SW_LEFT_E, 'E (20)');
  swBtn(s2, SW_LEFT_R, 'R (19)');
  swBtn(s2, SW_LEFT_B, 'B (18)');
  swBtn(s2, SW_RIGHT_A, 'A (17)');

  const s3 = section('Standup Targets - MANIA & Sides');
  swBtn(s3, SW_UPPER_L_SIDE, 'L side upper (32)');
  swBtn(s3, SW_LOWER_L_SIDE, 'L side lower (31)');
  swBtn(s3, SW_CENTER_TARGET, 'N center (28)');
  swBtn(s3, SW_LEFT_OUTLANE_M, 'M outlane (30)');
  swBtn(s3, SW_LEFT_INLANE_A, 'A inlane (29)');
  swBtn(s3, SW_RIGHT_INLANE_I, 'I inlane (27)');
  swBtn(s3, SW_RIGHT_OUTLANE_A, 'A outlane (26)');

  const s4 = section('Horseshoe & Kicker');
  swBtn(s4, SW_HOOP_ROLLOVER, 'Horseshoe (02)');
  swBtn(s4, SW_KICKER_ROLLOVER, 'Kicker (01)');

  const s5 = section('Spinners');
  swBtn(s5, SW_LEFT_SPINNER, 'Left Spinner (33)');
  swBtn(s5, SW_RIGHT_SPINNER, 'Right Spinner (25)');

  const s6 = section('Bumpers & Slingshots');
  swBtn(s6, SW_LEFT_BUMPER, 'Left Bumper (40)');
  swBtn(s6, SW_CENTER_BUMPER, 'Center Bumper (38)');
  swBtn(s6, SW_RIGHT_BUMPER, 'Right Bumper (39)');
  swBtn(s6, SW_LEFT_SLING, 'Left Sling (37)');
  swBtn(s6, SW_RIGHT_SLING, 'Right Sling (36)');

  const s7 = section('Drain & System');
  swBtn(s7, SW_OUTHOLE, 'Drain (08)');
  swBtn(s7, SW_TILT, 'Tilt (07)');

  // === LAMP HELPER ===
  function lampDot(parent, id, label) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;gap:3px;padding:2px 6px;background:#1a1a2e;border-radius:3px;border:1px solid #222;';
    const dot = document.createElement('div');
    dot.id = 'lamp-' + id;
    dot.dataset.lamp = id;
    dot.className = 'lamp';
    dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#444;position:static;flex-shrink:0;';
    const lbl = document.createElement('span');
    lbl.textContent = label;
    lbl.style.cssText = 'font-size:9px;color:#888;white-space:nowrap;';
    wrap.appendChild(dot);
    wrap.appendChild(lbl);
    parent.appendChild(wrap);
  }

  // --- Playfield Spellout ---
  const lSpell = section('Playfield Spellout Lamps');
  lSpell.style.gap = '3px';
  'SILVERBALLMANIA'.split('').forEach((ch, i) => {
    lampDot(lSpell, 'spell-'+i, ch + (i<6?' (Silver)':i<10?' (Ball)':' (Mania)'));
  });

  // --- Standup Target Indicators ---
  const lTgt = section('Standup Target Lamps');
  lTgt.style.gap = '3px';
  const tgtNames = [
    'S target','I target','L target','V target','E target','R target','B target','A target',
    'L upper side','L lower side','M outlane','A inlane','N center','I inlane','A outlane'];
  tgtNames.forEach((n, i) => lampDot(lTgt, 'standup-'+i, n));

  // --- Top Lanes ---
  const lLanes = section('Top Lanes & Spinners');
  lLanes.style.gap = '3px';
  lampDot(lLanes, 'tl-outer', 'Outer Lanes When Lit');
  lampDot(lLanes, 'tl-center', 'Center Lane When Lit');
  lampDot(lLanes, 'lspin', 'Left Spinner 1000');
  lampDot(lLanes, 'rspin', 'Right Spinner 1000');

  // --- Bonus & Multiplier ---
  const lBonus = section('Bonus & Multiplier');
  lBonus.style.gap = '3px';
  lampDot(lBonus, '15k', '15K Bonus');
  lampDot(lBonus, '30k', '30K Bonus');
  lampDot(lBonus, 'special', 'Kicker Special');
  lampDot(lBonus, 'bx2', 'Bonus 2X');
  lampDot(lBonus, 'bx3', 'Bonus 3X');
  lampDot(lBonus, 'bx4', 'Bonus 4X');
  lampDot(lBonus, 'bx5', 'Bonus 5X');

  // --- Kicker & Ball Save ---
  const lKick = section('Kicker & Ball');
  lKick.style.gap = '3px';
  lampDot(lKick, 'kicker', 'Kicker Active');
  lampDot(lKick, 'eb', 'Extra Ball');
  lampDot(lKick, 'again', 'Shoot Again');

  // Head lamps (hidden, needed by lamp system)
  'SILVERBALL'.split('').forEach((ch, i) => {
    const dot = document.createElement('div');
    dot.id = 'lamp-head-'+i;
    dot.dataset.lamp = 'head-'+i;
    dot.className = 'lamp';
    dot.style.cssText = 'display:none;';
    pf.appendChild(dot);
  });
  // Hidden head indicator lamps
  ['highscore','gameover','tilt','match'].forEach(k => {
    const dot = document.createElement('div');
    dot.id = 'hl-'+k;
    dot.className = 'head-lamp';
    dot.style.cssText = 'display:none;';
    pf.appendChild(dot);
  });
}
