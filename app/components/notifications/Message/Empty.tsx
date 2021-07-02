import * as React from 'react'

import type {ContainerPropsType} from 'app/types/container'

export const EmptyMessage = ({children}: ContainerPropsType): JSX.Element => (
  <div className='w-full flex justify-center'>
    <span className='xl:text-xl text-center tracking-wide text-blue-500'>
      {children}
    </span>
  </div>
)
