import type {
  TransactionListInterface,
  TransactionDetailInterface,
} from '@/types/types'

// date format
export const formatDate = (dateString: string): string => {
  const createdDate = new Date(dateString)
  const now = new Date()

  const deltaTime = now.getTime() - createdDate.getTime() // selisih waktu dalam milidetik
  const deltaSeconds = Math.floor(deltaTime / 1000) // konversi ke detik
  const deltaMinutes = Math.floor(deltaSeconds / 60) // konversi ke menit
  const deltaHours = Math.floor(deltaMinutes / 60) // konversi ke jam
  const deltaDays = Math.floor(deltaHours / 24) // konversi ke hari
  const deltaMonths =
    now.getMonth() -
    createdDate.getMonth() +
    12 * (now.getFullYear() - createdDate.getFullYear()) // selisih bulan
  const deltaYears = now.getFullYear() - createdDate.getFullYear() // selisih tahun

  let result: string

  if (deltaYears > 0) {
    result = `Dibuat ${deltaYears} tahun yang lalu`
  } else if (deltaMonths > 0) {
    result = `Dibuat ${deltaMonths} bulan yang lalu`
  } else if (deltaDays > 0) {
    result = `Dibuat ${deltaDays} hari yang lalu`
  } else if (deltaHours > 0) {
    result = `Dibuat ${deltaHours} jam yang lalu`
  } else if (deltaMinutes > 0) {
    result = `Dibuat ${deltaMinutes} menit yang lalu`
  } else {
    result = `baru saja dibuat`
  }

  return result
}

// long format date
export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString) // Mengonversi string menjadi objek Date
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

// format Rupiah
export const formatRupiah = (amount: number): string => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  return formatter.format(amount)
}

// debounce for seacrh history
export function debounce<T extends (...args: string[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Types for the POST request
interface RequestBody {
  recordID: string
  customerName: string
  customerEmail: string
  itemQuantity: number
}

interface ApiResponse {
  success?: boolean
  message?: string
  data?: any
  redirect_url?: string
}

/**
 * Makes a POST request to the backend API
 * @param body - The request body containing record details
 * @returns Promise<ApiResponse> - The API response
 * @throws Error if the request fails
 */
export async function makePostRequest(body: RequestBody): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/token-add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to make request: ${error.message}`)
    }
    throw new Error('An unknown error occurred')
  }
}

// Get List Trasaction user
export async function getTransactionList(
  userId: string,
): Promise<TransactionListInterface> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/transactions-list/${userId}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TransactionListInterface = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to make request: ${error.message}`)
    }
    throw new Error('An unknown error occurred')
  }
}

// Get Detail Trasaction data
export async function getDetailTransaction(
  transaction_id: string,
): Promise<TransactionDetailInterface> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/transactions-view/${transaction_id}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TransactionDetailInterface = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to make request: ${error.message}`)
    }
    throw new Error('An unknown error occurred')
  }
}
