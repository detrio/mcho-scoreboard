import { ClockStatus } from '../types'
import { MainClockAction } from '../actions/main-clock.actions'

export interface MainClockState {
  status: ClockStatus
  hours: number
  minutes: number
  seconds: number
  tenths: number
  showTenths: boolean
}

const mainClockState: MainClockState = {
  status: ClockStatus.READY,
  hours: 0,
  minutes: 3,
  seconds: 0,
  tenths: 0,
  showTenths: false,
}

function mainClockReducer(state = mainClockState, action: MainClockAction) {
  switch (action.type) {
    case 'SET_MAIN_CLOCK_STATUS':
      return {
        ...state,
        status: action.payload.status,
      }
    case 'ADD_TO_MAIN_CLOCK_TIME': {
      if (state.status === ClockStatus.RUNNING) {
        return state
      }

      let newHours = state.hours + action.payload.hours
      let newMinutes = state.minutes + action.payload.minutes
      let newSeconds = state.seconds + action.payload.seconds

      if (newSeconds > 59) {
        newSeconds = 0
        newMinutes++
      }

      if (newMinutes > 59) {
        newMinutes = 0
        newHours++
      }

      if (newHours > 23) {
        newHours = 23
      }

      return {
        ...state,
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
        tenths: 0,
      }
    }
    case 'SUBTRACT_FROM_MAIN_CLOCK_TIME': {
      if (state.status === ClockStatus.RUNNING) {
        return state
      }

      let newHours = state.hours - action.payload.hours
      let newMinutes = state.minutes - action.payload.minutes
      let newSeconds = state.seconds - action.payload.seconds

      if (newSeconds < 0) {
        newSeconds = 59
        newMinutes--
      }

      if (newMinutes < 0) {
        newSeconds = 0
        newMinutes = 59
        newHours--
      }

      if (newHours < 0) {
        newHours = 0
      }

      return {
        ...state,
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
        tenths: 0,
      }
    }
    case 'SET_MAIN_CLOCK_TIME':
      return {
        ...state,
        hours: action.payload.hours,
        minutes: action.payload.minutes,
        seconds: action.payload.seconds,
        tenths: action.payload.tenths,
      }
    case 'SET_SHOW_MAIN_CLOCK_TENTHS':
      return {
        ...state,
        showTenths: action.payload.showTenths,
      }
    default:
      return state
  }
}

export default mainClockReducer
