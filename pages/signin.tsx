import Head from 'next/head'
import Link from 'next/link'

import {useForm} from 'react-hook-form'
import useUserLogin from '@hooks/user/useUserLogin'

import Container from '@components/containers/Container/Container'
import FormInput from '@components/form/Input/Form'
import {SubmitButton} from '@components/form/Button/Submit'

import type {SigninInputs} from 'app/types/user'

const SignIn = (): JSX.Element => {
  const {register, handleSubmit, errors} = useForm<SigninInputs>()
  const onSubmit = useUserLogin()
  return (
    <Container>
      <Head>
        <title>SignIn</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='h-92v container flex justify-center items-center'>
        <section className='h-2/5 w-3/6 xl:w-2/6 border border-black rounded py-4 px-10'>
          <header className='h-1/6 text-center'>
            <h1 className='text-3xl'>SignIn</h1>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='h-4/6 flex flex-col justify-between  xl:justify-evenly'
          >
            <FormInput
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
              errors={errors}
            />
            <FormInput
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
              errors={errors}
            />
            <SubmitButton
              value='SignIn'
              errors={Boolean(errors.email || errors.password)}
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
    </Container>
  )
}

export default SignIn
