import * as React from 'react'

import type {IFormSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
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
}: /* id, */
IFormSelect): React.ReactElement => {
  const result = trpc.technology.list.useQuery()

  if (result.isError)
    return <ErrorMessage>{result.error?.message}</ErrorMessage>
  return (
    <React.Fragment>
      <label id='technologies' htmlFor='technologies'>
        Technologies :
      </label>
      <Controller
        name='technologies'
        control={control}
        defaultValue={defaultValues ? defaultValues.map(v => v.id) : ''}
        rules={{
          //* recommended for object or array input data
          validate: value =>
            value.length || 'Please select at least one technology',
        }}
        render={({value, onBlur}) => (
          <Select
            id='technologies'
            inputId='technologies'
            name='technologies'
            aria-labelledby='technologies'
            defaultValue={defaultValue ? defaultValue : value}
            closeMenuOnSelect={false}
            isMulti
            options={result.data?.technologies}
            getOptionValue={option => option['id']}
            placeholder='Choose your tech stack'
            blurInputOnSelect={false}
            onBlur={onBlur}
            onChange={values => {
              setValue(
                'technologies',
                values.map((value: SelectOptionsType<Technology>) => value.id),
                {
                  shouldValidate: true,
                  shouldDirty: true,
                }
              )
            }}
            isDisabled={disabled}
          />
        )}
      />
      {errors?.technologies && (
        <ErrorMessage>{errors?.technologies?.message}</ErrorMessage>
      )}
    </React.Fragment>
  )
}

export default React.memo(TechSelect)
