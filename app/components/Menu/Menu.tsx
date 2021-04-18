const Menu = (): JSX.Element => (
  <section className='h-4/5 p-4'>
    <article className='h-3/5 flex flex-col'>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Account Settings</span>
      </div>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Profile</span>
      </div>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Account</span>
      </div>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Emails</span>
      </div>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Notifications</span>
      </div>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Security Logs</span>
      </div>
    </article>
    <article className='h-2/5 flex flex-col'>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Moderation settings</span>
      </div>
      <div className='h-12 border-gray-400 border-2 p-2'>
        <span>Blocked users</span>
      </div>
    </article>
  </section>
)

export default Menu
