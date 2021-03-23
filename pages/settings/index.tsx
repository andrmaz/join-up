import {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {ParsedUrlQuery} from 'querystring'
import axios from 'axios'
import Select from 'react-select'
import {useForm, Controller} from 'react-hook-form'

import {parseCookies} from '@utils/parseCookies'
//import {useAuthDispatch} from '@hooks/useAuthDispatch'
import {useAuthState} from '@hooks/useAuthState'
import Navbar from '@components/Navbar'
import type {IUserContext} from 'app/types/user'

import {languages} from '@data/languagesOptions'

const Profile: NextPage = ({
    technologies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {user} = useAuthState()
    const {
        avatar,
        username,
        email,
        bio,
        bitbucketURL,
        githubURL,
        gitlabURL,
        linkedinURL,
    } = {...user}
    const {
        register,
        handleSubmit,
        errors,
        control,
        setValue,
    } = useForm<IUserContext>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: true,
    })
    const router = useRouter()
    //const dispatch = useAuthDispatch()
    const onSubmit = (data: IUserContext): void => console.log(data)
    return (
        <div className='min-h-screen'>
            <Head>
                <title>Settings</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main className='h-auto py-12 px-32 xl:px-48'>
                <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
                    <section className='h-4/5 p-4'>
                        <article className='h-3/5 flex flex-col'>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Account Settings</span>
                            </div>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Profile</span>
                            </div>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Account</span>
                            </div>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Emails</span>
                            </div>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Notifications</span>
                            </div>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Security Logs</span>
                            </div>
                        </article>
                        <article className='h-2/5 flex flex-col'>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Moderation settings</span>
                            </div>
                            <div className='h-12 border-gray-400 border-2 p-2'>
                                <span>Blocked users</span>
                            </div>
                        </article>
                    </section>
                    <section className='w-200 h-auto border-2 border-solid rounded'>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='flex flex-col h-full justify-between p-1'
                        >
                            <article className='h-14/20 flex flex-col justify-around'>
                                <div className='flex flex-row'>
                                    <div className='w-3/5'>
                                        <div className='flex flex-col xl:justify-between'>
                                            <label htmlFor='username'>
                                                Username:
                                            </label>
                                            <input
                                                type='text'
                                                id='username'
                                                name='username'
                                                size={30}
                                                defaultValue={username}
                                                placeholder='please enter your username'
                                                ref={register({
                                                    required:
                                                        'username is required',
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            'username must be at least 3 characters long',
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        message:
                                                            'username must be at most 20 characters long',
                                                    },
                                                })}
                                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-gray-400 rounded'
                                            />
                                            {errors.username && (
                                                <div
                                                    role='alert'
                                                    className='text-red-500'
                                                >
                                                    {errors.username.message}
                                                </div>
                                            )}
                                            <label htmlFor='email'>
                                                Email:
                                            </label>
                                            <input
                                                type='email'
                                                id='email'
                                                name='email'
                                                size={30}
                                                defaultValue={email}
                                                placeholder='address@email.domain'
                                                ref={register({
                                                    required:
                                                        'email is required',
                                                    pattern: {
                                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                        message:
                                                            'please enter a valid email address',
                                                    },
                                                })}
                                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-gray-400 rounded'
                                            />
                                            {errors.email && (
                                                <div
                                                    role='alert'
                                                    className='text-red-500'
                                                >
                                                    {errors.email.message}
                                                </div>
                                            )}
                                            <label htmlFor='githubURL'>
                                                GitHub:
                                            </label>
                                            <input
                                                type='text'
                                                id='githubURL'
                                                name='githubURL'
                                                size={30}
                                                defaultValue={githubURL}
                                                placeholder='your GitHub username here'
                                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-gray-400 rounded'
                                            />
                                            <label htmlFor='gitlabURL'>
                                                GitLab:
                                            </label>
                                            <input
                                                type='text'
                                                id='gitlabURL'
                                                name='gitlabURL'
                                                size={30}
                                                defaultValue={gitlabURL}
                                                placeholder='your GitLab username here'
                                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-gray-400 rounded'
                                            />
                                            <label htmlFor='bitbucketURL'>
                                                BitBucket:
                                            </label>
                                            <input
                                                type='text'
                                                id='bitbucketURL'
                                                name='bitbucketURL'
                                                size={30}
                                                defaultValue={bitbucketURL}
                                                placeholder='your BitBucket username here'
                                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-gray-400 rounded'
                                            />
                                            <label htmlFor='linkedinURL'>
                                                LinkedIn:
                                            </label>
                                            <input
                                                type='text'
                                                id='linkedinURL'
                                                name='linkedinURL'
                                                defaultValue={linkedinURL}
                                                size={30}
                                                placeholder='your LinkedIn username here'
                                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-gray-400 rounded'
                                            />
                                        </div>
                                    </div>
                                    <div className='w-2/5'>
                                        <div className='xl:h-3/4 lg:h-2/4 lg:mt-8'>
                                            <img
                                                className='h-full rounded-full'
                                                src={avatar}
                                                alt='profile'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label id='languages' htmlFor='languages'>
                                        Languages :
                                    </label>
                                    <Controller
                                        name='languages'
                                        defaultValue=''
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    'Please select at least one language',
                                            },
                                        }}
                                        render={({value, onBlur}) => (
                                            <Select
                                                id='selectLanguages'
                                                inputId='languages'
                                                name='languages'
                                                aria-labelledby='languages'
                                                defaultValue={value}
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={languages}
                                                placeholder='Select your language'
                                                blurInputOnSelect={false}
                                                onBlur={onBlur}
                                                onChange={values => {
                                                    setValue(
                                                        'languages',
                                                        values.map(
                                                            value => value.label
                                                        ),
                                                        {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        }
                                                    )
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.languages && (
                                        <div
                                            role='alert'
                                            className='text-red-500'
                                        >
                                            {errors.languages.message}
                                        </div>
                                    )}
                                </div>
                                <div className='flex flex-col p-1'>
                                    <label
                                        id='technologies'
                                        htmlFor='technologies'
                                    >
                                        Technologies :
                                    </label>
                                    <Controller
                                        name='technologies'
                                        defaultValue=''
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    'Please select at least one technology',
                                            },
                                        }}
                                        render={({value, onBlur}) => (
                                            <Select
                                                id='searchTechnologies'
                                                inputId='technologies'
                                                name='technologies'
                                                aria-labelledby='technologies'
                                                defaultValue={value}
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={technologies}
                                                placeholder='Choose your tech stack'
                                                blurInputOnSelect={false}
                                                onBlur={onBlur}
                                                onChange={values => {
                                                    setValue(
                                                        'technologies',
                                                        values.map(
                                                            value => value.label
                                                        ),
                                                        {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        }
                                                    )
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.technologies && (
                                        <div
                                            role='alert'
                                            className='text-red-500'
                                        >
                                            {errors.technologies.message}
                                        </div>
                                    )}
                                </div>
                            </article>
                            <article className='h-1/5'>
                                <div className='h-full flex flex-col mt-8'>
                                    <label htmlFor='bio'>Biography:</label>
                                    <textarea
                                        id='bio'
                                        name='bio'
                                        cols={5}
                                        rows={10}
                                        maxLength={100}
                                        placeholder='Tell us your story'
                                        defaultValue={bio}
                                        spellCheck={true}
                                        wrap='hard'
                                        className=':resize-none p-1 border-2'
                                    />
                                </div>
                            </article>
                            <aside className='h-1/10 flex flex-row items-end justify-evenly p-2'>
                                <button
                                    type='button'
                                    className='w-2/6 h-2/5 cursor-pointer bg-gray-600 text-white rounded'
                                    onClick={() => router.push('/')}
                                >
                                    Cancel
                                </button>
                                <input
                                    type='submit'
                                    value='Save'
                                    className='w-2/6 h-2/5 cursor-pointer bg-green-600 text-white rounded'
                                    disabled={Boolean(
                                        errors.username ||
                                            errors.email ||
                                            errors.languages ||
                                            errors.technologies
                                    )}
                                />
                            </aside>
                        </form>
                    </section>
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
        data: {technologies},
    } = await axios.get('/technology', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    //* return user technologies
    return {
        props: {
            technologies,
        },
    }
}
