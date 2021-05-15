import {useTabsKey} from '@hooks/tabs/useTabsKey'

const items = [
  {value: 'profile', label: 'Profile'},
  {value: 'username', label: 'Username'},
  {value: 'emails', label: 'Emails'},
  {value: 'password', label: 'Password'},
  {value: 'notifications', label: 'Notifications'},
  {value: 'security logs', label: 'Security Logs'},
]

const Menu = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number
  setSelectedTab: (position: number) => void
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
        <li className='h-12 border-gray-400 border-2 p-2'>
          <span>Account Settings</span>
        </li>
        {items.map(({value, label}, index) => (
          <button
            key={value}
            role='tab'
            aria-selected={selectedTab === index}
            aria-controls={`panel-${index}`}
            id={`tab-${index}`}
            tabIndex={selectedTab === index ? 0 : -1}
            ref={selectedTab === index ? tabRef : null}
            onClick={() => setSelectedTab(index)}
            className='w-full focus:bg-opacity-10'
          >
            <li className='flex h-12 border-gray-400 border-2'>
              <div
                className={`w-2 ${selectedTab === index && 'bg-yellow-500'}`}
              />
              <span className='w-full'>{label}</span>
            </li>
          </button>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
