import React from 'react'
import styled from 'styled-components'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetLeftFencerDoubles,
  decreaseLeftFencerDoubles,
  increaseLeftFencerDoubles,
  toggleLeftFencerRedCard,
  toggleLeftFencerYellowCard,
} from '../actions/left-fencer.action'
import { State } from '../reducers/root.reducer'
import { FencerSide } from '../types'
import FencerCounter from './FencerCounter'

export interface FencerProps {
  color: string
}

export const StyledFencer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 400px;
  background: linear-gradient(${(props: FencerProps) => props.color}, #000000);
`

export const StyledFencerName = styled.div`
  font-family: overpass, sans-serif;
  font-weight: 200;
  font-size: 48px;
  padding: 60px 16px 0px 16px;
  height: 180px;
  text-align: center;
`

export const StyledCardControls = styled.div`
  display: flex;
  opacity: 0;
`

function LeftFencer() {
  const dispatch = useDispatch()
  const leftFencerName = useSelector((state: State) => state.leftFencer.name)
  const leftFencerColor = useSelector((state: State) => state.leftFencer.color)
  const yellowCard = useSelector((state: State) => state.leftFencer.yellowCard)
  const redCard = useSelector((state: State) => state.leftFencer.redCard)
  const blackCard = useSelector((state: State) => state.leftFencer.blackCard)
  const doubles = useSelector((state: State) => state.leftFencer.doubles)

  return (
    <StyledFencer color={leftFencerColor}>
      <StyledFencerName>{leftFencerName}</StyledFencerName>

      <FencerCounter side={FencerSide.Left} />

      <FencerDoubles
        amount={doubles}
        onFencerDoubleItemLeftClick={e => {
          e.currentTarget.blur()
          e.preventDefault()
          e.stopPropagation()
          if (e.ctrlKey) {
            dispatch(resetLeftFencerDoubles())
          } else if (e.shiftKey) {
            dispatch(decreaseLeftFencerDoubles())
          } else {
            dispatch(increaseLeftFencerDoubles())
          }
        }}
        onFencerDoubleItemRightClick={e => {
          e.preventDefault()
          e.stopPropagation()
          dispatch(decreaseLeftFencerDoubles())
        }}
      />

      <FencerCards yellow={yellowCard} red={redCard} black={blackCard} />

      <StyledCardControls>
        <FencerCardIcon
          color="yellow"
          active={yellowCard}
          onClick={() => dispatch(toggleLeftFencerYellowCard())}
        />
        <FencerCardIcon
          color="red"
          active={redCard}
          onClick={() => dispatch(toggleLeftFencerRedCard())}
        />
      </StyledCardControls>
    </StyledFencer>
  )
}

export default LeftFencer
