# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Custom game code for a 1980 Bally Silverball Mania pinball machine. Runs on an Arduino MEGA 2560 PRO interfaced with the original MPU board via the RPU (Retro Pinball Utilities) OS framework by Dick Hamill. Written in C++ as an Arduino sketch.

## Build & Upload

This is an Arduino project. Compile and upload using the Arduino IDE or `arduino-cli`:

```bash
arduino-cli compile --fqbn arduino:avr:mega SBM23.ino
arduino-cli upload --fqbn arduino:avr:mega --port /dev/ttyUSB0 SBM23.ino
```

There are no tests or linters. Verification is done by compiling successfully and testing on physical hardware.

## Architecture

### File Structure

- **SBM23.ino** - Main game logic: state machine, game modes, scoring, switch handling, lamp/sound control. This is the bulk of the codebase.
- **SBM23.h** - Hardware mapping defines: lamp numbers (`LAMP_*`), switch numbers (`SW_*`), solenoid numbers (`SOL_*`), solenoid-associated switches, and lamp animation data.
- **RPU.h / RPU.cpp** - The RPU OS hardware abstraction layer (v5.4). Provides APIs for switches, solenoids, displays, lamps, sounds, and EEPROM. Shared across multiple pinball projects.
- **RPU_Config.h** - Board and architecture configuration. `RPU_OS_HARDWARE_REV` and `RPU_MPU_ARCHITECTURE` must match the physical hardware. Feature flags (`RPU_OS_USE_DASH51`, `RPU_OS_USE_WAV_TRIGGER_1p3`, etc.) enable/disable sound and display subsystems.
- **SelfTestAndAudit.h / .cpp** - Coin-door self-test, audit, and settings menu system. Negative machine states correspond to test/audit pages.
- **SendOnlyWavTrigger.h / .cpp** - Serial driver for the WAV Trigger audio board (optional sound hardware).

### Game State Machine

The game is driven by a state machine in `MachineState`:
- **0** (Attract Mode) - Idle attract display
- **Negative values** - Self-test and settings modes (defined in SelfTestAndAudit.h)
- **1** - Init gameplay
- **2** - Init new ball
- **4** - Normal gameplay
- **99** - Countdown bonus
- **100** - Ball over
- **110** - Match mode

Game modes within normal gameplay use `GameMode` (lower 4 bits):
- `GAME_MODE_SKILL_SHOT` (0) - Skill shot at ball start
- `GAME_MODE_UNSTRUCTURED_PLAY` (4) - Main play
- `GAME_MODE_SHOW_BONUS` (9) - Bonus display

### Configuration

Hardware config is in `RPU_Config.h`. Game settings are stored in EEPROM (addresses defined as `EEPROM_*` constants in SBM23.ino starting at byte 100). The RPU OS uses EEPROM bytes 1-52 for system-level data (scores, credits, coins).

### Sound System

Four sound modes configured via settings (EEPROM byte 102):
- 0 = No sounds
- 1 = Sound effects through Dash-51 sound board
- 2 = Sound effects + background drone through Dash-51
- 3 = Sound effects through WAV Trigger
- 4 = Sound effects + background music through WAV Trigger

Sound effect numbers are defined as `SOUND_EFFECT_*` constants. WAV Trigger files map to these numbers.

## Key Conventions

- All hardware IDs (lamps, switches, solenoids) are `#define` constants in SBM23.h - always use the named constants, never raw numbers.
- RPU API functions are prefixed with `RPU_` (e.g., `RPU_SetLampState`, `RPU_PushToSolenoidStack`).
- Time tracking uses `unsigned long` milliseconds from Arduino `millis()`.
- The main loop calls `RPU_Update(CurrentTime)` every cycle to service hardware interrupts.
