import type {IPosistionData} from 'app/types/position'

const PositionPanel = ({
  _id,
  title,
  description,
  technologies,
  positions,
  createdAt,
  updatedAt,
}: IPosistionData): JSX.Element => {
  return (
    <section
      id='panel'
      role='tabpanel'
      tabIndex={0}
      aria-labelledby={_id}
      className='h-144 w-full border-2 border-black p-2 rounded'
    >
      <header className='h-1/10 w-full'>
        <h1 className='font-extrabold text-xl'>{title}</h1>
      </header>
      <article className='h-4/5 flex flex-col justify-evenly text-lg'>
        <span>Created at: {createdAt.slice(0, 7)}</span>
        <span>Positions available: {positions}</span>
        <p>{description}</p>
        <span className='text-red-400'>{technologies?.toString()}</span>
      </article>
      <aside className='h-1/10 flex justify-end'>
        <span>
          Last update:
          {updatedAt.slice(0, 7)}
        </span>
      </aside>
    </section>
  )
}

export default PositionPanel
