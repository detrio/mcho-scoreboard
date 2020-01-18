import React from 'react'
import styled from 'styled-components'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetFencerDoubles,
  decreaseFencerDoubles,
  increaseFencerDoubles,
  toggleFencerRedCard,
  toggleFencerYellowCard,
} from '../actions/fencer.action'
import { State } from '../reducers/root.reducer'
import { FencerSide } from '../types'
import FencerCounter from './FencerCounter'

export interface FencerStyleProps {
  color: string
}

export const StyledFencer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 400px;
  background: linear-gradient(
    ${(props: FencerStyleProps) => props.color},
    #000000
  );
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

interface FencerProps {
  side: FencerSide
}

function Fencer(props: FencerProps) {
  const { side } = props
  const dispatch = useDispatch()
  const fencerName = useSelector((state: State) => state.fencers[side].name)
  const fencerColor = useSelector((state: State) => state.fencers[side].color)
  const yellowCard = useSelector(
    (state: State) => state.fencers[side].yellowCard
  )
  const redCard = useSelector((state: State) => state.fencers[side].redCard)
  const blackCard = useSelector((state: State) => state.fencers[side].blackCard)
  const doubles = useSelector((state: State) => state.fencers[side].doubles)

  return (
    <StyledFencer color={fencerColor}>
      <StyledFencerName>{fencerName}</StyledFencerName>

      <FencerCounter side={side} />

      <FencerDoubles
        amount={doubles}
        onFencerDoubleItemLeftClick={e => {
          e.currentTarget.blur()
          e.preventDefault()
          e.stopPropagation()
          if (e.ctrlKey) {
            dispatch(resetFencerDoubles(side))
          } else if (e.shiftKey) {
            dispatch(decreaseFencerDoubles(side))
          } else {
            dispatch(increaseFencerDoubles(side))
          }
        }}
        onFencerDoubleItemRightClick={e => {
          e.preventDefault()
          e.stopPropagation()
          dispatch(decreaseFencerDoubles(side))
        }}
      />

      <FencerCards yellow={yellowCard} red={redCard} black={blackCard} />

      <StyledCardControls>
        <FencerCardIcon
          color="yellow"
          active={yellowCard}
          onClick={() => dispatch(toggleFencerYellowCard(props.side))}
        />
        <FencerCardIcon
          color="red"
          active={redCard}
          onClick={() => dispatch(toggleFencerRedCard(props.side))}
        />
      </StyledCardControls>
    </StyledFencer>
  )
}

export default Fencer
