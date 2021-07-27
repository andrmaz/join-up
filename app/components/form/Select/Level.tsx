import * as React from 'react'

import {Controller} from 'react-hook-form'
import useLevels from '@hooks/options/useLevels'

import Select from 'react-select'
import ErrorMessage from '@components/lib/Message/Error'

import type {IPositionSelect, SelectOptionsType} from 'app/types/form'

const LevelSelect = ({
  control,
  setValue,
  errors,
  defaultValue,
}: IPositionSelect): React.ReactElement => {
  const options = useLevels()
  return (
    <React.Fragment>
      <label id='level-select' htmlFor='level'>
        {`Choose a level :`}
      </label>
      <Controller
        name='level'
        control={control}
        defaultValue={
          defaultValue ? defaultValue.id : options ? options[0].id : ''
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
              defaultValue ? defaultValue : options ? options[0] : value
            }
            closeMenuOnSelect={true}
            options={options}
            getOptionValue={option => option['id']}
            blurInputOnSelect={false}
            onChange={(value: SelectOptionsType) => {
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
