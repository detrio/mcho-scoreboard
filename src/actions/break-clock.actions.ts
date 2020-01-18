import { ClockStatus } from '../types'

export interface SetBreakClockStatus {
  type: 'SET_BREAK_CLOCK_STATUS'
  payload: { status: ClockStatus }
}

export function setBreakClockStatus(status: ClockStatus): SetBreakClockStatus {
  return {
    type: 'SET_BREAK_CLOCK_STATUS',
    payload: { status },
  }
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

export type BreakClockAction = SetBreakClockStatus | SetBreakClockTime
