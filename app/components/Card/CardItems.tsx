import {useAuthState} from '@hooks/useAuthState'
import CardInfoItem from '@components/Card/CardInfoItem'
import CardListItem from '@components/Card/CardListItem'
import CardLinkItem from '@components/Card/CardLinkItem'

const CardItems = (): JSX.Element => {
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
    <section className='h-5/6 p-1'>
      <div className='h-3/6 flex items-end'>
        <img className='h-4/5 rounded-full' src={avatar} alt='profile' />
      </div>
      <ul className='h-3/6 flex flex-col justify-around text-lg xl:text-xl'>
        <CardInfoItem value={username} />
        <CardInfoItem value={email} />
        <CardInfoItem value={bio} />
        <CardListItem value={languages} />
        <CardListItem value={technologies} />
        <CardLinkItem value={bitbucketURL} />
        <CardLinkItem value={githubURL} />
        <CardLinkItem value={gitlabURL} />
        <CardLinkItem value={linkedinURL} />
      </ul>
    </section>
  )
}

export default CardItems
