import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'

import axios from 'axios'
import {useCookies} from 'react-cookie'
import Select from 'react-select'
import {useForm, Controller} from 'react-hook-form'

import {useAuthDispatch} from '@hooks/useAuthDispatch'
import {login} from '@actions/authActions'
import type {ISignupInputs} from 'app/types/user'

const SignUp = ({
    technologies,
    languages,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
    const {
        register,
        handleSubmit,
        watch,
        errors,
        control,
        setValue,
    } = useForm<ISignupInputs>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: true,
    })
    const watchPassword = watch('password')
    const router = useRouter()
    const dispatch = useAuthDispatch()
    const [, setCookie] = useCookies(['session'])
    const onSubmit = (data: ISignupInputs): void => {
        axios
            .post('/user/register', {user: data})
            .then(res => {
                if (res.status === 201) {
                    login(dispatch, res.data.user)
                    setCookie('session', res.data.token, {
                        path: '/',
                        // ? expiration date
                        //maxAge: 3600, // Expires after 1hr
                        sameSite: true,
                        //httpOnly: true,
                        //secure: true,
                    })
                    router.push('/')
                } else {
                    console.log(res.data.error)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='h-screen container flex justify-center items-center'>
            <Head>
                <title>SignUp</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <section className='lg:h-18/20 xl:h-4/5 w-4/5 border border-black rounded p-2'>
                <header className='h-1/10 text-center'>
                    <h1 className='text-3xl'>SignUp</h1>
                </header>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col h-18/20 justify-between'
                >
                    <article className='w-full h-2/4 lg:h-1/2 flex'>
                        <div className='w-3/6 flex flex-col xl:justify-between'>
                            <label htmlFor='username'>Username:</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                size={30}
                                placeholder='please enter your username'
                                ref={register({
                                    required: 'username is required',
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
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                            {errors.username && (
                                <div role='alert' className='text-red-500'>
                                    {errors.username.message}
                                </div>
                            )}
                            <label htmlFor='email'>Email:</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                size={30}
                                placeholder='address@email.domain'
                                ref={register({
                                    required: 'email is required',
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message:
                                            'please enter a valid email address',
                                    },
                                })}
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                            {errors.email && (
                                <div role='alert' className='text-red-500'>
                                    {errors.email.message}
                                </div>
                            )}
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                size={30}
                                placeholder='min. 8 char, mix letters and numbers'
                                ref={register({
                                    required: 'password is required',
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message:
                                            'please enter a valid password',
                                    },
                                })}
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                            {errors.password && (
                                <div role='alert' className='text-red-500'>
                                    {errors.password.message}
                                </div>
                            )}
                            <label htmlFor='confirmPassword'>
                                Confirm Password:
                            </label>
                            <input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                size={30}
                                placeholder='please confirm your password'
                                ref={register({
                                    validate: value =>
                                        value === watchPassword ||
                                        'passwords must match',
                                })}
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                            {errors.confirmPassword && (
                                <div role='alert' className='text-red-500'>
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </div>
                        <div className='w-3/6 flex flex-col xl:justify-between'>
                            <label htmlFor='githubURL'>GitHub:</label>
                            <input
                                type='text'
                                id='githubURL'
                                name='githubURL'
                                size={30}
                                placeholder='your GitHub username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                            <label htmlFor='gitlabURL'>GitLab:</label>
                            <input
                                type='text'
                                id='gitlabURL'
                                name='gitlabURL'
                                size={30}
                                placeholder='your GitLab username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                            <label htmlFor='bitbucketURL'>BitBucket:</label>
                            <input
                                type='text'
                                id='bitbucketURL'
                                name='bitbucketURL'
                                size={30}
                                placeholder='your BitBucket username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                            <label htmlFor='linkedinURL'>LinkedIn:</label>
                            <input
                                type='text'
                                id='linkedinURL'
                                name='linkedinURL'
                                size={30}
                                placeholder='your LinkedIn username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2 border-2 border-black rounded'
                            />
                        </div>
                    </article>
                    <article className='h-1/3 lg:h-1/5 w-full flex'>
                        <div className='w-3/6 flex flex-col m-auto p-1'>
                            <label id='languages' htmlFor='languages'>
                                Languages :
                            </label>
                            <Controller
                                name='languages'
                                control={control}
                                defaultValue=''
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
                                <div role='alert' className='text-red-500'>
                                    {errors.languages.message}
                                </div>
                            )}
                        </div>
                        <div className='w-3/6 flex flex-col m-auto p-1'>
                            <label id='technologies' htmlFor='technologies'>
                                Technologies :
                            </label>
                            <Controller
                                name='technologies'
                                control={control}
                                defaultValue=''
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
                                <div role='alert' className='text-red-500'>
                                    {errors.technologies.message}
                                </div>
                            )}
                        </div>
                    </article>
                    <article className='h-2/3 lg:h-3/20 flex flex-col'>
                        <div className='h-full flex flex-col'>
                            <label htmlFor='bio'>Biography:</label>
                            <textarea
                                id='bio'
                                name='bio'
                                cols={5}
                                rows={10}
                                maxLength={100}
                                placeholder='Tell us your story'
                                spellCheck={true}
                                wrap='hard'
                                className=':resize-none p-1 border-2'
                            />
                        </div>
                    </article>
                    <article className='lg:h-1/20'>
                        <aside className='flex flex-wrap h-1/3 content-center justify-between'>
                            <input
                                type='submit'
                                value='SignUp'
                                className='w-2/6 cursor-pointer bg-blue-800 text-white rounded'
                                disabled={Boolean(
                                    errors.username ||
                                        errors.email ||
                                        errors.password ||
                                        errors.confirmPassword ||
                                        errors.languages ||
                                        errors.technologies
                                )}
                            />
                            <Link href='/signin'>
                                <a className='text-lg'>
                                    Already have an account ? SignIn
                                </a>
                            </Link>
                        </aside>
                    </article>
                </form>
            </section>
        </div>
    )
}

export default SignUp

export const getServerSideProps: GetServerSideProps = async () => {
    const {
        data: {technologies},
    } = await axios.get('/technology')
    const {
        data: {languages},
    } = await axios.get('/language')

    return {
        props: {
            technologies,
            languages,
        },
    }
}
