import * as React from 'react'

export default function useRefCallback(): readonly [
  (node: HTMLInputElement) => void
] {
  const ref = React.useRef<HTMLInputElement | null>(null)
  const setRef = React.useCallback(node => {
    if (ref.current) {
      //* Make sure to cleanup any events/references added to the last instance
      ref.current = null
    }
    //* Check if a node is actually passed. Otherwise node would be null.
    if (node) {
      //* Save a reference to the node
      ref.current = node
      ref.current?.focus()
    }
  }, [])

  return [setRef] as const
}
