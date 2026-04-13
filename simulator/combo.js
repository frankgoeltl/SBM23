// Alternating combo system (from AdvanceAlternatingCombo in SBM23.ino)

function advanceAlternatingCombo(sw) {
  const p = G.currentPlayer;
  let advanced = false;

  if (G.altComboPhase === 0) {
    if (G.addedBonusAchieved[p] < 60) {
      if (sw === SW_LEFT_INLANE_A) {
        G.altComboPhase = 2;
        G.altComboExpiration = G.currentTime + 5000;
        advanced = true;
        addLog('Combo started from left inlane');
      } else if (sw === SW_RIGHT_INLANE_I) {
        G.altComboPhase = 1;
        G.altComboExpiration = G.currentTime + 5000;
        advanced = true;
        addLog('Combo started from right inlane');
      }
    }
  } else if (G.altComboPhase < 10) {
    if (G.altComboPhase % 2) {
      // Odd phase: expecting left spinner
      if (sw === SW_LEFT_SPINNER) {
        G.altCombosHit++;
        G.altComboExpiration = G.currentTime + 10000;
        G.altComboPhase++;
        if (G.altComboPhase === 10) G.altComboPhase = 2;
        advanced = true;
      } else if (sw === SW_RIGHT_SPINNER && G.altCombosHit) {
        G.altComboExpiration = G.currentTime + 10000;
      }
    } else {
      // Even phase: expecting right spinner
      if (sw === SW_RIGHT_SPINNER) {
        G.altCombosHit++;
        G.altComboExpiration = G.currentTime + 10000;
        G.altComboPhase++;
        advanced = true;
      } else if (sw === SW_LEFT_SPINNER && G.altCombosHit) {
        G.altComboExpiration = G.currentTime + 10000;
      }
    }

    // Check for phase 10 advancement
    if (G.addedBonusAchieved[p]===0 && G.altCombosHit===2) G.altComboPhase = 10;
    else if (G.addedBonusAchieved[p]===15 && G.altCombosHit===3) G.altComboPhase = 10;
    else if (G.addedBonusAchieved[p]===30 && G.altCombosHit===4) G.altComboPhase = 10;

    if (G.altComboPhase === 10) {
      G.altComboExpiration = G.currentTime + 15000;
      addLog('Combo ready - hit horseshoe!', 'mode');
    }
  } else if (G.altComboPhase === 10) {
    if (sw === SW_HOOP_ROLLOVER) {
      if (G.addedBonusAchieved[p]===0) G.addedBonusQualified[p] = 15;
      else if (G.addedBonusAchieved[p]===15) G.addedBonusQualified[p] = 30;
      else if (G.addedBonusAchieved[p]===30) G.addedBonusQualified[p] = 60;
      G.altCombosHit = 0;
      G.altComboPhase = 0;
      G.altComboExpiration = 0;
      setKicker(true, 20000);
      advanced = true;
      addLog('Bonus ' + G.addedBonusQualified[p] + 'K qualified!', 'mode');
    }
  }
  return advanced;
}
