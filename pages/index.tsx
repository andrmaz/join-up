import {NextPage} from 'next'
import Head from 'next/head'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type Props = Record<string, never>

const Home: NextPage<Props> = () => {
    return (
            <div>
                <Head>
                    <title>Project Zone</title>
                    <link rel='icon' href='/favicon.ico' />
                </Head>

                <main></main>

                <footer></footer>
            </div>
    )
}

export default Home
