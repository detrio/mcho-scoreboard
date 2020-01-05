import { ScoreboardAction } from '../actions/scoreboard.actions'

export interface ScoreboardState {
  boutIndex: number
  configShown: boolean
}

const scoreboardState: ScoreboardState = {
  boutIndex: 0,
  configShown: false,
}

function scoreboardReducer(state = scoreboardState, action: ScoreboardAction) {
  switch (action.type) {
    case 'SET_BOUT_INDEX':
      return {
        ...state,
        boutIndex: action.payload.index,
      }
    case 'CHANGE_CONFIG_VISIBILITY':
      return {
        ...state,
        configShown: action.payload.visibility,
      }
    default:
      return state
  }
}

export default scoreboardReducer
