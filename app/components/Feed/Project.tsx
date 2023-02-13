import * as React from 'react'

import type {IProjectData} from 'app/types/project'
import Link from 'next/link'

function ProjectFeed(props: IProjectData): JSX.Element {
  return (
    <li className='h-full min-w-1/4 border-2 v-1 mx-1 p-2 rounded overflow-hidden	'>
      <Link href={`/projects/${props.id}`} passHref replace>
        <h3 className='font-bold text-sm truncate '>{props.name}</h3>
      </Link>
      <p className='max-h-3.5 font-semibold text-xs break-words truncate '>
        {props.mission}
      </p>
      <p className='max-h-3.5 font-semibold text-xs break-words overflow-clip overflow-hidden'>
        {props.description}
      </p>
    </li>
  )
}

export default ProjectFeed
