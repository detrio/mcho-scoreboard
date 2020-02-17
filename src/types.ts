export enum ClockStatus {
  READY = 0,
  RUNNING = 1,
  STOPPED = 2,
}

export enum FencerSide {
  Right = 'right',
  Left = 'left',
}

export interface Logo {
  logo_large: string
  logo_medium: string
  logo_small: string
  original: string
}

export interface Tournament {
  id: string
  country: string | null
  discipline: string
  full_name: string | null
  location: string | null
  logo: Logo | null
  name: string
  online: boolean
  platforms: string[]
  public: boolean
  registration_closing_datetime: null
  registration_enabled: boolean
  registration_opening_datetime: null
  scheduled_date_end: string | null
  scheduled_date_start: string | null
  size: number
  status: string
  timezone: string
}

export interface StageSettings {
  arrival: string
  departure: string
  group_naming: string
  nb_groups: number
  pairing_method: string
  round_naming: string
  size: number
}

export interface Stage {
  closed: boolean
  id: string
  name: string
  number: number
  type: string
  settings: StageSettings
}

export interface Group {
  id: string
  stage_id: string
  number: number
  name: string
  closed: boolean
}

export type MatchOutcome = 'win' | 'loss' | 'draw'

export interface Fencer {
  number: number
  position: number
  participant: {
    id: string
    name: string
  }
  result: MatchOutcome
  score: number
  forfeit: boolean
}

export interface Match {
  id: string
  stage_id: string
  group_id: string
  number: number
  type:string
  status: string
  opponents : Fencer[]
}

export interface MatchResult {
  score: number
  result: MatchOutcome
}
