import * as React from 'react'

import {ComponentMeta, ComponentStory} from '@storybook/react'

import {ConfirmButton} from './Confirm'

export default {
  title: 'Button',
  component: ConfirmButton,
} as ComponentMeta<typeof ConfirmButton>

const Template: ComponentStory<typeof ConfirmButton> = args => (
  <ConfirmButton {...args} />
)

export const Confirm = Template.bind({})
Confirm.args = {
  children: 'Confirm',
  errors: false,
  variant: 'success',
  onClick: () => console.log('Confirm clicked'),
}
