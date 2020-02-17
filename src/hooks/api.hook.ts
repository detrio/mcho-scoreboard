import { useCallback } from "react";
import { MatchResult } from "../types";

const LOCAL_STORAGE_VIEW_TOKEN_KEY = 'organizer:view'
const LOCAL_STORAGE_RESULT_TOKEN_KEY = 'organizer:result'

const requestAccessUrl = 'https://api.toornament.com/oauth/v2/token'
const getTournamentsUrl = 'https://api.toornament.com/organizer/v2/tournaments'
const getStagesUrl = (tournamentId: string) => 
  `https://api.toornament.com/organizer/v2/tournaments/${tournamentId}/stages`
const getGroupsUrl = (tournamentId: string, stageId: string) => 
  `https://api.toornament.com/organizer/v2/tournaments/${tournamentId}/groups?stage_ids=${stageId}`
const getMatchesUrl = (tournamentId: string, stageId: string, groupId: string) => 
  `https://api.toornament.com/organizer/v2/tournaments/${tournamentId}/matches?stage_ids=${stageId}${groupId === '' ? '' : `&group_ids=${groupId}`}`
const PatchMatchUrl = (tournamentId: string, matchId: string) => 
  `https://api.toornament.com/organizer/v2/tournaments/${tournamentId}/matches/${matchId}`

export type RequestAccessParamsKey = 
  | 'grant_type'
  | 'client_id'
  | 'client_secret'
  | 'scope'

function searchParams (params: Record<RequestAccessParamsKey, string>) {
  return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key as RequestAccessParamsKey]);
    }).join('&');
} 

function useApi() {
  const getViewToken = () => localStorage.getItem(LOCAL_STORAGE_VIEW_TOKEN_KEY)
  const getResultToken = () => localStorage.getItem(LOCAL_STORAGE_RESULT_TOKEN_KEY)

  const requestAccess = async () => {
    const viewScope: Record<RequestAccessParamsKey, string> = {
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_TOORNAMENT_CLIENT_ID!,
      client_secret: process.env.REACT_APP_TOORNAMENT_CLIENT_SECRET!,
      scope: 'organizer:view'
    }

    const resultScope: Record<RequestAccessParamsKey, string> = {
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_TOORNAMENT_CLIENT_ID!,
      client_secret: process.env.REACT_APP_TOORNAMENT_CLIENT_SECRET!,
      scope: 'organizer:result'
    }
    

    const viewScopePromise = fetch(requestAccessUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: searchParams(viewScope)
    })

    const resultScopePromise = fetch(requestAccessUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: searchParams(resultScope)
    })


    Promise.all([viewScopePromise, resultScopePromise])
      .then(async responses => {
        for (const response of responses) {
          const result = await response.json()
          const token = result.access_token
          localStorage.setItem(result.scope, token)
        }
      })
  }

  const getTournaments = async (): Promise<Array<any>| null> => {
    const response = await fetch(getTournamentsUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.REACT_APP_TOORNAMENT_API_KEY!,
        Range: 'tournaments=0-49',
        Authorization: `Bearer ${getViewToken()}`
      }
    })

    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }

  const getStages = async (tournamentId: string) => {
    const response = await fetch(getStagesUrl(tournamentId), {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.REACT_APP_TOORNAMENT_API_KEY!,
        Authorization: `Bearer ${getResultToken()}`
      }
    })

    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }

  const getGroups = async (tournamentId: string, stageId: string) => {
    const response = await fetch(getGroupsUrl(tournamentId, stageId), {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.REACT_APP_TOORNAMENT_API_KEY!,
        Authorization: `Bearer ${getResultToken()}`,
        Range: 'groups=0-49'
      }
    })

    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }

  const getMatches = async (tournamentId: string, stageId: string, groupId: string) => {
    const response = await fetch(getMatchesUrl(tournamentId, stageId, groupId), {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.REACT_APP_TOORNAMENT_API_KEY!,
        Authorization: `Bearer ${getResultToken()}`,
        Range: 'matches=0-99'
      }
    })

    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }

  const patchMatch = async (tournamentId: string, matchId: string, data: MatchResult[]) => {
    const response = await fetch(PatchMatchUrl(tournamentId, matchId), {
      method: 'PATCH',
      headers: {
        'X-Api-Key': process.env.REACT_APP_TOORNAMENT_API_KEY!,
        Authorization: `Bearer ${getResultToken()}`,
      },
      body: JSON.stringify({ opponents: data }),
    })

    if (response.ok) {
      return await response.json()
    } else {
      return null
    }
  }

  return {
    requestAccess: useCallback(() => requestAccess(), []),
    getTournaments: useCallback(() => getTournaments(), []), // eslint-disable-line react-hooks/exhaustive-deps
    getStages: useCallback((tournamentId: string) => getStages(tournamentId), []), // eslint-disable-line react-hooks/exhaustive-deps
    getGroups: useCallback((tournamentId: string, stageId: string) => getGroups(tournamentId, stageId), []), // eslint-disable-line react-hooks/exhaustive-deps
    getMatches: useCallback((tournamentId: string, stageId: string, groupId: string) => getMatches(tournamentId, stageId, groupId), []), // eslint-disable-line react-hooks/exhaustive-deps
    patchMatch: useCallback((tournamentId: string, matchId: string, data: MatchResult[]) => patchMatch(tournamentId, matchId, data), []), // eslint-disable-line react-hooks/exhaustive-deps
  }
}

export default useApi
