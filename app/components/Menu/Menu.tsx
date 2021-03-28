import {ProfileMenuItem} from '@components/Menu/Item'

const ProfileMenu = (): JSX.Element => (
  <section className='h-4/5 p-4'>
    <article className='h-3/5 flex flex-col'>
      <ProfileMenuItem value='Account Settings' />
      <ProfileMenuItem value='Profile' />
      <ProfileMenuItem value='Account' />
      <ProfileMenuItem value='Emails' />
      <ProfileMenuItem value='Notifications' />
      <ProfileMenuItem value='Security Logs' />
    </article>
    <article className='h-2/5 flex flex-col'>
      <ProfileMenuItem value='Moderation settings' />
      <ProfileMenuItem value='Blocked users' />
    </article>
  </section>
)

export default ProfileMenu
