import React, { useState, useRef } from 'react'
import FencerCardIcon from './FencerCardIcon'
import FencerCards from './FencerCards'
import FencerDoubles from './FencerDoubles'
import { config } from '../utils'

interface FencerProps {
  name: string
  color: string
  side: string
}

function Fencer(props: FencerProps) {
  const [name] = useState(props.name || 'Fencer')
  const [yellowCard, setYellowCard] = useState(false)
  const [redCard, setRedCard] = useState(false)
  const [blackCard] = useState(false)
  const [score, setScore] = useState(0)
  const [doubles, setDoubles] = useState(0)
  const [color] = useState(props.color || '#222222')
  const [side] = useState(props.side)

  const scoreRef = useRef()

  const increaseScore = () => {
    // scoreRef.current.add();
  }

  const decreaseScore = () => {
    // scoreRef.current.subtract();
  }

  const resetScore = () => {
    // scoreRef.current.reset();
  }

  const increaseDoubles = () => {
    const amount = doubles + 1 > config.maxDoubles ? 0 : doubles + 1
    setDoubles(amount)
  }

  const decreaseDoubles = () => {
    const amount = doubles - 1 < 0 ? 0 : doubles - 1
    setDoubles(amount)
  }

  const resetDoubles = () => {
    setDoubles(0)
  }

  const toggleRedCard = () => {
    setRedCard(!redCard)
  }

  const toggleYellowCard = () => {
    setYellowCard(!yellowCard)
  }

  const showCard = () => {
    setYellowCard(yellowCard ? false : true)
    setRedCard(redCard ? false : true)
  }

  const hideCard = () => {
    if (redCard) {
      setRedCard(false)
    } else {
      setYellowCard(false)
    }
  }

  const resetCards = () => {
    setRedCard(false)
    setYellowCard(false)
  }

  const reset = () => {
    setYellowCard(false)
    setRedCard(false)
    setScore(0)
    setDoubles(0)

    resetScore()
  }

  return (
    <div
      className={`fencer side-${side}`}
      style={{ background: `linear-gradient("${color}", #000000)` }}
    >
      <div className="fencer-name">{name}</div>

      {/* <Counter
        min={config.minScore}
        max={config.maxScore}
        score={score}
        init={0}
        ref={scoreRef}
      /> */}
      <FencerDoubles
        amount={doubles}
        onFencerDoubleItemLeftClick={e => {
          e.currentTarget.blur()
          e.preventDefault()
          e.stopPropagation()
          if (e.ctrlKey) {
            setDoubles(0)
          } else if (e.shiftKey) {
            decreaseDoubles()
          } else {
            increaseDoubles()
          }
        }}
        onFencerDoubleItemRightClick={e => {
          e.preventDefault()
          e.stopPropagation()
          decreaseDoubles()
        }}
      >
        <FencerCards yellow={yellowCard} red={redCard} black={blackCard} />

        <div className="controls">
          <FencerCardIcon
            color="yellow"
            status={yellowCard}
            title="Yellow Card"
            onClick={() => setYellowCard(!yellowCard)}
          />
          <FencerCardIcon
            color="red"
            status={redCard}
            title="Red Card"
            onClick={() => setRedCard(!redCard)}
          />
        </div>
      </FencerDoubles>
    </div>
  )
}

export default Fencer
