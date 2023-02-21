import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const TextInput = ({
  id,
  name,
  label = 'Description',
  inputProps,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label={label}
    placeholder={
      defaultValue ||
      `Provide some details to get people involved in your project`
    }
    defaultValue={defaultValue}
    inputProps={inputProps}
    errors={errors}
  />
)

export default TextInput
