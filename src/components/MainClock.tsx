import React, { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMainClockTime,
  setShowMainClockTenths,
} from '../actions/main-clock.actions'
import { ClockStatus } from '../types'
import { State } from '../reducers/root.reducer'

interface MainClockProps {
  onClick: (event: any) => void
}

function MainClock(props: MainClockProps) {
  const dispatch = useDispatch()

  const hours = useSelector((state: State) => state.mainClock.hours)
  const minutes = useSelector((state: State) => state.mainClock.minutes)
  const seconds = useSelector((state: State) => state.mainClock.seconds)
  const tenths = useSelector((state: State) => state.mainClock.tenths)
  const showTenths = useSelector((state: State) => state.mainClock.showTenths)
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

    timerRef.current = setInterval(tick, 100)
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

    const str = parts.join(':')

    return showTenths ? `${str}.${tenths}` : str
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
    <div
      className={`clock main-clock ${isTimeExpiring ? 'warning' : 'running'}`}
      onClick={props.onClick}
      onContextMenu={() => dispatch(setShowMainClockTenths(!showTenths))}
    >
      {clockText()}
    </div>
  )
}

export default MainClock
