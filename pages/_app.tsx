import 'tailwindcss/tailwind.css'

import * as React from 'react'

import type {AppProps} from 'next/app'
import Navbar from '@components/Navbar/Navbar'
import {PositionProvider} from '@providers/PositionProvider'
import {ProjectProvider} from '@providers/ProjectProvider'
import {Session} from 'next-auth'
import {SessionProvider} from 'next-auth/react'
import {SnackbarProvider} from '@providers/SnackbarProvider'
import dynamic from 'next/dynamic'
import {trpc} from '../app/utils/trpc'
import {webVitals} from '@utils/vitals'

export const reportWebVitals = webVitals

//* the module will be dynamically loaded by the page in the browser
const DynamicComponent = dynamic(() => import('@lib/Root/Root'))

function MyApp({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps<{session: Session}>): React.ReactElement {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <ProjectProvider>
        <PositionProvider>
          <SnackbarProvider>
            <Component {...pageProps} />
            <DynamicComponent />
          </SnackbarProvider>
        </PositionProvider>
      </ProjectProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
