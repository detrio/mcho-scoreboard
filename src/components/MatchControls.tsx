import React, { useState, useRef, useEffect, useCallback } from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import { changeConfigVisibility } from '../actions/scoreboard.actions'
import { State } from '../reducers/root.reducer'
import {
  changeFencerName,
  changeFencerColor,
  setFencerScore,
} from '../actions/fencer.action'
import {
  FencerSide,
  Tournament,
  Stage,
  Group,
  Match,
  MatchResult,
} from '../types'
import gearIcon from '../icons/gear.svg'
import useApi from '../hooks/api.hook'
import {
  StyledMatchControls,
  StyledFencers,
  StyledTournament,
  StyledButton,
  StyledSelect,
  StyledConfig,
  StyledDeck,
} from '../styles'
import MatchSelectorFencer from './MatchSelectorFencer'
import CompleteButton from './CompleteButton'
import { resultFromScore } from '../utils'

function MatchControls() {
  const dispatch = useDispatch()
  const {
    requestAccess,
    getTournaments,
    getStages,
    getGroups,
    getMatches,
    patchMatch,
  } = useApi()
  const matchControlsRef = useRef<HTMLDivElement>(null)

  const leftFencerName = useSelector((state: State) => state.fencers.left.name)
  const leftFencerColor = useSelector(
    (state: State) => state.fencers.left.color
  )
  const leftFencerScore = useSelector(
    (state: State) => state.fencers.left.score
  )

  const rightFencerName = useSelector(
    (state: State) => state.fencers.right.name
  )
  const rightFencerColor = useSelector(
    (state: State) => state.fencers.right.color
  )
  const rightFencerScore = useSelector(
    (state: State) => state.fencers.right.score
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
  const [tournaments, setTournaments] = useState<Tournament[] | null>(null)
  const [currTournament, setCurrTournament] = useState('')

  const [stages, setStages] = useState<Stage[] | null>(null)
  const [currStage, setCurrStage] = useState({
    id: '',
    type: '',
  })

  const [groups, setGroups] = useState<Group[] | null>(null)
  const [currGroup, setCurrGroup] = useState('')

  const [matches, setMatches] = useState<Match[] | null>(null)
  const [currMatch, setCurrMatch] = useState('')

  useEffect(() => {
    requestAccess()
  }, [requestAccess])

  useEffect(() => {
    getTournaments().then(maybeTournaments => {
      if (!maybeTournaments) {
        setTournaments(null)
      } else {
        setTournaments(maybeTournaments)
      }
    })
  }, [getTournaments])

  useEffect(() => {
    if (currTournament !== '') {
      getStages(currTournament).then(maybeStages => {
        if (!maybeStages) {
          setStages(null)
        } else {
          setStages(maybeStages)
        }
      })
    }
  }, [currTournament, getStages])

  useEffect(() => {
    if (
      currStage.id !== '' &&
      currStage.type === 'pools' &&
      currTournament !== ''
    ) {
      getGroups(currTournament, currStage.id).then(maybeGroups => {
        if (!maybeGroups) {
          setGroups(null)
        } else {
          setGroups(maybeGroups)
        }
      })
    }
  }, [currStage, currTournament, getGroups])

  useEffect(() => {
    if (
      (currGroup !== '' ||
        (currStage.type !== '' && currStage.type !== 'pools')) &&
      currStage.id !== '' &&
      currTournament !== ''
    ) {
      getMatches(currTournament, currStage.id, currGroup).then(
        (maybeMatches: Match[] | null) => {
          if (!maybeMatches) {
            setMatches(null)
          } else {
            const defaultMatch =
              maybeMatches?.find(match => match.status === 'running')?.id ?? ''
            setCurrMatch(defaultMatch)
            setMatches(maybeMatches)
          }
        }
      )
    }
  }, [currGroup, currStage, currTournament, getMatches])

  const onSaveConfig = () => {
    const match = matches?.find(match => match.id === currMatch)
    const leftName = match?.opponents[0].participant?.name ?? currLeftFencerName
    const leftScore = match?.opponents[0].score ?? leftFencerScore

    const rightName =
      match?.opponents[1].participant?.name ?? currRightFencerName
    const rightScore = match?.opponents[1].score ?? rightFencerScore

    batch(() => {
      dispatch(changeConfigVisibility(false))
      dispatch(changeFencerName(FencerSide.Left, leftName))
      dispatch(changeFencerName(FencerSide.Right, rightName))
      dispatch(changeFencerColor(FencerSide.Left, currLeftFencerColor))
      dispatch(changeFencerColor(FencerSide.Right, currRightFencerColor))
      dispatch(setFencerScore(FencerSide.Left, leftScore))
      dispatch(setFencerScore(FencerSide.Right, rightScore))
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

  const onCompleteMatch = useCallback(() => {
    const result: MatchResult[] = [
      {
        score: leftFencerScore,
        result: resultFromScore(
          FencerSide.Left,
          leftFencerScore,
          rightFencerScore
        ),
      },
      {
        score: rightFencerScore,
        result: resultFromScore(
          FencerSide.Right,
          leftFencerScore,
          rightFencerScore
        ),
      },
    ]

    patchMatch(currTournament, currMatch, result)
  }, [currMatch, currTournament, leftFencerScore, patchMatch, rightFencerScore])

  return (
    <StyledMatchControls ref={matchControlsRef}>
      <StyledFencers>
        {currTournament === '' ? (
          <span style={{ marginBottom: 15 }}>
            {leftFencerName} vs {rightFencerName}
          </span>
        ) : (
          <StyledSelect
            id="matches"
            value={currMatch}
            disabled={
              currTournament === '' || currStage.id === '' || currGroup === ''
            }
            onChange={e => setCurrMatch(e.currentTarget.value)}
            style={{ width: 350 }}
          >
            {matches?.map(match => (
              <option
                disabled={match.status === 'completed'}
                key={match.id}
                value={match.id}
              >
                {match.opponents[0].participant?.name ?? 'Participant 1'} vs{' '}
                {match.opponents[1].participant?.name ?? 'Participant 2'} (IP)
              </option>
            ))}
          </StyledSelect>
        )}

        <MatchSelectorFencer
          isTournamentSelected={currTournament !== ''}
          side="Left"
          color={currLeftFencerColor}
          name={currLeftFencerName}
          setColor={setCurrLeftFencerColor}
          setName={setCurrLeftFencerName}
        />
      </StyledFencers>
      <StyledTournament>
        <CompleteButton onComplete={onCompleteMatch} />
        <StyledSelect
          id="tournaments"
          value={currTournament}
          onChange={e => {
            setCurrTournament(e.currentTarget.value)
            setCurrStage({ id: '', type: '' })
            setStages(null)
            setCurrGroup('')
            setGroups(null)
            setCurrMatch('')
            setMatches(null)
          }}
        >
          <option value="">Select a Tournament</option>
          {tournaments?.map(tournament => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </StyledSelect>

        <StyledSelect
          id="stages"
          disabled={currTournament === ''}
          value={currStage.id}
          onChange={e => {
            setCurrStage({
              id: e.currentTarget.value,
              type:
                stages?.find(stage => stage.id === e.currentTarget.value)
                  ?.type ?? '',
            })

            setCurrGroup('')
            setGroups(null)
            setCurrMatch('')
            setMatches(null)
          }}
        >
          <option value="">Select a Stage</option>
          {stages?.map(stage => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </StyledSelect>

        {currStage.type === 'pools' && (
          <StyledSelect
            id="groups"
            disabled={currTournament === '' || currStage.id === ''}
            value={currGroup}
            onChange={e => {
              setCurrGroup(e.currentTarget.value)
              setCurrMatch('')
              setMatches(null)
            }}
          >
            <option value="">Select a Group</option>
            {groups?.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </StyledSelect>
        )}

        <input
          style={{ color: '#000', background: '#fff' }}
          type="text"
          placeholder="Timer (in seconds)"
        />

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

          <MatchSelectorFencer
            isTournamentSelected={currTournament !== ''}
            side="Right"
            color={currRightFencerColor}
            name={currRightFencerName}
            setColor={setCurrRightFencerColor}
            setName={setCurrRightFencerName}
          />
        </StyledDeck>
        <img onClick={toggleSettings} src={gearIcon} alt="Settings" />
      </StyledConfig>
    </StyledMatchControls>
  )
}

export default MatchControls
