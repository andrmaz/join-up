import * as React from 'react'

export const Carousel: React.FC = ({children}): JSX.Element => {
  return (
    <article className='h-64 w-full my-4'>
      <h2 className='h-1/5'>
        Here you are some suggestions according to your profile
      </h2>
      <ul className='flex h-4/5 overflow-x-auto'>{children}</ul>
    </article>
  )
}
