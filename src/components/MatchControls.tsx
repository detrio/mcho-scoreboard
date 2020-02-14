import React, { useState, useRef } from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { changeConfigVisibility } from '../actions/scoreboard.actions'
import { State } from '../reducers/root.reducer'
import { changeFencerName, changeFencerColor } from '../actions/fencer.action'
import { FencerSide } from '../types'
import gearIcon from '../icons/gear.svg'
import downIcon from '../icons/down.svg'
import greyDownIcon from '../icons/down-grey.svg'

interface StyleProps {
  background: string
  foreground: string
}

const StyledMatchControls = styled.div`
  position: absolute;
  bottom: -445px;
  height: 530px;
  background-color: #1a1a1a;
  width: 100%;
  opacity: 0;
  transition: 0.5s;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;

  &:hover {
    opacity: 1;
  }
`

const StyledFencers = styled.div`
  flex-basis: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: overpass;
  font-size: 16px;
  padding: 15px 50px;

  > span {
    font-weight: bold;
    letter-spacing: 0.15px;
    color: #fff;
    background-color: #000;
    height: 55px;
    border-radius: 1px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div {
    margin: 30px 0 5px 0;
  }

  > input {
    background: #000;
    border: 1px solid #000;
    height: 55px;
    color: #fff;
    font-size: 16px;
    padding: 20px;
    max-width: 200px;
  }
`

const StyledTournament = styled.div`
  padding: 15px 50px;
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > input {
    margin-bottom: 15px;
    background: #000;
    border: 1px solid #000;
    height: 55px;
    color: #fff;
    font-size: 16px;
    padding: 20px;
    width: 300px;
  }
`

const StyledConfig = styled.div`
  padding: 15px 50px;
  flex-basis: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    height: 50px;
    width: 50px;
    cursor: pointer;
    align-self: flex-start;
  }
`

const StyledDeck = styled.div`
  font-family: overpass;
  display: flex;
  flex-direction: column;

  > div {
    margin: 30px 0 5px 0;
  }

  > input {
    background: #000;
    border: 1px solid #000;
    height: 55px;
    color: #fff;
    font-size: 16px;
    padding: 20px;
    max-width: 200px;
  }
`

const StyledDropdown = styled.div`
  position: relative;
  margin-bottom: 15px;

  > input {
    background: ${(props: StyleProps) => props.background};
    border: 1px solid #000;
    height: 55px;
    color: ${(props: StyleProps) => props.foreground};
    font-size: 16px;
    padding: 20px;
    width: 300px;
  }

  > img {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const StyledButton = styled.button`
  height: 55px;
  font-family: overpass;
  color: ${(props: StyleProps) => props.foreground};
  background-color: ${(props: StyleProps) => props.background};
  width: 300px;
  border-radius: 1px;
  border: 1px solid black;
  font-size: 24px;
  line-height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  font-weight: 500;
  cursor: pointer;
`

function MatchControls() {
  const dispatch = useDispatch()
  const matchControlsRef = useRef<HTMLDivElement>(null)

  const leftFencerName = useSelector((state: State) => state.fencers.left.name)
  const leftFencerColor = useSelector(
    (state: State) => state.fencers.left.color
  )
  const rightFencerName = useSelector(
    (state: State) => state.fencers.right.name
  )
  const rightFencerColor = useSelector(
    (state: State) => state.fencers.right.color
  )

  const [currLeftFencerName, setCurrLeftFencerName] = useState(leftFencerName)
  const [currLeftFencerColor, setCurrLeftFencerColor] = useState(
    leftFencerColor
  )
  const [currRightFencerName, setCurrRightFencerName] = useState(
    rightFencerName
  )
  const [currRightFencerColor, setCurrRightFencerColor] = useState(
    rightFencerColor
  )

  const onSaveConfig = () => {
    batch(() => {
      dispatch(changeConfigVisibility(false))
      dispatch(changeFencerName(FencerSide.Left, currLeftFencerName))
      dispatch(changeFencerColor(FencerSide.Left, currLeftFencerColor))
      dispatch(changeFencerName(FencerSide.Right, currRightFencerName))
      dispatch(changeFencerColor(FencerSide.Right, currRightFencerColor))
    })

    toggleSettings()
  }

  const toggleSettings = () => {
    if (matchControlsRef.current) {
      matchControlsRef.current.style.bottom =
        matchControlsRef.current.style.bottom === '0px' ? '-445px' : '0px'

      matchControlsRef.current.style.opacity =
        matchControlsRef.current.style.bottom === '0px' ? '1' : null
    }
  }

  return (
    <StyledMatchControls ref={matchControlsRef}>
      <StyledFencers>
        <span>
          {leftFencerName} vs {rightFencerName}
        </span>

        <div>Left Color</div>
        <input
          type="text"
          value={currLeftFencerColor}
          onChange={e => setCurrLeftFencerColor(e.target.value)}
        />
        <div>Left Name</div>
        <input
          type="text"
          value={currLeftFencerName}
          onChange={e => setCurrLeftFencerName(e.target.value)}
        />
      </StyledFencers>
      <StyledTournament>
        <StyledButton background="#000" foreground="#4F4F4F">
          COMPLETE & NEXT
        </StyledButton>

        <StyledDropdown background="#000" foreground="#fff">
          <input type="text" defaultValue="Beta 3 Longsword" />
          <img src={downIcon} alt="Open" />
        </StyledDropdown>

        <StyledDropdown background="#000" foreground="#fff">
          <input type="text" defaultValue="Group Stage" />
          <img src={downIcon} alt="Open" />
        </StyledDropdown>

        <StyledDropdown background="#828282" foreground="#333333">
          <input type="text" defaultValue="Group" />
          <img src={greyDownIcon} alt="Open" />
        </StyledDropdown>

        <StyledDropdown background="#fff" foreground="#26292C">
          <input type="text" defaultValue="Timer (in seconds)" />
        </StyledDropdown>

        <StyledButton
          onClick={onSaveConfig}
          background="#56CCF2"
          foreground="#333333"
        >
          SAVE & CLOSE
        </StyledButton>
      </StyledTournament>
      <StyledConfig>
        <StyledDeck>
          <span>On Deck</span>
          <span style={{ fontWeight: 'bold' }}>
            {leftFencerName} vs {rightFencerName}
          </span>

          <div>Right Color</div>
          <input
            type="text"
            value={currRightFencerColor}
            onChange={e => setCurrRightFencerColor(e.target.value)}
          />
          <div>Right Name</div>
          <input
            type="text"
            value={currRightFencerName}
            onChange={e => setCurrRightFencerName(e.target.value)}
          />
        </StyledDeck>
        <img onClick={toggleSettings} src={gearIcon} alt="Settings" />
      </StyledConfig>
    </StyledMatchControls>
  )
}

export default MatchControls
