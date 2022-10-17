import { render, screen } from 'test-utils'

import {FieldErrors} from 'react-hook-form'
import FormInput from '@lib/Input/Form'
import type { IFormInput } from 'app/types/form'
import { faker } from '@faker-js/faker';

const name =faker.lorem.word()
const id =faker.lorem.word()
const type: React.HTMLInputTypeAttribute = 'email'
const label = faker.lorem.word()
const defaultValue = faker.internet.email()
const placeholder = faker.lorem.sentence()
const register = jest.fn()

const message = faker.lorem.sentence()
const errors: FieldErrors = {[name]: {message}}

const props: IFormInput = {
  name,
  optional: false,
  label,
  id,
  type,
  defaultValue,
  placeholder,
  register,
  errors: {},
}

it('renders a form input', () => {
  render(<FormInput {...props} />)
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})
it('renders the placeholder text', () => {
    render(<FormInput {...props} />)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
})
it('does not render the optional label', () => {
  render(<FormInput {...props} />)
  expect(screen.queryByText(`${label} : (optional)`)).not.toBeInTheDocument()
})
it('renders the optional label', () => {
  render(<FormInput {...props} optional />)
  expect(screen.getByText(`${label} : (optional)`)).toBeInTheDocument()
})
it('does not render an error message', () => {
  render(<FormInput {...props}/>)
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})
it('renders an error message', () => {
    render(<FormInput {...props} errors={errors} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
})
