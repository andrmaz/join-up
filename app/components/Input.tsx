import * as React from 'react'
import type {IFormInput} from 'app/types/form'

const Input = (props: IFormInput): JSX.Element => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={props.name}>
        {props.label} : {props.optional && `(optional)`}
      </label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className='focus:outline-none focus:ring focus:border-blue-300 border-2 border-gray-400 p-0.5 mr-2 rounded'
        ref={props.register}
      />
      {props.errors}
    </div>
  )
}

export default Input
