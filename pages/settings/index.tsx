import * as React from 'react'
import dynamic from 'next/dynamic'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import Menu from '@components/route/Menu/Menu'
import Panel from '@components/route/Tablist/Panel'
import EditProfile from '@components/User/Profile'

import {getSessionTokenProps} from '@api/getServerSideProps'

import type {TokenParamsType} from 'app/types/params'

const EditUsername = dynamic(() => import('@components/User/Username'))
const EditEmail = dynamic(() => import('@components/User/Email'))
const EditPassword = dynamic(() => import('@components/User/Password'))

const Settings: NextPage<TokenParamsType> = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <section className='h-full py-12 xl:py-24 px-40 xl:px-80'>
          <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
            <Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className='w-200 h-auto border-2 border-solid rounded'>
              <EditProfile
                token={token}
                isSelectedTab={Boolean(selectedTab === 0)}
              />
              <EditUsername
                token={token}
                isSelectedTab={Boolean(selectedTab === 1)}
              />
              <EditEmail
                token={token}
                isSelectedTab={Boolean(selectedTab === 2)}
              />
              <EditPassword
                token={token}
                isSelectedTab={Boolean(selectedTab === 3)}
              />
              <Panel index={4} isSelectedTab={Boolean(selectedTab === 4)}>
                <span>Notifications</span>
              </Panel>
              <Panel index={5} isSelectedTab={Boolean(selectedTab === 5)}>
                <span>Security Logs</span>
              </Panel>
            </div>
          </div>
        </section>
      </main>
    </section>
  )
}

export default Settings

export const getServerSideProps: GetServerSideProps<TokenParamsType> =
  getSessionTokenProps
