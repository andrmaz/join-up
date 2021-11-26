import 'tailwindcss/tailwind.css'

import {QueryClient, QueryClientProvider} from 'react-query'

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

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps): React.ReactNode {
  return (
    <AuthProvider>
      <FetchProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <ProjectProvider>
            <PositionProvider>
              <SnackbarProvider>
                <Component {...pageProps} />
                <DynamicComponent />
              </SnackbarProvider>
            </PositionProvider>
          </ProjectProvider>
        </QueryClientProvider>
      </FetchProvider>
    </AuthProvider>
  )
}

export default MyApp
