import * as React from 'react'

import type {IFormSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import {Language} from 'app/types/constants'
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
  const result = trpc.language.list.useQuery()

  if (result.isError)
    return <ErrorMessage>{result.error?.message}</ErrorMessage>
  return (
    <React.Fragment>
      <label id='languages' htmlFor='languages'>
        Languages :
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
        render={({value, onBlur}) => (
          <Select
            id='languages'
            inputId='languages'
            name='languages'
            aria-labelledby='languages'
            defaultValue={defaultValue ? defaultValue : value}
            closeMenuOnSelect={false}
            isMulti
            options={result.data?.languages}
            getOptionValue={option => option['id']}
            placeholder='Select your languages'
            blurInputOnSelect={false}
            onBlur={onBlur}
            onChange={values => {
              setValue(
                'languages',
                values.map((value: SelectOptionsType<Language>) => value.id),
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
      {errors?.languages && (
        <ErrorMessage>{errors?.languages?.message}</ErrorMessage>
      )}
    </React.Fragment>
  )
}

export default React.memo(LangSelect)
