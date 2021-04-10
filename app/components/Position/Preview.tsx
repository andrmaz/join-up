import type {IPosistionData} from 'app/types/position'

const PositionPreview = ({
  title,
  positions,
  createdAt,
  updatedAt,
}: IPosistionData): JSX.Element => (
  <li className='h-28 p-1 mx-2 border-gray-300 border-2 rounded'>
    <header className='h-2/5'>
      <h4 className='font-semibold text-sm'>{title}</h4>
    </header>
    <article className='h-1/5 text-sm'>
      <span>Created at: {createdAt.slice(0, 7)}</span>
    </article>
    <article className='h-2/5 flex flex-col justify-start'>
      <span className='text-xs'>Positions available: {positions}</span>
      <span className='text-xs'>Last update: {updatedAt.slice(0, 7)}</span>
    </article>
  </li>
)

export default PositionPreview
