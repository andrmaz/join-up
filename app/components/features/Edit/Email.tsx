import * as React from 'react'

import {useForm} from 'react-hook-form'
import useEditUserEmail from '@hooks/edit/useEditUserEmail'

import Panel from '@components/navigation/Tablist/Panel'
import FormInput from '@components/form/Input/Form'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'
import SnackBar from '@components/notifications/SnackBar/SnackBar'

import type {SettingPanelProps} from 'app/types/navigation'
import type {IEditEmail} from 'app/types/edit'

const EditEmail = ({token, isSelectedTab}: SettingPanelProps): JSX.Element => {
  const {handleSubmit, register, errors, reset} = useForm<IEditEmail>()
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserEmail(token)
  return (
    <Panel index={2} isSelectedTab={isSelectedTab}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col h-auto justify-between p-1'
      >
        <h2 className='text-2xl mb-4'>Change email</h2>
        <article className='h-auto flex flex-col justify-evenly mb-8'>
          <FormInput
            type='email'
            id='email'
            name='newEmail'
            label='Email'
            placeholder='please enter a new email'
            register={register({
              required: 'email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'please enter a valid email address',
              },
            })}
            errors={errors}
          />
          <FormInput
            type='password'
            id='password-email'
            name='password'
            label='Password'
            placeholder='please enter your password'
            register={register({
              required: 'password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'please enter a valid password',
              },
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
              errors={Boolean(errors.newEmail || errors.password)}
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

export default React.memo(EditEmail)
