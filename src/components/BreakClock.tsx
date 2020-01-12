import React, { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setBreakClockTime,
  setShowBreakClockTenths,
  setBreakClockStatus,
} from '../actions/break-clock.actions'
import { ClockStatus } from '../types'
import { State } from '../reducers/root.reducer'
import styled from 'styled-components'

interface BreakClockProps {
  onClick: (event: any) => void
}

function BreakClock(props: BreakClockProps) {
  const dispatch = useDispatch()

  const hours = useSelector((state: State) => state.breakClock.hours)
  const minutes = useSelector((state: State) => state.breakClock.minutes)
  const seconds = useSelector((state: State) => state.breakClock.seconds)
  const tenths = useSelector((state: State) => state.breakClock.tenths)
  const showTenths = useSelector((state: State) => state.breakClock.showTenths)
  const breakClockStatus = useSelector(
    (state: State) => state.breakClock.status
  )

  const timerRef = useRef<NodeJS.Timeout>()

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  const resetClock = useCallback(() => {
    clearTimer()

    dispatch(setBreakClockTime(0, 0, 30))
  }, [clearTimer, dispatch])

  const stopTimer = useCallback(() => {
    resetClock()
    setBreakClockStatus(ClockStatus.READY)
  }, [resetClock])

  const tick = useCallback(() => {
    let newHours = hours
    let newMinutes = minutes
    let newSeconds = seconds
    let newTenths = tenths

    newTenths--
    if (newTenths < 0) {
      newTenths = 9
      newSeconds--
      if (newSeconds < 0) {
        newSeconds = 59
        newMinutes--
        if (newMinutes < 0) {
          newHours--
          newMinutes = 59
          if (newHours < 0) {
            newHours = 0
            newMinutes = 0
            newSeconds = 0
            newTenths = 0
          }
        }
      }
    }

    if (isTimerDone(newHours, newMinutes, newSeconds, newTenths)) {
      dispatch(setBreakClockStatus(ClockStatus.READY))
    } else {
      dispatch(setBreakClockTime(newHours, newMinutes, newSeconds, newTenths))
    }
  }, [dispatch, hours, minutes, seconds, tenths])

  const startClock = useCallback(() => {
    clearTimer()

    timerRef.current = global.setInterval(tick, 100)
  }, [clearTimer, tick])

  const isTimerDone = (
    hours: number,
    minutes: number,
    seconds: number,
    tenths: number
  ) => {
    if (hours <= 0 && minutes <= 0 && seconds <= 0 && tenths <= 0) {
      return true
    }
    return false
  }

  const clockText = () => {
    const parts = []
    if (hours > 0) {
      parts.push(padZeroes(hours))
    }

    parts.push(padZeroes(seconds))

    const str = parts.join(':')

    return showTenths ? `${str}.${tenths}` : str
  }

  const padZeroes = (s: number) => (s < 10 ? '0' : '') + s.toString()

  useEffect(() => {
    switch (breakClockStatus) {
      case ClockStatus.RUNNING:
        startClock()
        break
      case ClockStatus.STOPPED:
        stopTimer()
        break
      case ClockStatus.READY:
        resetClock()
        break
    }
  }, [breakClockStatus, resetClock, startClock, stopTimer])

  return (
    <StyledBreakClock
      isRunning={breakClockStatus === ClockStatus.RUNNING}
      onClick={props.onClick}
      onContextMenu={() => dispatch(setShowBreakClockTenths(!showTenths))}
    >
      {clockText()}
    </StyledBreakClock>
  )
}

interface BreakClockStyles {
  isRunning: boolean
}

const StyledBreakClock = styled.div`
  width: 300px;
  text-align: center;
  font-size: 72px;
  opacity: ${(props: BreakClockStyles) => (props.isRunning ? 1 : 0.2)};
  transition: all 50ms linear;

  &:hover {
    background-color: transparent;
  }
`

export default React.memo(BreakClock)
