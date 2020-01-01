import React from 'react'
import FencerCard from './FencerCard'

interface FencerCardsProps {
  red: boolean
  black: boolean
  yellow: boolean
}

function FencerCards(props: FencerCardsProps) {
  return (
    <div className="cards">
      <>
        <FencerCard color="red" status={props.red} />
        <FencerCard color="yellow" status={props.yellow} />
      </>
    </div>
  )
}

export default FencerCards
