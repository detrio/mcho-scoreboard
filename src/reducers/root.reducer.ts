import { combineReducers, CombinedState } from 'redux'
import scoreboardReducer, { ScoreboardState } from './scoreboard.reducer'
import mainClockReducer, { MainClockState } from './main-clock.reducer'
import breakClockReducer, { BreakClockState } from './break-clock.reducer'
import leftFencerReducer, { LeftFencerState } from './left-fencer.reducer'
import rightFencerReducer, { RightFencerState } from './right-fencer.reducer'

const rootReducer = combineReducers({
  scoreboard: scoreboardReducer,
  mainClock: mainClockReducer,
  breakClock: breakClockReducer,
  leftFencer: leftFencerReducer,
  rightFencer: rightFencerReducer,
})

export type State = CombinedState<{
  scoreboard: ScoreboardState
  mainClock: MainClockState
  breakClock: BreakClockState
  leftFencer: LeftFencerState
  rightFencer: RightFencerState
}>

export default rootReducer
