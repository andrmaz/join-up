import * as React from 'react'

import type {IPositionSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import QueryResult from '@components/Result/Query'
import {Role} from 'app/types/constants'
import Select from 'react-select'
import {trpc} from '@utils/trpc'

const RoleSelect = ({
  control,
  setValue,
  errors,
  defaultValue,
}: IPositionSelect): React.ReactElement => {
  const {status, error, data} = trpc.role.list.useQuery()

  return (
    <QueryResult status={status} error={error} data={data}>
      {({roles}) => (
        <div className='form-control w-full max-w-xs'>
          <label id='role-select' htmlFor='role' className='label'>
            {`Choose a role :`}
          </label>
          <Controller
            name='role'
            control={control}
            defaultValue={defaultValue?.id ?? roles[0].id}
            rules={{
              required: {
                value: true,
                message: `Please select at least one role'`,
              },
            }}
            render={({field: {value, onBlur}}) => (
              <Select
                id='role-select'
                inputId='role-select'
                name='role'
                aria-labelledby='role'
                defaultValue={defaultValue || roles[0].id || value}
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
                className='select select-bordered'
              />
            )}
          />
          {errors?.role && <ErrorMessage>{errors?.role?.message}</ErrorMessage>}
        </div>
      )}
    </QueryResult>
  )
}

export default RoleSelect
