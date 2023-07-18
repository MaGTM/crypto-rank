import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
})

export const fetcher = (url: string) => api.get(url).then((res) => res.data.data)
