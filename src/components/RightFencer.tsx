import React from 'react'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetRightFencerDoubles,
  decreaseRightFencerDoubles,
  increaseRightFencerDoubles,
  toggleRightFencerYellowCard,
  toggleRightFencerRedCard,
} from '../actions/right-fencer-actions.'
import { State } from '../reducers/root.reducer'
import {
  StyledFencer,
  StyledFencerName,
  StyledCardControls,
} from './LeftFencer'
import { FencerSide } from '../types'
import FencerCounter from './FencerCounter'

function RightFencer() {
  const dispatch = useDispatch()
  const rightFencerName = useSelector((state: State) => state.rightFencer.name)
  const rightFencerColor = useSelector(
    (state: State) => state.rightFencer.color
  )
  const yellowCard = useSelector((state: State) => state.rightFencer.yellowCard)
  const redCard = useSelector((state: State) => state.rightFencer.redCard)
  const blackCard = useSelector((state: State) => state.rightFencer.blackCard)
  const doubles = useSelector((state: State) => state.rightFencer.doubles)

  return (
    <StyledFencer color={rightFencerColor}>
      <StyledFencerName>{rightFencerName}</StyledFencerName>

      <FencerCounter side={FencerSide.Right} />

      <FencerDoubles
        amount={doubles}
        onFencerDoubleItemLeftClick={e => {
          e.currentTarget.blur()
          e.preventDefault()
          e.stopPropagation()
          if (e.ctrlKey) {
            dispatch(resetRightFencerDoubles())
          } else if (e.shiftKey) {
            dispatch(decreaseRightFencerDoubles())
          } else {
            dispatch(increaseRightFencerDoubles())
          }
        }}
        onFencerDoubleItemRightClick={e => {
          e.preventDefault()
          e.stopPropagation()
          dispatch(decreaseRightFencerDoubles())
        }}
      />

      <FencerCards yellow={yellowCard} red={redCard} black={blackCard} />

      <StyledCardControls>
        <FencerCardIcon
          color="red"
          active={redCard}
          onClick={() => dispatch(toggleRightFencerRedCard())}
        />
        <FencerCardIcon
          color="yellow"
          active={yellowCard}
          onClick={() => dispatch(toggleRightFencerYellowCard())}
        />
      </StyledCardControls>
    </StyledFencer>
  )
}

export default RightFencer
