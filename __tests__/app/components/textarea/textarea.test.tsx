import * as React from 'react'

import {render, screen} from 'test-utils'

import Textarea  from '@components/Textarea/Textarea'
import { faker } from '@faker-js/faker';
import { FormInputType } from 'app/types/form';

const defaultValue = faker.lorem.paragraph()
const name = faker.lorem.word()
const props: FormInputType = {
  id: name,
  name,
  inputProps: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name,
  },
}

it('renders a textarea', () => {
  render(<Textarea {...props} />)
  expect(screen.getByRole('textbox', {name: /bio/i})).toBeInTheDocument()
})
it('does not contain any text', () => {
  render(<Textarea {...props} />)
  expect(screen.getByRole('textbox', {name: /bio/i}).innerText).not.toBe(
    defaultValue
  )
})
it('contains some text', () => {
  render(<Textarea {...props} defaultValue={defaultValue} />)
  expect(screen.getByRole('textbox', {name: /bio/i})).toHaveTextContent(
    defaultValue
  )
})