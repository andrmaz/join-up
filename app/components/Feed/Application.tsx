import * as React from 'react'

import type {IApplicationData} from 'app/types/application'
import Link from 'next/link'

export default function ApplicationFeed(props: IApplicationData): JSX.Element {
  return (
    <li className='h-full min-w-1/4 border-2 v-1 mx-1'>
      <Link href={`/projects/${props.position.projectId}`} replace>
        <span>
          {props.user.username} has just applied to {props.position.title}
        </span>
      </Link>
    </li>
  )
}
