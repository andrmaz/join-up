import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const UsernameInput = ({
  id,
  name,
  label = 'Username',
  inputProps,
  errors,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label={label}
    placeholder='Please enter a new username'
    inputProps={inputProps}
    errors={errors}
  />
)

export default UsernameInput
