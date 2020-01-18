import { config } from '../utils'
import { FencerAction } from '../actions/fencer.action'

export interface FencerState {
  name: string
  color: string
  yellowCard: boolean
  redCard: boolean
  blackCard: boolean
  score: number
  doubles: number
}

const leftFencer: FencerState = {
  name: 'Left',
  color: '#791313',
  yellowCard: false,
  redCard: false,
  blackCard: false,
  score: 0,
  doubles: 0,
}

const rightFencer: FencerState = {
  name: 'Right',
  color: '#170E74',
  yellowCard: false,
  redCard: false,
  blackCard: false,
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
          yellowCard: false,
          redCard: false,
        },
      }
    }
    case 'SHOW_FENCER_CARDS': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          yellowCard: !state[side].yellowCard,
          redCard: !state[side].redCard,
        },
      }
    }
    case 'TOGGLE_FENCER_YELLOW_CARD': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          yellowCard: !state[side].yellowCard,
        },
      }
    }
    case 'TOGGLE_FENCER_RED_CARD': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          redCard: !state[side].redCard,
        },
      }
    }
    case 'RESET_FENCER': {
      const { side } = action.payload

      return {
        ...state,
        [side]: {
          ...state[side],
          yellowCard: false,
          redCard: false,
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
