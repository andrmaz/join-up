import * as React from 'react'

import {render, screen} from 'test-utils'

import DateSelect  from '@components/Select/Date'
import {DrawerInputsType} from 'app/types/components'
import { faker } from '@faker-js/faker'

const name = faker.lorem.word()
const props: DrawerInputsType = {
  inputProps: {onChange: jest.fn(), onBlur: jest.fn(), ref: jest.fn(), name},
  disabled: false,
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
  render(<DateSelect {...props} disabled={true} />)
  expect(screen.getByRole('combobox')).toBeDisabled()
})
