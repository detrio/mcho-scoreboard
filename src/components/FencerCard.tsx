import React from 'react'
import styled from 'styled-components'

interface FencerCardProps {
  color: string
  active: boolean
}

interface FencerCardStyleProps {
  color: string
  active: boolean
}

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  width: 100px;
  height: 56px;
  cursor: pointer;
  transition: all 150ms linear;
  transform: ${(props: FencerCardStyleProps) =>
    props.active ? 'rotateY(0deg)' : 'rotateY(90deg)'};
  background-color: #111111;
  color: ${(props: FencerCardStyleProps) =>
    props.color === 'yellow' ? '#F2C94C' : '#EB5757'};
  border: 3px solid
    ${(props: FencerCardStyleProps) =>
      props.color === 'yellow' ? '#F2C94C' : '#EB5757'};
  font-size: 48px;
  font-family: overpass;
  font-weight: 600;
`

function FencerCard(props: FencerCardProps) {
  return (
    <StyledCard color={props.color} active={props.active}>
      {props.color === 'yellow' ? 2 : 1}
    </StyledCard>
  )
}

export default FencerCard
