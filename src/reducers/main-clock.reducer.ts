import { ClockStatus } from '../types'
import { MainClockAction } from '../actions/main-clock.actions'

export interface MainClockState {
  mainClockStatus: ClockStatus
  mainClockHours: number
  mainClockMinutes: number
  mainClockSeconds: number
  mainClockTenths: number
  mainClockShowTenths: boolean
}

const mainClockState: MainClockState = {
  mainClockStatus: ClockStatus.READY,
  mainClockHours: 0,
  mainClockMinutes: 3,
  mainClockSeconds: 0,
  mainClockTenths: 0,
  mainClockShowTenths: false,
}

function mainClockReducer(state = mainClockState, action: MainClockAction) {
  switch (action.type) {
    case 'SET_MAIN_CLOCK_STATUS':
      return {
        ...state,
        mainClockStatus: action.payload.status,
      }
    case 'ADD_TO_MAIN_CLOCK_TIME': {
      if (state.mainClockStatus === ClockStatus.RUNNING) {
        return state
      }

      let newHours = state.mainClockHours + action.payload.hours
      let newMinutes = state.mainClockMinutes + action.payload.minutes
      let newSeconds = state.mainClockSeconds + action.payload.seconds

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
        mainClockHours: newHours,
        mainClockMinutes: newMinutes,
        mainClockSeconds: newSeconds,
        mainClockTenths: 0,
      }
    }
    case 'SUBTRACT_FROM_MAIN_CLOCK_TIME': {
      if (state.mainClockStatus === ClockStatus.RUNNING) {
        return state
      }

      let newHours = state.mainClockHours - action.payload.hours
      let newMinutes = state.mainClockMinutes - action.payload.minutes
      let newSeconds = state.mainClockSeconds - action.payload.seconds

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
        mainClockHours: newHours,
        mainClockMinutes: newMinutes,
        mainClockSeconds: newSeconds,
        mainClockTenths: 0,
      }
    }
    case 'SET_MAIN_CLOCK_TIME':
      return {
        ...state,
        mainClockHours: action.payload.hours,
        mainClockMinutes: action.payload.minutes,
        mainClockSeconds: action.payload.seconds,
        mainClockTenths: action.payload.tenths,
      }
    case 'SET_SHOW_MAIN_CLOCK_TENTHS':
      return {
        ...state,
        mainClockShowTenths: action.payload.showTenths,
      }
    default:
      return state
  }
}

export default mainClockReducer
