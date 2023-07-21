import {render, screen} from 'test-utils'

import Dialog from '@lib/Dialog'
import type {DialogType} from 'app/types/components'
import { faker } from '@faker-js/faker';

const message = faker.lorem.sentence()
const props: DialogType = {
  handleConfirm: jest.fn(),
  message,
}

it('renders a dialog displaying a message', () => {
  render(<Dialog {...props} />)
  expect(screen.getByRole('article', {hidden: true}).innerHTML).toBe(message)
})
