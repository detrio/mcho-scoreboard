import React, { useState } from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import {
  changeRightFencerName,
  changeRightFencerColor,
} from '../actions/right-fencer-actions.'
import { changeConfigVisibility } from '../actions/scoreboard.actions'
import {
  changeLeftFencerName,
  changeLeftFencerColor,
} from '../actions/left-fencer.action'
import { State } from '../reducers/root.reducer'

function ScoreboardConfig() {
  const dispatch = useDispatch()

  const fencerLeftName = useSelector((state: State) => state.leftFencer.name)
  const fencerLeftColor = useSelector((state: State) => state.leftFencer.color)
  const fencerRightName = useSelector((state: State) => state.rightFencer.name)
  const fencerRightColor = useSelector(
    (state: State) => state.rightFencer.color
  )

  const configShown = useSelector(
    (state: State) => state.scoreboard.configShown
  )

  const [currentFencerLeftName, setCurrentFencerLeftName] = useState(
    fencerLeftName
  )
  const [currentFencerLeftColor, setCurrentFencerLeftColor] = useState(
    fencerLeftColor
  )
  const [currentFencerRightName, setCurrentFencerRightName] = useState(
    fencerRightName
  )
  const [currentFencerRightColor, setCurrentFencerRightColor] = useState(
    fencerRightColor
  )

  const onSaveConfig = () => {
    batch(() => {
      dispatch(changeConfigVisibility(false))
      dispatch(changeLeftFencerName(currentFencerLeftName))
      dispatch(changeLeftFencerColor(currentFencerLeftColor))
      dispatch(changeRightFencerName(currentFencerRightName))
      dispatch(changeRightFencerColor(currentFencerRightColor))
    })
  }

  return (
    <div className={`config${configShown ? ' shown' : ''}`}>
      <div className="config-items">
        <div className="config-item">
          <label>Left Fencer</label>
          <input
            type="text"
            size={20}
            maxLength={20}
            value={currentFencerLeftName}
            onChange={e => setCurrentFencerLeftName(e.target.value)}
          />
          <label>Color</label>
          <input
            type="text"
            size={10}
            maxLength={20}
            value={currentFencerLeftColor}
            onChange={e => setCurrentFencerLeftColor(e.target.value)}
          />
        </div>

        <div className="config-item">
          <label>Right Fencer</label>
          <input
            type="text"
            size={20}
            value={currentFencerRightName}
            onChange={e => setCurrentFencerRightName(e.target.value)}
          />
          <label>Color</label>
          <input
            type="text"
            size={10}
            maxLength={20}
            value={currentFencerRightColor}
            onChange={e => setCurrentFencerRightColor(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button className="btn" onClick={onSaveConfig}>
          Submit
        </button>
        <button
          className="btn"
          onClick={() => dispatch(changeConfigVisibility(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ScoreboardConfig
