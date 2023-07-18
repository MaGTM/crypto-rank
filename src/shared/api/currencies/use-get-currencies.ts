import useSWR from 'swr'

export interface ICurrency {
  id: number
  slug: string
  symbol: string
  name: string
  type: string
  category: string
  rank: number
  volume24hBase: number
  circulatingSupply: number
  totalSupply: number
  maxSupply: number
  lastUpdated: string
  values: {
    USD: {
      price: number
    }
  }
  images: {
    '60x60': string
    '16x16': string
  }
}

export const useGetCurrencies = () => {
  const { data, error, isLoading } = useSWR<ICurrency[]>(
    `currencies?optionalFields=images`,
  )

  return {
    currencies: data,
    isLoading,
    isError: error,
  }
}
