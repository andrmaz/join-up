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
}: IFormSelect): React.ReactElement => {
  return (
    <>
      <label id={id} htmlFor={id}>
        {label} :
      </label>
      <Controller
        name={id}
        control={control}
        //TODO default value must be in this format inside the setting page
        //{ value: 'technology', label: 'Technology'}
        /* defaultValue={technologies.map(
                                            tech => tech.value
                                        )} */
        defaultValue=''
        rules={{
          required: {
            value: true,
            message,
          },
        }}
        render={({value, onBlur}) => (
          <Select
            id={id}
            inputId={id}
            name={id}
            aria-labelledby={id}
            //TODO default value must be in this format inside the setting page
            //{ value: 'technology', label: 'Technology'}
            //defaultValue={technologies}
            defaultValue={value}
            closeMenuOnSelect={false}
            isMulti
            options={options}
            placeholder={placeholder}
            blurInputOnSelect={false}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      {errors}
    </>
  )
}

export default FormSelect
