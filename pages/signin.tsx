import Head from 'next/head'
import Link from 'next/link'
import SigninForm from '@components/Form/Signin'

const SignIn = (): JSX.Element => {
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
          <SigninForm />
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
