import * as React from 'react'

import type {IFormSelect, SelectOptionsType} from 'app/types/form'

import {Controller} from 'react-hook-form'
import ErrorMessage from '@lib/Message/Error'
import Select from 'react-select'
import useTechnologies from '@hooks/options/useTechnologies'

const TechSelect = ({
  control,
  setValue,
  errors,
  disabled,
  defaultValues,
  defaultValue,
  id,
}: IFormSelect): React.ReactElement => {
  const {isError, error, data} = useTechnologies(id)
  if (isError) {
    return <ErrorMessage>{error?.message}</ErrorMessage>
  }
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
            options={data}
            getOptionValue={option => option['id']}
            placeholder='Choose your tech stack'
            blurInputOnSelect={false}
            onBlur={onBlur}
            onChange={values => {
              setValue(
                'technologies',
                values.map((value: SelectOptionsType) => value.id),
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
