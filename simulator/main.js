// Main game loop, keyboard, click handlers, boot

function gameLoop(timestamp) {
  G.currentTime = timestamp;

  switch (G.machineState) {
    case MS_ATTRACT:
      runAttractMode();
      break;
    case MS_INIT_GAMEPLAY:
      initGameplay();
      break;
    case MS_INIT_NEW_BALL:
      initNewBall();
      break;
    case MS_NORMAL_GAMEPLAY:
      manageGameMode();
      updateAllLamps();
      break;
    case MS_COUNTDOWN_BONUS:
      runCountdownBonus();
      break;
    case MS_BALL_OVER:
      runBallOver();
      break;
    case MS_MATCH_MODE:
      runMatchMode();
      break;
  }

  updateDisplays();
  updateStatus();
  requestAnimationFrame(gameLoop);
}

// Public control functions (called from HTML buttons and keyboard)
function insertCoin() { insertCoinInternal(); }
function pressStart() {
  if (G.machineState === MS_ATTRACT) {
    if (addPlayer(true)) initGameplay();
  } else if (G.machineState === MS_NORMAL_GAMEPLAY && G.currentBallInPlay < 2) {
    addPlayer(false);
  }
  // All other states: ignore start button (no restart mid-game)
}
function plunge() {
  if (G.machineState === MS_NORMAL_GAMEPLAY && !G.ballFirstSwitch) {
    addLog('Ball plunged!', 'event');
    // Simulate ball entering toplane area
    const lanes = [SW_TOP_LEFT, SW_TOP_CENTER, SW_TOP_RIGHT];
    const pick = lanes[Math.floor(Math.random()*3)];
    setTimeout(() => handleSwitch(pick), 300);
  }
}
function tilt() { handleSwitch(SW_TILT); }

function toggleRulesMode() {
  G.rulesMode = G.rulesMode === 'classic' ? 'original' : 'classic';
  const btn = document.getElementById('btn-rules');
  if (G.rulesMode === 'classic') {
    btn.textContent = 'SBM23 (Custom Rules)';
    btn.style.background = '#444';
    btn.style.borderColor = '#666';
  } else {
    btn.textContent = 'Original (1980 Bally)';
    btn.style.background = '#224422';
    btn.style.borderColor = '#44aa44';
  }
  addLog('Rules: ' + btn.textContent, 'mode');
}
window.toggleRulesMode = toggleRulesMode;

// Expose to HTML onclick
window.G = G;
window.G.insertCoin = insertCoin;
window.G.pressStart = pressStart;
window.G.plunge = plunge;
window.G.tilt = tilt;

// Keyboard bindings
document.addEventListener('keydown', e => {
  switch(e.key.toLowerCase()) {
    case 'c': insertCoin(); break;
    case 'enter': pressStart(); e.preventDefault(); break;
    case ' ': plunge(); e.preventDefault(); break;
    case 't': tilt(); break;
  }
});

// Click handlers for playfield elements
document.addEventListener('click', e => {
  const el = e.target.closest('[data-sw]');
  if (el) {
    const sw = parseInt(el.dataset.sw);
    handleSwitch(sw);
    // Visual feedback
    el.style.filter = 'brightness(2)';
    setTimeout(() => el.style.filter = '', 150);
  }
  // Plunger
  if (e.target.closest('#plunger')) plunge();
});

// Boot
document.addEventListener('DOMContentLoaded', () => {
  buildPlayfield();
  buildRulesContent();
  G.machineState = MS_ATTRACT;
  G.stateChanged = true;
  addLog('Silverball Mania simulator ready', 'mode');
  addLog('Insert coin (C) and press Start (Enter)', 'event');
  requestAnimationFrame(gameLoop);
});

