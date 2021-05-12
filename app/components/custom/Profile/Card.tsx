import {useAuthState} from '@hooks/auth/useAuthState'
import {ProfileInfo} from '@components/custom/Profile/Info'
import {ProfileSkills} from '@components/custom/Profile/Skills'
import {ProfileLink} from '@components/custom/Profile/Link'

const ProfileCard = (): JSX.Element => {
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
        <img className='h-4/5 rounded-full' src={avatar} alt='profile' />
      </div>
      <ul className='h-3/6 flex flex-col justify-around text-lg xl:text-xl'>
        <ProfileInfo value={username} />
        <ProfileInfo value={email} />
        <ProfileInfo value={bio} />
        <ProfileSkills value={languages} />
        <ProfileSkills value={technologies} />
        <ProfileLink value={bitbucketURL} />
        <ProfileLink value={githubURL} />
        <ProfileLink value={gitlabURL} />
        <ProfileLink value={linkedinURL} />
      </ul>
    </section>
  )
}

export default ProfileCard
