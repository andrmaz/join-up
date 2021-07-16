import {useTabsKey} from '@hooks/tabs/useTabsKey'
import Item from '@components/route/Menu/Item'
import items from '@data/menuItems'
import React from 'react'

const Menu = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number
  setSelectedTab: React.Dispatch<React.SetStateAction<typeof selectedTab>>
}): JSX.Element => {
  const [handleKeyPress, tabRef] = useTabsKey(
    items.length - 1,
    selectedTab,
    setSelectedTab
  )
  return (
    <nav className='h-4/5 p-4'>
      <ul
        role='tablist'
        aria-label='tabs'
        onKeyDown={handleKeyPress}
        className='h-3/5 flex flex-col'
      >
        <li className='h-12 border-gray-400 border-2 p-2 text-center'>
          <h3>Account Settings</h3>
        </li>
        {items.map(({value, label}, index) => (
          <Item
            key={value}
            label={label}
            index={index}
            tabRef={tabRef}
            isSelectedTab={selectedTab === index}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
    </nav>
  )
}

export default Menu
