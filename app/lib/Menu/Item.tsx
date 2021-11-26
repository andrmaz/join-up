import * as React from 'react'

import type {IMenuItem} from 'app/types/components'
import Tab from '@lib/Tablist/Tab'

const Item = ({
  label,
  index,
  tabRef,
  isSelectedTab,
  setSelectedTab,
}: IMenuItem): React.ReactElement => (
  <Tab
    index={index}
    tabRef={tabRef}
    isSelectedTab={isSelectedTab}
    setSelectedTab={setSelectedTab}
  >
    <li className='flex h-12 border-gray-400 border-2'>
      <div className={`w-2 ${isSelectedTab && 'bg-yellow-500'}`} />
      <span className='w-full'>{label}</span>
    </li>
  </Tab>
)

export default React.memo(Item)
