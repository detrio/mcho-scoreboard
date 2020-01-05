import React from 'react'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import LeftFencerCounter from './LeftFencerCounter'
import { useSelector, useDispatch } from 'react-redux'
import { LeftFencerState } from '../reducers/left-fencer.reducer'
import {
  resetLeftFencerDoubles,
  decreaseLeftFencerDoubles,
  increaseLeftFencerDoubles,
  toggleLeftFencerRedCard,
  toggleLeftFencerYellowCard,
} from '../actions/left-fencer.action'
import { State } from '../reducers/root.reducer'

function LeftFencer() {
  const dispatch = useDispatch()

  const leftFencerName = useSelector(
    (state: State) => state.leftFencer.leftFencerName
  )

  const leftFencerColor = useSelector(
    (state: State) => state.leftFencer.leftFencerColor
  )

  const yellowCard = useSelector(
    (state: State) => state.leftFencer.leftFencerYellowCard
  )
  const redCard = useSelector(
    (state: State) => state.leftFencer.leftFencerRedCard
  )
  const blackCard = useSelector(
    (state: State) => state.leftFencer.leftFencerBlackCard
  )

  const doubles = useSelector(
    (state: LeftFencerState) => state.leftFencerDoubles
  )

  return (
    <div
      className="fencer side-left"
      style={{ background: `linear-gradient(${leftFencerColor}, #000000)` }}
    >
      <div className="fencer-name">{leftFencerName}</div>

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
      />
      <FencerCards yellow={yellowCard} red={redCard} black={blackCard} />

      <div className="controls">
        <FencerCardIcon
          color="red"
          status={redCard}
          title="Red Card"
          onClick={() => dispatch(toggleLeftFencerRedCard())}
        />
        <FencerCardIcon
          color="yellow"
          status={yellowCard}
          title="Yellow Card"
          onClick={() => dispatch(toggleLeftFencerYellowCard())}
        />
      </div>
    </div>
  )
}

export default LeftFencer
