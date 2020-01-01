import React, { MouseEvent, useRef, useState } from 'react'
import Clock, { ClockStatus } from './Clock'
import { config, KeyCode } from '../utils'
import ScoreboardConfig, { FencerDetails } from './ScoreboardConfig'
import Fencer from './Fencer'
import stopWatchIcon from '../icons/stopwatch.png'
import settingsIcon from '../icons/settings.png'
import resetIcon from '../icons/reset.png'

enum FencerCard {
  NORMAL = 0,
  YELLOW = 1,
  RED = 2,
  BLACK = 3,
}

const scoreboardInitialState = {
  boutIndex: 0,
  mainClockState: ClockStatus.READY,
  breakClockState: ClockStatus.READY,
  fencerLeftName: 'LEFT',
  fencerLeftColor: '#990000',
  fencerRightName: 'RIGHT',
  fencerRightColor: '#006699',
  configShown: false,
}

function Scoreboard() {
  const allezClockRef = useRef()
  const fencerLeftRef = useRef()
  const fencerRightRef = useRef()
  const [scoreboardState, setScoreboardState] = useState(scoreboardInitialState)
  const [mainClockState, setMainClockState] = useState(0)
  // const [statusReady, setStatusReady] = useState(0)

  const toggleMainClock = () => {
    let index = scoreboardState.boutIndex + 1
    let clockState = scoreboardState.mainClockState

    if (index >= config.boutLabels.length) index = 0

    switch (clockState) {
      //start clock
      case ClockStatus.STOPPED:
      case ClockStatus.READY:
        clockState = ClockStatus.RUNNING
        break

      //stop clock
      case ClockStatus.RUNNING:
        clockState = ClockStatus.STOPPED
        break
    }

    setScoreboardState({ ...scoreboardState, boutIndex: index })
    setMainClockState(clockState)
  }

  const toggleBreakClock = () => {
    let status = scoreboardState.breakClockState
    switch (status) {
      //run
      case ClockStatus.READY:
        status = ClockStatus.RUNNING
        break

      default:
        status = ClockStatus.READY
        break
    }

    setScoreboardState({ ...scoreboardState, breakClockState: status })
  }

  const reset = () => {
    // TODO: what is going on in here?
    // this.setState(this._getInitState(), () => {
    //   fencerLeftRef.current.reset();
    //   fencerRightRef.current.reset();
    // });
  }

  const onKeyUp = (event: any) => {
    var name = event.target.tagName.toLowerCase()

    //retain normal behavior if focused on an input field
    switch (name) {
      case 'input':
      case 'textarea':
      case 'select':
        event.stopPropagation()
        return
        break
    }

    event.stopPropagation()

    switch (event.keyCode) {
      case KeyCode.SPACE_BAR:
      case KeyCode.ENTER:
      case KeyCode.UP:
      case KeyCode.DOWN:
      case KeyCode.LEFT:
      case KeyCode.PERIOD:
      case KeyCode.RIGHT:
      case KeyCode.FORWARD_SLASH:
      case KeyCode.BACK_SLASH:
      case KeyCode.OPEN_BRACKET:
      case KeyCode.CLOSE_BRACKET:
      case KeyCode.SEMICOLON:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.L:
      case KeyCode.ADD:
      case KeyCode.SUBTRACT:
      case KeyCode.MULTIPLY:
        event.preventDefault()
        break
    }

    switch (event.keyCode) {
      //Start / Stop main clock
      case KeyCode.SPACE_BAR:
      case KeyCode.ENTER:
        toggleMainClock()
        break

      //reset clock only or increase time by 1 second shift+up
      case KeyCode.UP:
        if (event.ctrlKey) {
          setMainClockState(ClockStatus.READY)
        } else if (event.shiftKey) {
          // allezClockRef.current.add(0, 0, 1);
        }
        break

      //increase game clock by 1 second
      case KeyCode.ADD:
        // allezClockRef.current.add(0, 0, 1);
        break

      //decrease game clock by 1 second
      case KeyCode.SUBTRACT:
        // allezClockRef.current.subtract(0, 0, 1);
        break

      //ctrl+shift+down = set clock to 1 second
      //ctrl+down = reset
      case KeyCode.DOWN:
        if (event.ctrlKey && event.shiftKey) {
          setMainClockState(ClockStatus.READY)
          // allezClockRef.current.set(0, 0, 1);
        } else if (event.shiftKey) {
          // allezClockRef.current.subtract(0, 0, 1);
        }
        break

      //left fencer score
      case KeyCode.LEFT:
      case KeyCode.PERIOD:
        if (event.ctrlKey) {
          // fencerLeftRef.current.resetScore();
        } else if (event.shiftKey) {
          // fencerLeftRef.current.decreaseScore();
        } else {
          // fencerLeftRef.current.increaseScore();
        }
        break
      case KeyCode.NUM4:
        // fencerLeftRef.current.increaseScore();
        break
      case KeyCode.NUM1:
        // fencerLeftRef.current.decreaseScore();
        break

      //left fencer doubles
      case KeyCode.SEMICOLON:
        if (event.ctrlKey) {
          // fencerLeftRef.current.resetDoubles();
        } else if (event.shiftKey) {
          // fencerLeftRef.current.decreaseDoubles();
        } else {
          // fencerLeftRef.current.increaseDoubles();
        }
        break
      case KeyCode.NUM7:
        // fencerLeftRef.current.increaseDoubles();
        break

      //left fencer cards
      case KeyCode.OPEN_BRACKET:
        if (event.ctrlKey) {
          // fencerLeftRef.current.resetCards();
        } else if (event.shiftKey) {
          // fencerLeftRef.current.hideCard();
        } else {
          // fencerLeftRef.current.showCard();
        }
        break
      case KeyCode.NUM8:
        // fencerLeftRef.current.showCard();
        break

      //right fencer score
      case KeyCode.RIGHT:
      case KeyCode.FORWARD_SLASH:
        if (event.ctrlKey) {
          // fencerRightRef.current.resetScore();
        } else if (event.shiftKey) {
          // fencerRightRef.current.decreaseScore();
        } else {
          // fencerRightRef.current.increaseScore();
        }
        break
      case KeyCode.NUM6:
        // fencerRightRef.current.increaseScore();
        break
      case KeyCode.NUM3:
        // fencerRightRef.current.decreaseScore();
        break

      //right fencer doubles
      case KeyCode.SINGLE_QUOTE:
        if (event.ctrlKey) {
          // fencerRightRef.current.resetDoubles();
        } else if (event.shiftKey) {
          // fencerRightRef.current.decreaseDoubles();
        } else {
          // fencerRightRef.current.increaseDoubles();
        }
        break
      case KeyCode.NUM9:
        // fencerRightRef.current.increaseDoubles();
        break

      //right fencer cards
      case KeyCode.CLOSE_BRACKET:
        if (event.ctrlKey) {
          // fencerRightRef.current.resetCards();
        } else if (event.shiftKey) {
          // fencerRightRef.current.hideCard();
        } else {
          // fencerRightRef.current.showCard();
        }
        break
      case KeyCode.NUM2:
        // fencerRightRef.current.showCard();
        break

      //reset scoreboard
      case KeyCode.L:
        if (event.ctrlKey && event.shiftKey) {
          reset()
        }
        break

      //reset scoreboard
      //case KeyCode.DIVIDE :
      //this.reset();
      //break;

      //Toggle Break/Timeout Clock
      case KeyCode.BACK_SLASH:
      case KeyCode.MULTIPLY:
        toggleBreakClock()
        break

      default:
        break
    }
  }

  const onRightClickScoreboard = (event: MouseEvent<any>) => {
    if (!event.shiftKey) {
      event.preventDefault()
    }
  }

  const onMainClockClick = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    if (event.ctrlKey) {
      setMainClockState(ClockStatus.READY)
    } else {
      toggleMainClock()
    }
  }

  const onBreakClockClick = (event: any) => {
    event.stopPropagation()
    event.preventDefault()
    toggleBreakClock()
  }

  const onSaveConfig = (fencerDetails: FencerDetails) => {
    setScoreboardState({ ...scoreboardState, configShown: false })

    // TODO: Update fencer names and colors
    // name: values.FencerLeftName,
    // color: values.FencerLeftColor,
    // name: values.FencerRightName,
    // color: values.FencerRightColor,
  }

  const onCloseConfig = () => {
    setScoreboardState({ ...scoreboardState, configShown: false })
  }

  return (
    <div className="scoreboard" onContextMenu={onRightClickScoreboard}>
      <Clock
        className="allez-clock"
        minutes={config.allezMinute}
        status={mainClockState}
        onClick={onMainClockClick}
      />
      <Clock
        className="break-clock"
        minutes={config.breakSecond}
        type="W"
        status={scoreboardState.breakClockState}
        onClick={onBreakClockClick}
      />

      <Fencer side="left" name="LEFT" color="#990000" />

      <Fencer side="right" name="RIGHT" color="#006699" />

      <button
        className="main-control-button"
        title="Start/Stop Clock"
        onClick={toggleMainClock}
      >
        {config.boutLabels[scoreboardState.boutIndex]}
      </button>

      <img
        className="break-clock-button icon"
        src={stopWatchIcon}
        alt="Break Clock"
        title="Break Clock"
        onClick={toggleBreakClock}
      />

      <img
        className="config-icon icon "
        src={settingsIcon}
        alt="Settings"
        title="Settings"
        onClick={() =>
          setScoreboardState({
            ...scoreboardState,
            configShown: !scoreboardState.configShown,
          })
        }
      />

      <img
        className="reset-icon icon"
        src={resetIcon}
        alt="Reset All"
        title="Reset All"
        onClick={reset}
      />

      <ScoreboardConfig
        onSubmit={onSaveConfig}
        onCancel={onCloseConfig}
        visible={scoreboardState.configShown}
        values={{
          fencerLeftColor: scoreboardState.fencerLeftColor,
          fencerLeftName: scoreboardState.fencerLeftName,
          fencerRightColor: scoreboardState.fencerRightColor,
          fencerRightName: scoreboardState.fencerRightName,
        }}
      />
    </div>
  )
}

export default Scoreboard
