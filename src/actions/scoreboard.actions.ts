export interface SetBoutIndex {
  type: 'SET_BOUT_INDEX'
  payload: { index: number }
}

export function setBoutIndex(index: number): SetBoutIndex {
  return {
    type: 'SET_BOUT_INDEX',
    payload: { index },
  }
}

export interface SetTournament {
  type: 'SET_TOURNAMENT'
  payload: { tournamentId: string }
}

export function setTournament(tournamentId: string): SetTournament {
  return {
    type: 'SET_TOURNAMENT',
    payload: { tournamentId },
  }
}
export interface SetStage {
  type: 'SET_STAGE'
  payload: { id: string, type: string }
}

export function setStage(id: string, type: string): SetStage {
  return {
    type: 'SET_STAGE',
    payload: { id, type },
  }
}
export interface SetGroup {
  type: 'SET_GROUP'
  payload: { groupId: string }
}

export function setGroup(groupId: string): SetGroup {
  return {
    type: 'SET_GROUP',
    payload: { groupId },
  }
}

export interface SetMatch {
  type: 'SET_MATCH'
  payload: { matchId: string }
}

export function setMatch(matchId: string): SetMatch {
  return {
    type: 'SET_MATCH',
    payload: { matchId },
  }
}

export type ScoreboardAction = 
  | SetBoutIndex
  | SetTournament
  | SetStage
  | SetGroup
  | SetMatch
