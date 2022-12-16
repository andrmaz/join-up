import {render, screen} from 'test-utils'

import Snackbar from '@lib/SnackBar/SnackBar'
import { faker } from '@faker-js/faker';

const alert = faker.lorem.sentence()
const props = {
  alert
}

it('renders a snackbar displaying an alert message', () => {
  render(<Snackbar {...props} />)
  expect(screen.getByRole('heading').innerHTML).toBe(alert)
})
