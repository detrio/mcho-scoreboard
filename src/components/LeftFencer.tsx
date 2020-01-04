import React from 'react'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import LeftFencerCounter from './LeftFencerCounter'
import { useSelector, useDispatch } from 'react-redux'
import { ScoreboardState } from '../reducer'
import {
  resetLeftFencerDoubles,
  increaseLeftFencerDoubles,
  decreaseLeftFencerDoubles,
  toggleLeftFencerRedCard,
  toggleLeftFencerYellowCard,
} from '../actions'

function LeftFencer() {
  const dispatch = useDispatch()

  const yellowCard = useSelector(
    (state: ScoreboardState) => state.leftFencerYellowCard
  )
  const redCard = useSelector(
    (state: ScoreboardState) => state.leftFencerRedCard
  )
  const blackCard = useSelector(
    (state: ScoreboardState) => state.leftFencerBlackCard
  )

  const doubles = useSelector(
    (state: ScoreboardState) => state.leftFencerDoubles
  )

  return (
    <div
      className={'fencer side-left'}
      style={{ background: `linear-gradient(#990000, #000000)` }}
    >
      <div className="fencer-name">LEFT</div>

      <LeftFencerCounter />

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
      >
        <FencerCards yellow={yellowCard} red={redCard} black={blackCard} />

        <div className="controls">
          <FencerCardIcon
            color="yellow"
            status={yellowCard}
            title="Yellow Card"
            onClick={() => dispatch(toggleLeftFencerYellowCard())}
          />
          <FencerCardIcon
            color="red"
            status={redCard}
            title="Red Card"
            onClick={() => dispatch(toggleLeftFencerRedCard())}
          />
        </div>
      </FencerDoubles>
    </div>
  )
}

export default LeftFencer
