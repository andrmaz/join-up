import {useForm} from 'react-hook-form'

import useEditProject from '@hooks/edit/useEditProject'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useModalContext from '@hooks/modal/useModalContext'

import ProjectForm from '@components/Form/project/Form'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IProjectData} from 'app/types/project'

const EditProjectForm = ({
  onKeyDown,
  project,
}: {
  onKeyDown: () => void
  project: IProjectData
}): JSX.Element => {
  const token = useSessionCookie()
  const {setIsOpen} = useModalContext()
  const {register, handleSubmit, errors, control, setValue, reset} =
    useForm<IProjectData>()
  const onSubmit = useEditProject(token, project?.id, setIsOpen)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-144 justify-evenly'
    >
      <ProjectForm
        token={token}
        project={project}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
      />
      <div className='h-1/6 flex items-end'>
        <div className='w-16 p-1'>
          <SubmitButton
            value='Save'
            bgColor='green-600'
            errors={Boolean(
              errors.name || errors.description || errors.technologies
            )}
          />
        </div>
        <CancelButton
          onClickHandler={() => reset()}
          onKeyDownHandler={onKeyDown}
        />
      </div>
    </form>
  )
}

export default EditProjectForm
