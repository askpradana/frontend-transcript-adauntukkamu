export interface Word {
  id: number
  start: number
  end: number
  text: string
}

export interface HistoryItemInterface {
  collectionId: string
  collectionName: string
  created: string
  duration: number
  id: string
  language: string
  owner: string
  task: string
  text: string
  updated: string
  words: Word[]
}

export interface Result {
  fullTranscription: string
  duration: number
  language: string
  words: Word[]
}

export interface ResultTranscribeInterface {
  result: Result
}
