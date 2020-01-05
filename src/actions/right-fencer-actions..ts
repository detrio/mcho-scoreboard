export interface ChangeRightFencerName {
  type: 'CHANGE_RIGHT_FENCER_NAME'
  payload: { name: string }
}

export function changeRightFencerName(name: string): ChangeRightFencerName {
  return {
    type: 'CHANGE_RIGHT_FENCER_NAME',
    payload: { name },
  }
}

export interface ChangeRightFencerColor {
  type: 'CHANGE_RIGHT_FENCER_COLOR'
  payload: { color: string }
}

export function changeRightFencerColor(color: string): ChangeRightFencerColor {
  return {
    type: 'CHANGE_RIGHT_FENCER_COLOR',
    payload: { color },
  }
}

export interface SetRightFencerScore {
  type: 'SET_RIGHT_FENCER_SCORE'
  payload: { score: number }
}

export function setRightFencerScore(score: number): SetRightFencerScore {
  return {
    type: 'SET_RIGHT_FENCER_SCORE',
    payload: { score },
  }
}

export interface ResetRightFencerScore {
  type: 'RESET_RIGHT_FENCER_SCORE'
}

export function resetRightFencerScore(): ResetRightFencerScore {
  return {
    type: 'RESET_RIGHT_FENCER_SCORE',
  }
}

export interface DecreaseRightFencerScore {
  type: 'DECREASE_RIGHT_FENCER_SCORE'
}

export function decreaseRightFencerScore(): DecreaseRightFencerScore {
  return {
    type: 'DECREASE_RIGHT_FENCER_SCORE',
  }
}

export interface IncreaseRightFencerScore {
  type: 'INCREASE_RIGHT_FENCER_SCORE'
}

export function increaseRightFencerScore(): IncreaseRightFencerScore {
  return {
    type: 'INCREASE_RIGHT_FENCER_SCORE',
  }
}

export interface ResetRightFencerDoubles {
  type: 'RESET_RIGHT_FENCER_DOUBLES'
}

export function resetRightFencerDoubles(): ResetRightFencerDoubles {
  return {
    type: 'RESET_RIGHT_FENCER_DOUBLES',
  }
}

export interface DecreaseRightFencerDoubles {
  type: 'DECREASE_RIGHT_FENCER_DOUBLES'
}

export function decreaseRightFencerDoubles(): DecreaseRightFencerDoubles {
  return {
    type: 'DECREASE_RIGHT_FENCER_DOUBLES',
  }
}

export interface IncreaseRightFencerDoubles {
  type: 'INCREASE_RIGHT_FENCER_DOUBLES'
}

export function increaseRightFencerDoubles(): IncreaseRightFencerDoubles {
  return {
    type: 'INCREASE_RIGHT_FENCER_DOUBLES',
  }
}

export interface ResetRightFencerCards {
  type: 'RESET_RIGHT_FENCER_CARDS'
}

export function resetRightFencerCards(): ResetRightFencerCards {
  return {
    type: 'RESET_RIGHT_FENCER_CARDS',
  }
}

export interface HideRightFencerCards {
  type: 'HIDE_RIGHT_FENCER_CARDS'
}

export function hideRightFencerCards(): HideRightFencerCards {
  return {
    type: 'HIDE_RIGHT_FENCER_CARDS',
  }
}

export interface ShowRightFencerCards {
  type: 'SHOW_RIGHT_FENCER_CARDS'
}

export function showRightFencerCards(): ShowRightFencerCards {
  return {
    type: 'SHOW_RIGHT_FENCER_CARDS',
  }
}

export interface ToggleRightFencerYellowCard {
  type: 'TOGGLE_RIGHT_FENCER_YELLOW_CARD'
}

export function toggleRightFencerYellowCard(): ToggleRightFencerYellowCard {
  return {
    type: 'TOGGLE_RIGHT_FENCER_YELLOW_CARD',
  }
}

export interface ToggleRightFencerRedCard {
  type: 'TOGGLE_RIGHT_FENCER_RED_CARD'
}

export function toggleRightFencerRedCard(): ToggleRightFencerRedCard {
  return {
    type: 'TOGGLE_RIGHT_FENCER_RED_CARD',
  }
}

export interface ResetRightFencer {
  type: 'RESET_RIGHT_FENCER'
}

export function resetRightFencer(): ResetRightFencer {
  return {
    type: 'RESET_RIGHT_FENCER',
  }
}

export type RightFencerAction =
  | ChangeRightFencerName
  | ChangeRightFencerColor
  | SetRightFencerScore
  | IncreaseRightFencerScore
  | ResetRightFencerDoubles
  | DecreaseRightFencerDoubles
  | IncreaseRightFencerDoubles
  | ResetRightFencerCards
  | HideRightFencerCards
  | ShowRightFencerCards
  | ToggleRightFencerYellowCard
  | ToggleRightFencerRedCard
  | ResetRightFencer
  | ResetRightFencerScore
  | DecreaseRightFencerScore
