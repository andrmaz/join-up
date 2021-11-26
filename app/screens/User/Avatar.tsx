const UserAvatar = ({image}: {image: string | undefined}): JSX.Element => (
  <img className='rounded-full object-cover' src={image} alt='user' />
)
export default UserAvatar
