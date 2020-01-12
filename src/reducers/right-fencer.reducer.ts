import { config } from '../utils'
import { RightFencerAction } from '../actions/right-fencer-actions.'

export interface RightFencerState {
  name: string
  color: string
  yellowCard: boolean
  redCard: boolean
  blackCard: boolean
  score: number
  doubles: number
}

const rightFencerState: RightFencerState = {
  name: 'RIGHT',
  color: '#170E74',
  yellowCard: false,
  redCard: false,
  blackCard: false,
  score: 0,
  doubles: 0,
}

function rightFencerReducer(
  state = rightFencerState,
  action: RightFencerAction
) {
  switch (action.type) {
    case 'CHANGE_RIGHT_FENCER_NAME':
      return {
        ...state,
        name: action.payload.name,
      }
    case 'CHANGE_RIGHT_FENCER_COLOR':
      return {
        ...state,
        color: action.payload.color,
      }

    case 'SET_RIGHT_FENCER_SCORE':
      return {
        ...state,
        score: action.payload.score,
      }
    case 'INCREASE_RIGHT_FENCER_SCORE':
      return {
        ...state,
        score: state.score + 1,
      }
    case 'DECREASE_RIGHT_FENCER_SCORE':
      return {
        ...state,
        score: state.score - 1,
      }
    case 'RESET_RIGHT_FENCER_DOUBLES':
      return {
        ...state,
        doubles: 0,
      }
    case 'DECREASE_RIGHT_FENCER_DOUBLES':
      return {
        ...state,
        doubles: state.doubles - 1 < 0 ? 0 : state.doubles - 1,
      }
    case 'INCREASE_RIGHT_FENCER_DOUBLES':
      return {
        ...state,
        doubles:
          state.doubles + 1 > config.maxDoublesPerFencer
            ? 0
            : state.doubles + 1,
      }
    case 'RESET_RIGHT_FENCER_CARDS':
      return {
        ...state,
        yellowCard: false,
        redCard: false,
      }
    case 'SHOW_RIGHT_FENCER_CARDS':
      return {
        ...state,
        yellowCard: !state.yellowCard,
        redCard: !state.redCard,
      }

    case 'TOGGLE_RIGHT_FENCER_YELLOW_CARD':
      return {
        ...state,
        yellowCard: !state.yellowCard,
      }
    case 'TOGGLE_RIGHT_FENCER_RED_CARD':
      return {
        ...state,
        redCard: !state.redCard,
      }

    case 'RESET_RIGHT_FENCER':
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

export default rightFencerReducer
