import Link from 'next/link'

export const EmptyMessage = (): JSX.Element => (
  <div className='w-full flex justify-center'>
    <span className='text-lg xl:text-2xl text-center tracking-wide'>
      It seems there is not any project yet. <br />
      Click{' '}
      <Link href='/new/project'>
        <a className='underline'>here</a>
      </Link>{' '}
      to create your first project
    </span>
  </div>
)
