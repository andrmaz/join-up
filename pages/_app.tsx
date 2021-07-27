import type {AppProps} from 'next/app'
import dynamic from 'next/dynamic'

import {AuthProvider} from '@providers/AuthProvider'
import {FetchProvider} from '@providers/FetchProvider'
import {ProjectProvider} from '@providers/ProjectProvider'
import {PositionProvider} from '@providers/PositionProvider'

import Navbar from '@components/route/Navbar/Navbar'

import {webVitals} from '@utils/vitals'

import 'tailwindcss/tailwind.css'

export const reportWebVitals = webVitals

//* the module will be dynamically loaded by the page in the browser
const DynamicComponent = dynamic(() => import('@components/lib/Root/Root'))

function MyApp({Component, pageProps}: AppProps): React.ReactNode {
  return (
    <AuthProvider>
      <FetchProvider>
        <Navbar />
        <ProjectProvider>
          <PositionProvider>
            <Component {...pageProps} />
            <DynamicComponent />
          </PositionProvider>
        </ProjectProvider>
      </FetchProvider>
    </AuthProvider>
  )
}

export default MyApp
