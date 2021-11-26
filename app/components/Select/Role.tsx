import * as React from 'react'

import type {IPositionSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import Select from 'react-select'
import useRoles from '@hooks/options/useRoles'

const RoleSelect = ({
  control,
  setValue,
  errors,
  defaultValue,
}: IPositionSelect): React.ReactElement => {
  const options = useRoles()
  return (
    <React.Fragment>
      <label id='role-select' htmlFor='role'>
        {`Choose a role :`}
      </label>
      <Controller
        name='role'
        control={control}
        defaultValue={
          defaultValue ? defaultValue.id : options ? options[0].id : ''
        }
        rules={{
          required: {
            value: true,
            message: `Please select at least one role'`,
          },
        }}
        render={({onBlur, value}) => (
          <Select
            id='role-select'
            inputId='role-select'
            name='role'
            aria-labelledby='role'
            defaultValue={
              defaultValue ? defaultValue : options ? options[0] : value
            }
            closeMenuOnSelect={true}
            options={options}
            getOptionValue={option => option['id']}
            blurInputOnSelect={false}
            onChange={(value: SelectOptionsType) => {
              setValue('role', value.id, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            onBlur={onBlur}
          />
        )}
      />
      {errors?.role && <ErrorMessage>{errors?.role?.message}</ErrorMessage>}
    </React.Fragment>
  )
}

export default RoleSelect
