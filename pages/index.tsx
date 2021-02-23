import {NextPage} from 'next'
import Head from 'next/head'

import {AuthProvider} from '../app/contexts/auth'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type Props = Record<string, never>

const Home: NextPage<Props> = () => {
    return (
        <AuthProvider>
            <div>
                <Head>
                    <title>Project Zone</title>
                    <link rel='icon' href='/favicon.ico' />
                </Head>

                <main></main>

                <footer></footer>
            </div>
        </AuthProvider>
    )
}

export default Home
