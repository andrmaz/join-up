import FormInput from '@components/form/Input/lib/Form'
import type {FormInputType} from 'app/types/form'

const PasswordInput = ({
  id = 'password',
  name = 'password',
  label = 'Password',
  register,
  errors,
}: FormInputType): JSX.Element => (
  <FormInput
    type='password'
    id={id}
    name={name}
    label={label}
    placeholder='min. 8 char, mix letters and numbers'
    register={register({
      required: 'password is required',
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: 'please enter a valid password',
      },
    })}
    errors={errors}
  />
)

export default PasswordInput
