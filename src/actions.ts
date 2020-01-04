import { ClockStatus } from './reducer'

export function changeLeftFencerName(name: string) {
  return {
    type: 'CHANGE_LEFT_FENCER_NAME',
    payload: { name },
  }
}

export function changeLeftFencerColor(color: string) {
  return {
    type: 'CHANGE_LEFT_FENCER_COLOR',
    payload: { color },
  }
}

export function changeRightFencerName(name: string) {
  return {
    type: 'CHANGE_RIGHT_FENCER_NAME',
    payload: { name },
  }
}

export function changeRightFencerColor(color: string) {
  return {
    type: 'CHANGE_RIGHT_FENCER_COLOR',
    payload: { color },
  }
}

export function changeConfigVisibility(visibility: boolean) {
  return {
    type: 'CHANGE_CONFIG_VISIBILITY',
    payload: { visibility },
  }
}

export function setMainClockStatus(status: ClockStatus) {
  return {
    type: 'SET_MAIN_CLOCK_STATUS',
    payload: { status },
  }
}

export function setBreakClockStatus(status: ClockStatus) {
  return {
    type: 'SET_BREAK_CLOCK_STATUS',
    payload: { status },
  }
}

export function setBoutIndex(index: number) {
  return {
    type: 'SET_BOUT_INDEX',
    payload: { index },
  }
}

export function setHours(hours: number) {
  return {
    type: 'SET_HOURS',
    payload: { hours },
  }
}

export function setMinutes(minutes: number) {
  return {
    type: 'SET_MINUTES',
    payload: { minutes },
  }
}

export function setSeconds(seconds: number) {
  return {
    type: 'SET_SECONDS',
    payload: { seconds },
  }
}

export function setTenths(tenths: number) {
  return {
    type: 'SET_TENTHS',
    payload: { tenths },
  }
}

export function setShowTenths(showTenths: boolean) {
  return {
    type: 'SET_SHOW_TENTHS',
    payload: { showTenths },
  }
}

export function addToMainClockTime(
  hours: number,
  minutes: number,
  seconds: number
) {
  return {
    type: 'ADD_TO_MAIN_CLOCK_TIME',
    payload: { hours, minutes, seconds },
  }
}

export function subtractFromMainClockTime(
  hours: number,
  minutes: number,
  seconds: number
) {
  return {
    type: 'SUBTRACT_FROM_MAIN_CLOCK_TIME',
    payload: { hours, minutes, seconds },
  }
}

export function setMainClockTime(
  hours: number,
  minutes: number,
  seconds: number
) {
  return {
    type: 'SET_MAIN_CLOCK_TIME',
    payload: { hours, minutes, seconds },
  }
}

export function setLeftFencerScore(score: number) {
  return {
    type: 'SET_LEFT_FENCER_SCORE',
    payload: { score },
  }
}

export function resetLeftFencerScore() {
  return {
    type: 'RESET_LEFT_FENCER_SCORE',
  }
}

export function decreaseLeftFencerScore() {
  return {
    type: 'DECREASE_LEFT_FENCER_SCORE',
  }
}

export function increaseLeftFencerScore() {
  return {
    type: 'INCREASE_LEFT_FENCER_SCORE',
  }
}

export function resetLeftFencerDoubles() {
  return {
    type: 'RESET_LEFT_FENCER_DOUBLES',
  }
}

export function decreaseLeftFencerDoubles() {
  return {
    type: 'DECREASE_LEFT_FENCER_DOUBLES',
  }
}

export function increaseLeftFencerDoubles() {
  return {
    type: 'INCREASE_LEFT_FENCER_DOUBLES',
  }
}

export function resetLeftFencerCards() {
  return {
    type: 'RESET_LEFT_FENCER_CARDS',
  }
}

export function hideLeftFencerCards() {
  return {
    type: 'HIDE_LEFT_FENCER_CARDS',
  }
}

export function showLeftFencerCards() {
  return {
    type: 'SHOW_LEFT_FENCER_CARDS',
  }
}

export function setRightFencerScore(score: number) {
  return {
    type: 'SET_RIGHT_FENCER_SCORE',
    payload: { score },
  }
}

export function resetRightFencerScore() {
  return {
    type: 'RESET_RIGHT_FENCER_SCORE',
  }
}

export function decreaseRightFencerScore() {
  return {
    type: 'DECREASE_RIGHT_FENCER_SCORE',
  }
}

export function increaseRightFencerScore() {
  return {
    type: 'INCREASE_RIGHT_FENCER_SCORE',
  }
}

export function resetRightFencerDoubles() {
  return {
    type: 'RESET_RIGHT_FENCER_DOUBLES',
  }
}

export function decreaseRightFencerDoubles() {
  return {
    type: 'DECREASE_RIGHT_FENCER_DOUBLES',
  }
}

export function increaseRightFencerDoubles() {
  return {
    type: 'INCREASE_RIGHT_FENCER_DOUBLES',
  }
}

export function resetRightFencerCards() {
  return {
    type: 'RESET_RIGHT_FENCER_CARDS',
  }
}

export function hideRightFencerCards() {
  return {
    type: 'HIDE_RIGHT_FENCER_CARDS',
  }
}

export function showRightFencerCards() {
  return {
    type: 'SHOW_RIGHT_FENCER_CARDS',
  }
}

export function toggleLeftFencerYellowCard() {
  return {
    type: 'TOGGLE_LEFT_FENCER_YELLOW_CARD',
  }
}

export function toggleLeftFencerRedCard() {
  return {
    type: 'TOGGLE_LEFT_FENCER_RED_CARD',
  }
}

export function toggleRightFencerYellowCard() {
  return {
    type: 'TOGGLE_RIGHT_FENCER_YELLOW_CARD',
  }
}

export function toggleRightFencerRedCard() {
  return {
    type: 'TOGGLE_RIGHT_FENCER_RED_CARD',
  }
}

export function resetLeftFencer() {
  return {
    type: 'RESET_LEFT_FENCER',
  }
}

export function resetRightFencer() {
  return {
    type: 'RESET_RIGHT_FENCER',
  }
}
