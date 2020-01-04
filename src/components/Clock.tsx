import React, { useEffect, useCallback, useRef } from 'react'
import { ClockStatus, ScoreboardState } from '../reducer'
import { useSelector, useDispatch, batch } from 'react-redux'
import {
  setHours,
  setMinutes,
  setSeconds,
  setTenths,
  setShowTenths,
} from '../actions'

interface ClockProps {
  hours?: number
  minutes?: number
  seconds?: number
  showTenths?: boolean
  type?: string
  status: ClockStatus
  className: string
  onClick: (event: any) => void
}

function Clock(props: ClockProps) {
  const dispatch = useDispatch()

  const hours = useSelector((state: ScoreboardState) => state.hours)
  const minutes = useSelector((state: ScoreboardState) => state.minutes)
  const seconds = useSelector((state: ScoreboardState) => state.seconds)
  const tenths = useSelector((state: ScoreboardState) => state.tenths)
  const showTenths = useSelector((state: ScoreboardState) => state.showTenths)

  const type = props.type || 'C'

  const timerRef = useRef<NodeJS.Timeout>()

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [timerRef])

  const resetClock = useCallback(() => {
    clearTimer()

    batch(() => {
      dispatch(setHours(0))
      dispatch(setMinutes(0))
      dispatch(setSeconds(0))
      dispatch(setTenths(0))
    })
  }, [clearTimer, dispatch])

  const tick = useCallback(() => {
    clearTimer()

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

      batch(() => {
        dispatch(setHours(newHours))
        dispatch(setMinutes(newMinutes))
        dispatch(setSeconds(newSeconds))
        dispatch(setTenths(newTenths))
      })

      if (!done(newHours, newMinutes, newSeconds, newTenths)) {
        timerRef.current = setTimeout(tick, 100)
      }
    } else {
      batch(() => {
        dispatch(setHours(newHours))
        dispatch(setMinutes(newMinutes))
        dispatch(setSeconds(newSeconds))
        dispatch(setTenths(newTenths))
      })

      if (!done(newHours, newMinutes, newSeconds, newTenths)) {
        timerRef.current = setTimeout(tick, 100)
      }
    }
  }, [clearTimer, dispatch, hours, minutes, seconds, tenths])

  const startClock = useCallback(() => {
    resetClock()
    tick()
  }, [resetClock, tick])

  const stop = useCallback(() => {
    clearTimer()
    if (type === 'W') {
      resetClock()
    }
  }, [clearTimer, resetClock, type])

  const add = (h: number, m: number, s: number) => {
    if (props.status === 1) {
      return
    }

    let newHours = hours + h
    let newMinutes = minutes + m
    let newSeconds = seconds + s

    if (newSeconds > 59) {
      newSeconds = 0
      newMinutes++
    }

    if (newMinutes > 59) {
      newMinutes = 0
      newHours++
    }

    if (newHours > 23) newHours = 23

    setHours(newHours)
    setMinutes(newMinutes)
    setSeconds(newSeconds)
    setTenths(0)
  }

  const subtract = (h: number, m: number, s: number) => {
    if (props.status === 1) {
      return
    }

    let newHours = hours - h
    let newMinutes = minutes - m
    let newSeconds = seconds - s

    if (newSeconds < 0) {
      newSeconds = 59
      newMinutes--
    }

    if (newMinutes < 0) {
      newSeconds = 0
      newMinutes = 59
      newHours--
    }

    if (newHours < 0) {
      newHours = 0
    }

    setHours(newHours)
    setMinutes(newMinutes)
    setSeconds(newSeconds)
    setTenths(0)
  }

  const set = (h: number, m: number, s: number) => {
    setHours(h)
    setMinutes(m)
    setSeconds(s)
    setTenths(0)
  }

  const done = (h: number, m: number, s: number, t: number) => {
    if (h <= 0 && m <= 0 && s <= 0 && t <= 0) {
      return true
    }
    return false
  }

  const getText = () => {
    const parts = []
    if (hours > 0) parts.push(pad(hours))

    if (type === 'C') {
      if (hours > 0) parts.push(pad(minutes))
      else parts.push(minutes.toString())
    }

    parts.push(pad(seconds))

    var str = parts.join(':')
    if (showTenths) str += '.' + tenths
    return str
  }

  // what is this?
  const pad = (s: number | string) => {
    if (typeof s === 'string') {
      return s.toString().padStart(2, '0')
    } else {
      return (s < 10 ? '0' : '') + s.toString()
    }
  }

  const onContextMenu = (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    dispatch(setShowTenths(!showTenths))
  }

  useEffect(() => {
    switch (props.status) {
      case ClockStatus.RUNNING:
        startClock()
        break
      case ClockStatus.STOPPED:
        stop()
        break
      case ClockStatus.READY:
        resetClock()
        break
    }
  }, [props.status, resetClock, startClock, stop])

  var classes = ['clock']
  const hr = hours
  const mn = minutes
  const sec = seconds
  const ths = tenths

  if (type === 'C') {
    if (
      hr <= 0 &&
      mn <= 0 &&
      sec <= 15 &&
      ((tenths <= 0 && sec === 15) || sec < 15)
    ) {
      classes.push('warning')
    } else if (props.status === ClockStatus.RUNNING) {
      classes.push('running')
    }
  } else if (props.status === ClockStatus.RUNNING) {
    classes.push('running')
  }

  if (typeof props.className === 'string') {
    classes.push(props.className)
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={props.onClick}
      onContextMenu={onContextMenu}
    >
      {getText()}
    </div>
  )
}

export default Clock
