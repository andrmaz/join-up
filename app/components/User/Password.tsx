import * as React from 'react'

import {useForm} from 'react-hook-form'
import useEditUserPassword from '@hooks/user/useEditUserPassword'

import Panel from '@components/route/Tablist/Panel'
import PasswordForm from '@components/Form/user/Password'
import SnackBar from '@components/lib/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/components'
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
