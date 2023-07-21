import * as React from 'react'
import type {FormInputType} from 'app/types/form'

const VacancyInput = ({
  id,
  inputProps,
  defaultValue,
}: FormInputType): JSX.Element => {
  return (
    <div className='form-control w-full max-w-xs'>
      <label htmlFor='vacancies' className='label'>
        Vacancy
      </label>
      <input
        type='number'
        id={id}
        defaultValue={defaultValue ? defaultValue : 1}
        step={1}
        min={1}
        max={20}
        className='input input-bordered w-full max-w-xs'
        {...inputProps}
      />
    </div>
  )
}

export default VacancyInput
