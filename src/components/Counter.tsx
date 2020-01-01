import React, { useState } from 'react'
import { KeyCode } from '../utils'

interface CounterProps {
  amount: number
  min: number
  max: number
  init: number
  className: string
}

function Counter(props: CounterProps) {
  const [amount, setAmount] = useState(props.amount || 0)
  const [min, setMin] = useState(props.min || -99)
  const [max, setMax] = useState(props.max || 99)

  const set = (newAmount: number) => {
    const adjustedAmount =
      newAmount < min ? min : newAmount > max ? max : newAmount

    setAmount(adjustedAmount)
  }

  const add = () => {
    set(amount + 1)
  }

  const subtract = () => {
    set(amount - 1)
  }

  const reset = () => {
    set(props.init)
  }

  const onClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.ctrlKey) {
      reset()
    } else if (e.shiftKey) {
      subtract()
    } else {
      add()
    }
  }

  const onContextMenu = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    subtract()
  }

  const onKeyUp = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.keyCode !== KeyCode.LEFT && e.keyCode !== KeyCode.RIGHT) return

    if (e.ctrlKey) {
      reset()
    } else if (e.shiftKey) {
      subtract()
    } else {
      add()
    }
  }

  const classes = ['counter']
  if (typeof props.className === 'string') {
    classes.push(props.className)
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {amount}
    </div>
  )
}

export default Counter
