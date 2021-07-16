import * as React from 'react'

import TitleInput from '@components/form/Input/lib/Title'
import TextInput from '@components/form/Input/lib/Text'
import UrlInput from '@components/form/Input/project/Url'
import TechSelect from '@components/form/Select/Tech'
import type {IProjectForm} from 'app/types/form'

const ProjectForm = ({
  token,
  project,
  register,
  errors,
  control,
  setValue,
}: IProjectForm): JSX.Element => (
  <React.Fragment>
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
        token={token}
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
  </React.Fragment>
)

export default ProjectForm
