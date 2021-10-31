import * as React from 'react'

import type {IPositionData} from 'app/types/position'
import Link from 'next/link'

export default function PositionFeed(props: IPositionData): JSX.Element {
  return (
    <li className='h-full min-w-1/4 border-2 v-1 mx-1 p-2 rounded'>
      <Link href={`/projects/${props.projectId}`} passHref replace>
        <h3 className='font-bold text-sm truncate '>{props.title}</h3>
      </Link>
      <p className='font-semibold text-xs truncate '>{props.qualifications}</p>
      <p className='font-semibold text-xs overflow-clip overflow-hidden'>
        {props.duties}
      </p>
    </li>
  )
}
