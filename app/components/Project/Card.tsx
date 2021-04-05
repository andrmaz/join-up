import Link from 'next/link'
import type {IProjectData} from 'app/types/project'

const ProjectCard = ({
  _id,
  name,
  updatedAt,
  projectURL,
  description,
  technologies,
}: IProjectData): JSX.Element => {
  return (
    <div className='h-48 w-full border-2 border-black p-1 rounded'>
      <header className='h-1/6 w-full inline-flex flex-row justify-between'>
        <Link href={`/projects/${_id}`}>
          <a className='cursor-pointer hover:opacity-60'>{name}</a>
        </Link>
        <span className='text-xs'>
          Last update:
          {updatedAt.slice(0, 7)}
        </span>
      </header>
      <article className='h-4/6'>
        <span className='text-xs'>{projectURL}</span>
        <p className='text-sm'>{description}</p>
      </article>
      <aside className='h-1/6'>
        <div className='h-1/2 text-xs text-red-400'>
          {technologies.filter((_, index) => index < 3).toString()}
        </div>
      </aside>
    </div>
  )
}

export default ProjectCard
