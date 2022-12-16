import * as React from 'react'

import {FocusButton} from '@components/Button/Focus'
import type {IProjectForm} from 'app/types/form'
import type {IProjectInput} from 'app/types/project'
import {InputSubmit} from '@lib/Input/Submit'
import TechSelect from '@components/Select/Tech'
import TextInput from '@lib/Input/Text'
import TitleInput from '@lib/Input/Title'
import UrlInput from '@components/Input/Url'
import {useForm} from 'react-hook-form'

const ProjectForm = ({project, onSubmit}: IProjectForm): JSX.Element => {
  const {register, handleSubmit, errors, control, setValue, reset} =
    useForm<IProjectInput>()
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-144 justify-evenly'
    >
      <TitleInput
        id='name'
        name='name'
        defaultValue={project?.name}
        register={register}
        errors={errors}
      />
      <TextInput
        defaultValue={project?.description}
        register={register}
        errors={errors}
      />
      <TextInput
        id='mission'
        name='mission'
        label='Mission'
        defaultValue={project?.mission}
        register={register}
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
        defaultValue={project?.projectURL}
        register={register}
        errors={errors}
      />
      <div className='h-1/6 flex items-end'>
        <div className='w-16 p-1'>
          <InputSubmit
            value='Save'
            bgColor='green-600'
            errors={Boolean(
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
