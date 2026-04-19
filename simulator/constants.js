// SBM23 Browser Simulator — Copyright (C) 2026 Frank Goeltl, Dick Hamill and contributors.
// Licensed under the GNU General Public License v3.0 or later.
// This program comes with ABSOLUTELY NO WARRANTY. See the LICENSE file for details.

// Switch IDs (from SBM23.h)
const SW_KICKER_ROLLOVER=0, SW_HOOP_ROLLOVER=1, SW_TOP_RIGHT=2, SW_TOP_CENTER=3,
  SW_TOP_LEFT=4, SW_CREDIT_RESET=5, SW_TILT=6, SW_OUTHOLE=7,
  SW_COIN_3=8, SW_COIN_2=9, SW_COIN_1=10, SW_SLAM=15,
  SW_RIGHT_A=16, SW_LEFT_B=17, SW_LEFT_R=18, SW_LEFT_E=19,
  SW_TOP_V=20, SW_TOP_L=21, SW_TOP_I=22, SW_TOP_S=23,
  SW_RIGHT_SPINNER=24, SW_RIGHT_OUTLANE_A=25, SW_RIGHT_INLANE_I=26,
  SW_CENTER_TARGET=27, SW_LEFT_INLANE_A=28, SW_LEFT_OUTLANE_M=29,
  SW_LOWER_L_SIDE=30, SW_UPPER_L_SIDE=31, SW_LEFT_SPINNER=32,
  SW_REBOUNDS=33, SW_RIGHT_SLING=35, SW_LEFT_SLING=36,
  SW_CENTER_BUMPER=37, SW_RIGHT_BUMPER=38, SW_LEFT_BUMPER=39;

// Machine states
const MS_ATTRACT=0, MS_INIT_GAMEPLAY=1, MS_INIT_NEW_BALL=2,
  MS_NORMAL_GAMEPLAY=4, MS_COUNTDOWN_BONUS=99,
  MS_BALL_OVER=100, MS_MATCH_MODE=110;

// Game modes
const GM_SKILL_SHOT=0, GM_UNSTRUCTURED_PLAY=4, GM_SHOW_BONUS=9;

// Silverball modes
const SB_KNOCK_OUT=1, SB_WORD_GROUPS=2, SB_FADEAWAY=3;

// Letter names for display
const LETTER_NAMES = ['S','I','L','V','E','R','B','A','L','L','M','A','N','I','A'];

// Switch to letter conversion (from SBM23.ino line 2042)
// Index = switchId - SW_RIGHT_A (16), value = letter index 0-14
const SW_TO_LETTER = [7,6,5,4,3,2,1,0,255,14,13,12,11,10,9,8];

// Max bonus multiplier
const MAX_BONUS_X = 5;
const MAX_DISPLAY_BONUS = 55;
const SILVERBALL_COMPLETION_AWARD = 20000;
const TILT_DEBOUNCE = 1000;
