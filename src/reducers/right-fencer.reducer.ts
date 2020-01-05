import { config } from '../utils'
import { RightFencerAction } from '../actions/right-fencer-actions.'

export interface RightFencerState {
  rightFencerName: string
  rightFencerColor: string
  rightFencerYellowCard: boolean
  rightFencerRedCard: boolean
  rightFencerBlackCard: boolean
  rightFencerScore: number
  rightFencerDoubles: number
}

const rightFencerState: RightFencerState = {
  rightFencerName: 'RIGHT',
  rightFencerColor: '#006699',
  rightFencerYellowCard: false,
  rightFencerRedCard: false,
  rightFencerBlackCard: false,
  rightFencerScore: 0,
  rightFencerDoubles: 0,
}

function rightFencerReducer(
  state = rightFencerState,
  action: RightFencerAction
) {
  switch (action.type) {
    case 'CHANGE_RIGHT_FENCER_NAME':
      return {
        ...state,
        rightFencerName: action.payload.name,
      }
    case 'CHANGE_RIGHT_FENCER_COLOR':
      return {
        ...state,
        rightFencerColor: action.payload.color,
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

    case 'TOGGLE_RIGHT_FENCER_YELLOW_CARD':
      return {
        ...state,
        rightFencerYellowCard: !state.rightFencerYellowCard,
      }
    case 'TOGGLE_RIGHT_FENCER_RED_CARD':
      return {
        ...state,
        rightFencerRedCard: !state.rightFencerRedCard,
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

export default rightFencerReducer
