const UserAvatar = ({image}: {image: string | undefined}): JSX.Element => (
  <img
    className='h-full w-full rounded-full object-cover'
    src={image}
    alt='user'
  />
)
export default UserAvatar
