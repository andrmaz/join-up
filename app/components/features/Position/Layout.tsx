import * as React from 'react'
import PositionTabs from '@components/features/Position/Tabs'
import PositionPanels from '@components/features/Position/Panels'
import type {IPosistionData, PositionActions} from 'app/types/position'

const PositionLayout = ({
  positions,
  dispatch,
}: {
  positions: IPosistionData[]
  dispatch: React.Dispatch<PositionActions>
}): JSX.Element => {
  console.log(dispatch)
  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  return (
    <article className='h-4/6 grid grid-cols-2 divide-x divide-black-500'>
      <PositionTabs
        positions={positions}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <PositionPanels positions={positions} selectedTab={selectedTab} />
    </article>
  )
}

export default PositionLayout
