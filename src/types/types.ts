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

export interface InfoTokenCardProps {
  name: string
  tokenLeft: number
  isLoading: boolean
  refreshTokenFunc: () => void
}

interface TransactionData {
  transaction_id: string
  status: string
  quantity: number
  created_at: string
  paid_at: string
  transaction_link?: string
}

interface TransactionDetailData extends TransactionData {
  currency: string
  paid_amount: number
  customer_name: string
  email: string
}

export interface TransactionListInterface {
  success: boolean
  transactions: TransactionData[]
}

export interface TransactionDetailInterface {
  success: boolean
  transaction: TransactionDetailData
}

export interface ResultTranscribeInterface {
  result: Result
}
