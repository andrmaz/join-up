import * as React from 'react'
import {useForm} from 'react-hook-form'
import useEditUsername from '@hooks/edit/useEditUsername'

import Panel from '@components/navigation/Tablist/Panel'
import UsernameInput from '@components/form/Input/Username'
import PasswordInput from '@components/form/Input/Password'

import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'
import SnackBar from '@components/notifications/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/navigation'
import type {IEditUsername} from 'app/types/user'

const EditUsername = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const {handleSubmit, register, errors, reset} = useForm<IEditUsername>()
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUsername(token)
  return (
    <Panel index={1} isSelectedTab={isSelectedTab}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col h-auto justify-between p-1'
      >
        <h2 className='text-2xl mb-4'>Change username</h2>
        <article className='h-auto flex flex-col justify-evenly mb-8'>
          <UsernameInput
            name='newUsername'
            register={register}
            errors={errors}
          />
          <PasswordInput
            id='username-pwd'
            register={register}
            errors={errors}
          />
        </article>
        <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
          <CancelButton onClickAction={() => reset()} />
          <div className='w-16 p-1'>
            <SubmitButton
              value='Save'
              bgColor='green-600'
              errors={Boolean(errors.newUsername || errors.password)}
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

export default React.memo(EditUsername)
