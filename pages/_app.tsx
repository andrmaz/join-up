import type {AppProps} from 'next/app'

import {AuthProvider} from '@providers/AuthProvider'
import {CookiesProvider} from 'react-cookie'

import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

import 'tailwindcss/tailwind.css'

function MyApp({Component, pageProps}: AppProps): React.ReactNode {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CookiesProvider>
  )
}

export default MyApp
