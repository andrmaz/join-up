import * as React from 'react'

import {GetServerSideProps, NextPage} from 'next'

import {ApplicationFeed} from '@components/Feed/Application'
import {Carousel} from '@lib/Carousel/Carousel'
import Head from 'next/head'
//import Image from 'next/image'
import {PositionFeed} from '@components/Feed/Position'
import {ProjectFeed} from '@components/Feed/Project'
import {QueryResult} from '@components/Result/Query'
import {trpc} from '../app/utils/trpc'

const Home: NextPage = () => {
  const {status, error, data} = trpc.feed.list.useQuery()

  return (
    <QueryResult status={status} error={error} data={data}>
      {({projects, positions, applications}) => (
        <section className='h-min-screen pt-16'>
          <Head>
            <title>Home Page</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <main className='h-92v'>
            <section className='h-full py-12 px-20 xl:px-40'>
              <article className='h-1/3 w-full border-2 my-2 rounded'>
                {/* <Image
              src=''
              alt='banner'
              width={900}
              height={300}
            /> */}
              </article>
              <section className='h-auto w-full flex flex-col justify-evenly'>
                <Carousel>
                  {projects.map(project => (
                    <ProjectFeed key={project.id} {...project} />
                  ))}
                </Carousel>
                <Carousel>
                  {positions.map(position => (
                    <PositionFeed key={position.id} {...position} />
                  ))}
                </Carousel>
                <Carousel>
                  {applications.map(application => (
                    <ApplicationFeed key={application.id} {...application} />
                  ))}
                </Carousel>
              </section>
            </section>
          </main>
        </section>
      )}
    </QueryResult>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async context => {
  const session = context.req.cookies['next-auth.session-token']
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
  return {props: {}}
}
