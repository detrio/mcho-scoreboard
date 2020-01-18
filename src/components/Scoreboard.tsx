import React, { MouseEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import MainClock from './MainClock'
import { config } from '../utils'
import ScoreboardConfig from './ScoreboardConfig'
import { changeConfigVisibility } from '../actions/scoreboard.actions'
import { setMainClockStatus } from '../actions/main-clock.actions'
import BreakClock from './BreakClock'
import Fencer from './Fencer'
import { ClockStatus, FencerSide } from '../types'
import stopWatchIcon from '../icons/stopwatch.png'
import settingsIcon from '../icons/settings.png'
import resetIcon from '../icons/reset.png'
import { State } from '../reducers/root.reducer'
import useKeyboard from '../hooks/keyboard-input.hook'
import useClock from '../hooks/clock.hook'
import styled from 'styled-components'
import { resetFencer } from '../actions/fencer.action'

const StyledClockWrapper = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function Scoreboard() {
  const dispatch = useDispatch()

  const configShown = useSelector(
    (state: State) => state.scoreboard.configShown
  )

  const boutIndex = useSelector((state: State) => state.scoreboard.boutIndex)
  const { toggleMainClock, toggleBreakClock } = useClock()
  const { keyboardInput } = useKeyboard()

  useEffect(() => {
    document.addEventListener('keyup', keyboardInput)
    return () => {
      document.removeEventListener('keyup', keyboardInput)
    }
  }, [keyboardInput])

  const onRightClickScoreboard = (event: MouseEvent<any>) => {
    if (!event.shiftKey) {
      event.preventDefault()
    }
  }

  const onMainClockClick = useCallback(
    (event: any) => {
      event.stopPropagation()
      event.preventDefault()

      if (event.ctrlKey) {
        dispatch(setMainClockStatus(ClockStatus.READY))
      } else {
        toggleMainClock()
      }
    },
    [dispatch, toggleMainClock]
  )

  const onBreakClockClick = (event: any) => {
    event.stopPropagation()
    event.preventDefault()
    toggleBreakClock()
  }

  return (
    <div className="scoreboard" onContextMenu={onRightClickScoreboard}>
      <Fencer side={FencerSide.Left} />
      <StyledClockWrapper>
        <MainClock onClick={onMainClockClick} />
        <BreakClock onClick={onBreakClockClick} />
      </StyledClockWrapper>
      <Fencer side={FencerSide.Right} />

      <button
        className="main-control-button"
        title="Start/Stop Clock"
        onClick={toggleMainClock}
      >
        {config.boutLabels[boutIndex]}
      </button>

      <img
        className="break-clock-button icon"
        src={stopWatchIcon}
        alt="Break Clock"
        title="Break Clock"
        onClick={toggleBreakClock}
      />

      <img
        className="config-icon icon "
        src={settingsIcon}
        alt="Settings"
        title="Settings"
        onClick={() => dispatch(changeConfigVisibility(!configShown))}
      />

      <img
        className="reset-icon icon"
        src={resetIcon}
        alt="Reset All"
        title="Reset All"
        onClick={() => {
          batch(() => {
            dispatch(resetFencer(FencerSide.Left))
            dispatch(resetFencer(FencerSide.Right))
          })
        }}
      />

      <ScoreboardConfig />
    </div>
  )
}

export default Scoreboard
