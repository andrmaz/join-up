import type {IPosistionData} from 'app/types/position'

const PositionPanel = ({
  title,
  description,
  technologies,
  vacancies,
  level,
  role,
  createdAt,
  updatedAt,
}: IPosistionData): JSX.Element => {
  return (
    <div className='h-5/6 w-full border-2 border-black p-2 rounded'>
      <header className='h-1/10 w-full'>
        <h1 className='font-extrabold text-xl'>{title}</h1>
      </header>
      <article className='h-4/5 flex flex-col justify-evenly text-lg'>
        <span className='h-1/10'>Created at: {createdAt.slice(0, 7)}</span>
        <span className='h-1/10'>Positions available: {vacancies}</span>
        <span className='h-1/10'>Level: {level}</span>
        <span className='h-1/10'>Role: {role}</span>
        <p className='h-1/2'>{description.slice(0, 300)}</p>
        <p className='h-1/10 text-red-400 break-words'>
          {technologies?.toString()}
        </p>
      </article>
      <aside className='h-1/10 flex justify-end'>
        <span>
          Last update:
          {updatedAt.slice(0, 7)}
        </span>
      </aside>
    </div>
  )
}

export default PositionPanel
