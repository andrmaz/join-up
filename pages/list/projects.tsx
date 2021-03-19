import {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'

import {ParsedUrlQuery} from 'querystring'

import {parseCookies} from '../../app/utils/parseCookies'
import axios from 'axios'

import Navbar from '../../app/component/Navbar'

import {IProject} from '../../app/type/project'

const Projects: NextPage = ({
    projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className='min-h-screen md:container'>
            <Head>
                <title>Projects</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main className='h-92v py-10 px-28'>
                <section className='w-full h-auto'>
                    <div className='grid grid-flow-col grid-cols-3 grid-rows-3 gap-4 py-2 px-1'>
                        {projects.map((project: IProject) => {
                            const {
                                _id,
                                name,
                                updatedAt,
                                projectURL,
                                description,
                                technologies,
                            } = project
                            return (
                                <div
                                    key={_id}
                                    className='h-48 w-full border-2 border-black p-1 rounded'
                                >
                                    <header className='h-1/6 w-full inline-flex flex-row justify-between'>
                                        <h3>{name}</h3>
                                        <span className='text-xs'>
                                            Last update:
                                            {updatedAt.slice(0, 7)}
                                        </span>
                                    </header>
                                    <article className='h-4/6'>
                                        <span className='text-xs'>
                                            {projectURL}
                                        </span>
                                        <p className='text-sm'>{description}</p>
                                    </article>
                                    <aside className='h-1/6'>
                                        <div className='h-1/2'>
                                            {technologies
                                                .filter((_, index) => index < 3)
                                                .map((technology, index) => {
                                                    return index ===
                                                        project.technologies
                                                            .length -
                                                            1 ? (
                                                        <span
                                                            key={technology}
                                                            className='text-xs'
                                                        >
                                                            {technology}
                                                        </span>
                                                    ) : (
                                                        <span
                                                            key={technology}
                                                            className='text-xs'
                                                        >{`${technology}, `}</span>
                                                    )
                                                })}
                                        </div>
                                    </aside>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Projects

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
                destination: '/user/signin',
                permanent: false,
            },
        }
    }

    const {
        data: {projects},
    } = await axios.get('/project', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    //* If there is a user, return the projects
    return {
        props: {
            projects,
        },
    }
}
