import CloseButton from '@components/Button/Close'
import {FaCheckCircle} from 'react-icons/fa'
import React from 'react'

const SnackBar = ({alert}: {alert: string}): React.ReactElement => (
  <div className='alert alert-info flex flex-col'>
    <article className='h-1/3 w-full flex justify-end right-0'>
      <CloseButton onClick={() => ''} />
    </article>
    <article className='flex h-2/3'>
      <FaCheckCircle />
      <h3 className='text-xl text-white text-center ml-2'>{alert}</h3>
    </article>
  </div>
)

export default SnackBar
