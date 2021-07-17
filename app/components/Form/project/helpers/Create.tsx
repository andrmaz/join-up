import useAddProject from '@hooks/project/useAddProject'
import ProjectForm from '@components/Form/project/Form'

const CreateProjectForm = ({token}: {token: string}): JSX.Element => {
  const onSubmit = useAddProject(token)
  return (
    <ProjectForm
      onSubmit={onSubmit}
      onKeyDown={() =>
        console.log('TODO: replace this handler with ref context')
      }
    />
  )
}

export default CreateProjectForm
