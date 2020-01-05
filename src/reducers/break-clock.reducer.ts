import { ClockStatus } from '../types'
import { BreakClockAction } from '../actions/break-clock.actions'

export interface BreakClockState {
  breakClockStatus: ClockStatus
  breakClockHours: number
  breakClockMinutes: number
  breakClockSeconds: number
  breakClockTenths: number
  breakClockShowTenths: boolean
}

const breakClockState: BreakClockState = {
  breakClockStatus: ClockStatus.READY,
  breakClockHours: 0,
  breakClockMinutes: 0,
  breakClockSeconds: 30,
  breakClockTenths: 0,
  breakClockShowTenths: false,
}

function breakClockReducer(state = breakClockState, action: BreakClockAction) {
  switch (action.type) {
    case 'SET_BREAK_CLOCK_STATUS':
      return {
        ...state,
        breakClockStatus: action.payload.status,
      }
    case 'SET_SHOW_BREAK_CLOCK_TENTHS':
      return {
        ...state,
        breakClockShowTenths: action.payload.showTenths,
      }
    case 'SET_BREAK_CLOCK_TIME':
      return {
        ...state,
        breakClockHours: action.payload.hours,
        breakClockMinutes: action.payload.minutes,
        breakClockSeconds: action.payload.seconds,
        breakClockTenths: action.payload.tenths,
      }
    default:
      return state
  }
}

export default breakClockReducer
