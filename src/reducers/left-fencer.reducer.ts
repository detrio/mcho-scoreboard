import { config } from '../utils'
import { LeftFencerAction } from '../actions/left-fencer.action'

export interface LeftFencerState {
  leftFencerName: string
  leftFencerColor: string
  leftFencerYellowCard: boolean
  leftFencerRedCard: boolean
  leftFencerBlackCard: boolean
  leftFencerScore: number
  leftFencerDoubles: number
}

const leftFencerState: LeftFencerState = {
  leftFencerName: 'LEFT',
  leftFencerColor: '#990000',
  leftFencerYellowCard: false,
  leftFencerRedCard: false,
  leftFencerBlackCard: false,
  leftFencerScore: 0,
  leftFencerDoubles: 0,
}

function leftFencerReducer(state = leftFencerState, action: LeftFencerAction) {
  switch (action.type) {
    case 'CHANGE_LEFT_FENCER_NAME':
      return {
        ...state,
        leftFencerName: action.payload.name,
      }
    case 'CHANGE_LEFT_FENCER_COLOR':
      return {
        ...state,
        leftFencerColor: action.payload.color,
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
    case 'TOGGLE_LEFT_FENCER_YELLOW_CARD':
      return {
        ...state,
        leftFencerYellowCard: !state.leftFencerYellowCard,
      }
    case 'TOGGLE_LEFT_FENCER_RED_CARD':
      return {
        ...state,
        leftFencerRedCard: !state.leftFencerRedCard,
      }
    case 'RESET_LEFT_FENCER':
      return {
        ...state,
        leftFencerYellowCard: false,
        leftFencerRedCard: false,
        leftFencerScore: 0,
        leftFencerDoubles: 0,
      }
    default:
      return state
  }
}

export default leftFencerReducer
