import * as React from 'react'

import type {IFormSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import {Language} from 'app/types/constants'
import QueryResult from '@components/Result/Query'
import Select from 'react-select'
import {trpc} from '@utils/trpc'

const LangSelect = ({
  control,
  setValue,
  errors,
  disabled,
  defaultValues,
  defaultValue,
}: IFormSelect): React.ReactElement => {
  const {status, error, data} = trpc.language.list.useQuery()

  return (
    <QueryResult status={status} error={error} data={data}>
      {({languages}) => (
        <div className='form-control w-full max-w-xs'>
          <label id='languages' htmlFor='languages' className='label'>
            <span className='label-text'>Languages :</span>
          </label>
          <Controller
            name='languages'
            control={control}
            defaultValue={defaultValues ? defaultValues.map(v => v.id) : ''}
            rules={{
              //* recommended for object or array input data
              validate: value =>
                value.length || 'Please select at least one language',
            }}
            render={({field: {value, onBlur}}) => (
              <Select
                id='languages'
                inputId='languages'
                name='languages'
                aria-labelledby='languages'
                defaultValue={defaultValue ?? value}
                closeMenuOnSelect={false}
                isMulti
                options={languages}
                getOptionValue={option => option['id']}
                placeholder='Select your languages'
                blurInputOnSelect={false}
                onBlur={onBlur}
                onChange={values => {
                  setValue(
                    'languages',
                    values.map(
                      (value: SelectOptionsType<Language>) => value.id
                    ),
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  )
                }}
                isDisabled={disabled}
                className='select select-bordered'
              />
            )}
          />
          {errors?.languages && (
            <ErrorMessage>{errors?.languages?.message}</ErrorMessage>
          )}
        </div>
      )}
    </QueryResult>
  )
}

export default React.memo(LangSelect)
