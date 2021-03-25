import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useForm} from 'react-hook-form'

import {useAuthDispatch} from '@hooks/useAuthDispatch'
import {login} from '@actions/authActions'
import type {SigninInputs} from 'app/types/user'

const SignIn = (): JSX.Element => {
  const {register, handleSubmit, errors} = useForm<SigninInputs>({
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
  const dispatch = useAuthDispatch()
  const [, setCookie] = useCookies(['session'])
  const onSubmit = (data: SigninInputs): void => {
    axios
      .post('/user/login', {user: data})
      .then(res => {
        if (res.status === 200) {
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
        <title>SignIn</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className='h-2/6 lg:w-4/6 xl:w-3/6 border border-black rounded py-4 px-16 xl:px-10'>
        <header className='h-1/6 text-center'>
          <h1 className='text-3xl'>SignIn</h1>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='h-4/6 flex flex-col justify-between'
        >
          <div className='flex flex-col'>
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
              className='focus:outline-none focus:ring focus:border-blue-300 border-2 border-black p-1 rounded'
            />
            {errors.email && (
              <div role='alert' className='text-red-500'>
                {errors.email.message}
              </div>
            )}
          </div>
          <div className='flex flex-col'>
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
              className='focus:outline-none focus:ring focus:border-blue-300 border-2 border-black p-1 rounded'
            />
            {errors.password && (
              <div role='alert' className='text-red-500'>
                {errors.password.message}
              </div>
            )}
          </div>
          <input
            disabled={Boolean(errors.email || errors.password)}
            type='submit'
            value='SignIn'
            className='h-8 cursor-pointer bg-blue-800 text-white rounded'
          />
        </form>
        <div className='inline-flex justify-between w-full h-1/6 pt-5'>
          <Link href='/signup'>
            <a>Do not have an account? SignUp</a>
          </Link>
          <span className='text-right'>Forgot your password?</span>
        </div>
      </section>
    </div>
  )
}

export default SignIn
