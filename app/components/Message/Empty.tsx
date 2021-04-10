import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export const EmptyMessage = ({children}: Props): JSX.Element => (
  <div className='w-full flex justify-center'>
    <span className='xl:text-xl text-center tracking-wide text-blue-500'>
      {children}
    </span>
  </div>
)
