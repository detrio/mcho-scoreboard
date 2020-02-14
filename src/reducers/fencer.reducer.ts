import { config } from '../utils'
import { FencerAction } from '../actions/fencer.action'

export interface FencerState {
  name: string
  color: string
  yellowCard: 0 | 1 | 2
  redCard: 0 | 1
  score: number
  doubles: number
}

const leftFencer: FencerState = {
  name: 'Left',
  color: '#791313',
  yellowCard: 0,
  redCard: 0,
  score: 0,
  doubles: 0,
}

const rightFencer: FencerState = {
  name: 'Right',
  color: '#170E74',
  yellowCard: 0,
  redCard: 0,
  score: 0,
  doubles: 0,
}

const fencerState = {
  left: leftFencer,
  right: rightFencer,
}

function fencerReducer(state = fencerState, action: FencerAction) {
  switch (action.type) {
    case 'CHANGE_FENCER_NAME': {
      const { side, name } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          name,
        },
      }
    }
    case 'CHANGE_FENCER_COLOR': {
      const { side, color } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          color,
        },
      }
    }
    case 'SET_FENCER_SCORE': {
      const { side, score } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          score,
        },
      }
    }
    case 'INCREASE_FENCER_SCORE': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          score: state[side].score + 1,
        },
      }
    }
    case 'DECREASE_FENCER_SCORE': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          score: state[side].score - 1,
        },
      }
    }
    case 'RESET_FENCER_DOUBLES': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          doubles: 0,
        },
      }
    }
    case 'DECREASE_FENCER_DOUBLES': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          doubles: state[side].doubles - 1 < 0 ? 0 : state[side].doubles - 1,
        },
      }
    }
    case 'INCREASE_FENCER_DOUBLES': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          doubles:
            state[side].doubles + 1 > config.maxDoublesPerFencer
              ? 0
              : state[side].doubles + 1,
        },
      }
    }
    case 'RESET_FENCER_CARDS': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          yellowCard: 0,
          redCard: 0,
        },
      }
    }
    case 'TOGGLE_FENCER_YELLOW_CARD': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          yellowCard: Math.min(state[side].yellowCard + 1, 2),
        },
      }
    }
    case 'TOGGLE_FENCER_RED_CARD': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          redCard: 1,
        },
      }
    }
    case 'RESET_FENCER': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          yellowCard: 0,
          redCard: 0,
          score: 0,
          doubles: 0,
        },
      }
    }
    default:
      return state
  }
}

export default fencerReducer
