import * as React from 'react'

import type {IPositionSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import {Role} from 'app/types/constants'
import Select from 'react-select'
import {trpc} from '@utils/trpc'

const RoleSelect = ({
  control,
  setValue,
  errors,
  defaultValue,
}: IPositionSelect): React.ReactElement => {
  const result = trpc.role.list.useQuery()
  const roles = result.data?.roles
  return (
    <React.Fragment>
      <label id='role-select' htmlFor='role'>
        {`Choose a role :`}
      </label>
      <Controller
        name='role'
        control={control}
        defaultValue={defaultValue ? defaultValue.id : roles ? roles[0].id : ''}
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
              defaultValue ? defaultValue : roles ? roles[0] : value
            }
            closeMenuOnSelect={true}
            options={roles}
            getOptionValue={option => option['id']}
            blurInputOnSelect={false}
            onChange={(value: SelectOptionsType<Role>) => {
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
