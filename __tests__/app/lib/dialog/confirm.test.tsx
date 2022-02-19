import {render, screen} from 'test-utils'

import Dialog from '@lib/Dialog'
import type {DialogType} from 'app/types/components'
import faker from 'faker'

const message = faker.lorem.sentence()
const props: DialogType = {
  handleConfirm: jest.fn(),
  message,
}

it('renders a dialog displaying a message', () => {
  render(<Dialog {...props} />)
  expect(screen.getByRole('article').innerHTML).toBe(message)
})
