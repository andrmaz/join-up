import PositionPreview from '@components/Position/Preview'
import type {IPosistionData} from 'app/types/position'

const PositionList = ({
  items,
}: {
  items: IPosistionData[]
}): React.ReactElement => {
  return (
    <section className='w-full h-auto p-1'>
      <ul className='h-auto'>
        {items.map(position => (
          <PositionPreview key={position._id} {...position} />
        ))}
      </ul>
    </section>
  )
}

export default PositionList