function buildRulesContent() {
  const h = (tag,text,style) => `<${tag} style="${style||''}">${text}</${tag}>`;
  const hd = text => h('h2',text,"font-family:'Oswald',sans-serif;font-size:20px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:#D42A80;margin:24px 0 8px;");
  const sh = text => h('h3',text,"font-family:'Oswald',sans-serif;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#1A1A1A;margin:16px 0 6px;");
  const p = text => h('p',text,"font-family:'Source Serif 4',Georgia,serif;font-size:14px;line-height:1.6;color:#2D2D2D;margin:0 0 8px;");
  const row = (a,b) => `<tr><td style="font-family:'Source Serif 4',serif;font-size:13px;padding:3px 12px 3px 0;color:#1A1A1A;">${a}</td><td style="font-family:'Space Mono',monospace;font-size:12px;color:#D42A80;">${b}</td></tr>`;

  const el = document.getElementById('rules-content');
  el.innerHTML = `
${h('h1','Silverball Mania Rules',"font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;text-transform:uppercase;letter-spacing:0.03em;color:#0A0A0A;margin:0 0 4px;")}
${h('div','Toggle rules mode in Controls panel',"font-family:'Space Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#8A8680;margin-bottom:20px;")}

${hd('Original (1980 Bally)')}
${p('Factory rules from the original machine.')}

${sh('Scoring')}
<table style="border-collapse:collapse;margin-bottom:12px;">
${row('Lit targets / rollovers','1,000')}
${row('Unlit targets / rollovers','500')}
${row('Spinners (lit / unlit)','1,000 / 100')}
${row('Center hoop (horseshoe)','5,000')}
${row('Top center lane','5,000 (always)')}
${row('Top outer lanes','500 (always)')}
${row('Thumper bumpers','100')}
${row('Passive bumpers / rebounds','50')}
${row('Slingshots','20')}
${row('Kicker (lit / unlit)','5,000 / 500')}
</table>

${sh('Center Hoop')}
${p('The key shot. Each hit: 5K points, spots a letter, advances bonus X, lights kicker.')}

${sh('Bonus Multiplier')}
${p('Advanced only by horseshoe. 1X &rarr; 2X &rarr; 3X &rarr; 4X &rarr; 5X &rarr; Extra Ball lit at N target. Resets each ball.')}

${sh('SILVERBALL MANIA Letters')}
${p('15 letters collected via targets, rollovers, lane spots, and horseshoe. Letters carry ball-to-ball. On completion they reset for next round.')}
${p('1st completion: 15K Wizard Bonus. 2nd: 30K Supreme Wizard. 3rd+: Special (free credit).')}

${sh('Spinners')}
${p('Lit by spelling MANIA. Only left or right lit at a time, toggled by bumpers and slingshots. Unlit at ball start.')}

${sh('Kicker')}
${p('Lit by center lane or horseshoe. Stays up until ball hits it. Drops after each use.')}

${sh('Top Lanes')}
${p('Center or outer lanes lit (toggled by bumpers/slings). Center lit at ball start (skillshot). Lit lanes spot a letter.')}

${hd('SBM23 (Custom Rules)')}
${p('Enhanced rules by Dick Hamill, replacing the original Bally ROM.')}

${sh('Skill Shot')}
${p('At ball start: lit top lanes and horseshoe award 10K-20K. Horseshoe qualifies super skill shot at N target (+15K, advances base bonus X).')}

${sh('Silverball Modes')}
${p('<b>Knock Out</b> (1st): All targets lit, hit to collect.')}
${p('<b>Word Groups</b> (2nd): Collect SILVER, then BALL, then MANIA in order.')}
${p('<b>Fadeaway</b> (3rd+): Letters must be collected in strict S-I-L-V-E-R-B-A-L-L-M-A-N-I-A order. Out-of-order hits held 20s.')}

${sh('Alternating Combo')}
${p('1. Ball through inlane starts combo. 2. Alternate left/right spinners (2-4 hits). 3. Horseshoe to qualify bonus. 4. Kicker to collect.')}
${p('Awards: 15K &rarr; 30K &rarr; 60K added bonus.')}

${sh('Bonus X')}
${p('Two ways: horseshoe + N target within timed window, or complete all 3 top lanes. Window shrinks as X increases.')}

${sh('Ball Save')}
${p('15-second ball save at ball start. No ball save in original mode.')}

${sh('Scoring')}
<table style="border-collapse:collapse;margin-bottom:12px;">
${row('Skill shot (lanes)','10,000')}
${row('Horseshoe (skill shot)','20,000')}
${row('Horseshoe (combo)','15,000')}
${row('Horseshoe (normal)','5,000')}
${row('Spinner (combo advance)','1,500')}
${row('Spinner (lit)','1,000')}
${row('Spinner (unlit)','100')}
${row('Lit target','1,000')}
${row('Unlit target','100')}
${row('Bumpers','100')}
${row('Slingshots','10')}
${row('SBM completion','20K &times; mode level')}
</table>
`;
}
