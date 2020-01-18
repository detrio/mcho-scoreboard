import React, { MouseEvent, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import MainClock from './MainClock'
import { setMainClockStatus } from '../actions/main-clock.actions'
import BreakClock from './BreakClock'
import Fencer from './Fencer'
import useKeyboard from '../hooks/keyboard-input.hook'
import useClock from '../hooks/clock.hook'
import { FencerSide, ClockStatus } from '../types'
import logo from '../icons/logo.svg'
import ScoreboardConfig from './ScoreboardConfig'

const StyledScoreboard = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  display: flex;
`

const StyledClockWrapper = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  > img {
    position: absolute;
    top: 50px;
  }
`

function Scoreboard() {
  const dispatch = useDispatch()

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
    <StyledScoreboard
      className="scoreboard"
      onContextMenu={onRightClickScoreboard}
    >
      <Fencer side={FencerSide.Left} />

      <StyledClockWrapper>
        <img src={logo} alt="Logo" />
        <MainClock onClick={onMainClockClick} />
        <BreakClock onClick={onBreakClockClick} />
      </StyledClockWrapper>

      <Fencer side={FencerSide.Right} />

      {/* <ScoreboardConfig /> */}
    </StyledScoreboard>
  )
}

export default Scoreboard
