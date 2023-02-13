import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const PasswordInput = ({
  id,
  name,
  label = 'Password',
  inputProps,
  errors,
}: FormInputType): JSX.Element => (
  <FormInput
    type='password'
    id={id}
    name={name}
    label={label}
    placeholder='min. 8 char, mix letters and numbers'
    inputProps={inputProps}
    errors={errors}
  />
)

export default PasswordInput
