import * as React from 'react'

import {useForm} from 'react-hook-form'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useRefCallback from '@hooks/ref/useRefCallback'
import {usePositionContext} from '@hooks/position/usePositionContext'

import {addPositionWithToken} from '@api/fetchWithToken'

import Modal from '@components/screens/Modal/Modal'

import PositionForm from '@components/form/Form/Position'
import CloseModalButton from '@components/form/Button/Close'

import type {IPositionInput} from 'app/types/position'
import type {PositionResponseType} from 'app/types/response'

const NewPosition = ({
  projectId,
  showModal,
  setShowModal,
}: {
  projectId: number
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<typeof showModal>>
}): JSX.Element => {
  const token = useSessionCookie()
  const {dispatch} = usePositionContext()
  const {register, handleSubmit, control, setValue, reset, errors} =
    useForm<IPositionInput>()
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  const onSubmit = (data: IPositionInput): Promise<PositionResponseType> =>
    addPositionWithToken(data, token)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: 'add', payload: response.data.position})
          setShowModal(false)
          return Promise.resolve(response.data)
        }
        return response.data
      })
      .catch(err => Promise.reject(err))
  return (
    <React.Fragment>
      {showModal && (
        <Modal height='4/5'>
          <div className='h-1/10 flex justify-between'>
            <h2
              id='dialog_label'
              tabIndex={-1}
              ref={setRef}
              className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
            >
              Add a new position
            </h2>
            <CloseModalButton
              onClickAction={() => setShowModal(false)}
              focusRef={focusTrapRef}
            />
          </div>
          <PositionForm
            id={projectId}
            token={token}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            reset={reset}
            onKeyDown={() => focusTrapRef.current?.focus()}
          />
        </Modal>
      )}
    </React.Fragment>
  )
}

export default NewPosition
