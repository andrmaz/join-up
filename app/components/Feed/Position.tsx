import * as React from 'react'

import type {IPositionData} from 'app/types/position'
import Link from 'next/link'

function PositionFeed(props: IPositionData): JSX.Element {
  return (
    <article className='carousel-item'>
      <Link href={`/projects/${props.projectId}`} passHref replace>
        <h3 className='font-bold text-sm truncate '>{props.title}</h3>
      </Link>
      <p className='font-semibold text-xs truncate '>{props.qualifications}</p>
      <p className='font-semibold text-xs overflow-clip overflow-hidden'>
        {props.duties}
      </p>
    </article>
  )
}

export default PositionFeed
