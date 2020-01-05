export interface ChangeLeftFencerName {
  type: 'CHANGE_LEFT_FENCER_NAME'
  payload: { name: string }
}

export function changeLeftFencerName(name: string): ChangeLeftFencerName {
  return {
    type: 'CHANGE_LEFT_FENCER_NAME',
    payload: { name },
  }
}

export interface ChangeLeftFencerColor {
  type: 'CHANGE_LEFT_FENCER_COLOR'
  payload: { color: string }
}

export function changeLeftFencerColor(color: string): ChangeLeftFencerColor {
  return {
    type: 'CHANGE_LEFT_FENCER_COLOR',
    payload: { color },
  }
}

export interface IncreaseLeftFencerScore {
  type: 'INCREASE_LEFT_FENCER_SCORE'
}

export interface SetLeftFencerScore {
  type: 'SET_LEFT_FENCER_SCORE'
  payload: { score: number }
}

export function setLeftFencerScore(score: number): SetLeftFencerScore {
  return {
    type: 'SET_LEFT_FENCER_SCORE',
    payload: { score },
  }
}

export interface ResetLeftFencerScore {
  type: 'RESET_LEFT_FENCER_SCORE'
}

export function resetLeftFencerScore(): ResetLeftFencerScore {
  return {
    type: 'RESET_LEFT_FENCER_SCORE',
  }
}

export interface DecreaseLeftFencerScore {
  type: 'DECREASE_LEFT_FENCER_SCORE'
}

export function decreaseLeftFencerScore(): DecreaseLeftFencerScore {
  return {
    type: 'DECREASE_LEFT_FENCER_SCORE',
  }
}

export function increaseLeftFencerScore(): IncreaseLeftFencerScore {
  return {
    type: 'INCREASE_LEFT_FENCER_SCORE',
  }
}

export interface ResetLeftFencerDoubles {
  type: 'RESET_LEFT_FENCER_DOUBLES'
}

export function resetLeftFencerDoubles(): ResetLeftFencerDoubles {
  return {
    type: 'RESET_LEFT_FENCER_DOUBLES',
  }
}

export interface DecreaseLeftFencerDoubles {
  type: 'DECREASE_LEFT_FENCER_DOUBLES'
}

export function decreaseLeftFencerDoubles(): DecreaseLeftFencerDoubles {
  return {
    type: 'DECREASE_LEFT_FENCER_DOUBLES',
  }
}

export interface IncreaseLeftFencerDoubles {
  type: 'INCREASE_LEFT_FENCER_DOUBLES'
}

export function increaseLeftFencerDoubles(): IncreaseLeftFencerDoubles {
  return {
    type: 'INCREASE_LEFT_FENCER_DOUBLES',
  }
}

export interface ResetLeftFencerCards {
  type: 'RESET_LEFT_FENCER_CARDS'
}

export function resetLeftFencerCards(): ResetLeftFencerCards {
  return {
    type: 'RESET_LEFT_FENCER_CARDS',
  }
}

export interface HideLeftFencerCards {
  type: 'HIDE_LEFT_FENCER_CARDS'
}

export function hideLeftFencerCards(): HideLeftFencerCards {
  return {
    type: 'HIDE_LEFT_FENCER_CARDS',
  }
}

export interface ShowLeftFencerCards {
  type: 'SHOW_LEFT_FENCER_CARDS'
}

export function showLeftFencerCards(): ShowLeftFencerCards {
  return {
    type: 'SHOW_LEFT_FENCER_CARDS',
  }
}

export interface ToggleLeftFencerYellowCard {
  type: 'TOGGLE_LEFT_FENCER_YELLOW_CARD'
}

export function toggleLeftFencerYellowCard(): ToggleLeftFencerYellowCard {
  return {
    type: 'TOGGLE_LEFT_FENCER_YELLOW_CARD',
  }
}

export interface ToggleLeftFencerRedCard {
  type: 'TOGGLE_LEFT_FENCER_RED_CARD'
}

export function toggleLeftFencerRedCard(): ToggleLeftFencerRedCard {
  return {
    type: 'TOGGLE_LEFT_FENCER_RED_CARD',
  }
}

export interface ResetLeftFencer {
  type: 'RESET_LEFT_FENCER'
}

export function resetLeftFencer(): ResetLeftFencer {
  return {
    type: 'RESET_LEFT_FENCER',
  }
}

export type LeftFencerAction =
  | ChangeLeftFencerName
  | ChangeLeftFencerColor
  | SetLeftFencerScore
  | ResetLeftFencerScore
  | DecreaseLeftFencerScore
  | IncreaseLeftFencerScore
  | ResetLeftFencerDoubles
  | DecreaseLeftFencerDoubles
  | IncreaseLeftFencerDoubles
  | ResetLeftFencerCards
  | HideLeftFencerCards
  | ShowLeftFencerCards
  | ToggleLeftFencerYellowCard
  | ToggleLeftFencerRedCard
  | ResetLeftFencer
