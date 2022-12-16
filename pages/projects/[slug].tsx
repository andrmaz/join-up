import * as React from 'react'

import CreatePosition from '@screens/Position/Create'
import {EmptyMessage} from '@lib/Message/Empty'
import Head from 'next/head'
import {NextPage} from 'next'
import {PActions} from 'app/types/constants'
import PositionTablist from '@screens/Position/Tablist'
import ProjectOverview from '@screens/Project/Overview'
import {trpc} from '@utils/trpc'
import {usePositionContext} from '@hooks/position/usePositionContext'

const Slug: NextPage = () => {
  const {state, dispatch} = usePositionContext()
  const user = trpc.user.detail.useQuery().data?.user

  const {data, isLoading, isError, error} = trpc.project.detail.useQuery()
  const project = data?.response.project

  const positions = trpc.position.detail.useQuery().data?.response.positions

  React.useEffect(() => {
    //dispatch({type: PActions.persist, payload: positions})
    return () => dispatch({type: PActions.clear})
  }, [dispatch, positions])

  if (isLoading) return <>Loading ...</>
  if (isError) return <>Error: {error.message}</>
  if (!project) return <>Error: Something went wrong</>
  return (
    <section className='h-min-screen mt-16'>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-full xl:h-92v'>
        <section className='h-full py-4 xl:py-12 px-40 xl:px-80'>
          <article className='w-full h-2/5 mb-4'>
            <div className='absolute right-40 xl:right-80'>
              {user?.id === project.owner && <CreatePosition id={project.id} />}
            </div>
            <ProjectOverview {...project} />
          </article>
          {state.positions.length ? (
            <PositionTablist positions={state.positions} />
          ) : (
            <EmptyMessage>This project has no positions yet.</EmptyMessage>
          )}
        </section>
      </main>
    </section>
  )
}

export default Slug

/* export const getServerSideProps: GetServerSideProps = async context => {
  try {
    //* project id parameter will be sent as a query parameter (slug) to the page
    const {slug} = context.params as Params

    await Promise.all([
      privateFetch(context).get<ProjectResponseType>(`/project/${slug}`),
      privateFetch(context).get<PositionsResponseType>(
        `/position/project/${slug}`
      ),
    ])

    return {
      props: {},
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error)
      if (error?.response?.status === 401) {
        console.log('Redirect')
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        }
      }
    } else {
      handleUnexpectedError(error)
    }
    throw error
  }
} */
