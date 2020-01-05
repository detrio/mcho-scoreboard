import { ClockStatus } from '../types'
import { BreakClockAction } from '../actions/break-clock.actions'

export interface BreakClockState {
  status: ClockStatus
  hours: number
  minutes: number
  seconds: number
  tenths: number
  showTenths: boolean
}

const breakClockState: BreakClockState = {
  status: ClockStatus.READY,
  hours: 0,
  minutes: 0,
  seconds: 30,
  tenths: 0,
  showTenths: false,
}

function breakClockReducer(state = breakClockState, action: BreakClockAction) {
  switch (action.type) {
    case 'SET_BREAK_CLOCK_STATUS':
      return {
        ...state,
        status: action.payload.status,
      }
    case 'SET_SHOW_BREAK_CLOCK_TENTHS':
      return {
        ...state,
        showTenths: action.payload.showTenths,
      }
    case 'SET_BREAK_CLOCK_TIME':
      return {
        ...state,
        hours: action.payload.hours,
        minutes: action.payload.minutes,
        seconds: action.payload.seconds,
        tenths: action.payload.tenths,
      }
    default:
      return state
  }
}

export default breakClockReducer
