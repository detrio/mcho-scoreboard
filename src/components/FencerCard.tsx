import React from 'react'
import styled from 'styled-components'

interface FencerCardProps {
  color: string
  value: number
}

interface FencerCardStyleProps {
  color: string
  value: number
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
    props.value > 0 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
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
    <StyledCard color={props.color} value={props.value}>
      {props.value}
    </StyledCard>
  )
}

export default FencerCard
