import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { KeyCode } from '../utils'
import {
  setMainClockStatus,
  addToMainClockTime,
  subtractFromMainClockTime,
  setMainClockTime,
} from '../actions/main-clock.actions'
import { ClockStatus, FencerSide } from '../types'
import {
  resetFencerScore,
  decreaseFencerScore,
  increaseFencerScore,
  resetFencerDoubles,
  decreaseFencerDoubles,
  increaseFencerDoubles,
  resetFencerCards,
  resetFencer,
} from '../actions/fencer.action'
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
            dispatch(resetFencerScore(FencerSide.Left))
          } else if (event.shiftKey) {
            dispatch(decreaseFencerScore(FencerSide.Left))
          } else {
            dispatch(increaseFencerScore(FencerSide.Left))
          }
          break
        case KeyCode.NUM4:
          dispatch(increaseFencerScore(FencerSide.Left))
          break
        case KeyCode.NUM1:
          dispatch(decreaseFencerScore(FencerSide.Left))
          break

        case KeyCode.SEMICOLON:
          if (event.ctrlKey) {
            dispatch(resetFencerDoubles(FencerSide.Left))
          } else if (event.shiftKey) {
            dispatch(decreaseFencerDoubles(FencerSide.Left))
          } else {
            dispatch(increaseFencerDoubles(FencerSide.Left))
          }
          break
        case KeyCode.NUM7:
          dispatch(increaseFencerDoubles(FencerSide.Left))
          break

        case KeyCode.OPEN_BRACKET:
          if (event.ctrlKey) {
            dispatch(resetFencerCards(FencerSide.Left))
          }
          break
        case KeyCode.RIGHT:
        case KeyCode.FORWARD_SLASH:
          if (event.ctrlKey) {
            dispatch(resetFencerScore(FencerSide.Right))
          } else if (event.shiftKey) {
            dispatch(decreaseFencerScore(FencerSide.Right))
          } else {
            dispatch(increaseFencerScore(FencerSide.Right))
          }
          break
        case KeyCode.NUM6:
          dispatch(increaseFencerScore(FencerSide.Right))
          break
        case KeyCode.NUM3:
          dispatch(decreaseFencerScore(FencerSide.Right))
          break

        case KeyCode.SINGLE_QUOTE:
          if (event.ctrlKey) {
            dispatch(resetFencerDoubles(FencerSide.Right))
          } else if (event.shiftKey) {
            dispatch(decreaseFencerDoubles(FencerSide.Right))
          } else {
            dispatch(increaseFencerDoubles(FencerSide.Right))
          }
          break
        case KeyCode.NUM9:
          dispatch(increaseFencerDoubles(FencerSide.Right))
          break

        case KeyCode.CLOSE_BRACKET:
          if (event.ctrlKey) {
            dispatch(resetFencerCards(FencerSide.Right))
          }
          break
        case KeyCode.L:
          if (event.ctrlKey && event.shiftKey) {
            dispatch(resetFencer(FencerSide.Left))
            dispatch(resetFencer(FencerSide.Right))
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
