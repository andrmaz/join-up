import {useAuthState} from '@hooks/useAuthState'
import {ProfileInfo} from '@components/User/Info'
import {ProfileList} from '@components/User/List'
import {ProfileLink} from '@components/User/Link'

const UserCard = (): JSX.Element => {
  const {user} = useAuthState()
  const {
    avatar,
    username,
    email,
    bio,
    languages,
    technologies,
    bitbucketURL,
    githubURL,
    gitlabURL,
    linkedinURL,
  } = {...user}
  return (
    <section className='h-70v p-1'>
      <div className='h-3/6 flex items-end'>
        <img className='h-4/5 rounded-full' src={avatar} alt='profile' />
      </div>
      <ul className='h-3/6 flex flex-col justify-around text-lg xl:text-xl'>
        <ProfileInfo value={username} />
        <ProfileInfo value={email} />
        <ProfileInfo value={bio} />
        <ProfileList value={languages} />
        <ProfileList value={technologies} />
        <ProfileLink value={bitbucketURL} />
        <ProfileLink value={githubURL} />
        <ProfileLink value={gitlabURL} />
        <ProfileLink value={linkedinURL} />
      </ul>
    </section>
  )
}

export default UserCard
