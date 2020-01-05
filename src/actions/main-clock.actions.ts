import { ClockStatus } from '../types'

export interface SetMainClockStatus {
  type: 'SET_MAIN_CLOCK_STATUS'
  payload: { status: ClockStatus }
}

export function setMainClockStatus(status: ClockStatus): SetMainClockStatus {
  return {
    type: 'SET_MAIN_CLOCK_STATUS',
    payload: { status },
  }
}

export interface SetShowMainClockTenths {
  type: 'SET_SHOW_MAIN_CLOCK_TENTHS'
  payload: { showTenths: boolean }
}

export function setShowMainClockTenths(
  showTenths: boolean
): SetShowMainClockTenths {
  return {
    type: 'SET_SHOW_MAIN_CLOCK_TENTHS',
    payload: { showTenths },
  }
}

export interface AddToMainClockTime {
  type: 'ADD_TO_MAIN_CLOCK_TIME'
  payload: { hours: number; minutes: number; seconds: number }
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

export interface SubtractFromMainClockTime {
  type: 'SUBTRACT_FROM_MAIN_CLOCK_TIME'
  payload: { hours: number; minutes: number; seconds: number }
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

export interface SetMainClockTime {
  type: 'SET_MAIN_CLOCK_TIME'
  payload: {
    hours: number
    minutes: number
    seconds: number
    tenths: number
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

export type MainClockAction =
  | SetMainClockStatus
  | SetShowMainClockTenths
  | AddToMainClockTime
  | SubtractFromMainClockTime
  | SetMainClockTime
