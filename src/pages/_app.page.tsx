import '@/shared/styles/global.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import { fetcher } from '@/shared/api/fetcher'
import { Header } from '@/widgets/header'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Header />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
