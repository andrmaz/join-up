import * as React from 'react'

import type {ChildrenPropsType} from 'app/types/modal'

export const EmptyMessage = ({children}: ChildrenPropsType): JSX.Element => (
  <div className='w-full flex justify-center'>
    <span className='xl:text-xl text-center tracking-wide text-blue-500'>
      {children}
    </span>
  </div>
)
