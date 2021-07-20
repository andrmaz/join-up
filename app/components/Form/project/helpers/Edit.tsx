import useEditProject from '@hooks/project/useEditProject'
import ProjectForm from '@components/Form/project/Form'
import type {IProjectData} from 'app/types/project'

const EditProjectForm = ({project}: {project: IProjectData}): JSX.Element => {
  const onSubmit = useEditProject(project?.id)
  return <ProjectForm project={project} onSubmit={onSubmit} />
}

export default EditProjectForm
