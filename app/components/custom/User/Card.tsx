import {useAuthState} from '@hooks/auth/useAuthState'
import {UserInfo} from '@components/custom/User/Info'
import {UserSkills} from '@components/custom/User/Skills'
import {UserLink} from '@components/custom/User/Link'

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
    <section className='sticky top-44 h-70v p-1'>
      <div className='h-3/6 flex items-end'>
        <img className='h-4/5 rounded-full' src={avatar} alt='user' />
      </div>
      <ul className='h-3/6 flex flex-col justify-around text-lg xl:text-xl'>
        <UserInfo value={username} />
        <UserInfo value={email} />
        <UserInfo value={bio} />
        <UserSkills value={languages} />
        <UserSkills value={technologies} />
        <UserLink value={bitbucketURL} />
        <UserLink value={githubURL} />
        <UserLink value={gitlabURL} />
        <UserLink value={linkedinURL} />
      </ul>
    </section>
  )
}

export default UserCard
