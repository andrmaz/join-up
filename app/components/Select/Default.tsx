import * as React from 'react'
import axios from 'axios'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import type {IDefaultSelect, SelectOptions} from 'app/types/form'

const DefaultSelect = ({
  id,
  name,
  control,
  setValue,
  focusRef,
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
        defaultValue={options ? options[0].label : ''}
        render={({onBlur, value}) => (
          <Select
            id={id}
            inputId={id}
            name={name}
            ref={focusRef ? focusRef : undefined}
            aria-labelledby={name}
            defaultValue={options ? options[0] : value}
            closeMenuOnSelect={true}
            options={options}
            blurInputOnSelect={false}
            onChange={value => {
              setValue(name, value?.value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            onBlur={onBlur}
          />
        )}
      />
    </React.Fragment>
  )
}

export default DefaultSelect
