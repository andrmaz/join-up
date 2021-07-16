import * as React from 'react'
import Select from 'react-select'

import {Controller} from 'react-hook-form'
import useTechnologies from '@hooks/technology/useTechnologies'

import ErrorMessage from '@components/lib/Message/Error'
import type {IFormSelect, SelectOptionsType} from 'app/types/form'

const TechSelect = ({
  control,
  setValue,
  errors,
  disabled,
  defaultValues,
  defaultValue,
  id,
  token,
}: IFormSelect): React.ReactElement => {
  const options = useTechnologies(id, token)
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
            options={options}
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
