import * as React from 'react'

export const useTabsKey = (
  tabCount: number,
  tab: number,
  setTab: React.Dispatch<React.SetStateAction<number>>
): readonly [
  (event: React.KeyboardEvent<Element>) => void,
  React.MutableRefObject<HTMLButtonElement | null>
] => {
  const tabRef = React.useRef<HTMLButtonElement | null>(null)
  //* focus on the correct element programmatically when a user presses either one of the arrow keys
  React.useEffect(() => {
    tabRef.current?.focus()
  }, [tab])

  //*** https://dev.to/eevajonnapanula/keyboard-accessible-tabs-with-react-5ch4 */
  //* helper function to handle focusing the correct tab
  /** * @param firstTabInRound The number of the tab that is "first" in the round */
  /** * @param nextTab The tab where the focus should go next if the selected tab is not the last in the round */
  /** * @param lastTabInRound with up arrow, this would be the first tab, and with the down arrow - the last */

  const handleNextTab = (
    firstTabInRound: number,
    nextTab: number,
    lastTabInRound: number
  ): void => {
    const tabToSelect = tab === lastTabInRound ? firstTabInRound : nextTab
    setTab(tabToSelect)
  }
  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'ArrowUp') {
      const last = tabCount
      const next = tab - 1
      handleNextTab(last, next, 0)
    }
    if (event.key === 'ArrowDown') {
      const first = 0
      const next = tab + 1
      handleNextTab(first, next, tabCount)
    }
  }
  return [handleKeyPress, tabRef] as const
}
