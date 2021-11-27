import * as React from 'react'

import {ComponentMeta, ComponentStory} from '@storybook/react'

import {ConfirmDialog} from './Confirm'
import {ModalProvider} from '@providers/ModalProvider'

export default {
  title: 'Dialog',
  component: ConfirmDialog,
} as ComponentMeta<typeof ConfirmDialog>

const Template: ComponentStory<typeof ConfirmDialog> = args => (
  <ModalProvider>
    <ConfirmDialog {...args} />
  </ModalProvider>
)

export const Confirm = Template.bind({})
Confirm.args = {
  message: 'Please Confirm',
  variant: 'success',
  handleConfirm: () => console.log('Confirm clicked'),
}
