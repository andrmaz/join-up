import * as React from 'react'
import PositionTab from '@components/Position/Tab'
import type {IPosistionData} from 'app/types/position'

const PositionTabs = ({
  positions,
  setSelectedPosition,
}: {
  positions: IPosistionData[]
  setSelectedPosition: (position: IPosistionData) => void
}): React.ReactElement => {
  //const tabRef = React.useRef(null)
  return (
    <section className='w-full h-auto p-1'>
      <ul
        role='tablist'
        aria-label='tabs'
        //TODO: Improve accessibility
        //onKeyDown={e => {}}
        className='h-auto'
      >
        {positions.map(position => (
          <button
            key={position._id}
            role='tab'
            aria-selected={true}
            aria-controls='panel'
            id={position._id}
            //tabIndex={selectedPosition._id === position._id ? 0 : -1}
            //ref={tabRef}
            onClick={() => setSelectedPosition(position)}
            className='w-full'
          >
            <PositionTab {...position} />
          </button>
        ))}
      </ul>
    </section>
  )
}

export default PositionTabs
