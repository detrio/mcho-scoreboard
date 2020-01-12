import React, { MouseEvent } from 'react'
import { config } from '../utils'
import FencerDoubleItem from './FencerDoubleItem'
import styled from 'styled-components'

interface FencerDoublesProps {
  amount: number
  onFencerDoubleItemLeftClick: (event: MouseEvent<any>) => void
  onFencerDoubleItemRightClick: (event: MouseEvent<any>) => void
}

const StyledDoubles = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
`

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

  return <StyledDoubles>{doubles}</StyledDoubles>
}

export default FencerDoubles
