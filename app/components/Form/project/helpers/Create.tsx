import useAddProject from '@hooks/project/useAddProject'
import ProjectForm from '@components/Form/project/Form'

const CreateProjectForm = ({token}: {token: string}): JSX.Element => {
  const onSubmit = useAddProject(token)
  return <ProjectForm onSubmit={onSubmit} />
}

export default CreateProjectForm
