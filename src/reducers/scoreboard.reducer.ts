import { ScoreboardAction } from '../actions/scoreboard.actions'

export interface ScoreboardState {
  boutIndex: number
}

const scoreboardState: ScoreboardState = {
  boutIndex: 0,
}

function scoreboardReducer(state = scoreboardState, action: ScoreboardAction) {
  switch (action.type) {
    case 'SET_BOUT_INDEX':
      return {
        ...state,
        boutIndex: action.payload.index,
      }
    default:
      return state
  }
}

export default scoreboardReducer
