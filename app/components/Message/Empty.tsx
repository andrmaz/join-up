import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export const EmptyMessage = ({children}: Props): JSX.Element => (
  <div className='w-full flex justify-center'>
    <span className='text-lg xl:text-2xl text-center tracking-wide'>
      {children}
    </span>
  </div>
)
