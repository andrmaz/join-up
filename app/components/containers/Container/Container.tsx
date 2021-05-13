import * as React from 'react'

const Container = ({children}: {children: React.ReactNode}): JSX.Element => (
  <section className='h-min-screen pt-20'>{children}</section>
)

export default React.memo(Container)
