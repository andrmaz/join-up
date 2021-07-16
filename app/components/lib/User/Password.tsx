import * as React from 'react'

import {useForm} from 'react-hook-form'
import useEditUserPassword from '@hooks/edit/useEditUserPassword'

import Panel from '@components/navigation/Tablist/Panel'
import PasswordForm from '@components/form/Form/user/Password'
import SnackBar from '@components/notification/SnackBar/SnackBar'

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
      <PasswordForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
        watchPassword={watchPassword}
      />
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
