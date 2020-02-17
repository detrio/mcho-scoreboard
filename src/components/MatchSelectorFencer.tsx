import React from 'react'

interface MatchSelectorFencerProps {
  side: 'Left' | 'Right'
  color: string
  name: string
  isTournamentSelected: boolean
  setColor: (color: string) => void
  setName: (name: string) => void
}

function MatchSelectorFencer(props: MatchSelectorFencerProps) {
  const { side, color, setColor, name, setName, isTournamentSelected } = props

  return (
    <>
      <div>{side} Color</div>
      <input
        type="text"
        value={color}
        onChange={e => setColor(e.target.value)}
      />

      {!isTournamentSelected && (
        <>
          <div>{side} Name</div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </>
      )}
    </>
  )
}

export default MatchSelectorFencer
