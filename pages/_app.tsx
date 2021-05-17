import type {AppProps, NextWebVitalsMetric} from 'next/app'
import dynamic from 'next/dynamic'

import {AuthProvider} from '@providers/AuthProvider'
import {CookiesProvider} from 'react-cookie'

import Navbar from '@components/navigation/Navbar/Navbar'

import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

import 'tailwindcss/tailwind.css'

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  switch (metric.name) {
    case 'FCP':
      // handle FCP results
      if (metric.value > 1000) {
        console.warn(
          `Rendering time needs improvement. It took ${metric.value} ms.`,
          'The time recommended is less than 1000 ms. See more at https://web.dev/fcp/'
        )
      }
      break
    case 'LCP':
      // handle LCP results
      if (metric.value > 2500) {
        console.warn(
          `Loading time needs improvement. It took ${metric.value} ms.`,
          'The time recommended is less than 2500 ms. See more at https://web.dev/lcp/'
        )
      }
      break
    case 'CLS':
      // handle CLS results
      if (metric.value > 0.1) {
        console.warn(
          `Visual Stability needs improvement. The current CLS score is ${metric.value}.`,
          'To provide a good user experience, pages should maintain a CLS of 0.1. or less. See more at https://web.dev/cls/'
        )
      }
      break
    case 'FID':
      // handle FID results
      if (metric.value > 100) {
        console.warn(
          `Interactivity time needs improvement. It took ${metric.value} ms.`,
          'To provide a good user experience, sites should strive to have a First Input Delay of 100 milliseconds or less. See more at https://web.dev/fid/'
        )
      }
      break
    case 'TTFB':
      // handle TTFB results
      if (metric.value > 200) {
        console.warn(
          `Server response time needs improvement. It took ${metric.value} ms.`,
          'Google PageSpeed Insights recommends under 200 ms for server response time. See more at https://web.dev/time-to-first-byte/'
        )
      }
      break
    case 'Next.js-hydration':
      // handle hydration results
      console.info(
        `Length of time it takes for the page to start and finish hydrating: ${metric.value} ms`
      )
      break
    case 'Next.js-route-change-to-render':
      // handle route-change to render results
      console.info(
        `Length of time it takes for a page to start rendering after a route change: ${metric.value} ms`
      )
      break
    case 'Next.js-render':
      // handle render results
      console.info(
        `Length of time it takes for a page to finish render after a route change: ${metric.value} ms`
      )
      break
    default:
      break
  }
}

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
