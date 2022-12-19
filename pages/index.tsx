import {ApplicationFeed} from '@components/Feed/Application'
import Carousel from '@lib/Carousel/Carousel'
import Head from 'next/head'
import {NextPage} from 'next'
//import Image from 'next/image'
import {PositionFeed} from '@components/Feed/Position'
import {ProjectFeed} from '@components/Feed/Project'
import {trpc} from '../app/utils/trpc'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/react'

const Home: NextPage = () => {
  const {status} = useSession()
  const router = useRouter()

  const {data, isLoading, isError, error} = trpc.feed.list.useQuery()

  if (status === 'unauthenticated') {
    router.push('/signin')
  }
  if (isLoading) return <>Loading ...</>
  if (isError) return <>Error: {error.message}</>
  if (!data) return <>Error: Something went wrong</>
  return (
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
              {data.projects.map(project => (
                <ProjectFeed key={project.id} {...project} />
              ))}
            </Carousel>
            <Carousel>
              {data.positions.map(position => (
                <PositionFeed key={position.id} {...position} />
              ))}
            </Carousel>
            <Carousel>
              {data.applications.map(application => (
                <ApplicationFeed key={application.id} {...application} />
              ))}
            </Carousel>
          </section>
        </section>
      </main>
    </section>
  )
}

export default Home
