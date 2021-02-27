import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

const Home: NextPage = ({
    session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <Head>
                <title>Project Zone</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <h2>Home Page</h2>
            <p>{session}</p>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    // Get the user's session based on the request
    const session = res.headersSent

    if (!session) {
        // If no user, redirect to login
        return {
            props: {},
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

    // If there is a user, return the current session
    return {props: {session}}
}
