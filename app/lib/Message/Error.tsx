import * as React from 'react'

import type {ChildrenPropsType} from 'app/types/modal'

const ErrorMessage = ({children}: ChildrenPropsType): JSX.Element => {
  return (
    <div role='alert' className='text-red-500'>
      {children}
    </div>
  )
}

export default ErrorMessage
