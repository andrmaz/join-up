import * as React from 'react'

import type {IApplicationData} from 'app/types/application'
import Link from 'next/link'

function ApplicationFeed(props: IApplicationData): JSX.Element {
  return (
    <article className='carousel-item'>
      <Link href={`/projects/${props.position.projectId}`} passHref replace>
        <span className='text-xs'>
          {props.user.username} has just applied to {props.position.title}
        </span>
      </Link>
    </article>
  )
}

export default ApplicationFeed
