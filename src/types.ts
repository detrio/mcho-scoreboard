import { ClockStatus } from './reducer'

export interface ChangeLeftFencerName {
  type: 'CHANGE_LEFT_FENCER_NAME'
  payload: { name: string }
}

export interface ChangeLeftFencerColor {
  type: 'CHANGE_LEFT_FENCER_COLOR'
  payload: { color: string }
}

export interface ChangeRightFencerName {
  type: 'CHANGE_RIGHT_FENCER_NAME'
  payload: { name: string }
}

export interface ChangeRightFencerColor {
  type: 'CHANGE_RIGHT_FENCER_COLOR'
  payload: { color: string }
}

export interface ChangeConfigVisibility {
  type: 'CHANGE_CONFIG_VISIBILITY'
  payload: { visibility: boolean }
}

export interface SetMainClockStatus {
  type: 'SET_MAIN_CLOCK_STATUS'
  payload: { status: ClockStatus }
}

export interface SetBreakClockStatus {
  type: 'SET_BREAK_CLOCK_STATUS'
  payload: { status: ClockStatus }
}

export interface SetBoutIndex {
  type: 'SET_BOUT_INDEX'
  payload: { index: number }
}

export interface SetHours {
  type: 'SET_HOURS'
  payload: { hours: number }
}

export interface SetMinutes {
  type: 'SET_MINUTES'
  payload: { minutes: number }
}

export interface SetSeconds {
  type: 'SET_SECONDS'
  payload: { seconds: number }
}

export interface SetTenths {
  type: 'SET_TENTHS'
  payload: { tenths: number }
}

export interface SetShowMainClockTenths {
  type: 'SET_SHOW_MAIN_CLOCK_TENTHS'
  payload: { showTenths: boolean }
}

export interface SetShowBreakClockTenths {
  type: 'SET_SHOW_BREAK_CLOCK_TENTHS'
  payload: { showTenths: boolean }
}

export interface AddToMainClockTime {
  type: 'ADD_TO_MAIN_CLOCK_TIME'
  payload: { hours: number; minutes: number; seconds: number }
}

export interface SubtractFromMainClockTime {
  type: 'SUBTRACT_FROM_MAIN_CLOCK_TIME'
  payload: { hours: number; minutes: number; seconds: number }
}

export interface SetMainClockTime {
  type: 'SET_MAIN_CLOCK_TIME'
  payload: {
    hours: number
    minutes: number
    seconds: number
    tenths: number
  }
}

export interface AddToBreakClockTime {
  type: 'ADD_TO_BREAK_CLOCK_TIME'
  payload: { hours: number; minutes: number; seconds: number }
}

export interface SubtractFromBreakClockTime {
  type: 'SUBTRACT_FROM_BREAK_CLOCK_TIME'
  payload: { hours: number; minutes: number; seconds: number }
}

export interface SetBreakClockTime {
  type: 'SET_BREAK_CLOCK_TIME'
  payload: {
    hours: number
    minutes: number
    seconds: number
    tenths: number
  }
}

export interface SetLeftFencerScore {
  type: 'SET_LEFT_FENCER_SCORE'
  payload: { score: number }
}

export interface ResetLeftFencerScore {
  type: 'RESET_LEFT_FENCER_SCORE'
}

export interface DecreaseLeftFencerScore {
  type: 'DECREASE_LEFT_FENCER_SCORE'
}

export interface IncreaseLeftFencerScore {
  type: 'INCREASE_LEFT_FENCER_SCORE'
}

export interface ResetLeftFencerDoubles {
  type: 'RESET_LEFT_FENCER_DOUBLES'
}

export interface DecreaseLeftFencerDoubles {
  type: 'DECREASE_LEFT_FENCER_DOUBLES'
}

export interface IncreaseLeftFencerDoubles {
  type: 'INCREASE_LEFT_FENCER_DOUBLES'
}

export interface ResetLeftFencerCards {
  type: 'RESET_LEFT_FENCER_CARDS'
}

export interface HideLeftFencerCards {
  type: 'HIDE_LEFT_FENCER_CARDS'
}

export interface ShowLeftFencerCards {
  type: 'SHOW_LEFT_FENCER_CARDS'
}

export interface SetRightFencerScore {
  type: 'SET_RIGHT_FENCER_SCORE'
  payload: { score: number }
}

export interface IncreaseRightFencerScore {
  type: 'INCREASE_RIGHT_FENCER_SCORE'
}

export interface ResetRightFencerDoubles {
  type: 'RESET_RIGHT_FENCER_DOUBLES'
}

export interface DecreaseRightFencerDoubles {
  type: 'DECREASE_RIGHT_FENCER_DOUBLES'
}

export interface IncreaseRightFencerDoubles {
  type: 'INCREASE_RIGHT_FENCER_DOUBLES'
}

export interface ResetRightFencerCards {
  type: 'RESET_RIGHT_FENCER_CARDS'
}

export interface HideRightFencerCards {
  type: 'HIDE_RIGHT_FENCER_CARDS'
}

export interface ShowRightFencerCards {
  type: 'SHOW_RIGHT_FENCER_CARDS'
}

export interface ToggleLeftFencerYellowCard {
  type: 'TOGGLE_LEFT_FENCER_YELLOW_CARD'
}

export interface ToggleLeftFencerRedCard {
  type: 'TOGGLE_LEFT_FENCER_RED_CARD'
}

export interface ToggleRightFencerYellowCard {
  type: 'TOGGLE_RIGHT_FENCER_YELLOW_CARD'
}

export interface ToggleRightFencerRedCard {
  type: 'TOGGLE_RIGHT_FENCER_RED_CARD'
}

export interface ResetLeftFencer {
  type: 'RESET_LEFT_FENCER'
}

export interface ResetRightFencer {
  type: 'RESET_RIGHT_FENCER'
}

export type Action =
  | ChangeLeftFencerName
  | ChangeLeftFencerColor
  | ChangeRightFencerName
  | ChangeRightFencerColor
  | ChangeConfigVisibility
  | SetMainClockStatus
  | SetBreakClockStatus
  | SetBoutIndex
  | SetHours
  | SetMinutes
  | SetSeconds
  | SetTenths
  | SetShowMainClockTenths
  | SetShowBreakClockTenths
  | AddToMainClockTime
  | SubtractFromMainClockTime
  | SetMainClockTime
  | AddToBreakClockTime
  | SubtractFromBreakClockTime
  | SetBreakClockTime
  | SetLeftFencerScore
  | ResetLeftFencerScore
  | DecreaseLeftFencerScore
  | IncreaseLeftFencerScore
  | ResetLeftFencerDoubles
  | DecreaseLeftFencerDoubles
  | IncreaseLeftFencerDoubles
  | ResetLeftFencerCards
  | HideLeftFencerCards
  | ShowLeftFencerCards
  | SetRightFencerScore
  | IncreaseRightFencerScore
  | ResetRightFencerDoubles
  | DecreaseRightFencerDoubles
  | IncreaseRightFencerDoubles
  | ResetRightFencerCards
  | HideRightFencerCards
  | ShowRightFencerCards
  | ToggleLeftFencerYellowCard
  | ToggleLeftFencerRedCard
  | ToggleRightFencerYellowCard
  | ToggleRightFencerRedCard
  | ResetLeftFencer
  | ResetRightFencer
