import * as React from 'react'

import PositionPanels from '@screens/Position/Panels'
import type {PositionStateType} from 'app/types/position'
import PositionTabs from '@screens/Position/Tabs'

const PositionTablist = ({positions}: PositionStateType): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  return (
    <article className='h-3/5 grid grid-cols-2 divide-x divide-black-500'>
      <PositionTabs
        positions={positions}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <PositionPanels positions={positions} selectedTab={selectedTab} />
    </article>
  )
}

export default PositionTablist
