import * as React from 'react'

import {useForm} from 'react-hook-form'
import useEditUserEmail from '@hooks/edit/useEditUserEmail'

import Panel from '@components/navigation/Tablist/Panel'
import EmailForm from '@components/form/Form/user/Email'
import SnackBar from '@components/notifications/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/navigation'
import type {IEditEmail} from 'app/types/user'

const EditEmail = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const {handleSubmit, register, errors, reset} = useForm<IEditEmail>()
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserEmail(token)
  return (
    <Panel index={2} isSelectedTab={isSelectedTab}>
      <EmailForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
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

export default React.memo(EditEmail)
