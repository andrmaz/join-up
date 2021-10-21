import 'tailwindcss/tailwind.css'

import type {AppProps} from 'next/app'
import {AuthProvider} from '@providers/AuthProvider'
import {FetchProvider} from '@providers/FetchProvider'
import Navbar from '@components/route/Navbar/Navbar'
import {PositionProvider} from '@providers/PositionProvider'
import {ProjectProvider} from '@providers/ProjectProvider'
import {SnackbarProvider} from '@providers/SnackbarProvider'
import dynamic from 'next/dynamic'
import {webVitals} from '@utils/vitals'

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
            <SnackbarProvider>
              <Component {...pageProps} />
              <DynamicComponent />
            </SnackbarProvider>
          </PositionProvider>
        </ProjectProvider>
      </FetchProvider>
    </AuthProvider>
  )
}

export default MyApp
