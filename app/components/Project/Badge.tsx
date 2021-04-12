import type {IProjectData} from 'app/types/project'

const ProjectBadge = ({
  name,
  projectURL,
  description,
}: IProjectData): JSX.Element => {
  return (
    <div className='h-28 w-full border-b-2 border-gray-400'>
      <header className='h-1/4 w-full'>
        <h2 className='font-black text-xl'>{name}</h2>
      </header>
      <article className='h-3/4'>
        <a className='text-sm' href={projectURL}>
          {projectURL}
        </a>
        <p className='text-sm'>{description}</p>
      </article>
    </div>
  )
}

export default ProjectBadge
