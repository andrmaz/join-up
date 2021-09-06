import * as React from 'react'

export default function Carousel<T>({children}: {children: T[]}): JSX.Element {
  return (
    <article className='h-3/10 w-full my-4'>
      <h2 className='h-1/5'>
        Here you are some suggestions according to your profile
      </h2>
      <ul className='flex h-4/5 overflow-x-auto'>{children}</ul>
    </article>
  )
}
