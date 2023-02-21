import Button from '@lib/Button'
import type {IEditPassword} from 'app/types/user'
import InputSubmit from '@lib/Input/Submit'
import PasswordInput from '@components/Input/Password'
import {StatusResponseType} from 'app/types/response'
import {useForm} from 'react-hook-form'
import {passwordRegisterOptions} from '@data/register'

const PasswordForm = ({
  onSubmit,
}: {
  onSubmit: (data: IEditPassword) => Promise<StatusResponseType>
}): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: {errors},
    watch,
    reset,
  } = useForm<IEditPassword>()
  const subscription = watch('newPassword')
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-auto justify-between p-1'
    >
      <h2 className='text-2xl mb-4'>Change password</h2>
      <article className='h-auto flex flex-col justify-evenly mb-8'>
        <PasswordInput
          id='current_password'
          name='currentPassword'
          label='Current Password'
          inputProps={register('currentPassword', passwordRegisterOptions)}
          errors={errors}
        />
        <PasswordInput
          id='new_password'
          name='newPassword'
          label='New Password'
          inputProps={register('newPassword', passwordRegisterOptions)}
          errors={errors}
        />
        <PasswordInput
          id='new_password_confirm'
          name='newPasswordConfirm'
          label='Confirm New Password'
          inputProps={register('newPasswordConfirm', {
            ...passwordRegisterOptions,
            validate: (value: string) =>
              value === subscription || 'passwords must match',
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
            disabled={Boolean(
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
