import * as React from 'react'

type Props = {
  children: React.ReactNode
}

const ErrorMessage = ({children}: Props): JSX.Element => {
  return (
    <div role='alert' className='text-red-500'>
      {children}
    </div>
  )
}

export default ErrorMessage
