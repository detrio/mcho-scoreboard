import styled from "styled-components"
import downIcon from '../icons/down.svg'

interface StyleProps {
  background: string
  foreground: string
}

export const StyledMatchControls = styled.div`
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

export const StyledFencers = styled.div`
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

export const StyledTournament = styled.div`
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

export const StyledConfig = styled.div`
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

export const StyledDeck = styled.div`
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

export const StyledSelect = styled.select`
  color: #fff;
  background-color: #000;
  appearance: none;
  border: none;
  height: 55px;
  font-weight: bold;
  letter-spacing: 0.15px;
  border-radius: 1px;
  width: 300px;
  text-align: center;
  font-size: 16px;
  margin-bottom: 15px;
  background: url(${downIcon}) no-repeat 96% #000;

  > option {
    &:disabled {
      background: #828282;
    }
  }

  &:disabled {
    background: url(${downIcon}) no-repeat 96% #828282;
  }
`

export const StyledButton = styled.button`
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
