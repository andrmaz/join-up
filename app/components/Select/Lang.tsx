import Select from 'react-select'
import {Controller} from 'react-hook-form'
import ErrorMessage from '@components/Message/Error'
import type {IFormSelect, SelectOptions} from 'app/types/form'

const LangSelect = ({
  options,
  control,
  setValue,
  errors,
  disabled,
  defaultValues,
  defaultValue,
}: IFormSelect): React.ReactElement => {
  return (
    <>
      <label id='languages' htmlFor='languages'>
        Languages :
      </label>
      <Controller
        name='languages'
        control={control}
        defaultValue={defaultValues ? defaultValues.map(v => v.label) : ''}
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
            options={options}
            placeholder='Select your languages'
            blurInputOnSelect={false}
            onBlur={onBlur}
            onChange={values => {
              setValue(
                'languages',
                values.map((value: SelectOptions) => value.id),
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
    </>
  )
}

export default LangSelect
