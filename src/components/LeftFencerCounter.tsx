import React from 'react'
import { adjustScore } from '../utils'
import { useSelector, useDispatch } from 'react-redux'
import { setLeftFencerScore } from '../actions/left-fencer.action'
import { State } from '../reducers/root.reducer'

function LeftFencerCounter() {
  const dispatch = useDispatch()

  const score = useSelector((state: State) => state.leftFencer.leftFencerScore)

  const setScore = (newAmount: number) => {
    dispatch(setLeftFencerScore(adjustScore(newAmount)))
  }

  const addToScore = () => {
    setScore(score + 1)
  }

  const subtractFromScore = () => {
    setScore(score - 1)
  }

  const resetScore = () => {
    setScore(0)
  }

  const onClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.ctrlKey) {
      resetScore()
    } else if (e.shiftKey) {
      subtractFromScore()
    } else {
      addToScore()
    }
  }

  const onContextMenu = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    subtractFromScore()
  }

  return (
    <div className="counter" onClick={onClick} onContextMenu={onContextMenu}>
      {score}
    </div>
  )
}

export default LeftFencerCounter
