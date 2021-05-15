import * as React from 'react'
import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'

import {ParsedUrlQuery} from 'querystring'

import {parseCookies} from '@utils/parseCookies'

import Container from '@components/containers/Container/Container'
import Menu from '@components/navigation/Menu/Menu'
import Panel from '@components/navigation/Tablist/Panel'
import Profile from '@components/custom/Edit/Profile'

const Settings: NextPage = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  return (
    <Container>
      <Head>
        <title>Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v container'>
        <section className='h-full p-12'>
          <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
            <Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className='w-200 h-auto border-2 border-solid rounded'>
              <Panel index={0} isSelectedTab={selectedTab === 0}>
                <Profile token={token} />
              </Panel>
              <Panel index={1} isSelectedTab={selectedTab === 1}>
                <span>Edit Username</span>
              </Panel>
              <Panel index={2} isSelectedTab={selectedTab === 2}>
                <span>Edit Email</span>
              </Panel>
              <Panel index={3} isSelectedTab={selectedTab === 3}>
                <span>Edit Password</span>
              </Panel>
              <Panel index={4} isSelectedTab={selectedTab === 4}>
                <span>Notifications</span>
              </Panel>
              <Panel index={5} isSelectedTab={selectedTab === 5}>
                <span>Security Logs</span>
              </Panel>
            </div>
          </div>
        </section>
      </main>
    </Container>
  )
}

export default Settings

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  //* Get the user's session based on the request
  const {session: token} = parseCookies(context.req)

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

  //* return user technologies
  return {
    props: {
      token,
    },
  }
}
