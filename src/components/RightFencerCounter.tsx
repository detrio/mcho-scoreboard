import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { adjustScore } from '../utils'
import { setRightFencerScore } from '../actions/right-fencer-actions.'
import { State } from '../reducers/root.reducer'

const StyledCounter = styled.div`
  font-family: overpass-mono, sans-serif;
  font-weight: bold;
  font-size: 216px;
  cursor: pointer;
`

function RightFencerCounter() {
  const dispatch = useDispatch()

  const score = useSelector((state: State) => state.rightFencer.score)

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
    <StyledCounter onClick={onClick} onContextMenu={onContextMenu}>
      {score}
    </StyledCounter>
  )
}

export default RightFencerCounter
