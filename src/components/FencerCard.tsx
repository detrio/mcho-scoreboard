import React from 'react'

interface FencerCardProps {
  color: string
  status: boolean
}

function FencerCard(props: FencerCardProps) {
  const className = props.status
    ? `card ${props.color} shown`
    : `card ${props.color}`

  return <div className={className}></div>
}

export default FencerCard
