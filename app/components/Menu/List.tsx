import {MenuItem} from '@components/Menu/Item'

const MenuList = (): JSX.Element => (
  <section className='h-4/5 p-4'>
    <article className='h-3/5 flex flex-col'>
      <MenuItem value='Account Settings' />
      <MenuItem value='Profile' />
      <MenuItem value='Account' />
      <MenuItem value='Emails' />
      <MenuItem value='Notifications' />
      <MenuItem value='Security Logs' />
    </article>
    <article className='h-2/5 flex flex-col'>
      <MenuItem value='Moderation settings' />
      <MenuItem value='Blocked users' />
    </article>
  </section>
)

export default MenuList
