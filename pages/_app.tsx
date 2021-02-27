import type {AppProps} from 'next/app'

import {AuthProvider} from '../app/contexts/auth'

function MyApp({Component, pageProps}: AppProps): React.ReactNode {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
