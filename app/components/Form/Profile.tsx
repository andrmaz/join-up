import BitBucketInput from '@components/Input/BitBucket'
import Button from '@lib/Button'
import GitHubInput from '@components/Input/GitHub'
import GitLabInput from '@components/Input/GitLab'
import type {IAuthUser} from 'app/types/user'
import InputSubmit from '@lib/Input/Submit'
import LangSelect from '@components/Select/Lang'
import LinkedInInput from '@components/Input/LinkedIn'
import QueryResult from '@components/Result/Query'
import TechSelect from '@components/Select/Tech'
import Textarea from '@components/Textarea/Textarea'
import UserAvatar from '@screens/User/Avatar'
import type {UserResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import {useForm} from 'react-hook-form'

const ProfileForm = ({
  onSubmit,
}: {
  onSubmit: (data: IAuthUser) => Promise<UserResponseType>
}): JSX.Element => {
  const {status, error, data} = trpc.user.detail.useQuery()
  const {
    handleSubmit,
    register,
    formState: {errors},
    control,
    setValue,
    reset,
  } = useForm<IAuthUser>()

  return (
    <QueryResult status={status} error={error} data={data}>
      {({user}) => (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col h-18/20 justify-between p-1'
        >
          <article className='h-3/5 flex flex-col justify-evenly mb-8'>
            <div className='flex flex-row'>
              <div className='w-3/5'>
                <div className='flex flex-col xl:justify-between'>
                  <GitHubInput
                    id='githubURL'
                    name='githubURL'
                    inputProps={register('githubURL')}
                    defaultValue={user.githubURL}
                  />
                  <GitLabInput
                    id='gitlabURL'
                    name='gitlabURL'
                    inputProps={register('gitlabURL')}
                    defaultValue={user.gitlabURL}
                  />
                  <BitBucketInput
                    id='bitbucketURL'
                    name='bitbucketURL'
                    inputProps={register('bitbucketURL')}
                    defaultValue={user.bitbucketURL}
                  />
                  <LinkedInInput
                    id='linkedinURL'
                    name='linkedinURL'
                    inputProps={register('linkedinURL')}
                    defaultValue={user.linkedinURL}
                  />
                </div>
              </div>
              <section className='w-2/5'>
                <div className='h-52 xl:h-60 w-52 xl:w-60 my-auto'>
                  <UserAvatar />
                </div>
              </section>
            </div>
            <div className='flex flex-col p-0.5'>
              <LangSelect
                control={control}
                defaultValue={user.languages}
                defaultValues={user.languages}
                setValue={setValue}
                errors={errors}
              />
            </div>
            <div className='flex flex-col p-0.5'>
              <TechSelect
                control={control}
                defaultValue={user.technologies}
                defaultValues={user.technologies}
                setValue={setValue}
                errors={errors}
              />
            </div>
          </article>
          <Textarea
            id='bio'
            name='bio'
            inputProps={register('bio')}
            defaultValue={user.bio}
          />
          <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
            <Button
              onClick={() => {
                reset({
                  githubURL: '',
                  gitlabURL: '',
                  bitbucketURL: '',
                  linkedinURL: '',
                  bio: '',
                })
              }}
            >
              Cancel
            </Button>
            <div className='w-16 p-1'>
              <InputSubmit
                value='Save'
                bgColor='green-600'
                disabled={Boolean(errors.languages || errors.technologies)}
              />
            </div>
          </aside>
        </form>
      )}
    </QueryResult>
  )
}

export default ProfileForm
