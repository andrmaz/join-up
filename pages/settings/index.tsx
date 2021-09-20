import * as React from 'react'

import EditProfile from '@components/User/Profile'
import Head from 'next/head'
import Menu from '@components/route/Menu/Menu'
import Panel from '@components/route/Tablist/Panel'
import dynamic from 'next/dynamic'

const EditUsername = dynamic(() => import('@components/User/Username'))
const EditEmail = dynamic(() => import('@components/User/Email'))
const EditPassword = dynamic(() => import('@components/User/Password'))

const Settings = (): JSX.Element => {
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
              <EditProfile isSelectedTab={Boolean(selectedTab === 0)} />
              <EditUsername isSelectedTab={Boolean(selectedTab === 1)} />
              <EditEmail isSelectedTab={Boolean(selectedTab === 2)} />
              <EditPassword isSelectedTab={Boolean(selectedTab === 3)} />
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

//TODO: Add Server Side User Authentication Check.
