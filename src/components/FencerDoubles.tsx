import React, { MouseEvent } from 'react'
import { config } from '../utils'
import FencerDoubleItem from './FencerDoubleItem'

interface FencerDoublesProps {
  amount: number
  children: JSX.Element[]
  onFencerDoubleItemLeftClick: (event: MouseEvent<any>) => void
  onFencerDoubleItemRightClick: (event: MouseEvent<any>) => void
}

function FencerDoubles(props: FencerDoublesProps) {
  const doubles = new Array(config.maxDoublesPerFencer).map(double => (
    <FencerDoubleItem
      key={double}
      index={double + 1}
      amount={props.amount}
      onFencerDoubleItemLeftClick={props.onFencerDoubleItemLeftClick}
      onFencerDoubleItemRightClick={props.onFencerDoubleItemRightClick}
    />
  ))

  return (
    <div
      className="doubles"
      title="Doubles"
      onContextMenu={props.onFencerDoubleItemRightClick}
    >
      {doubles}
    </div>
  )
}

export default FencerDoubles
