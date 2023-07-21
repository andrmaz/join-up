import * as React from 'react'

const Carousel: React.FC = ({children}): JSX.Element => {
  return (
    <article className='h-64 w-full my-4'>
      <h2 className='h-1/5'>
        Here you are some suggestions according to your profile
      </h2>
      <div className='carousel carousel-center rounded-box'>{children}</div>
    </article>
  )
}

export default Carousel
