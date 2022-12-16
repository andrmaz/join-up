import * as React from 'react'

import type {IPositionSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import {Level} from 'app/types/constants'
import Select from 'react-select'
import {trpc} from '@utils/trpc'

const LevelSelect = ({
  control,
  setValue,
  errors,
  defaultValue,
}: IPositionSelect): React.ReactElement => {
  const result = trpc.level.list.useQuery()
  const levels = result.data?.levels
  return (
    <React.Fragment>
      <label id='level-select' htmlFor='level'>
        {`Choose a level :`}
      </label>
      <Controller
        name='level'
        control={control}
        defaultValue={
          defaultValue ? defaultValue.id : levels ? levels[0].id : ''
        }
        rules={{
          required: {
            value: true,
            message: `Please select at least one level'`,
          },
        }}
        render={({onBlur, value}) => (
          <Select
            id='level-select'
            inputId='level-select'
            name='level'
            aria-labelledby='level'
            defaultValue={
              defaultValue ? defaultValue : levels ? levels[0] : value
            }
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
          />
        )}
      />
      {errors?.level && <ErrorMessage>{errors?.level?.message}</ErrorMessage>}
    </React.Fragment>
  )
}

export default LevelSelect
