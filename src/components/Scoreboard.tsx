import React, { MouseEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import MainClock from './MainClock'
import { setMainClockStatus } from '../actions/main-clock.actions'
import BreakClock from './BreakClock'
import Fencer from './Fencer'
import useKeyboard from '../hooks/keyboard-input.hook'
import useClock from '../hooks/clock.hook'
import useApi from '../hooks/api.hook'
import { FencerSide, ClockStatus } from '../types'
import logo from '../icons/logo.svg'
import MatchControls from './MatchControls'
import { State } from '../reducers/root.reducer'

const StyledScoreboard = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > section {
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
    display: flex;
  }
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
  const { startMatch } = useApi()
  const { keyboardInput } = useKeyboard()
  const tournamentId = useSelector(
    (state: State) => state.scoreboard.tournamentId
  )
  const matchId = useSelector((state: State) => state.scoreboard.matchId)
  const clockStatus = useSelector((state: State) => state.mainClock.status)

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
        if (clockStatus === ClockStatus.READY && tournamentId && matchId) {
          startMatch(tournamentId, matchId)
        }
      }
    },
    [clockStatus, dispatch, matchId, startMatch, toggleMainClock, tournamentId]
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
      <section>
        <Fencer side={FencerSide.Left} />

        <StyledClockWrapper>
          <img src={logo} alt="Logo" />
          <MainClock onClick={onMainClockClick} />
          <BreakClock onClick={onBreakClockClick} />
        </StyledClockWrapper>

        <Fencer side={FencerSide.Right} />
      </section>

      <MatchControls />
    </StyledScoreboard>
  )
}

export default Scoreboard
