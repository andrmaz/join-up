import useAddProject from '@hooks/project/useAddProject'
import ProjectForm from '@components/Form/project/Form'

const CreateProjectForm = (): JSX.Element => {
  const onSubmit = useAddProject()
  return <ProjectForm onSubmit={onSubmit} />
}

export default CreateProjectForm
