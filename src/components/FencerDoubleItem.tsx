import React, { MouseEvent } from 'react'
import styled from 'styled-components'

interface FencerDoubleItemProps {
  index: number
  amount: number
  onFencerDoubleItemLeftClick: (event: MouseEvent<any>) => void
  onFencerDoubleItemRightClick: (event: MouseEvent<any>) => void
}

interface FencerDoubleItemStyleProps {
  active: boolean
}

const StyledDoubleItem = styled.div`
  font-family: overpass, sans-serif;
  width: 30px;
  height: 30px;
  background-color: ${(props: FencerDoubleItemStyleProps) =>
    props.active ? '#fff' : 'transparent'};
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: #fff;
  }
`

function FencerDoubleItem(props: FencerDoubleItemProps) {
  return (
    <StyledDoubleItem
      active={props.amount >= props.index}
      onClick={props.onFencerDoubleItemLeftClick}
      onContextMenu={props.onFencerDoubleItemRightClick}
    />
  )
}

export default FencerDoubleItem
