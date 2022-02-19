import * as React from 'react'

import {ComponentMeta, ComponentStory} from '@storybook/react'

import Button from '@lib/Button'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Success = Template.bind({})
Success.args = {
  children: 'Confirm',
  errors: false,
  variant: 'success',
  onClick: () => console.log('Confirm clicked'),
}

export const Base = Template.bind({})
Base.args = {
  children: 'Cancel',
  errors: false,
  variant: 'base',
  onClick: () => console.log('Cancel clicked'),
}

export const Danger = Template.bind({})
Danger.args = {
  children: 'Confirm',
  errors: false,
  variant: 'danger',
  onClick: () => console.log('Confirm clicked'),
}
