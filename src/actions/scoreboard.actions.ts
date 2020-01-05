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

export interface ChangeConfigVisibility {
  type: 'CHANGE_CONFIG_VISIBILITY'
  payload: { visibility: boolean }
}

export function changeConfigVisibility(
  visibility: boolean
): ChangeConfigVisibility {
  return {
    type: 'CHANGE_CONFIG_VISIBILITY',
    payload: { visibility },
  }
}

export type ScoreboardAction = SetBoutIndex | ChangeConfigVisibility
