import React from 'react'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import RightFencerCounter from './RightFencerCounter'
import { useSelector, useDispatch } from 'react-redux'
import { ScoreboardState } from '../reducer'
import {
  resetRightFencerDoubles,
  decreaseRightFencerDoubles,
  increaseRightFencerDoubles,
  toggleRightFencerYellowCard,
  toggleRightFencerRedCard,
} from '../actions'

function RightFencer() {
  const dispatch = useDispatch()

  const yellowCard = useSelector(
    (state: ScoreboardState) => state.rightFencerYellowCard
  )
  const redCard = useSelector(
    (state: ScoreboardState) => state.rightFencerRedCard
  )
  const blackCard = useSelector(
    (state: ScoreboardState) => state.rightFencerBlackCard
  )

  const doubles = useSelector(
    (state: ScoreboardState) => state.rightFencerDoubles
  )

  return (
    <div
      className={'fencer side-right'}
      style={{ background: `linear-gradient(#006699, #000000)` }}
    >
      <div className="fencer-name">RIGHT</div>

      <RightFencerCounter />
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

      <div className="controls">
        <FencerCardIcon
          color="yellow"
          status={yellowCard}
          title="Yellow Card"
          onClick={() => dispatch(toggleRightFencerYellowCard())}
        />
        <FencerCardIcon
          color="red"
          status={redCard}
          title="Red Card"
          onClick={() => dispatch(toggleRightFencerRedCard())}
        />
      </div>
    </div>
  )
}

export default RightFencer
