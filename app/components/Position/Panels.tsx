import PositionPanel from '@components/Position/Panel'
import type {IPosistionData} from 'app/types/position'

const PositionPanels = ({
  positions,
  selectedTab,
}: {
  positions: IPosistionData[]
  selectedTab: number
}): React.ReactElement => {
  return (
    <main className='h-full w-full'>
      {positions.map((position, index) => (
        <section
          key={position.id}
          id={`panel-${index}`}
          role='tabpanel'
          tabIndex={0}
          aria-labelledby={`tab-${index}`}
          className='h-full w-full'
          hidden={selectedTab !== index}
        >
          <PositionPanel {...position} />
        </section>
      ))}
    </main>
  )
}

export default PositionPanels
