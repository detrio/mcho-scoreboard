import React from 'react'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import RightFencerCounter from './RightFencerCounter'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetRightFencerDoubles,
  decreaseRightFencerDoubles,
  increaseRightFencerDoubles,
  toggleRightFencerYellowCard,
  toggleRightFencerRedCard,
} from '../actions/right-fencer-actions.'
import { RightFencerState } from '../reducers/right-fencer.reducer'
import { State } from '../reducers/root.reducer'

function RightFencer() {
  const dispatch = useDispatch()

  const rightFencerName = useSelector((state: State) => state.rightFencer.name)

  const rightFencerColor = useSelector(
    (state: State) => state.rightFencer.color
  )

  const yellowCard = useSelector((state: State) => state.rightFencer.yellowCard)
  const redCard = useSelector((state: State) => state.rightFencer.redCard)
  const blackCard = useSelector((state: State) => state.rightFencer.blackCard)

  const doubles = useSelector((state: RightFencerState) => state.doubles)

  return (
    <div
      className={'fencer side-right'}
      style={{ background: `linear-gradient(${rightFencerColor}, #000000)` }}
    >
      <div className="fencer-name">{rightFencerName}</div>

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
          color="red"
          status={redCard}
          title="Red Card"
          onClick={() => dispatch(toggleRightFencerRedCard())}
        />
        <FencerCardIcon
          color="yellow"
          status={yellowCard}
          title="Yellow Card"
          onClick={() => dispatch(toggleRightFencerYellowCard())}
        />
      </div>
    </div>
  )
}

export default RightFencer
