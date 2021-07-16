import * as React from 'react'
import {useForm} from 'react-hook-form'
import useEditUsername from '@hooks/edit/useEditUsername'

import Panel from '@components/route/Tablist/Panel'
import UsernameForm from '@components/Form/user/Username'
import SnackBar from '@components/lib/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/navigation'
import type {IEditUsername} from 'app/types/user'

const EditUsername = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const {handleSubmit, register, errors, reset} = useForm<IEditUsername>()
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUsername(token)
  return (
    <Panel index={1} isSelectedTab={isSelectedTab}>
      <UsernameForm
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

export default React.memo(EditUsername)
