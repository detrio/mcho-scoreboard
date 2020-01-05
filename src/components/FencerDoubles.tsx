import React, { MouseEvent } from 'react'
import { config } from '../utils'
import FencerDoubleItem from './FencerDoubleItem'

interface FencerDoublesProps {
  amount: number
  onFencerDoubleItemLeftClick: (event: MouseEvent<any>) => void
  onFencerDoubleItemRightClick: (event: MouseEvent<any>) => void
}

function FencerDoubles(props: FencerDoublesProps) {
  const doubles = new Array(config.maxDoublesPerFencer)
    .fill(null)
    .map((_, idx) => (
      <FencerDoubleItem
        key={idx}
        index={idx + 1}
        amount={props.amount}
        onFencerDoubleItemLeftClick={props.onFencerDoubleItemLeftClick}
        onFencerDoubleItemRightClick={props.onFencerDoubleItemRightClick}
      />
    ))

  return (
    <div className="doubles" title="Doubles">
      {doubles}
    </div>
  )
}

export default FencerDoubles
