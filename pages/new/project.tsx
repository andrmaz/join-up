import {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {ParsedUrlQuery} from 'querystring'
import {parseCookies} from '../../app/utils/parseCookies'

import axios from 'axios'

import {useForm} from 'react-hook-form'

import Navbar from '../../app/component/Navbar'
import {useAuthState} from '../../app/hook/useAuthState'

import {INewProject} from '../../app/type/project'

const Project: NextPage = ({
    technologies,
    token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {user} = useAuthState()
    const {avatar, username} = {...user}
    const {register, handleSubmit, errors} = useForm<INewProject>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: true,
    })
    const router = useRouter()
    const onSubmit = (data: INewProject): void => {
        axios
            .post(
                '/project',
                {
                    project: data,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                console.log(response)
                router.push('/')
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <div className='min-h-screen'>
            <Head>
                <title>New</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main className='h-92v container flex justify-center items-center'>
                <section className='w-3/5 h-5/6 p-4 border rounded'>
                    <header className='h-1/6'>
                        <h1 className='h-2/3 text-3xl'>Create a new project</h1>
                        <span>
                            Please fill out this form to start creating a new
                            project
                        </span>
                    </header>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col h-5/6 justify-evenly'
                    >
                        <div className='h-1/6 flex flex-col'>
                            <label htmlFor='owner'>Owner: </label>
                            <div className='flex flex-row'>
                                <div className='h-full pr-1'>
                                    <img
                                        src={avatar}
                                        alt='user'
                                        className='w-6 rounded-full'
                                    />
                                </div>
                                <select
                                    id='owner'
                                    name='owner'
                                    className='md:w-auto'
                                    ref={register({required: true})}
                                >
                                    <option value={username}>{username}</option>
                                </select>
                            </div>
                        </div>
                        <div className='h-1/6 flex flex-col'>
                            <label htmlFor='title'>Name: </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='choose a unique name for your project'
                                ref={register({
                                    required: 'project name is required',
                                })}
                                className='border-gray-400 border-2 rounded p-1'
                            />
                            {errors.name && (
                                <div role='alert' className='text-red-500'>
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className='h-1/6 flex flex-col'>
                            <label htmlFor='description'>
                                Description: (optional)
                            </label>
                            <input
                                type='text'
                                id='description'
                                name='description'
                                placeholder='a brief description will help us others find your project'
                                ref={register}
                                className='border-gray-400 border-2 rounded p-1'
                            />
                        </div>
                        <div className='h-1/6 flex flex-col mb-6'>
                            <label htmlFor='technologies'>
                                Technologies (use ctrl key):
                            </label>
                            <select
                                id='technologies'
                                name='technologies'
                                multiple={true}
                                size={4}
                                ref={register({
                                    required:
                                        'please select at least one technology',
                                })}
                                className='border-gray-400 border-2 rounded p-1'
                            >
                                {technologies.map(
                                    (technology: {
                                        _id: string
                                        name: string
                                    }): JSX.Element => (
                                        <option
                                            key={technology._id}
                                            value={technology.name}
                                        >
                                            {technology.name}
                                        </option>
                                    )
                                )}
                            </select>
                            {errors.technologies && (
                                <div role='alert' className='text-red-500'>
                                    {errors.technologies.message}
                                </div>
                            )}
                        </div>
                        <div className='h-1/6 flex flex-col'>
                            <label htmlFor='projectURL'>Url: (optional)</label>
                            <input
                                id='projectURL'
                                name='projectURL'
                                type='url'
                                pattern='https://.*'
                                placeholder='connect this to an existing project'
                                ref={register}
                                className='border-gray-400 border-2 rounded p-1'
                            />
                        </div>
                        <div className='h-1/6 flex flex-col pt-6'>
                            <input
                                type='submit'
                                value='Create Project'
                                className='w-2/6 bg-green-800 text-white rounded'
                            />
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default Project

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
        data: {technologies},
    } = await axios.get('/technology')

    //* If there is a user, return the technologies
    return {
        props: {
            technologies,
            token,
        },
    }
}
