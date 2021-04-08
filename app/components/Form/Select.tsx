import Select from 'react-select'
import {Controller} from 'react-hook-form'
import type {IFormSelect} from 'app/types/form'

const FormSelect = ({
  id,
  label,
  options,
  placeholder,
  message,
  control,
  onChange,
  errors,
  disabled,
  defaultValues,
  defaultValue,
}: IFormSelect): React.ReactElement => {
  return (
    <>
      <label id={id} htmlFor={id}>
        {label} :
      </label>
      <Controller
        name={id}
        control={control}
        defaultValue={defaultValues ? defaultValues.map(v => v.label) : ''}
        rules={{
          //* recommended for object or array input data
          validate: value => value.length || message,
        }}
        render={({value, onBlur}) => (
          <Select
            id={id}
            inputId={id}
            name={id}
            aria-labelledby={id}
            defaultValue={defaultValue ? defaultValue : value}
            closeMenuOnSelect={false}
            isMulti
            options={options}
            placeholder={placeholder}
            blurInputOnSelect={false}
            onBlur={onBlur}
            onChange={onChange}
            isDisabled={disabled}
          />
        )}
      />
      {errors}
    </>
  )
}

export default FormSelect
