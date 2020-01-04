import { Action } from 'redux'
import { config } from './utils'
import { ScoreboardAction } from './types'

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
  fencerLeftName: string
  fencerLeftColor: string
  fencerRightName: string
  fencerRightColor: string
  configShown: boolean

  // clock
  hours: number
  minutes: number
  seconds: number
  tenths: number
  showTenths: boolean

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
  fencerLeftName: 'LEFT',
  fencerLeftColor: '#990000',
  fencerRightName: 'RIGHT',
  fencerRightColor: '#006699',
  configShown: false,
  hours: 0,
  minutes: 0,
  seconds: 0,
  tenths: 0,
  showTenths: false,

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

function rootReducer(state = initialState, action: Action<ScoreboardAction>) {
  switch (action.type) {
    case 'INCREASE_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        leftFencerDoubles:
          state.leftFencerDoubles + 1 > config.maxDoublesPerFencer
            ? 0
            : state.leftFencerDoubles + 1,
      }
    case 'DECREASE_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        leftFencerDoubles:
          state.leftFencerDoubles - 1 < 0 ? 0 : state.leftFencerDoubles - 1,
      }
    case 'RESET_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        leftFencerDoubles: 0,
      }
    case 'SHOW_LEFT_FENCER_CARDS':
      return {
        ...state,
        leftFencerYellowCard: !state.leftFencerYellowCard,
        leftFencerRedCard: !state.leftFencerRedCard,
      }
    case 'RESET_LEFT_FENCER_CARDS':
      return {
        ...state,
        leftFencerYellowCard: false,
        leftFencerRedCard: false,
      }
    case 'RESET_LEFT_FENCER':
      return {
        ...state,
        leftFencerYellowCard: false,
        leftFencerRedCard: false,
        leftFencerScore: 0,
        leftFencerDoubles: 0,
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
    default:
      return state
  }
}

export default rootReducer
