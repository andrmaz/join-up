import type {IPositionData} from 'app/types/position'

const PositionContents = ({
  title,
  level,
  role,
  duties,
  qualifications,
  technologies,
}: IPositionData): JSX.Element => (
  <main className='h-5/6'>
    <header className='h-1/6 w-full'>
      <h1 className='font-extrabold text-xl'>{title}</h1>
    </header>
    <article className='h-1/6 flex flex-col justify-evenly text-lg'>
      <p className='h-1/2'>
        <span className='font-semibold'>Level: </span>
        <small className='italic'>{level.label}</small>
      </p>
      <p className='h-1/2'>
        <span className='font-semibold'>Role: </span>
        <small className='italic'>{role.label}</small>
      </p>
    </article>
    <article className='h-3/6'>
      <div className='h-auto'>
        <h3 className='font-extrabold	'>What you&apos;ll do</h3>
        <p className='h-4/6 text-sm'>{duties}</p>
      </div>
      <div className='h-auto'>
        <h3 className='font-extrabold	'>Basic qualifications</h3>
        <p className='h-4/6 text-sm'>{qualifications}</p>
      </div>
    </article>
    <article className='h-1/6 py-2'>
      <p className='text-red-400 break-words'>
        {technologies.map(technology => technology.label)}
      </p>
    </article>
  </main>
)

export default PositionContents
