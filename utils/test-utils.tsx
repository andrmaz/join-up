import * as React from 'react'

import {RenderOptions, RenderResult, render} from '@testing-library/react'

import {ModalProvider} from '@providers/ModalProvider'

const AllTheProviders: React.FC = ({children}) => {
  return <ModalProvider>{children}</ModalProvider>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, {wrapper: AllTheProviders, ...options})

/* Cleanup is called after each test automatically by default */

export * from '@testing-library/react'
export {customRender as render}
