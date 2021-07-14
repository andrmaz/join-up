import * as React from 'react'

import {useForm} from 'react-hook-form'
import useRefCallback from '@hooks/ref/useRefCallback'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useEditPosition from '@hooks/edit/useEditPosition'

import Modal from '@components/screens/Modal/Modal'

import PositionForm from '@components/form/Form/Position'
import CloseModalButton from '@components/form/Button/Close'

import type {EditPositoinType, IPositionInput} from 'app/types/position'

const EditPosition = ({
  position: {
    id,
    title,
    duties,
    qualifications,
    technologies,
    level,
    role,
    vacancies,
    projectId,
  },
  showModal,
  setShowModal,
}: EditPositoinType): React.ReactElement => {
  const token = useSessionCookie()
  const {register, handleSubmit, control, setValue, reset, errors} =
    useForm<IPositionInput>()
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  const onSubmit = useEditPosition(token, id, projectId, setShowModal)
  return (
    <React.Fragment>
      {showModal && (
        <Modal height='3/4'>
          <header className='h-16 flex justify-between'>
            <h2
              id='dialog_label'
              tabIndex={-1}
              ref={setRef}
              className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
            >
              Edit your position data here
            </h2>
            <CloseModalButton
              onClickAction={() => setShowModal(false)}
              focusRef={focusTrapRef}
            />
          </header>
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
            defaultValues={{
              title,
              duties,
              qualifications,
              technologies,
              level,
              role,
              vacancies,
            }}
          />
        </Modal>
      )}
    </React.Fragment>
  )
}

export default EditPosition
