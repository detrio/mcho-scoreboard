import React, { MouseEvent } from 'react'

interface FencerDoubleItemProps {
  index: number
  amount: number
  onFencerDoubleItemLeftClick: (event: MouseEvent<any>) => void
  onFencerDoubleItemRightClick: (event: MouseEvent<any>) => void
}

function FencerDoubleItem(props: FencerDoubleItemProps) {
  const className =
    props.amount >= props.index ? 'double-item active' : 'double-item'

  return (
    <button
      className={className}
      onClick={props.onFencerDoubleItemLeftClick}
      onContextMenu={props.onFencerDoubleItemRightClick}
    >
      D
    </button>
  )
}

export default FencerDoubleItem
