import Button from '@lib/Button'
import FormInput from '@lib/Input/Form'
import type {IEditPassword} from 'app/types/user'
import {InputSubmit} from '@lib/Input/Submit'
import PasswordInput from '@components/Input/Password'
import {StatusResponseType} from 'app/types/response'
import {useForm} from 'react-hook-form'

const PasswordForm = ({
  onSubmit,
}: {
  onSubmit: (data: IEditPassword) => Promise<StatusResponseType>
}): JSX.Element => {
  const {handleSubmit, register, errors, watch, reset} =
    useForm<IEditPassword>()
  const watchPassword = watch('newPassword')
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-auto justify-between p-1'
    >
      <h2 className='text-2xl mb-4'>Change password</h2>
      <article className='h-auto flex flex-col justify-evenly mb-8'>
        <PasswordInput
          id='currentPassword'
          name='currentPassword'
          label='Current Password'
          register={register}
          errors={errors}
        />
        <PasswordInput
          id='newPassword'
          name='newPassword'
          label='New Password'
          register={register}
          errors={errors}
        />
        <FormInput
          type='password'
          id='newPasswordConfirm'
          name='newPasswordConfirm'
          label='Confirm New Password'
          placeholder='please confirm your new password'
          register={register({
            validate: (value: string) =>
              value === watchPassword || 'passwords must match',
          })}
          errors={errors}
        />
      </article>
      <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
        <Button onClick={() => reset()}>Cancel</Button>
        <div className='w-16 p-1'>
          <InputSubmit
            value='Save'
            bgColor='green-600'
            errors={Boolean(
              errors.currentPassword ||
                errors.newPassword ||
                errors.newPasswordConfirm
            )}
          />
        </div>
      </aside>
    </form>
  )
}

export default PasswordForm
