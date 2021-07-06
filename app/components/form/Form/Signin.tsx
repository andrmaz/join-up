import EmailInput from '@components/form/Input/user/Email'
import PasswordInput from '@components/form/Input/user/Password'
import {SubmitButton} from '@components/form/Button/Submit'

import type {ISigninForm} from 'app/types/form'

const SigninForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
}: ISigninForm): JSX.Element => (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className='h-4/6 flex flex-col justify-between  xl:justify-evenly'
  >
    <EmailInput register={register} errors={errors} />
    <PasswordInput register={register} errors={errors} />
    <SubmitButton
      value='SignIn'
      errors={Boolean(errors.email || errors.password)}
    />
  </form>
)

export default SigninForm
