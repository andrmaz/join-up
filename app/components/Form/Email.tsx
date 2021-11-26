import CancelButton from '@lib/Button/Cancel'
import EmailInput from '@components/Input/Email'
import type {IEditEmail} from 'app/types/user'
import PasswordInput from '@components/Input/Password'
import {SubmitButton} from '@lib/Button/Submit'
import type {UserResponseType} from 'app/types/response'
import {useForm} from 'react-hook-form'

const EmailForm = ({
  onSubmit,
}: {
  onSubmit: (data: IEditEmail) => Promise<UserResponseType>
}): JSX.Element => {
  const {handleSubmit, register, errors, reset} = useForm<IEditEmail>()
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-auto justify-between p-1'
    >
      <h2 className='text-2xl mb-4'>Change email</h2>
      <article className='h-auto flex flex-col justify-evenly mb-8'>
        <EmailInput name='newEmail' register={register} errors={errors} />
        <PasswordInput id='email-pwd' register={register} errors={errors} />
      </article>
      <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
        <CancelButton onClick={() => reset()} />
        <div className='w-16 p-1'>
          <SubmitButton
            value='Save'
            bgColor='green-600'
            errors={Boolean(errors.newEmail || errors.password)}
          />
        </div>
      </aside>
    </form>
  )
}

export default EmailForm
