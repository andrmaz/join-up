import {render, screen} from 'test-utils'

import type {IMenuPanel} from 'app/types/components'
import Panel from '@lib/Tablist/Panel'
import faker from 'faker'

const props: IMenuPanel = {
  children: faker.random.word(),
  index: faker.datatype.number(),
  isSelectedTab: true,
}

it('renders a tabpanel', () => {
  render(<Panel {...props} />)
  expect(screen.getByRole('tabpanel')).toBeInTheDocument()
})
it('does not render a tabpanel', () => {
  render(<Panel {...props} isSelectedTab={false} />)
  expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument()
})