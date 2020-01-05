import { config } from './utils'
import { Action } from './types'

export enum ClockStatus {
  READY = 0,
  RUNNING = 1,
  STOPPED = 2,
}

export interface ScoreboardState {
  // scoreboard
  boutIndex: number
  mainClockStatus: ClockStatus
  breakClockStatus: ClockStatus
  leftFencerName: string
  leftFencerColor: string
  rightFencerName: string
  rightFencerColor: string
  configShown: boolean

  // Main clock
  mainClockHours: number
  mainClockMinutes: number
  mainClockSeconds: number
  mainClockTenths: number
  mainClockShowTenths: boolean

  // Break clock
  breakClockHours: number
  breakClockMinutes: number
  breakClockSeconds: number
  breakClockTenths: number
  breakClockShowTenths: boolean

  // left fencer
  leftFencerYellowCard: boolean
  leftFencerRedCard: boolean
  leftFencerBlackCard: boolean
  leftFencerScore: number
  leftFencerDoubles: number

  // right fencer
  rightFencerYellowCard: boolean
  rightFencerRedCard: boolean
  rightFencerBlackCard: boolean
  rightFencerScore: number
  rightFencerDoubles: number
}

const initialState: ScoreboardState = {
  boutIndex: 0,
  mainClockStatus: ClockStatus.READY,
  breakClockStatus: ClockStatus.READY,
  leftFencerName: 'LEFT',
  leftFencerColor: '#990000',
  rightFencerName: 'RIGHT',
  rightFencerColor: '#006699',
  configShown: false,

  mainClockHours: 0,
  mainClockMinutes: 3,
  mainClockSeconds: 0,
  mainClockTenths: 0,
  mainClockShowTenths: false,

  breakClockHours: 0,
  breakClockMinutes: 3,
  breakClockSeconds: 0,
  breakClockTenths: 0,
  breakClockShowTenths: false,

  leftFencerYellowCard: false,
  leftFencerRedCard: false,
  leftFencerBlackCard: false,
  leftFencerScore: 0,
  leftFencerDoubles: 0,

  rightFencerYellowCard: false,
  rightFencerRedCard: false,
  rightFencerBlackCard: false,
  rightFencerScore: 0,
  rightFencerDoubles: 0,
}

function rootReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'CHANGE_LEFT_FENCER_NAME':
      return {
        ...state,
        leftFencerName: action.payload.name,
      }
    case 'CHANGE_LEFT_FENCER_COLOR':
      return {
        ...state,
        leftFencerName: action.payload.color,
      }
    case 'CHANGE_RIGHT_FENCER_NAME':
      return {
        ...state,
        leftFencerName: action.payload.name,
      }
    case 'CHANGE_RIGHT_FENCER_COLOR':
      return {
        ...state,
        leftFencerName: action.payload.color,
      }
    case 'CHANGE_CONFIG_VISIBILITY':
      return {
        ...state,
        configShown: action.payload.visibility,
      }
    case 'SET_MAIN_CLOCK_STATUS':
      return {
        ...state,
        mainClockStatus: action.payload.status,
      }
    case 'SET_BREAK_CLOCK_STATUS':
      return {
        ...state,
        breakClockStatus: action.payload.status,
      }
    case 'SET_BOUT_INDEX':
      return {
        ...state,
        boutIndex: action.payload.index,
      }
    case 'SET_HOURS':
      return {
        ...state,
        hours: action.payload.hours,
      }
    case 'SET_MINUTES':
      return {
        ...state,
        minutes: action.payload.minutes,
      }
    case 'SET_SECONDS':
      return {
        ...state,
        seconds: action.payload.seconds,
      }
    case 'SET_TENTHS':
      return {
        ...state,
        tenths: action.payload.tenths,
      }
    case 'SET_SHOW_MAIN_CLOCK_TENTHS':
      return {
        ...state,
        mainClockShowTenths: action.payload.showTenths,
      }
    case 'SET_SHOW_BREAK_CLOCK_TENTHS':
      return {
        ...state,
        breakClockShowTenths: action.payload.showTenths,
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
    case 'SUBTRACT_FROM_BREAK_CLOCK_TIME': {
      if (state.breakClockStatus === ClockStatus.RUNNING) {
        return state
      }

      let newHours = state.breakClockHours - action.payload.hours
      let newMinutes = state.breakClockMinutes - action.payload.minutes
      let newSeconds = state.breakClockSeconds - action.payload.seconds

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
        breakClockHours: newHours,
        breakClockMinutes: newMinutes,
        breakClockSeconds: newSeconds,
        breakClockTenths: 0,
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
    case 'SET_BREAK_CLOCK_TIME':
      return {
        ...state,
        breakClockHours: action.payload.hours,
        breakClockMinutes: action.payload.minutes,
        breakClockSeconds: action.payload.seconds,
        breakClockTenths: action.payload.tenths,
      }
    case 'SET_LEFT_FENCER_SCORE':
      return {
        ...state,
        leftFencerScore: action.payload.score,
      }
    case 'RESET_LEFT_FENCER_SCORE':
      return {
        ...state,
        leftFencerScore: 0,
      }
    case 'DECREASE_LEFT_FENCER_SCORE':
      return {
        ...state,
        leftFencerScore: state.leftFencerScore - 1,
      }
    case 'INCREASE_LEFT_FENCER_SCORE':
      return {
        ...state,
        leftFencerScore: state.leftFencerScore + 1,
      }
    case 'RESET_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        leftFencerDoubles: 0,
      }
    case 'DECREASE_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        leftFencerDoubles:
          state.leftFencerDoubles - 1 < 0 ? 0 : state.leftFencerDoubles - 1,
      }
    case 'INCREASE_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        leftFencerDoubles:
          state.leftFencerDoubles + 1 > config.maxDoublesPerFencer
            ? 0
            : state.leftFencerDoubles + 1,
      }
    case 'RESET_LEFT_FENCER_CARDS':
      return {
        ...state,
        leftFencerYellowCard: false,
        leftFencerRedCard: false,
      }
    case 'SHOW_LEFT_FENCER_CARDS':
      return {
        ...state,
        leftFencerYellowCard: !state.leftFencerYellowCard,
        leftFencerRedCard: !state.leftFencerRedCard,
      }
    case 'SET_RIGHT_FENCER_SCORE':
      return {
        ...state,
        rightFencerScore: action.payload.score,
      }
    case 'INCREASE_RIGHT_FENCER_SCORE':
      return {
        ...state,
        rightFencerScore: state.rightFencerScore + 1,
      }
    case 'RESET_RIGHT_FENCER_DOUBLES':
      return {
        ...state,
        rightFencerDoubles: 0,
      }
    case 'DECREASE_RIGHT_FENCER_DOUBLES':
      return {
        ...state,
        rightFencerDoubles:
          state.rightFencerDoubles - 1 < 0 ? 0 : state.rightFencerDoubles - 1,
      }
    case 'INCREASE_RIGHT_FENCER_DOUBLES':
      return {
        ...state,
        rightFencerDoubles:
          state.rightFencerDoubles + 1 > config.maxDoublesPerFencer
            ? 0
            : state.rightFencerDoubles + 1,
      }
    case 'RESET_RIGHT_FENCER_CARDS':
      return {
        ...state,
        rightFencerYellowCard: false,
        rightFencerRedCard: false,
      }
    case 'SHOW_RIGHT_FENCER_CARDS':
      return {
        ...state,
        rightFencerYellowCard: !state.rightFencerYellowCard,
        rightFencerRedCard: !state.rightFencerRedCard,
      }
    case 'TOGGLE_LEFT_FENCER_YELLOW_CARD':
      return {
        ...state,
        leftFencerYellowCard: state.leftFencerYellowCard,
      }
    case 'TOGGLE_LEFT_FENCER_RED_CARD':
      return {
        ...state,
        leftFencerRedCard: state.leftFencerRedCard,
      }
    case 'TOGGLE_RIGHT_FENCER_YELLOW_CARD':
      return {
        ...state,
        rightFencerYellowCard: state.rightFencerYellowCard,
      }
    case 'TOGGLE_RIGHT_FENCER_RED_CARD':
      return {
        ...state,
        rightFencerRedCard: state.rightFencerRedCard,
      }
    case 'RESET_LEFT_FENCER':
      return {
        ...state,
        leftFencerYellowCard: false,
        leftFencerRedCard: false,
        leftFencerScore: 0,
        leftFencerDoubles: 0,
      }
    case 'RESET_RIGHT_FENCER':
      return {
        ...state,
        rightFencerYellowCard: false,
        rightFencerRedCard: false,
        rightFencerScore: 0,
        rightFencerDoubles: 0,
      }
    default:
      return state
  }
}

export default rootReducer
