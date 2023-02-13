import type {IProjectData} from 'app/types/project'
import ProjectForm from '@components/Form/Project'
import useEditProject from '@hooks/project/useEditProject'

const EditProjectForm = ({project}: {project: IProjectData}): JSX.Element => {
  const [onSubmit] = useEditProject(project?.id)
  return <ProjectForm project={project} onSubmit={onSubmit} />
}

export default EditProjectForm
