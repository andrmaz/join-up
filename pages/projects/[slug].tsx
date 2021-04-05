import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import axios from 'axios'
import {parseCookies} from '@utils/parseCookies'
import {Params} from 'next/dist/next-server/server/router'

const Slug: NextPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('%cProject Data', 'color: tomato', project)
  return <div>Slug Page</div>
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
