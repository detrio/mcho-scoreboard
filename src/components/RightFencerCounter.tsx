import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScoreboardState } from '../reducer'
import { adjustScore } from '../utils'
import { setRightFencerScore } from '../actions'

function RightFencerCounter() {
  const dispatch = useDispatch()

  const score = useSelector((state: ScoreboardState) => state.rightFencerScore)

  const setScore = (newAmount: number) => {
    dispatch(setRightFencerScore(adjustScore(newAmount)))
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

export default RightFencerCounter
