import * as React from 'react'

import {ComponentMeta, ComponentStory} from '@storybook/react'

import Item from '@lib/Menu/Item'

export default {
  title: 'Item',
  component: Item,
} as ComponentMeta<typeof Item>

const Template: ComponentStory<typeof Item> = args => <Item {...args} />

export const Selected = Template.bind({})
Selected.args = {
  label: 'Label',
  index: 1,
  isSelectedTab: true,
}
export const Unselected = Template.bind({})
Unselected.args = {
  label: 'Label',
  index: 2,
  isSelectedTab: false,
}
