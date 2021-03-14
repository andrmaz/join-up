/* eslint-disable jsx-a11y/no-onchange */
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'

import {useAuthDispatch} from '../app/contexts/auth'
import axios from 'axios'
import {useCookies} from 'react-cookie'

import {useForm} from 'react-hook-form'

import {ISignupInputs} from '../app/types/user'

const SignUp = ({
    technologies,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
    const {register, handleSubmit, watch, errors} = useForm<ISignupInputs>({
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie] = useCookies(['session'])
    const onSubmit = (data: ISignupInputs): void => {
        axios
            .post('/user/register', {user: data})
            .then(res => {
                if (res.status === 201) {
                    dispatch({type: 'login', payload: res.data.user})
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
            <section className='h-5/6 w-4/5 border border-black rounded p-4'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col h-5/6 justify-between'
                >
                    <article className='w-full h-2/4 flex'>
                        <div className='w-3/6 flex flex-col'>
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
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
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
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
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
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
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
                                /* pattern={`^${inputEl?.current?.value}$`} */
                                ref={register({
                                    validate: value =>
                                        value === watchPassword ||
                                        'passwords must match',
                                })}
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
                            />
                            {errors.confirmPassword && (
                                <div role='alert' className='text-red-500'>
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </div>
                        <div className='w-3/6 flex flex-col'>
                            <label htmlFor='githubURL'>GitHub:</label>
                            <input
                                type='text'
                                id='githubURL'
                                name='githubURL'
                                size={30}
                                placeholder='your GitHub username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
                            />
                            <label htmlFor='gitlabURL'>GitLab:</label>
                            <input
                                type='text'
                                id='gitlabURL'
                                name='gitlabURL'
                                size={30}
                                placeholder='your GitLab username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
                            />
                            <label htmlFor='bitbucketURL'>BitBucket:</label>
                            <input
                                type='text'
                                id='bitbucketURL'
                                name='bitbucketURL'
                                size={30}
                                placeholder='your BitBucket username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
                            />
                            <label htmlFor='linkedinURL'>LinkedIn:</label>
                            <input
                                type='text'
                                id='linkedinURL'
                                name='linkedinURL'
                                size={30}
                                placeholder='your LinkedIn username here'
                                className='focus:outline-none focus:ring focus:border-blue-300 p-0.5 mr-2'
                            />
                        </div>
                    </article>
                    <article className='h-1/4 w-full flex mb-4'>
                        <div className='w-3/6 flex flex-col m-auto p-2'>
                            <label htmlFor='languages'>
                                Languages (use ctrl key):
                            </label>
                            <select
                                id='languages'
                                name='languages'
                                multiple={true}
                                size={6}
                                ref={register({
                                    required:
                                        'please select at least one language',
                                })}
                            >
                                <option value='english'>English</option>
                                <option value='spanish'>Spanish</option>
                                <option value='french'>French</option>
                                <option value='italian'>Italian</option>
                                <option value='mandarin'>Mandarin</option>
                                <option value='hindi'>Hindi</option>
                                <option value='arabic'>Arabic</option>
                                <option value='bengali'>Bengali</option>
                                <option value='russian'>Russian</option>
                                <option value='portuguese'>Portuguese</option>
                                <option value='indonesian'>Indonesian</option>
                            </select>
                            {errors.languages && (
                                <div role='alert' className='text-red-500'>
                                    {errors.languages.message}
                                </div>
                            )}
                        </div>
                        <div className='w-3/6 flex flex-col m-auto p-2'>
                            <label htmlFor='technologies'>
                                Technologies (use ctrl key):
                            </label>
                            <select
                                id='technologies'
                                name='technologies'
                                multiple={true}
                                size={6}
                                ref={register({
                                    required:
                                        'please select at least one technology',
                                })}
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
                    </article>
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
                        className=':resize-none'
                    />
                    <input
                        type='submit'
                        value='SignUp'
                        className='cursor-pointer bg-blue-800 text-white'
                        disabled={Boolean(
                            errors.username ||
                                errors.email ||
                                errors.password ||
                                errors.confirmPassword ||
                                errors.languages ||
                                errors.technologies
                        )}
                    />
                </form>
                <aside className='h-1/6 pt-20'>
                    <Link href='/signin'>
                        <a>Already have an account? SignIn</a>
                    </Link>
                </aside>
            </section>
        </div>
    )
}

export default SignUp

export const getServerSideProps: GetServerSideProps = async () => {
    const {
        data: {technologies},
    } = await axios.get('/technology')

    return {
        props: {
            technologies,
        },
    }
}
