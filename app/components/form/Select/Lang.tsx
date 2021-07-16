import * as React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import useFetchLanguages from '@hooks/fetch/useFetchLanguages'

import ErrorMessage from '@components/notification/Message/Error'
import type {IFormSelect, SelectOptionsType} from 'app/types/form'

const LangSelect = ({
  control,
  setValue,
  errors,
  disabled,
  defaultValues,
  defaultValue,
}: IFormSelect): React.ReactElement => {
  const languages = useFetchLanguages()
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
            options={languages}
            getOptionValue={option => option['id']}
            placeholder='Select your languages'
            blurInputOnSelect={false}
            onBlur={onBlur}
            onChange={values => {
              setValue(
                'languages',
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
      {errors?.languages && (
        <ErrorMessage>{errors?.languages?.message}</ErrorMessage>
      )}
    </React.Fragment>
  )
}

export default React.memo(LangSelect)
