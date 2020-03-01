import { ScoreboardAction } from '../actions/scoreboard.actions'

export interface ScoreboardState {
  boutIndex: number
  tournamentId: string
  stage: {
    id: string
    type: string
  }
  groupId: string
  matchId: string
}

const scoreboardState: ScoreboardState = {
  boutIndex: 0,
  tournamentId: '',
  stage: {
    id: '',
    type: '',
  },
  groupId: '',
  matchId: '',
}

function scoreboardReducer(state = scoreboardState, action: ScoreboardAction) {
  switch (action.type) {
    case 'SET_BOUT_INDEX':
      return {
        ...state,
        boutIndex: action.payload.index,
      }
    case 'SET_TOURNAMENT':
      return {
        ...state,
        tournamentId: action.payload.tournamentId
      }
    case 'SET_STAGE':
      return {
        ...state,
        stage: {id: action.payload.id, type: action.payload.type}
      }
    case 'SET_GROUP':
      return {
        ...state,
        groupId: action.payload.groupId
      }
    case 'SET_MATCH':
      return {
        ...state,
        matchId: action.payload.matchId
      }
    default:
      return state
  }
}

export default scoreboardReducer
