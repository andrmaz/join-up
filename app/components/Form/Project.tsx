import * as React from 'react'

import FocusButton from '@components/Button/Focus'
import type {IProjectForm} from 'app/types/form'
import type {IProjectInput} from 'app/types/project'
import InputSubmit from '@lib/Input/Submit'
import TechSelect from '@components/Select/Tech'
import TextInput from '@lib/Input/Text'
import TitleInput from '@lib/Input/Title'
import UrlInput from '@components/Input/Url'
import {useForm} from 'react-hook-form'
import {descriptionRegisterOptions, titleRegisterOptions} from '@data/register'

const ProjectForm = ({project, onSubmit}: IProjectForm): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
    setValue,
    reset,
  } = useForm<IProjectInput>()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-144 justify-evenly'
    >
      <TitleInput
        id='name'
        name='name'
        defaultValue={project?.name}
        inputProps={register('name', titleRegisterOptions)}
        errors={errors}
      />
      <TextInput
        id='description'
        name='description'
        defaultValue={project?.description}
        inputProps={register('description', descriptionRegisterOptions)}
        errors={errors}
      />
      <TextInput
        id='mission'
        name='mission'
        label='Mission'
        defaultValue={project?.mission}
        inputProps={register('mission')}
        errors={errors}
      />
      <div className='h-1/6 flex flex-col mb-6'>
        <TechSelect
          control={control}
          defaultValues={project?.technologies}
          defaultValue={project?.technologies}
          setValue={setValue}
          errors={errors}
        />
      </div>
      <UrlInput
        id='projectURL'
        name='projectURL'
        inputProps={register('projectURL')}
        defaultValue={project?.projectURL}
        errors={errors}
      />
      <div className='h-1/6 flex items-end'>
        <div className='w-16 p-1'>
          <InputSubmit
            value='Save'
            bgColor='green-600'
            disabled={Boolean(
              errors.name || errors.description || errors.technologies
            )}
          />
        </div>
        <FocusButton onClick={reset} />
      </div>
    </form>
  )
}

export default ProjectForm
