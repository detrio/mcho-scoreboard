import React, { useState } from 'react'

export interface FencerDetails {
  fencerLeftName: string
  fencerLeftColor: string
  fencerRightName: string
  fencerRightColor: string
}

interface ScoreboardConfigProps {
  values: FencerDetails
  visible: boolean
  onSubmit: (fencerDetails: FencerDetails) => void
  onCancel: () => void
}

function ScoreboardConfig(props: ScoreboardConfigProps) {
  const [fencerLeftName, setFencerLeftName] = useState(
    props.values.fencerLeftName
  )
  const [fencerLeftColor, setFencerLeftColor] = useState(
    props.values.fencerLeftColor
  )
  const [fencerRightName, setFencerRightName] = useState(
    props.values.fencerRightName
  )
  const [fencerRightColor, setFencerRightColor] = useState(
    props.values.fencerRightColor
  )

  const onSubmitClick = () => {
    if (props.onSubmit) {
      props.onSubmit({
        fencerLeftName,
        fencerLeftColor,
        fencerRightName,
        fencerRightColor,
      })
    }
  }

  const onCancelClick = () => {
    if (props.onCancel) {
      props.onCancel()
    }
  }

  const classes = ['config']
  if (props.visible) {
    classes.push('shown')
  }

  return (
    <div className={classes.join(' ')}>
      <div className="config-items">
        <div className="config-item">
          <label>Left Fencer</label>
          <input
            type="text"
            size={20}
            maxLength={20}
            value={fencerLeftName}
            onChange={e => setFencerLeftName(e.target.value)}
          />
          <label>Color</label>
          <input
            type="text"
            size={10}
            maxLength={20}
            value={fencerLeftColor}
            onChange={e => setFencerLeftColor(e.target.value)}
          />
        </div>

        <div className="config-item">
          <label>Right Fencer</label>
          <input
            type="text"
            size={20}
            value={fencerRightName}
            onChange={e => setFencerRightName(e.target.value)}
          />
          <label>Color</label>
          <input
            type="text"
            size={10}
            maxLength={20}
            value={fencerRightColor}
            onChange={e => setFencerRightColor(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button className="btn" onClick={onSubmitClick}>
          Submit
        </button>
        <button className="btn" onClick={onCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ScoreboardConfig
