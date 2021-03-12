import {NextPage, GetServerSideProps, GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'
import {parseCookies} from '../app/utils/parseCookies'

import {useAuthState} from '../app/contexts/auth'

import Navbar from '../app/components/Navbar'

const Profile: NextPage = () => {
    const {user} = useAuthState()
    const {
        avatar,
        username,
        email,
        bio,
        languages,
        technologies,
        bitbucketURL,
        githubURL,
        gitlabURL,
        linkedinURL,
    } = {...user}
    return (
        <div className='min-h-screen md:container'>
            <Head>
                <title>Profile</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main className='h-92v p-20'>
                <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
                    <section className='h-4/5 p-4'>
                        <div className='h-2/5'>
                            <img
                                className='w-5/6 rounded-full'
                                src={avatar}
                                alt='profile'
                            />
                        </div>
                        <div className='h-3/5 flex flex-col justify-around'>
                            <span>{username}</span>
                            <span>{email}</span>
                            <p>{bio}</p>
                            <div>
                                {languages?.map((language, index) => {
                                    {
                                        return index ===
                                            languages.length - 1 ? (
                                            <span key={language}>
                                                {language}
                                            </span>
                                        ) : (
                                            <span
                                                key={language}
                                            >{`${language}, `}</span>
                                        )
                                    }
                                })}
                            </div>
                            <div>
                                {technologies?.map((technology, index) => {
                                    {
                                        return index ===
                                            technologies.length - 1 ? (
                                            <span key={technology}>
                                                {technology}
                                            </span>
                                        ) : (
                                            <span
                                                key={technology}
                                            >{`${technology}, `}</span>
                                        )
                                    }
                                })}
                            </div>
                            <span>{bitbucketURL}</span>
                            <span>{githubURL}</span>
                            <span>{gitlabURL}</span>
                            <span>{linkedinURL}</span>
                        </div>
                    </section>
                    <article className='w-200 h-full border-2 border-solid rounded'>
                        <div className='w-max h-12 m-auto'>
                            <h1>Activities</h1>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    )
}

export default Profile

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
    return {props: {}}
}
