import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { adjustScore } from '../utils'
import { State } from '../reducers/root.reducer'
import { FencerSide } from '../types'
import { setFencerScore } from '../actions/fencer.action'

const StyledCounter = styled.div`
  font-family: overpass-mono, sans-serif;
  font-weight: bold;
  font-size: 216px;
  cursor: pointer;
`

interface FencerCounterProps {
  side: FencerSide
}

function FencerCounter(props: FencerCounterProps) {
  const dispatch = useDispatch()

  const score = useSelector((state: State) => state.fencers[props.side].score)

  const setScore = (newAmount: number) => {
    dispatch(setFencerScore(props.side, adjustScore(newAmount)))
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

export default FencerCounter
