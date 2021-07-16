import * as React from 'react'
import ErrorMessage from '@components/lib/Message/Error'
import type {IFormInput} from 'app/types/form'

const FormInput = ({
  name,
  optional,
  label,
  id,
  type,
  defaultValue,
  placeholder,
  register,
  errors,
}: IFormInput): JSX.Element => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name}>
        {label} : {optional && `(optional)`}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className='focus:outline-none focus:ring focus:border-blue-300 border-2 border-gray-400 p-0.5 mr-2 rounded'
        ref={register}
      />
      {errors?.[name] && <ErrorMessage>{errors?.[name]?.message}</ErrorMessage>}
    </div>
  )
}

export default React.memo(FormInput)
