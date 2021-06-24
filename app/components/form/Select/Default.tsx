import * as React from 'react'
import axios from 'axios'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import ErrorMessage from '@components/notifications/Message/Error'

import type {IDefaultSelect, SelectOptions} from 'app/types/form'

const DefaultSelect = ({
  id,
  name,
  control,
  setValue,
  errors,
  defaultValue,
}: IDefaultSelect): React.ReactElement => {
  const [options, setOptions] = React.useState<SelectOptions[] | undefined>()
  //* Set technologies options to State as soon as the modal is shown
  const fetchOptions = React.useCallback(async () => {
    const {data} = await axios.get(`/${name}`)
    setOptions(data[name + 's'])
  }, [name])
  React.useEffect(() => {
    fetchOptions()
  }, [fetchOptions])
  return (
    <React.Fragment>
      <label id={id} htmlFor={name}>
        {`Choose a ${name} :`}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={
          defaultValue ? defaultValue.id : options ? options[0].id : ''
        }
        rules={{
          required: {
            value: true,
            message: `Please select at least one ${name}`,
          },
        }}
        render={({onBlur, value}) => (
          <Select
            id={id}
            inputId={id}
            name={name}
            aria-labelledby={name}
            defaultValue={
              defaultValue ? defaultValue : options ? options[0] : value
            }
            closeMenuOnSelect={true}
            options={options}
            getOptionValue={option => option['id']}
            blurInputOnSelect={false}
            onChange={(value: SelectOptions) => {
              setValue(name, value.id, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            onBlur={onBlur}
          />
        )}
      />
      {errors?.[name] && <ErrorMessage>{errors?.[name]?.message}</ErrorMessage>}
    </React.Fragment>
  )
}

export default DefaultSelect
