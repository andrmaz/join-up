import * as React from 'react'

import type {PositionPreviewType} from 'app/types/position'
import Tab from '@lib/Tablist/Tab'

const PositionPreview = ({
  index,
  isSelectedTab,
  setSelectedTab,
  tabRef,
  position: {title, createdAt, vacancies, updatedAt},
}: PositionPreviewType): React.ReactElement => (
  <Tab
    isSelectedTab={isSelectedTab}
    index={index}
    tabRef={tabRef}
    setSelectedTab={setSelectedTab}
  >
    <li className='h-28 p-1 mx-2 border-gray-300 border-2 rounded'>
      <header className='h-2/5'>
        <h4 className='font-bold text-sm'>{title}</h4>
      </header>
      <article className='h-3/5 flex flex-col justify-start'>
        <span className='text-xs font-semibold'>
          Created at: <small className='italic'>{createdAt.slice(0, 7)}</small>
        </span>
        <span className='text-xs font-semibold'>
          Positions available: <small className='italic'>{vacancies}</small>
        </span>
        <span className='text-xs font-semibold'>
          Last update: <small className='italic'>{updatedAt.slice(0, 7)}</small>
        </span>
      </article>
    </li>
  </Tab>
)

export default React.memo(PositionPreview)
