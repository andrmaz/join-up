import * as React from 'react'

import type {IFormSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import QueryResult from '@components/Result/Query'
import Select from 'react-select'
import {Technology} from 'app/types/constants'
import {trpc} from '@utils/trpc'

const TechSelect = ({
  control,
  setValue,
  errors,
  disabled,
  defaultValues,
  defaultValue,
}: IFormSelect): React.ReactElement => {
  const {status, error, data} = trpc.technology.list.useQuery()

  return (
    <QueryResult status={status} error={error} data={data}>
      {({technologies}) => (
        <div className='form-control w-full max-w-xs'>
          <label id='technologies' htmlFor='technologies' className='label'>
            <span className='label-text'>Technologies :</span>
          </label>
          <Controller
            name='technologies'
            control={control}
            defaultValue={defaultValues ? defaultValues.map(v => v.id) : []}
            rules={{
              //* recommended for object or array input data
              validate: value =>
                value.length || 'Please select at least one technology',
            }}
            render={({field: {value, onBlur}}) => (
              <Select
                id='technologies'
                inputId='technologies'
                name='technologies'
                aria-labelledby='technologies'
                defaultValue={defaultValue ?? [value]}
                closeMenuOnSelect={false}
                isMulti
                options={technologies}
                getOptionValue={option => option['id']}
                placeholder='Choose your tech stack'
                blurInputOnSelect={false}
                onBlur={onBlur}
                onChange={values => {
                  setValue(
                    'technologies',
                    values.map(
                      (value: SelectOptionsType<Technology>) => value.id
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
          {errors?.technologies && (
            <ErrorMessage>{errors?.technologies?.message}</ErrorMessage>
          )}
        </div>
      )}
    </QueryResult>
  )
}

export default React.memo(TechSelect)
