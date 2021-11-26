import {FaBitbucket, FaLinkedin, FaUser} from 'react-icons/fa'
import {GiOpenBook, GiTechnoHeart} from 'react-icons/gi'

import {BsFillChatFill} from 'react-icons/bs'
import {FiGitlab} from 'react-icons/fi'
import {GrGithub} from 'react-icons/gr'
import type {IAuthUser} from 'app/types/user'
import UserAvatar from '@screens/User/Avatar'

const UserCard = ({
  avatar,
  username,
  bio,
  languages,
  technologies,
  bitbucketURL,
  githubURL,
  gitlabURL,
  linkedinURL,
}: IAuthUser): JSX.Element => {
  return (
    <section className='sticky top-1/4 h-70v p-1'>
      <div className='h-auto w-full mb-10'>
        <UserAvatar image={avatar} />
      </div>
      <ul className='h-auto w-full flex flex-col justify-around text-lg xl:text-xl'>
        <li className='flex py-1 my-1'>
          <FaUser className='mr-1' />
          <span className='font-bold truncate'>{username}</span>
        </li>
        <li className='flex py-1 my-1'>
          <GiOpenBook className='mr-1' />
          <span className='font-bold truncate'>{bio}</span>
        </li>
        <li className='flex py-1 my-1'>
          <BsFillChatFill className='mr-1' />
          <span className='text-red-600 truncate'>
            {languages?.map(v => `${v.label} `)}
          </span>
        </li>
        <li className='flex py-1 my-1'>
          <GiTechnoHeart className='mr-1' />
          <span className='text-red-600 truncate'>
            {technologies?.map(v => `${v.label} `)}
          </span>
        </li>

        {bitbucketURL && (
          <li className='flex py-1 my-1'>
            <FaBitbucket className='mr-1' />
            <a href={bitbucketURL} className='text-blue-600 truncate'>
              {bitbucketURL}
            </a>
          </li>
        )}

        {githubURL && (
          <li className='flex py-1 my-1'>
            <GrGithub className='mr-1' />
            <a href={githubURL} className='text-blue-600 truncate'>
              {githubURL}
            </a>
          </li>
        )}

        {gitlabURL && (
          <li className='flex py-1 my-1'>
            <FiGitlab className='mr-1' />
            <a href={gitlabURL} className='text-blue-600 truncate'>
              {gitlabURL}
            </a>
          </li>
        )}

        {linkedinURL && (
          <li className='flex py-1 my-1'>
            <FaLinkedin className='mr-1' />
            <a href={linkedinURL} className='text-blue-600 truncate'>
              {linkedinURL}
            </a>
          </li>
        )}
      </ul>
    </section>
  )
}

export default UserCard
