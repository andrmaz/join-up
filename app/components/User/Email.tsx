import * as React from 'react'

import {useForm} from 'react-hook-form'
import useEditUserEmail from '@hooks/user/useEditUserEmail'

import Panel from '@components/route/Tablist/Panel'
import EmailForm from '@components/Form/user/Email'
import SnackBar from '@components/lib/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/components'
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
