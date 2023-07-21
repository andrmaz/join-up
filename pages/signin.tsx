import * as React from 'react'

import Head from 'next/head'
import Link from 'next/link'
import SigninForm from '@components/Form/Signin'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/router'

const SignIn = (): JSX.Element => {
  const router = useRouter()
  React.useEffect(() => {
    // Prefetch the home page
    router.prefetch('/')
  }, [router])
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>SignIn</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v container flex justify-center items-center'>
        <section className='h-80 xl:h-96 w-2/4 xl:w-128 border border-black rounded py-4 px-10'>
          <header className='h-3/20 text-center'>
            <h1 className='text-3xl'>SignIn</h1>
          </header>
          <SigninForm />
          <button
            className='btn btn-accent'
            onClick={() =>
              signIn('github', {callbackUrl: 'http://localhost:3000'})
            }
          >
            Sign in with GitHub
          </button>
          <div className='inline-flex justify-between w-full h-3/20 pt-5 lg:text-xs'>
            <Link href='/signup' className='btn btn-link'>
              Do not have an account? SignUp
            </Link>
            <span className='text-right'>Forgot your password?</span>
          </div>
        </section>
      </main>
    </section>
  )
}

export default SignIn
