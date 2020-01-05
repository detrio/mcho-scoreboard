import React, { MouseEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainClock from './MainClock'
import { config, KeyCode } from '../utils'
import ScoreboardConfig from './ScoreboardConfig'
import LeftFencer from './LeftFencer'
import RightFencer from './RightFencer'
import stopWatchIcon from '../icons/stopwatch.png'
import settingsIcon from '../icons/settings.png'
import resetIcon from '../icons/reset.png'
import {
  changeConfigVisibility,
  setBreakClockStatus,
  setMainClockStatus,
  setBoutIndex,
  addToMainClockTime,
  subtractFromMainClockTime,
  setMainClockTime,
  resetLeftFencerDoubles,
  decreaseLeftFencerDoubles,
  increaseLeftFencerDoubles,
  resetLeftFencerScore,
  decreaseLeftFencerScore,
  increaseLeftFencerScore,
  resetLeftFencerCards,
  hideLeftFencerCards,
  showLeftFencerCards,
  resetLeftFencer,
  resetRightFencer,
  resetRightFencerScore,
  decreaseRightFencerScore,
  increaseRightFencerScore,
  resetRightFencerDoubles,
  decreaseRightFencerDoubles,
  increaseRightFencerDoubles,
  resetRightFencerCards,
  hideRightFencerCards,
  showRightFencerCards,
} from '../actions'
import { ScoreboardState, ClockStatus } from '../reducer'
import BreakClock from './BreakClock'

function Scoreboard() {
  const dispatch = useDispatch()

  const configShown = useSelector((state: ScoreboardState) => state.configShown)

  const mainClockStatus = useSelector(
    (state: ScoreboardState) => state.mainClockStatus
  )

  const breakClockStatus = useSelector(
    (state: ScoreboardState) => state.breakClockStatus
  )

  const boutIndex = useSelector((state: ScoreboardState) => state.boutIndex)

  const toggleMainClock = useCallback(() => {
    const index = boutIndex + 1 >= config.boutLabels.length ? 0 : boutIndex + 1
    const clockState =
      mainClockStatus === ClockStatus.STOPPED ||
      mainClockStatus === ClockStatus.READY
        ? ClockStatus.RUNNING
        : ClockStatus.STOPPED

    dispatch(setBoutIndex(index))
    dispatch(setMainClockStatus(clockState))
  }, [boutIndex, dispatch, mainClockStatus])

  const toggleBreakClock = useCallback(() => {
    const newStatus =
      breakClockStatus === ClockStatus.READY
        ? ClockStatus.RUNNING
        : ClockStatus.READY

    dispatch(setBreakClockStatus(newStatus))
  }, [breakClockStatus, dispatch])

  const resetGame = useCallback(() => {
    dispatch(resetLeftFencer())
    dispatch(resetRightFencer())
  }, [dispatch])

  const handleKeyPress = useCallback(
    (event: any) => {
      event.stopPropagation()

      const name = event.target.tagName.toLowerCase()

      //retain normal behavior if focused on an input field
      switch (name) {
        case 'input':
        case 'textarea':
        case 'select':
          break
      }

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
        case KeyCode.SPACE_BAR:
        case KeyCode.ENTER:
          toggleMainClock()
          break

        case KeyCode.UP:
          if (event.ctrlKey) {
            dispatch(setMainClockStatus(ClockStatus.READY))
          } else if (event.shiftKey) {
            dispatch(addToMainClockTime(0, 0, 1))
          }
          break

        case KeyCode.ADD:
          dispatch(addToMainClockTime(0, 0, 1))
          break

        case KeyCode.SUBTRACT:
          dispatch(subtractFromMainClockTime(0, 0, 1))
          break

        case KeyCode.DOWN:
          if (event.ctrlKey && event.shiftKey) {
            dispatch(setMainClockStatus(ClockStatus.READY))
            dispatch(setMainClockTime(0, 0, 1))
          } else if (event.shiftKey) {
            dispatch(subtractFromMainClockTime(0, 0, 1))
          }
          break

        case KeyCode.LEFT:
        case KeyCode.PERIOD:
          if (event.ctrlKey) {
            dispatch(resetLeftFencerScore())
          } else if (event.shiftKey) {
            dispatch(decreaseLeftFencerScore())
          } else {
            dispatch(increaseLeftFencerScore())
          }
          break
        case KeyCode.NUM4:
          dispatch(increaseLeftFencerScore())
          break
        case KeyCode.NUM1:
          dispatch(decreaseLeftFencerScore())
          break

        case KeyCode.SEMICOLON:
          if (event.ctrlKey) {
            dispatch(resetLeftFencerDoubles())
          } else if (event.shiftKey) {
            dispatch(decreaseLeftFencerDoubles())
          } else {
            dispatch(increaseLeftFencerDoubles())
          }
          break
        case KeyCode.NUM7:
          dispatch(increaseLeftFencerDoubles())
          break

        case KeyCode.OPEN_BRACKET:
          if (event.ctrlKey) {
            dispatch(resetLeftFencerCards())
          } else if (event.shiftKey) {
            dispatch(hideLeftFencerCards())
          } else {
            dispatch(showLeftFencerCards())
          }
          break
        case KeyCode.NUM8:
          dispatch(showLeftFencerCards())
          break

        case KeyCode.RIGHT:
        case KeyCode.FORWARD_SLASH:
          if (event.ctrlKey) {
            dispatch(resetRightFencerScore())
          } else if (event.shiftKey) {
            dispatch(decreaseRightFencerScore())
          } else {
            dispatch(increaseRightFencerScore())
          }
          break
        case KeyCode.NUM6:
          dispatch(increaseRightFencerScore())
          break
        case KeyCode.NUM3:
          dispatch(decreaseRightFencerScore())
          break

        case KeyCode.SINGLE_QUOTE:
          if (event.ctrlKey) {
            dispatch(resetRightFencerDoubles())
          } else if (event.shiftKey) {
            dispatch(decreaseRightFencerDoubles())
          } else {
            dispatch(increaseRightFencerDoubles())
          }
          break
        case KeyCode.NUM9:
          dispatch(increaseRightFencerDoubles())
          break

        case KeyCode.CLOSE_BRACKET:
          if (event.ctrlKey) {
            dispatch(resetRightFencerCards())
          } else if (event.shiftKey) {
            dispatch(hideRightFencerCards())
          } else {
            dispatch(showRightFencerCards())
          }
          break
        case KeyCode.NUM2:
          dispatch(showRightFencerCards())
          break

        case KeyCode.L:
          if (event.ctrlKey && event.shiftKey) {
            resetGame()
          }
          break

        case KeyCode.BACK_SLASH:
        case KeyCode.MULTIPLY:
          toggleBreakClock()
          break

        default:
          break
      }
    },
    [dispatch, resetGame, toggleBreakClock, toggleMainClock]
  )

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress)
    return () => {
      document.removeEventListener('keyup', handleKeyPress)
    }
  }, [handleKeyPress])

  const onRightClickScoreboard = (event: MouseEvent<any>) => {
    if (!event.shiftKey) {
      event.preventDefault()
    }
  }

  const onMainClockClick = useCallback(
    (event: any) => {
      event.stopPropagation()
      event.preventDefault()

      if (event.ctrlKey) {
        dispatch(setMainClockStatus(ClockStatus.READY))
      } else {
        toggleMainClock()
      }
    },
    [dispatch, toggleMainClock]
  )

  const onBreakClockClick = (event: any) => {
    event.stopPropagation()
    event.preventDefault()
    toggleBreakClock()
  }

  const boutLabel = config.boutLabels[boutIndex]

  return (
    <div className="scoreboard" onContextMenu={onRightClickScoreboard}>
      <MainClock onClick={onMainClockClick} />
      <BreakClock onClick={onBreakClockClick} />

      <LeftFencer />
      <RightFencer />

      <button
        className="main-control-button"
        title="Start/Stop Clock"
        onClick={toggleMainClock}
      >
        {boutLabel}
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
        onClick={() => dispatch(changeConfigVisibility(!configShown))}
      />

      <img
        className="reset-icon icon"
        src={resetIcon}
        alt="Reset All"
        title="Reset All"
        onClick={resetGame}
      />

      <ScoreboardConfig />
    </div>
  )
}

export default Scoreboard
