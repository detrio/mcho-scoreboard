import React from 'react'

interface FencerCardIconProps {
  color: string
  status: boolean
  title: string
  onClick: () => void
}

function FencerCardIcon(props: FencerCardIconProps) {
  const className = props.status
    ? `card ${props.color} active`
    : `card ${props.color}`

  return (
    <button className={className} title={props.title} onClick={props.onClick} />
  )
}

export default FencerCardIcon
