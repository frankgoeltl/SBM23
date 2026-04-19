// SBM23 Browser Simulator — Copyright (C) 2026 Frank Goeltl, Dick Hamill and contributors.
// Licensed under the GNU General Public License v3.0 or later.
// This program comes with ABSOLUTELY NO WARRANTY. See the LICENSE file for details.

// Silverball letter collection system

function getCurrentSilverballWord() {
  const p = G.currentPlayer;
  // Check SILVER (0-5), then BALL (6-9), then MANIA (10-14)
  for (let i=0; i<6; i++) {
    if ((G.silverballStatus[p][i] & 0x0F) < SB_WORD_GROUPS) return 0;
  }
  for (let i=6; i<10; i++) {
    if ((G.silverballStatus[p][i] & 0x0F) < SB_WORD_GROUPS) return 1;
  }
  return 2;
}

function turnOnSilverballLetter(letterNum) {
  const p = G.currentPlayer;
  if ((G.silverballStatus[p][letterNum] & 0x0F) < 0x0F) {
    G.silverballStatus[p][letterNum] = (G.silverballStatus[p][letterNum] & 0xF0) | G.silverballMode[p];
    G.silverballHighlightEnd[letterNum] = G.currentTime + 5000;
    playSound('letter');
    G.lastSilverballLetter = G.currentTime;
    addLog('Lit ' + LETTER_NAMES[letterNum], 'event');
  }
}

function spotSilverballLetter() {
  if (G.silverballPhase) return;
  const p = G.currentPlayer;
  for (let i = 0; i < 15; i++) {
    if ((G.silverballStatus[p][i] & 0x0F) < G.silverballMode[p]) {
      turnOnSilverballLetter(i);
      G.scores[p] += G.scoreMultiplier * 1000;
      checkSilverballComplete();
      return;
    }
  }
}

function checkSilverballComplete() {
  const p = G.currentPlayer;
  for (let i=0; i<15; i++) {
    if ((G.silverballStatus[p][i] & 0x0F) < G.silverballMode[p]) return false;
  }
  // All letters complete!
  if ((G.silverballMode[p] & 0x0F) < 14) G.silverballMode[p]++;
  for (let i=0; i<15; i++) {
    G.silverballHighlightEnd[i] = G.currentTime + 5000;
    if (i<10) {
      G.silverballStatus[p][i] = (G.silverballStatus[p][i] & 0x0F) | ((G.silverballMode[p]-1)*16);
    }
  }
  const award = G.scoreMultiplier * SILVERBALL_COMPLETION_AWARD * (G.silverballMode[p] & 0x0F);
  startScoreAnim(award);
  playSound('completion');
  G.extraBallHurryUp = G.currentTime + 4000 * (G.silverballMode[p] & 0x0F);
  G.awardLightAnimEnd = G.currentTime + 1000;
  addLog('SILVERBALL MANIA complete! +' + (award/1000) + 'K', 'mode');
  return true;
}

function handleSilverballHit(sw) {
  const p = G.currentPlayer;
  const m = G.scoreMultiplier;
  let awarded = false;
  G.lastSilverballSwitch = G.currentTime;

  if (sw < SW_RIGHT_A || sw > SW_UPPER_L_SIDE) return;
  const letterNum = SW_TO_LETTER[sw - SW_RIGHT_A];
  if (letterNum === 255) return;

  if (G.silverballMode[p] === SB_KNOCK_OUT) {
    if ((G.silverballStatus[p][letterNum] & 0x0F) < SB_KNOCK_OUT) {
      turnOnSilverballLetter(letterNum);
      awarded = true;
      G.scores[p] += m * 1000;
      if (letterNum===10||letterNum===14) setKicker(true, 5000);
    }
  } else if (G.silverballMode[p] === SB_WORD_GROUPS) {
    let wordNum = letterNum < 6 ? 0 : letterNum < 10 ? 1 : 2;
    G.currentSilverballWord = getCurrentSilverballWord();
    if (wordNum===G.currentSilverballWord && (G.silverballStatus[p][letterNum]&0x0F)<SB_WORD_GROUPS) {
      turnOnSilverballLetter(letterNum);
      awarded = true;
      G.scores[p] += m * 1000;
      if (letterNum===10||letterNum===14) setKicker(true, 5000);
    }
  } else if (G.silverballMode[p] >= SB_FADEAWAY) {
    let inOrder = true;
    for (let i=0; i<letterNum; i++) {
      if ((G.silverballStatus[p][i]&0x0F) < SB_FADEAWAY) { inOrder=false; break; }
    }
    if (inOrder) {
      turnOnSilverballLetter(letterNum);
      G.scores[p] += m*1000;
      for (let i=letterNum+1; i<15; i++) {
        if (G.silverballHighlightEnd[i]) turnOnSilverballLetter(i); else break;
      }
    } else {
      G.silverballHighlightEnd[letterNum] = G.currentTime + 20000;
      G.scores[p] += m*1000;
      playSound('unlit');
    }
    awarded = true;
  }

  // Center target + horseshoe combo
  if (sw===SW_CENTER_TARGET && G.lastHorseshoe && (G.currentTime-G.lastHorseshoe)<nextHorseshoeTime()) {
    increaseBonusX();
    G.lastHorseshoe = 0;
    if (G.superSkillshot) {
      startScoreAnim(m*15000); G.baseBonusX[p] = Math.min(G.baseBonusX[p]+1, 5);
      addLog('Super Skill Shot! +15K','score');
    }
    awarded = true;
    G.awardLightAnimEnd = G.currentTime + 1500;
  }

  // Extra ball hurry up
  if (sw===SW_CENTER_TARGET && G.extraBallHurryUp) {
    G.extraBallHurryUp = 0;
    G.samePlayerShootsAgain = true;
    addLog('EXTRA BALL!', 'mode');
    awarded = true;
  }

  if (checkSilverballComplete()) awarded = true;

  if (!awarded) {
    G.scores[p] += m*100;
    playSound('unlit');
  }
}

function rotateMania() {
  const p = G.currentPlayer;
  const carry = G.silverballStatus[p][10];
  for (let i=10; i<14; i++) G.silverballStatus[p][i] = G.silverballStatus[p][i+1];
  G.silverballStatus[p][14] = carry;
}

function increaseBonusX() {
  const p = G.currentPlayer;
  if (G.bonusX[p] < MAX_BONUS_X) {
    G.bonusX[p]++;
    playSound('bonus_x');
    G.bonusXAnimStart = G.currentTime;
    addLog('Bonus X -> ' + G.bonusX[p] + 'X', 'event');
  }
}
