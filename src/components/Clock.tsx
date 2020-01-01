import React, { useEffect, useState } from 'react'

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

export enum ClockStatus {
  READY = 0,
  RUNNING = 1,
  STOPPED = 2,
}

function Clock(props: ClockProps) {
  const [hours, setHours] = useState(props.hours || 0)
  const [minutes, setMinutes] = useState(props.minutes || 0)
  const [seconds, setSeconds] = useState(props.seconds || 0)
  const [tenths, setTenths] = useState(0)
  const [showTenths, setShowTenths] = useState(props.showTenths || false)
  const [type, setType] = useState(props.type || 'C')

  let timer: NodeJS.Timeout

  const start = () => {
    reset()
    tick()
  }

  const stop = () => {
    clear()
    if (type === 'W') reset()
  }

  const reset = () => {
    clear()

    setHours(props.hours || 0)
    setMinutes(props.minutes || 0)
    setSeconds(props.seconds || 0)
    setTenths(0)
  }

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

  const tick = () => {
    clear()

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

      setHours(newHours)
      setMinutes(newMinutes)
      setSeconds(newSeconds)
      setTenths(newTenths)

      if (!done(newHours, newMinutes, newSeconds, newTenths)) {
        timer = setTimeout(tick, 100)
      }
    } else {
      setHours(newHours)
      setMinutes(newMinutes)
      setSeconds(newSeconds)
      setTenths(newTenths)

      if (!done(newHours, newMinutes, newSeconds, newTenths)) {
        timer = setTimeout(tick, 100)
      }
    }
  }

  const done = (h: number, m: number, s: number, t: number) => {
    if (h <= 0 && m <= 0 && s <= 0 && t <= 0) {
      return true
    }
    return false
  }

  const clear = () => {
    try {
      clearTimeout(timer)
    } catch (er) {}
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

    setShowTenths(!showTenths)
  }

  useEffect(() => {
    switch (props.status) {
      case ClockStatus.RUNNING:
        start()
        break
      case ClockStatus.STOPPED:
        stop()
        break
      case ClockStatus.READY:
        reset()
        break
    }
  }, [props.status])

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
