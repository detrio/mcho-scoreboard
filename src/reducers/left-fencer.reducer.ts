import { config } from '../utils'
import { LeftFencerAction } from '../actions/left-fencer.action'

export interface LeftFencerState {
  name: string
  color: string
  yellowCard: boolean
  redCard: boolean
  blackCard: boolean
  score: number
  doubles: number
}

const leftFencerState: LeftFencerState = {
  name: 'LEFT',
  color: '#791313',
  yellowCard: false,
  redCard: false,
  blackCard: false,
  score: 0,
  doubles: 0,
}

function leftFencerReducer(state = leftFencerState, action: LeftFencerAction) {
  switch (action.type) {
    case 'CHANGE_LEFT_FENCER_NAME':
      return {
        ...state,
        name: action.payload.name,
      }
    case 'CHANGE_LEFT_FENCER_COLOR':
      return {
        ...state,
        color: action.payload.color,
      }
    case 'SET_LEFT_FENCER_SCORE':
      return {
        ...state,
        score: action.payload.score,
      }
    case 'RESET_LEFT_FENCER_SCORE':
      return {
        ...state,
        score: 0,
      }
    case 'DECREASE_LEFT_FENCER_SCORE':
      return {
        ...state,
        score: state.score - 1,
      }
    case 'INCREASE_LEFT_FENCER_SCORE':
      return {
        ...state,
        score: state.score + 1,
      }
    case 'RESET_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        doubles: 0,
      }
    case 'DECREASE_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        doubles: state.doubles - 1 < 0 ? 0 : state.doubles - 1,
      }
    case 'INCREASE_LEFT_FENCER_DOUBLES':
      return {
        ...state,
        doubles:
          state.doubles + 1 > config.maxDoublesPerFencer
            ? 0
            : state.doubles + 1,
      }
    case 'RESET_LEFT_FENCER_CARDS':
      return {
        ...state,
        yellowCard: false,
        redCard: false,
      }
    case 'SHOW_LEFT_FENCER_CARDS':
      return {
        ...state,
        yellowCard: !state.yellowCard,
        redCard: !state.redCard,
      }
    case 'TOGGLE_LEFT_FENCER_YELLOW_CARD':
      return {
        ...state,
        yellowCard: !state.yellowCard,
      }
    case 'TOGGLE_LEFT_FENCER_RED_CARD':
      return {
        ...state,
        redCard: !state.redCard,
      }
    case 'RESET_LEFT_FENCER':
      return {
        ...state,
        yellowCard: false,
        redCard: false,
        score: 0,
        doubles: 0,
      }
    default:
      return state
  }
}

export default leftFencerReducer
