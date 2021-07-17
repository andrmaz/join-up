import Head from 'next/head'
import SignupForm from '@components/Form/user/Signup'

const SignUp = (): JSX.Element => {
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>SignUp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v container flex justify-center items-center'>
        <section className='h-18/20 xl:h-4/5 w-5/6 xl:w-3/5 border border-black rounded p-2'>
          <header className='h-1/10 text-center'>
            <h1 className='text-3xl'>SignUp</h1>
          </header>
          <SignupForm />
        </section>
      </main>
    </section>
  )
}

export default SignUp
