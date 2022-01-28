import * as React from 'react'

import {render, screen} from 'test-utils'

import { DateSelect } from '@components/Select/Date'
import {DrawerInputsType} from 'app/types/components'

const props: DrawerInputsType = {
  register: jest.fn(),
  isPending: false,
}

it('renders a date select', () => {
    render(<DateSelect {...props} />)
    expect(screen.getByRole('combobox', {name: /date/i})).toBeInTheDocument()
})
it('can select a date option', () => {
  render(<DateSelect {...props} />)
  expect(screen.getByRole('combobox')).not.toBeDisabled()
})
it('cannot select a date option', () => {
  render(<DateSelect {...props} isPending={true} />)
  expect(screen.getByRole('combobox')).toBeDisabled()
})
