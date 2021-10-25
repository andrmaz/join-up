import {useForm} from 'react-hook-form'
import useUserLogin from '@hooks/user/useUserLogin'

import EmailInput from '@components/form/Input/user/Email'
import PasswordInput from '@components/form/Input/user/Password'
import {SubmitButton} from '@components/form/Button/Submit'

import type {ISigninInputs} from 'app/types/user'

const SigninForm = (): JSX.Element => {
  const {register, handleSubmit, errors} = useForm<ISigninInputs>()
  const onSubmit = useUserLogin()
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='h-14/20 flex flex-col justify-between  xl:justify-evenly'
    >
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <SubmitButton
        value='SignIn'
        errors={Boolean(errors.email || errors.password)}
      />
    </form>
  )
}

export default SigninForm
