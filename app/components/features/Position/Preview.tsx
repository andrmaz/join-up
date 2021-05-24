import * as React from 'react'
import Tab from '@components/navigation/Tablist/Tab'
import type {IPosistionData} from 'app/types/position'

const PositionPreview = ({
  index,
  isSelectedTab,
  setSelectedTab,
  tabRef,
  position: {title, createdAt, vacancies, updatedAt},
}: {
  index: number
  isSelectedTab: boolean
  setSelectedTab: (position: number) => void
  tabRef: React.Ref<never>
  position: IPosistionData
}): React.ReactElement => (
  <Tab
    isSelectedTab={isSelectedTab}
    index={index}
    tabRef={tabRef}
    setSelectedTab={setSelectedTab}
  >
    <li className='h-28 p-1 mx-2 border-gray-300 border-2 rounded'>
      <header className='h-2/5'>
        <h4 className='font-semibold text-sm'>{title}</h4>
      </header>
      <article className='h-1/5 text-sm'>
        <span>Created at: {createdAt.slice(0, 7)}</span>
      </article>
      <article className='h-2/5 flex flex-col justify-start'>
        <span className='text-xs'>Positions available: {vacancies}</span>
        <span className='text-xs'>Last update: {updatedAt.slice(0, 7)}</span>
      </article>
    </li>
  </Tab>
)

export default React.memo(PositionPreview)
