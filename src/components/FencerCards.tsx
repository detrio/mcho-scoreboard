import React from 'react'
import FencerCard from './FencerCard'
import styled from 'styled-components'

interface FencerCardsProps {
  red: number
  yellow: number
}

const StyledFencerCards = styled.div`
  display: flex;
  width: 220px;
  justify-content: space-between;
`

function FencerCards(props: FencerCardsProps) {
  return (
    <StyledFencerCards>
      <FencerCard color="yellow" value={props.yellow} />
      <FencerCard color="red" value={props.red} />
    </StyledFencerCards>
  )
}

export default FencerCards
