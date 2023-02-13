import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const EmailInput = ({
  id,
  name,
  label = 'Email',
  inputProps,
  errors,
}: FormInputType): JSX.Element => (
  <FormInput
    type='email'
    id={id}
    name={name}
    label={label}
    placeholder={
      name !== 'email'
        ? 'Please enter a new email address '
        : 'Please enter your email'
    }
    inputProps={inputProps}
    errors={errors}
  />
)

export default EmailInput
