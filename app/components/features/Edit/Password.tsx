import * as React from 'react'

import {useForm} from 'react-hook-form'
import useEditUserPassword from '@hooks/edit/useEditUserPassword'

import Panel from '@components/navigation/Tablist/Panel'
import FormInput from '@components/form/Input/Form'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'
import SnackBar from '@components/notifications/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/navigation'
import type {IEditPassword} from 'app/types/user'

const EditPassword = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const {handleSubmit, register, errors, watch, reset} =
    useForm<IEditPassword>()
  const watchPassword = watch('newPassword')
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserPassword(token)
  return (
    <Panel index={3} isSelectedTab={isSelectedTab}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col h-auto justify-between p-1'
      >
        <h2 className='text-2xl mb-4'>Change password</h2>
        <article className='h-auto flex flex-col justify-evenly mb-8'>
          <FormInput
            type='password'
            id='currentPassword'
            name='currentPassword'
            label='Current Password'
            placeholder='please enter your current password'
            register={register({
              required: 'password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'please enter a valid password',
              },
            })}
            errors={errors}
          />
          <FormInput
            type='password'
            id='newPassword'
            name='newPassword'
            label='New Password'
            placeholder='please enter a new password'
            register={register({
              required: 'new password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'please enter a valid password',
              },
            })}
            errors={errors}
          />
          <FormInput
            type='password'
            id='newPasswordConfirm'
            name='newPasswordConfirm'
            label='Confirm New Password'
            placeholder='please confirm your new password'
            register={register({
              validate: value =>
                value === watchPassword || 'passwords must match',
            })}
            errors={errors}
          />
        </article>
        <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
          <CancelButton onClickAction={() => reset()} />
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
      {isSuccess && (
        <SnackBar
          color='green'
          message={successMessage}
          onClose={handleClose}
        />
      )}
    </Panel>
  )
}

export default React.memo(EditPassword)
