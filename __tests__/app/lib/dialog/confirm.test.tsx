import {render, screen} from 'test-utils'

import {ConfirmDialog} from '@lib/Dialog/Confirm'
import faker from 'faker'

const message = faker.lorem.sentence()
const props = {
    handleConfirm: jest.fn(),
    message,
    btnColor: faker.internet.color()
}

it('renders a dialog displaying a message', () => {
  render(<ConfirmDialog {...props} />)
  expect(screen.getByRole('article').innerHTML).toBe(message)
})
