import React from 'react'
import { adjustScore } from '../utils'
import { useSelector, useDispatch } from 'react-redux'
import { setLeftFencerScore } from '../actions/left-fencer.action'
import { State } from '../reducers/root.reducer'
import styled from 'styled-components'

const StyledCounter = styled.div`
  font-family: overpass-mono, sans-serif;
  font-weight: bold;
  font-size: 216px;
  cursor: pointer;
`

function LeftFencerCounter() {
  const dispatch = useDispatch()

  const score = useSelector((state: State) => state.leftFencer.score)

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
    <StyledCounter onClick={onClick} onContextMenu={onContextMenu}>
      {score}
    </StyledCounter>
  )
}

export default LeftFencerCounter
