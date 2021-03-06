import React, { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMainClockTime } from '../actions/main-clock.actions'
import { ClockStatus } from '../types'
import { State } from '../reducers/root.reducer'
import styled from 'styled-components'

interface MainClockProps {
  onClick: (event: any) => void
}

function MainClock(props: MainClockProps) {
  const dispatch = useDispatch()

  const hours = useSelector((state: State) => state.mainClock.hours)
  const minutes = useSelector((state: State) => state.mainClock.minutes)
  const seconds = useSelector((state: State) => state.mainClock.seconds)
  const tenths = useSelector((state: State) => state.mainClock.tenths)
  const mainClockStatus = useSelector((state: State) => state.mainClock.status)

  const timerRef = useRef<NodeJS.Timeout>()

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  const resetClock = useCallback(() => {
    clearTimer()

    dispatch(setMainClockTime(0, 3, 0))
  }, [clearTimer, dispatch])

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
      clearTimer()
    } else {
      dispatch(setMainClockTime(newHours, newMinutes, newSeconds, newTenths))
    }
  }, [clearTimer, dispatch, hours, minutes, seconds, tenths])

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

    if (hours > 0) {
      parts.push(padZeroes(minutes))
    } else {
      parts.push(minutes.toString())
    }

    parts.push(padZeroes(seconds))

    return parts.join(':')
  }

  const padZeroes = (s: number) => (s < 10 ? '0' : '') + s.toString()

  useEffect(() => {
    switch (mainClockStatus) {
      case ClockStatus.RUNNING:
        startClock()
        break
      case ClockStatus.STOPPED:
        clearTimer()
        break
      case ClockStatus.READY:
        resetClock()
        break
    }
  }, [clearTimer, mainClockStatus, resetClock, startClock])

  const isTimeExpiring =
    hours <= 0 &&
    minutes <= 0 &&
    seconds <= 15 &&
    ((tenths <= 0 && seconds === 15) || seconds < 15)

  return (
    <StyledMainClock isTimeExpiring={isTimeExpiring} onClick={props.onClick}>
      {clockText()}
    </StyledMainClock>
  )
}

interface MainClockStyles {
  isTimeExpiring: boolean
}

const StyledMainClock = styled.div`
  cursor: pointer;
  transition: color 50ms linear, background-color 150ms linear;
  font-size: 196px;
  color: #ffd600;
  font-family: overpass, sans-serif;
  font-weight: 400;
  text-align: center;
  color: ${(props: MainClockStyles) =>
    props.isTimeExpiring ? '#ff3333' : '#FFD600 '};
`

export default MainClock
