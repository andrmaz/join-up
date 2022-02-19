import EmailInput from '@components/Input/Email'
import type {ISigninInputs} from 'app/types/user'
import {InputSubmit} from '@lib/Input/Submit'
import PasswordInput from '@components/Input/Password'
import {useForm} from 'react-hook-form'
import useUserLogin from '@hooks/user/useUserLogin'

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
      <InputSubmit
        value='SignIn'
        errors={Boolean(errors.email || errors.password)}
      />
    </form>
  )
}

export default SigninForm
