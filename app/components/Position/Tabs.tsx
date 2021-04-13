import * as React from 'react'
import PositionTab from '@components/Position/Tab'
import type {IPosistionData} from 'app/types/position'

const PositionTabs = ({
  positions,
  selectedTab,
  setSelectedTab,
}: {
  positions: IPosistionData[]
  selectedTab: number
  setSelectedTab: (position: number) => void
}): React.ReactElement => {
  const tabRef = React.useRef<HTMLButtonElement | null>(null)

  //* focus on the correct element programmatically when a user presses either one of the arrow keys
  React.useEffect(() => {
    tabRef.current?.focus()
  }, [selectedTab])

  //*** Credits https://dev.to/eevajonnapanula/keyboard-accessible-tabs-with-react-5ch4 */
  //* helper function to handle focusing the correct tab
  /** * @param firstTabInRound The number of the tab that is "first" in the round */
  /** * @param nextTab The tab where the focus should go next if the selected tab is not the last in the round */
  /** * @param lastTabInRound with up arrow, this would be the first tab, and with the down arrow - the last */
  const handleNextTab = (
    firstTabInRound: number,
    nextTab: number,
    lastTabInRound: number
  ): void => {
    const tabToSelect =
      selectedTab === lastTabInRound ? firstTabInRound : nextTab
    setSelectedTab(tabToSelect)
  }
  const handleKeyPress = (event: React.KeyboardEvent): void => {
    const tabCount = positions.length - 1

    if (event.key === 'ArrowUp') {
      const last = tabCount
      const next = selectedTab - 1
      handleNextTab(last, next, 0)
    }
    if (event.key === 'ArrowDown') {
      const first = 0
      const next = selectedTab + 1
      handleNextTab(first, next, tabCount)
    }
  }
  return (
    <section className='w-full h-70v p-1 overflow-y-auto'>
      <ul
        role='tablist'
        aria-label='tabs'
        onKeyDown={handleKeyPress}
        className='h-auto'
      >
        {positions.map((position, index) => (
          <button
            key={position._id}
            role='tab'
            aria-selected={selectedTab === index}
            aria-controls={`panel-${index}`}
            id={`tab-${index}`}
            tabIndex={selectedTab === index ? 0 : -1}
            ref={selectedTab === index ? tabRef : null}
            onClick={() => setSelectedTab(index)}
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
