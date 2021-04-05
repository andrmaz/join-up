import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import axios from 'axios'
import {parseCookies} from '@utils/parseCookies'
import {Params} from 'next/dist/next-server/server/router'
import {useAuthState} from '@hooks/useAuthState'

const Slug: NextPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('%cProject Data', 'color: tomato', project.owner)
  const {user} = useAuthState()
  console.log('%cUser Info', 'color: green', user?._id)
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-screen pt-20 container'>
        <section className='h-full p-12'>
          {project.owner === user?._id && <span>Add a new Post</span>}
        </section>
      </main>
    </div>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps<Params> = async context => {
  //* Get the user's session based on the request
  const {session: token} = parseCookies(context.req)

  //* project id parameter will be sent as a query parameter (slug) to the page
  const {slug} = context.params as Params

  //* If no user, redirect to login
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  //* If there is a user,
  const {
    data: {project},
  } = await axios.get(`/project/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return project data
  return {
    props: {
      project,
    },
  }
}
