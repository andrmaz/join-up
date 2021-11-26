import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const UsernameInput = ({
  id = 'username',
  name = 'username',
  label = 'Username',
  register,
  errors,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label={label}
    placeholder='please enter a new username'
    register={register({
      required: 'username is required',
      minLength: {
        value: 3,
        message: 'username must be at least 3 characters long',
      },
      maxLength: {
        value: 20,
        message: 'username must be at most 20 characters long',
      },
    })}
    errors={errors}
  />
)

export default UsernameInput
