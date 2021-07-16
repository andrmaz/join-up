import * as React from 'react'

import {useForm} from 'react-hook-form'
import useEditUserData from '@hooks/user/useEditUserData'

import Panel from '@components/route/Tablist/Panel'
import SnackBar from '@components/lib/SnackBar/SnackBar'
import ProfileForm from '@components/Form/user/Profile'

import type {PanelPropsType} from 'app/types/components'
import type {IUserContext} from 'app/types/user'

const EditProfile = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const {handleSubmit, register, errors, control, setValue, reset} =
    useForm<IUserContext>()
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserData(token)
  return (
    <Panel index={0} isSelectedTab={isSelectedTab}>
      <ProfileForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        reset={reset}
        control={control}
        setValue={setValue}
        token={token}
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

export default React.memo(EditProfile)
