import React, {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react'
import { StyledButton } from '../styles'

const THREE_SECONDS = 3000

interface CompleteButtonProps {
  onComplete: () => void
}

function CompleteButton(props: CompleteButtonProps) {
  const [completeTimer, setCompleteTimer] = useState(0)
  const [didClickCompleteButton, setDidClickCompleteButton] = useState(false)
  const intervalRef = useRef<number>()

  const resetState = useCallback(() => {
    setCompleteTimer(0)
    setDidClickCompleteButton(false)
    clearInterval(intervalRef.current)
  }, [])

  const handleMouseDown = useCallback(() => {
    setDidClickCompleteButton(true)
  }, [])

  useLayoutEffect(() => {
    if (didClickCompleteButton) {
      intervalRef.current = setInterval(() => {
        setCompleteTimer(value => value + 17)
      }, 16.6)

      return () => clearInterval(intervalRef.current)
    }
  }, [didClickCompleteButton])

  useEffect(() => {
    if (completeTimer >= 3000) {
      props.onComplete()

      resetState()
    }
  }, [completeTimer, props, resetState])

  const completionPercentage = (completeTimer / THREE_SECONDS) * 100

  return (
    <StyledButton
      onMouseDown={handleMouseDown}
      onMouseUp={resetState}
      background="#000"
      foreground="#4F4F4F"
      style={{
        background: `linear-gradient(90deg, #6FCF97 ${completionPercentage}%, #000 0%)`,
      }}
    >
      COMPLETE & NEXT
    </StyledButton>
  )
}

export default CompleteButton
