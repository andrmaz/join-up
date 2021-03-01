import {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
    GetServerSidePropsContext,
} from 'next'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'
import {parseCookies} from '../app/utils/parseCookies'

const Home: NextPage = ({
    token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <Head>
                <title>Project Zone</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <h2>Home Page</h2>
            <p>{JSON.stringify(token)}</p>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
    //* Get the user's session based on the request
    const {session: token} = parseCookies(context.req)

    if (!token) {
        //* If no user, redirect to login
        return {
            props: {},
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

    //* If there is a user, return the current session
    return {props: {token}}
}
