import {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'

interface Props {}

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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const response = await fetch('')
    const data = await response.json()
    return {
        props: {},
    }
}
