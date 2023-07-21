import * as React from 'react'

import ErrorMessage from '@lib/Message/Error'
import type {IFormInput} from 'app/types/form'

const FormInput = ({
  name,
  optional,
  label,
  id,
  type,
  defaultValue,
  placeholder,
  inputProps,
  errors,
}: IFormInput): JSX.Element => {
  return (
    <div className='form-control w-full max-w-xs'>
      <label htmlFor={name} className='label'>
        <span className='label-text'>{label} :</span>
        <span className='label-text-alt'>{optional && `(optional)`}</span>
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className='input input-bordered w-full max-w-xs'
        {...inputProps}
      />
      {errors?.[name] && <ErrorMessage>{errors?.[name]?.message}</ErrorMessage>}
    </div>
  )
}

export default React.memo(FormInput)
