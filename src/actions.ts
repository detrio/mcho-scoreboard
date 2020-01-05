import {
  ChangeLeftFencerName,
  ChangeLeftFencerColor,
  SetBoutIndex,
  SetBreakClockStatus,
  SetMainClockStatus,
  ChangeRightFencerName,
  ChangeRightFencerColor,
  ChangeConfigVisibility,
  SetHours,
  SetMinutes,
  SetSeconds,
  SetTenths,
  AddToMainClockTime,
  SubtractFromMainClockTime,
  SetMainClockTime,
  SetLeftFencerScore,
  ResetLeftFencerScore,
  DecreaseLeftFencerScore,
  IncreaseLeftFencerScore,
  ResetLeftFencerDoubles,
  DecreaseLeftFencerDoubles,
  IncreaseLeftFencerDoubles,
  ResetLeftFencerCards,
  HideLeftFencerCards,
  ShowLeftFencerCards,
  SetRightFencerScore,
  IncreaseRightFencerScore,
  ResetRightFencerDoubles,
  DecreaseRightFencerDoubles,
  IncreaseRightFencerDoubles,
  ResetRightFencerCards,
  HideRightFencerCards,
  ShowRightFencerCards,
  ToggleLeftFencerYellowCard,
  ToggleLeftFencerRedCard,
  ToggleRightFencerYellowCard,
  ToggleRightFencerRedCard,
  ResetLeftFencer,
  ResetRightFencer,
  SetShowMainClockTenths,
  SetShowBreakClockTenths,
  AddToBreakClockTime,
  SubtractFromBreakClockTime,
  SetBreakClockTime,
} from './types'
import { ClockStatus } from './reducer'

export function changeLeftFencerName(name: string): ChangeLeftFencerName {
  return {
    type: 'CHANGE_LEFT_FENCER_NAME',
    payload: { name },
  }
}

export function changeLeftFencerColor(color: string): ChangeLeftFencerColor {
  return {
    type: 'CHANGE_LEFT_FENCER_COLOR',
    payload: { color },
  }
}

export function changeRightFencerName(name: string): ChangeRightFencerName {
  return {
    type: 'CHANGE_RIGHT_FENCER_NAME',
    payload: { name },
  }
}

export function changeRightFencerColor(color: string): ChangeRightFencerColor {
  return {
    type: 'CHANGE_RIGHT_FENCER_COLOR',
    payload: { color },
  }
}

export function changeConfigVisibility(
  visibility: boolean
): ChangeConfigVisibility {
  return {
    type: 'CHANGE_CONFIG_VISIBILITY',
    payload: { visibility },
  }
}

export function setMainClockStatus(status: ClockStatus): SetMainClockStatus {
  return {
    type: 'SET_MAIN_CLOCK_STATUS',
    payload: { status },
  }
}

export function setBreakClockStatus(status: ClockStatus): SetBreakClockStatus {
  return {
    type: 'SET_BREAK_CLOCK_STATUS',
    payload: { status },
  }
}

export function setBoutIndex(index: number): SetBoutIndex {
  return {
    type: 'SET_BOUT_INDEX',
    payload: { index },
  }
}

export function setHours(hours: number): SetHours {
  return {
    type: 'SET_HOURS',
    payload: { hours },
  }
}

export function setMinutes(minutes: number): SetMinutes {
  return {
    type: 'SET_MINUTES',
    payload: { minutes },
  }
}

export function setSeconds(seconds: number): SetSeconds {
  return {
    type: 'SET_SECONDS',
    payload: { seconds },
  }
}

export function setTenths(tenths: number): SetTenths {
  return {
    type: 'SET_TENTHS',
    payload: { tenths },
  }
}

export function setShowMainClockTenths(
  showTenths: boolean
): SetShowMainClockTenths {
  return {
    type: 'SET_SHOW_MAIN_CLOCK_TENTHS',
    payload: { showTenths },
  }
}

export function setShowBreakClockTenths(
  showTenths: boolean
): SetShowBreakClockTenths {
  return {
    type: 'SET_SHOW_BREAK_CLOCK_TENTHS',
    payload: { showTenths },
  }
}

export function addToBreakClockTime(
  hours: number,
  minutes: number,
  seconds: number
): AddToBreakClockTime {
  return {
    type: 'ADD_TO_BREAK_CLOCK_TIME',
    payload: { hours, minutes, seconds },
  }
}

export function subtractFromBreakClockTime(
  hours: number,
  minutes: number,
  seconds: number
): SubtractFromBreakClockTime {
  return {
    type: 'SUBTRACT_FROM_BREAK_CLOCK_TIME',
    payload: { hours, minutes, seconds },
  }
}

export function setBreakClockTime(
  hours: number,
  minutes: number,
  seconds: number,
  tenths: number = 0
): SetBreakClockTime {
  return {
    type: 'SET_BREAK_CLOCK_TIME',
    payload: { hours, minutes, seconds, tenths },
  }
}

export function addToMainClockTime(
  hours: number,
  minutes: number,
  seconds: number
): AddToMainClockTime {
  return {
    type: 'ADD_TO_MAIN_CLOCK_TIME',
    payload: { hours, minutes, seconds },
  }
}

