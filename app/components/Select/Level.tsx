import * as React from 'react'

import type {IPositionSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import {Level} from 'app/types/constants'
import QueryResult from '@components/Result/Query'
import Select from 'react-select'
import {trpc} from '@utils/trpc'

const LevelSelect = ({
  control,
  setValue,
  errors,
  defaultValue,
}: IPositionSelect): React.ReactElement => {
  const {status, error, data} = trpc.level.list.useQuery()

  return (
    <QueryResult status={status} error={error} data={data}>
      {({levels}) => (
        <div className='form-control w-full max-w-xs'>
          <label id='level-select' htmlFor='level' className='label'>
            Choose a level :
          </label>
          <Controller
            name='level'
            control={control}
            defaultValue={defaultValue?.id ?? levels[0].id}
            rules={{
              required: {
                value: true,
                message: `Please select at least one level'`,
              },
            }}
            render={({field: {value, onBlur}}) => (
              <Select
                id='level-select'
                inputId='level-select'
                name='level'
                aria-labelledby='level'
                defaultValue={defaultValue?.id || levels[0].id || value}
                closeMenuOnSelect={true}
                options={levels}
                getOptionValue={option => option['id']}
                blurInputOnSelect={false}
                onChange={(value: SelectOptionsType<Level>) => {
                  setValue('level', value.id, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
                onBlur={onBlur}
                className='select select-bordered'
              />
            )}
          />
          {errors?.level && (
            <ErrorMessage>{errors?.level?.message}</ErrorMessage>
          )}
        </div>
      )}
    </QueryResult>
  )
}

export default LevelSelect
