import { combineReducers, CombinedState } from 'redux'
import scoreboardReducer, { ScoreboardState } from './scoreboard.reducer'
import mainClockReducer, { MainClockState } from './main-clock.reducer'
import breakClockReducer, { BreakClockState } from './break-clock.reducer'
import fencerReducer, { FencerState } from './fencer.reducer'

const rootReducer = combineReducers({
  scoreboard: scoreboardReducer,
  mainClock: mainClockReducer,
  breakClock: breakClockReducer,
  fencers: fencerReducer,
})

export type State = CombinedState<{
  scoreboard: ScoreboardState
  mainClock: MainClockState
  breakClock: BreakClockState
  fencers: { left: FencerState; right: FencerState }
}>

export default rootReducer