export function subtractFromMainClockTime(
  hours: number,
  minutes: number,
  seconds: number
): SubtractFromMainClockTime {
  return {
    type: 'SUBTRACT_FROM_MAIN_CLOCK_TIME',
    payload: { hours, minutes, seconds },
  }
}

export function setMainClockTime(
  hours: number,
  minutes: number,
  seconds: number,
  tenths: number = 0
): SetMainClockTime {
  return {
    type: 'SET_MAIN_CLOCK_TIME',
    payload: { hours, minutes, seconds, tenths },
  }
}

export function setLeftFencerScore(score: number): SetLeftFencerScore {
  return {
    type: 'SET_LEFT_FENCER_SCORE',
    payload: { score },
  }
}

export function resetLeftFencerScore(): ResetLeftFencerScore {
  return {
    type: 'RESET_LEFT_FENCER_SCORE',
  }
}

export function decreaseLeftFencerScore(): DecreaseLeftFencerScore {
  return {
    type: 'DECREASE_LEFT_FENCER_SCORE',
  }
}

export function increaseLeftFencerScore(): IncreaseLeftFencerScore {
  return {
    type: 'INCREASE_LEFT_FENCER_SCORE',
  }
}

export function resetLeftFencerDoubles(): ResetLeftFencerDoubles {
  return {
    type: 'RESET_LEFT_FENCER_DOUBLES',
  }
}

export function decreaseLeftFencerDoubles(): DecreaseLeftFencerDoubles {
  return {
    type: 'DECREASE_LEFT_FENCER_DOUBLES',
  }
}

export function increaseLeftFencerDoubles(): IncreaseLeftFencerDoubles {
  return {
    type: 'INCREASE_LEFT_FENCER_DOUBLES',
  }
}

export function resetLeftFencerCards(): ResetLeftFencerCards {
  return {
    type: 'RESET_LEFT_FENCER_CARDS',
  }
}

export function hideLeftFencerCards(): HideLeftFencerCards {
  return {
    type: 'HIDE_LEFT_FENCER_CARDS',
  }
}

export function showLeftFencerCards(): ShowLeftFencerCards {
  return {
    type: 'SHOW_LEFT_FENCER_CARDS',
  }
}

export function setRightFencerScore(score: number): SetRightFencerScore {
  return {
    type: 'SET_RIGHT_FENCER_SCORE',
    payload: { score },
  }
}

export interface ResetRightFencerScore {
  type: 'RESET_RIGHT_FENCER_SCORE'
}

export function resetRightFencerScore(): ResetRightFencerScore {
  return {
    type: 'RESET_RIGHT_FENCER_SCORE',
  }
}

export interface DecreaseRightFencerScore {
  type: 'DECREASE_RIGHT_FENCER_SCORE'
}

export function decreaseRightFencerScore(): DecreaseRightFencerScore {
  return {
    type: 'DECREASE_RIGHT_FENCER_SCORE',
  }
}

export function increaseRightFencerScore(): IncreaseRightFencerScore {
  return {
    type: 'INCREASE_RIGHT_FENCER_SCORE',
  }
}

export function resetRightFencerDoubles(): ResetRightFencerDoubles {
  return {
    type: 'RESET_RIGHT_FENCER_DOUBLES',
  }
}

export function decreaseRightFencerDoubles(): DecreaseRightFencerDoubles {
  return {
    type: 'DECREASE_RIGHT_FENCER_DOUBLES',
  }
}

export function increaseRightFencerDoubles(): IncreaseRightFencerDoubles {
  return {
    type: 'INCREASE_RIGHT_FENCER_DOUBLES',
  }
}

export function resetRightFencerCards(): ResetRightFencerCards {
  return {
    type: 'RESET_RIGHT_FENCER_CARDS',
  }
}

export function hideRightFencerCards(): HideRightFencerCards {
  return {
    type: 'HIDE_RIGHT_FENCER_CARDS',
  }
}

export function showRightFencerCards(): ShowRightFencerCards {
  return {
    type: 'SHOW_RIGHT_FENCER_CARDS',
  }
}

export function toggleLeftFencerYellowCard(): ToggleLeftFencerYellowCard {
  return {
    type: 'TOGGLE_LEFT_FENCER_YELLOW_CARD',
  }
}

export function toggleLeftFencerRedCard(): ToggleLeftFencerRedCard {
  return {
    type: 'TOGGLE_LEFT_FENCER_RED_CARD',
  }
}

export function toggleRightFencerYellowCard(): ToggleRightFencerYellowCard {
  return {
    type: 'TOGGLE_RIGHT_FENCER_YELLOW_CARD',
  }
}

export function toggleRightFencerRedCard(): ToggleRightFencerRedCard {
  return {
    type: 'TOGGLE_RIGHT_FENCER_RED_CARD',
  }
}

export function resetLeftFencer(): ResetLeftFencer {
  return {
    type: 'RESET_LEFT_FENCER',
  }
}

export function resetRightFencer(): ResetRightFencer {
  return {
    type: 'RESET_RIGHT_FENCER',
  }
}
