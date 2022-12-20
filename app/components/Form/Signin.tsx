import EmailInput from '@components/Input/Email'
import type {ISigninInput} from 'app/types/user'
import {InputSubmit} from '@lib/Input/Submit'
import PasswordInput from '@components/Input/Password'
import {trpc} from '@utils/trpc'
import {useForm} from 'react-hook-form'

const SigninForm = (): JSX.Element => {
  const result = trpc.auth.signin.useMutation()
  const {register, handleSubmit, errors} = useForm<ISigninInput>()
  const onSubmit = async (input: ISigninInput): Promise<void> => {
    result.mutateAsync(input)
  }
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
