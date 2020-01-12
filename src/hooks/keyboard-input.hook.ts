import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { KeyCode } from '../utils'
import {
  setMainClockStatus,
  addToMainClockTime,
  subtractFromMainClockTime,
  setMainClockTime,
} from '../actions/main-clock.actions'
import { ClockStatus } from '../types'
import {
  resetLeftFencerScore,
  decreaseLeftFencerScore,
  increaseLeftFencerScore,
  resetLeftFencerDoubles,
  decreaseLeftFencerDoubles,
  increaseLeftFencerDoubles,
  resetLeftFencerCards,
  hideLeftFencerCards,
  showLeftFencerCards,
  resetLeftFencer,
} from '../actions/left-fencer.action'
import {
  resetRightFencerScore,
  decreaseRightFencerScore,
  increaseRightFencerScore,
  resetRightFencerDoubles,
  decreaseRightFencerDoubles,
  increaseRightFencerDoubles,
  resetRightFencerCards,
  hideRightFencerCards,
  showRightFencerCards,
  resetRightFencer,
} from '../actions/right-fencer-actions.'
import useClock from './clock.hook'

function useKeyboardInput() {
  const dispatch = useDispatch()
  const { toggleMainClock, toggleBreakClock } = useClock()

  const keyboardInput = useCallback(
    (event: any) => {
      event.stopPropagation()

      const name = event.target.tagName.toLowerCase()

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
            dispatch(resetLeftFencer())
            dispatch(resetRightFencer())
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
    [dispatch, toggleBreakClock, toggleMainClock]
  )

  return { keyboardInput }
}

export default useKeyboardInput
