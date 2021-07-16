import Head from 'next/head'
import Link from 'next/link'

import {useForm} from 'react-hook-form'
import useUserLogin from '@hooks/user/useUserLogin'

import SigninForm from '@components/form/Form/user/Signin'

import type {ISigninInputs} from 'app/types/user'

const SignIn = (): JSX.Element => {
  const {register, handleSubmit, errors} = useForm<ISigninInputs>()
  const onSubmit = useUserLogin()
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>SignIn</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v container flex justify-center items-center'>
        <section className='h-2/5 w-3/6 xl:w-2/6 border border-black rounded py-4 px-10'>
          <header className='h-3/20 text-center'>
            <h1 className='text-3xl'>SignIn</h1>
          </header>
          <SigninForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
          />
          <div className='inline-flex justify-between w-full h-3/20 pt-5 lg:text-xs'>
            <Link href='/signup'>
              <a>Do not have an account? SignUp</a>
            </Link>
            <span className='text-right'>Forgot your password?</span>
          </div>
        </section>
      </main>
    </section>
  )
}

export default SignIn
