import FormInput from '@components/form/Input/lib/Form'
import type {FormInputType} from 'app/types/form'

const EmailInput = ({
  id = 'email',
  name = 'email',
  label = 'Email',
  register,
  errors,
}: FormInputType): JSX.Element => (
  <FormInput
    type='email'
    id={id}
    name={name}
    label={label}
    placeholder={
      name !== 'email'
        ? 'please enter a new email address '
        : 'please enter your email'
    }
    register={register({
      required: 'email is required',
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: 'please enter a valid email address',
      },
    })}
    errors={errors}
  />
)

export default EmailInput
