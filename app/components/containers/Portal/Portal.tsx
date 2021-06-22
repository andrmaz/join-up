import * as React from 'react'
import ReactDOM from 'react-dom'

const Portal = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactPortal | null => {
  const [isBrowser, setIsBrowser] = React.useState<boolean>(false)
  React.useEffect(() => {
    //* You now have access to `window`
    setIsBrowser(true)
    //* clean up after this effect
    return () => setIsBrowser(false)
  }, [])

  //* On the initial load of the page, the rendering happens on the server,
  //* where the window.document object is not available
  //* So we need to make sure that, we use the document object safely only in the browser environment
  return isBrowser
    ? //* We assume `modal_root` exists with '!'
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ReactDOM.createPortal(children, document.getElementById('modal_root')!)
    : null
}

export default Portal
