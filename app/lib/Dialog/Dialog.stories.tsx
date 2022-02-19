import * as React from 'react'

import {ComponentMeta, ComponentStory} from '@storybook/react'

import Dialog from './index'
import {ModalProvider} from '@providers/ModalProvider'

export default {
  title: 'Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>

const Template: ComponentStory<typeof Dialog> = args => (
  <ModalProvider>
    <Dialog {...args} />
  </ModalProvider>
)

export const Success = Template.bind({})
Success.args = {
  message: 'Please Confirm',
  variant: 'success',
  handleConfirm: () => console.log('Confirm clicked'),
}

export const Danger = Template.bind({})
Danger.args = {
  message: 'Are you sure?',
  variant: 'danger',
  handleConfirm: () => console.log('Confirm clicked'),
}
