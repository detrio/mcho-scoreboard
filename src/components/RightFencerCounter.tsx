import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adjustScore } from '../utils'
import { setRightFencerScore } from '../actions/right-fencer-actions.'
import { State } from '../reducers/root.reducer'

function RightFencerCounter() {
  const dispatch = useDispatch()

  const score = useSelector(
    (state: State) => state.rightFencer.rightFencerScore
  )

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
