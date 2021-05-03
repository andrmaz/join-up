import * as React from 'react'
import type {INumberInput} from 'app/types/form'

const NumberInput = ({
  id,
  name,
  label,
  register,
  focusRef,
}: INumberInput): JSX.Element => {
  return (
    <div className='flex'>
      <label htmlFor={name} className='mr-2'>
        {label}
      </label>
      <input
        id={id}
        type='number'
        name={name}
        defaultValue={1}
        step={1}
        min={1}
        max={20}
        className='w-12 focus:outline-none focus:ring focus:border-blue-300 border-2 border-gray-400 p-0.5 mr-2 rounded'
        ref={focusRef ? focusRef : register}
      />
    </div>
  )
}

export default NumberInput
