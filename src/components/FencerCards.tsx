import React from 'react'
import FencerCard from './FencerCard'
import styled from 'styled-components'

interface FencerCardsProps {
  red: boolean
  black: boolean
  yellow: boolean
}

const StyledFencerCards = styled.div`
  display: flex;
  width: 220px;
  justify-content: space-between;
`

function FencerCards(props: FencerCardsProps) {
  return (
    <StyledFencerCards>
      <FencerCard color="yellow" active={props.yellow} />
      <FencerCard color="red" active={props.red} />
    </StyledFencerCards>
  )
}

export default FencerCards
