import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { config } from '../utils'
import { State } from '../reducers/root.reducer'
import { ClockStatus } from '../types'
import { setBoutIndex } from '../actions/scoreboard.actions'
import { setMainClockStatus } from '../actions/main-clock.actions'
import { setBreakClockStatus } from '../actions/break-clock.actions'

function useClock() {
  const dispatch = useDispatch()

  const boutIndex = useSelector((state: State) => state.scoreboard.boutIndex)
  const mainClockStatus = useSelector((state: State) => state.mainClock.status)
  const breakClockStatus = useSelector(
    (state: State) => state.breakClock.status
  )

  const toggleMainClock = useCallback(() => {
    const index = boutIndex + 1 >= config.boutLabels.length ? 0 : boutIndex + 1

    const clockState =
      mainClockStatus === ClockStatus.STOPPED ||
      mainClockStatus === ClockStatus.READY
        ? ClockStatus.RUNNING
        : ClockStatus.STOPPED

    dispatch(setBoutIndex(index))
    dispatch(setMainClockStatus(clockState))
  }, [boutIndex, dispatch, mainClockStatus])

  const toggleBreakClock = useCallback(() => {
    const newStatus =
      breakClockStatus === ClockStatus.READY
        ? ClockStatus.RUNNING
        : ClockStatus.READY

    dispatch(setBreakClockStatus(newStatus))
  }, [breakClockStatus, dispatch])

  return { toggleMainClock, toggleBreakClock }
}

export default useClock
