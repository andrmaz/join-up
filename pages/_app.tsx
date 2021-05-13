import type {AppProps} from 'next/app'
import dynamic from 'next/dynamic'

import {AuthProvider} from '@providers/AuthProvider'
import {CookiesProvider} from 'react-cookie'

import Navbar from '@components/navigation/Navbar/Navbar'

import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

import 'tailwindcss/tailwind.css'

//* the module will be dynamically loaded by the page in the browser
const DynamicComponent = dynamic(
  () => import('@components/containers/Root/Modal')
)

function MyApp({Component, pageProps}: AppProps): React.ReactNode {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
        <DynamicComponent />
      </AuthProvider>
    </CookiesProvider>
  )
}

export default MyApp
