import {useForm} from 'react-hook-form'

import FormInput from '@components/form/Input/lib/Form'
import PasswordInput from '@components/form/Input/user/Password'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IEditPassword} from 'app/types/user'
import {StatusResponseType} from 'app/types/response'

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
        <CancelButton onClick={() => reset()} />
        <div className='w-16 p-1'>
          <SubmitButton
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
