import {BsArrow90DegDown} from 'react-icons/bs'
import {FocusTrapRefContext} from '@context/refContext'
import {FocusTrapRefProvider} from '@providers/RefProvider'
import {GetServerSideProps} from 'next'
import Head from 'next/head'
import ProjectForm from '@components/Form/Project'
import checkAuth from '@utils/auth'
import useAddProject from '@hooks/project/useAddProject'

const Project = (): JSX.Element => {
  const [onSubmit] = useAddProject()
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>New</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FocusTrapRefProvider>
        <main className='h-92v flex justify-center items-center p-4'>
          <article className='w-3/5 xl:w-1/2 h-full xl:h-4/5 p-2 xl:px-12 rounded border-black border-2 shadow-2xl'>
            <header className='h-1/6'>
              <FocusTrapRefContext.Consumer>
                {ref => (
                  <button ref={ref} className='relative inset-x-128	'>
                    <BsArrow90DegDown />
                  </button>
                )}
              </FocusTrapRefContext.Consumer>
              <h1 className='h-2/3 text-3xl'>Create a new project</h1>
              <span>
                Please fill out this form to start creating a new project
              </span>
            </header>
            <ProjectForm onSubmit={onSubmit} />
          </article>
        </main>
      </FocusTrapRefProvider>
    </section>
  )
}

export default Project

export const getServerSideProps: GetServerSideProps = async context => {
  await checkAuth(context)
  return {props: {}}
}
