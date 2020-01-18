import React from 'react'
import styled from 'styled-components'

interface FencerCardIconProps {
  color: string
  active: boolean
  onClick: () => void
}

interface FencerCardIconStyles {
  color: string
  active: boolean
}

const StyledFencerCardIcon = styled.div`
  width: 48px;
  height: 48px;
  opacity: 0.75;
  cursor: pointer;
  border: solid 3px transparent;
  background-color: ${(props: FencerCardIconStyles) =>
    props.color === 'yellow' ? '#ffff00' : '#cc0000'};

  &:hover {
    opacity: 1;
  }

  ${(props: FencerCardIconStyles) =>
    props.active &&
    `
      border-color: #0099ff;
  `}
`

function FencerCardIcon(props: FencerCardIconProps) {
  return (
    <StyledFencerCardIcon
      color={props.color}
      active={props.active}
      onClick={props.onClick}
    />
  )
}

export default FencerCardIcon
