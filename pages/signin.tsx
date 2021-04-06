import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useForm} from 'react-hook-form'

import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {login} from '@actions/authActions'
import Input from '@components/Form/Input'
import ErrorMessage from '@components/Message/Error'
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
      <section className='h-2/5 w-3/6 xl:w-2/6 border border-black rounded py-4 px-10'>
        <header className='h-1/6 text-center'>
          <h1 className='text-3xl'>SignIn</h1>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='h-4/6 flex flex-col justify-between  xl:justify-evenly'
        >
          <Input
            type='email'
            id='email'
            name='email'
            label='Email'
            placeholder='please enter your email'
            register={register({
              required: 'email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'please enter a valid email address',
              },
            })}
            errors={
              errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )
            }
          />
          <Input
            type='password'
            id='password'
            name='password'
            label='Password'
            placeholder='please enter your password'
            register={register({
              required: 'password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'please enter a valid password',
              },
            })}
            errors={
              errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )
            }
          />
          <input
            disabled={Boolean(errors.email || errors.password)}
            type='submit'
            value='SignIn'
            className='h-6 cursor-pointer bg-blue-800 text-white rounded disabled:opacity-50'
          />
        </form>
        <div className='inline-flex justify-between w-full h-1/6 pt-5 lg:text-xs'>
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
