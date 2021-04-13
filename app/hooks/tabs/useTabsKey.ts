import * as React from 'react'
import type {IPosistionData} from 'app/types/position'

export const useTabsKey = (
  array: IPosistionData[],
  state: number,
  setState: (position: number) => void
): ReadonlyArray<any> => {
  const tabRef = React.useRef<HTMLButtonElement | null>(null)
  //* focus on the correct element programmatically when a user presses either one of the arrow keys
  React.useEffect(() => {
    tabRef.current?.focus()
  }, [state])

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
    const tabToSelect = state === lastTabInRound ? firstTabInRound : nextTab
    setState(tabToSelect)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleKeyPress = (event: React.KeyboardEvent) => {
    const tabCount = array.length - 1

    if (event.key === 'ArrowUp') {
      const last = tabCount
      const next = state - 1
      handleNextTab(last, next, 0)
    }
    if (event.key === 'ArrowDown') {
      const first = 0
      const next = state + 1
      handleNextTab(first, next, tabCount)
    }
  }
  return [handleKeyPress, tabRef] as const
}
