import {useForm} from 'react-hook-form'

import useAddProject from '@hooks/add/useAddProject'
import ProjectFormContents from './Contents'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IProjectInput} from 'app/types/project'

const CreateProjectForm = ({token}: {token: string}): JSX.Element => {
  const {register, handleSubmit, errors, control, setValue, reset} =
    useForm<IProjectInput>()
  const onSubmit = useAddProject(token)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-5/6 justify-evenly'
    >
      <ProjectFormContents
        token={token}
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
        <CancelButton onClickHandler={() => reset()} />
      </div>
    </form>
  )
}

export default CreateProjectForm
