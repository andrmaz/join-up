import Button from '@lib/Button'
import EmailInput from '@components/Input/Email'
import type {IEditEmail} from 'app/types/user'
import InputSubmit from '@lib/Input/Submit'
import PasswordInput from '@components/Input/Password'
import type {UserResponseType} from 'app/types/response'
import {useForm} from 'react-hook-form'
import {emailRegisterOptions, passwordRegisterOptions} from '@data/register'

const EmailForm = ({
  onSubmit,
}: {
  onSubmit: (data: IEditEmail) => Promise<UserResponseType>
}): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: {errors},
    reset,
  } = useForm<IEditEmail>()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-auto justify-between p-1'
    >
      <h2 className='text-2xl mb-4'>Change email</h2>
      <article className='h-auto flex flex-col justify-evenly mb-8'>
        <EmailInput
          id='email'
          name='email'
          inputProps={register('email', emailRegisterOptions)}
          errors={errors}
        />
        <PasswordInput
          id='password'
          name='password'
          inputProps={register('password', passwordRegisterOptions)}
          errors={errors}
        />
      </article>
      <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
        <Button onClick={() => reset()}>Cancel</Button>
        <div className='w-16 p-1'>
          <InputSubmit
            value='Save'
            bgColor='green-600'
            disabled={Boolean(errors.email || errors.password)}
          />
        </div>
      </aside>
    </form>
  )
}

export default EmailForm
