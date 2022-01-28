import {render, screen} from 'test-utils'

import {ConfirmDialog} from '@lib/Dialog/Confirm'
import type {ConfirmDialogType} from 'app/types/components'
import faker from 'faker'

const message = faker.lorem.sentence()
const props: ConfirmDialogType = {
  handleConfirm: jest.fn(),
  message,
  btnColor: faker.internet.color(),
}

it('renders a dialog displaying a message', () => {
  render(<ConfirmDialog {...props} />)
  expect(screen.getByRole('article').innerHTML).toBe(message)
})
