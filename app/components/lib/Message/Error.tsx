import * as React from 'react'

import type {ContainerPropsType} from 'app/types/modal'

const ErrorMessage = ({children}: ContainerPropsType): JSX.Element => {
  return (
    <div role='alert' className='text-red-500'>
      {children}
    </div>
  )
}

export default ErrorMessage
