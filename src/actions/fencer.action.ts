import { FencerSide } from '../types'

export interface ChangeFencerName {
  type: 'CHANGE_FENCER_NAME'
  payload: { side: FencerSide; name: string }
}

export function changeFencerName(
  side: FencerSide,
  name: string
): ChangeFencerName {
  return {
    type: 'CHANGE_FENCER_NAME',
    payload: { side, name },
  }
}

export interface ChangeFencerColor {
  type: 'CHANGE_FENCER_COLOR'
  payload: { side: FencerSide; color: string }
}

export function changeFencerColor(
  side: FencerSide,
  color: string
): ChangeFencerColor {
  return {
    type: 'CHANGE_FENCER_COLOR',
    payload: { side, color },
  }
}

export interface IncreaseFencerScore {
  type: 'INCREASE_FENCER_SCORE'
  payload: { side: FencerSide }
}

export function increaseFencerScore(side: FencerSide): IncreaseFencerScore {
  return {
    type: 'INCREASE_FENCER_SCORE',
    payload: { side },
  }
}

export interface SetFencerScore {
  type: 'SET_FENCER_SCORE'
  payload: { side: FencerSide; score: number }
}

export function setFencerScore(
  side: FencerSide,
  score: number
): SetFencerScore {
  return {
    type: 'SET_FENCER_SCORE',
    payload: { side, score },
  }
}

export interface ResetFencerScore {
  type: 'RESET_FENCER_SCORE'
  payload: { side: FencerSide }
}

export function resetFencerScore(side: FencerSide): ResetFencerScore {
  return {
    type: 'RESET_FENCER_SCORE',
    payload: { side },
  }
}

export interface DecreaseFencerScore {
  type: 'DECREASE_FENCER_SCORE'
  payload: { side: FencerSide }
}

export function decreaseFencerScore(side: FencerSide): DecreaseFencerScore {
  return {
    type: 'DECREASE_FENCER_SCORE',
    payload: { side },
  }
}

export interface ResetFencerDoubles {
  type: 'RESET_FENCER_DOUBLES'
  payload: { side: FencerSide }
}

export function resetFencerDoubles(side: FencerSide): ResetFencerDoubles {
  return {
    type: 'RESET_FENCER_DOUBLES',
    payload: { side },
  }
}

export interface DecreaseFencerDoubles {
  type: 'DECREASE_FENCER_DOUBLES'
  payload: { side: FencerSide }
}

export function decreaseFencerDoubles(side: FencerSide): DecreaseFencerDoubles {
  return {
    type: 'DECREASE_FENCER_DOUBLES',
    payload: { side },
  }
}

export interface IncreaseFencerDoubles {
  type: 'INCREASE_FENCER_DOUBLES'
  payload: { side: FencerSide }
}

export function increaseFencerDoubles(side: FencerSide): IncreaseFencerDoubles {
  return {
    type: 'INCREASE_FENCER_DOUBLES',
    payload: { side },
  }
}

export interface ResetFencerCards {
  type: 'RESET_FENCER_CARDS'
  payload: { side: FencerSide }
}

export function resetFencerCards(side: FencerSide): ResetFencerCards {
  return {
    type: 'RESET_FENCER_CARDS',
    payload: { side },
  }
}

export interface ToggleFencerYellowCard {
  type: 'TOGGLE_FENCER_YELLOW_CARD'
  payload: { side: FencerSide }
}

export function toggleFencerYellowCard(
  side: FencerSide
): ToggleFencerYellowCard {
  return {
    type: 'TOGGLE_FENCER_YELLOW_CARD',
    payload: { side },
  }
}

export interface ToggleFencerRedCard {
  type: 'TOGGLE_FENCER_RED_CARD'
  payload: { side: FencerSide }
}

export function toggleFencerRedCard(side: FencerSide): ToggleFencerRedCard {
  return {
    type: 'TOGGLE_FENCER_RED_CARD',
    payload: { side },
  }
}

export interface ResetFencer {
  type: 'RESET_FENCER'
  payload: { side: FencerSide }
}

export function resetFencer(side: FencerSide): ResetFencer {
  return {
    type: 'RESET_FENCER',
    payload: { side },
  }
}

export type FencerAction =
  | ChangeFencerName
  | ChangeFencerColor
  | SetFencerScore
  | ResetFencerScore
  | DecreaseFencerScore
  | IncreaseFencerScore
  | ResetFencerDoubles
  | DecreaseFencerDoubles
  | IncreaseFencerDoubles
  | ResetFencerCards
  | ToggleFencerYellowCard
  | ToggleFencerRedCard
  | ResetFencer
