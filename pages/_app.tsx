import type {AppProps} from 'next/app'
import dynamic from 'next/dynamic'

import {AuthProvider} from '@providers/AuthProvider'
import {CookiesProvider} from 'react-cookie'
import {ProjectProvider} from '@providers/ProjectProvider'
import {PositionProvider} from '@providers/PositionProvider'

import Navbar from '@components/navigation/Navbar/Navbar'

import {webVitals} from '@utils/webVitals'

import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

import 'tailwindcss/tailwind.css'

export const reportWebVitals = webVitals

//* the module will be dynamically loaded by the page in the browser
const DynamicComponent = dynamic(() => import('@components/screen/Root/Root'))

function MyApp({Component, pageProps}: AppProps): React.ReactNode {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Navbar />
        <ProjectProvider>
          <PositionProvider>
            <Component {...pageProps} />
            <DynamicComponent />
          </PositionProvider>
        </ProjectProvider>
      </AuthProvider>
    </CookiesProvider>
  )
}

export default MyApp
