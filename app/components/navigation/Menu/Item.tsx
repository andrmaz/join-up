import * as React from 'react'
import Tab from '@components/navigation/Tablist/Tab'

const Item = ({
  label,
  index,
  tabRef,
  isSelectedTab,
  setSelectedTab,
}: {
  label: string
  index: number
  tabRef: React.Ref<never>
  isSelectedTab: boolean
  setSelectedTab: (position: number) => void
}): React.ReactElement => (
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
