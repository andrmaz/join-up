import * as React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import type {IDefaultSelect} from 'app/types/form'

const DefaultSelect = ({
  id,
  name,
  options,
  control,
  setValue,
  focusRef,
}: IDefaultSelect): React.ReactElement => {
  return (
    <React.Fragment>
      <label id={id} htmlFor={name}>
        {`Choose a ${name} :`}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={options[0].label}
        render={({onBlur}) => (
          <Select
            id={id}
            inputId={id}
            name={name}
            ref={focusRef ? focusRef : undefined}
            aria-labelledby={name}
            defaultValue={options[0]}
            closeMenuOnSelect={true}
            options={options}
            blurInputOnSelect={false}
            onChange={value => {
              setValue(name, value?.label, {
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
