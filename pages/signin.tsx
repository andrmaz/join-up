import Head from 'next/head'
import Link from 'next/link'
import {useAuthDispatch} from '../app/contexts/auth'
import {useRouter} from 'next/router'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useForm} from 'react-hook-form'

import {SigninInputs} from '../app/types/user'

const SignIn = (): JSX.Element => {
    const {register, handleSubmit, errors} = useForm<SigninInputs>()

    const router = useRouter()
    const dispatch = useAuthDispatch()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie] = useCookies(['session'])
    /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState((previousState: typeof state) => {
            return {...previousState, [event.target.name]: event.target.value}
        })
    } */
    const onSubmit = (data: SigninInputs): void => {
        //event.preventDefault()
        console.dir(data)
        axios
            .post('/user/login', {user: data})
            .then(res => {
                if (res.status === 200) {
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
                <title>SignIn</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <section className='h-2/6 w-3/5 border border-black rounded p-12'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='h-4/5 flex flex-col justify-between'
                >
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        size={30}
                        placeholder='please enter your email'
                        ref={register({
                            required: 'email is required',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'please enter a valid email address',
                            },
                        })}
                        className='focus:outline-none focus:ring focus:border-blue-300'
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
                        placeholder='please enter your password'
                        ref={register({
                            required: 'password is required',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'please enter a valid password',
                            },
                        })}
                        className='focus:outline-none focus:ring focus:border-blue-300'
                    />
                    {errors.password && (
                        <div role='alert' className='text-red-500'>
                            {errors.password.message}
                        </div>
                    )}
                    <input
                        disabled={Boolean(errors.email || errors.password)}
                        type='submit'
                        value='SignIn'
                        className='cursor-pointer bg-blue-800 text-white'
                    />
                </form>
                <div className='h-1/5 pt-5'>
                    <Link href='/signup'>
                        <a>Do not have an account? SignUp</a>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default SignIn
