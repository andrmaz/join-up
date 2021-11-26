import * as React from 'react'
import type {IVacancyInput} from 'app/types/form'

const VacancyInput = ({register, defaultValue}: IVacancyInput): JSX.Element => {
  return (
    <div className='flex'>
      <label htmlFor='vacancies' className='mr-2'>
        Vacancy
      </label>
      <input
        type='number'
        id='vacancy-select'
        name='vacancies'
        defaultValue={defaultValue ? defaultValue : 1}
        step={1}
        min={1}
        max={20}
        className='w-12 focus:outline-none focus:ring focus:border-blue-300 border-2 border-gray-400 p-0.5 mr-2 rounded'
        ref={register}
      />
    </div>
  )
}

export default VacancyInput
