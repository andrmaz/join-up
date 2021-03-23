import {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'
import axios from 'axios'

import {parseCookies} from '@utils/parseCookies'
import {useAuthState} from '@hooks/useAuthState'
import Navbar from '@components/Navbar'
import type {IProjectData} from 'app/types/project'

const Profile: NextPage = ({
    projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <div className='min-h-screen'>
            <Head>
                <title>Profile</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main className='h-92v py-16 px-32 xl:px-48'>
                <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
                    <section className='h-4/5 p-4'>
                        <div className='h-3/6'>
                            <img
                                className='h-full rounded-full'
                                src={avatar}
                                alt='profile'
                            />
                        </div>
                        <div className='h-3/6 flex flex-col justify-around'>
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
                        <header className='w-max h-12 m-auto text-2xl mb-2'>
                            <h3>Projects</h3>
                        </header>
                        <main className='w-full h-auto p-1'>
                            <section>
                                <div className='grid grid-flow-row grid-cols-2 grid-rows-2 gap-2'>
                                    {projects
                                        .filter(
                                            (_: IProjectData, index: number) =>
                                                index < 4
                                        )
                                        .map((project: IProjectData) => {
                                            const {_id, name} = project
                                            return (
                                                <div
                                                    key={_id}
                                                    className='h-40 p-1 border-gray-400 border-2 rounded'
                                                >
                                                    <h3>
                                                        {name.toUpperCase()}
                                                    </h3>
                                                </div>
                                            )
                                        })}
                                </div>
                            </section>
                        </main>
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

    //* If no user, redirect to login
    if (!token) {
        return {
            props: {},
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

    //* If there is a user,
    const {
        data: {projects},
    } = await axios.get('/project/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    //* return user projects
    return {
        props: {
            projects,
        },
    }
}
