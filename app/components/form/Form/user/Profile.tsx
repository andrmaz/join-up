import {useAuthState} from '@hooks/auth/useAuthState'

import UserAvatar from '@components/lib/User/Avatar'

import GitHubInput from '@components/form/Input/user/GitHub'
import GitLabInput from '@components/form/Input/user/GitLab'
import BitBucketInput from '@components/form/Input/user/BitBucket'
import LinkedInInput from '@components/form/Input/user/LinkedIn'

import LangSelect from '@components/form/Select/Lang'
import TechSelect from '@components/form/Select/Tech'
import Textarea from '@components/form/Textarea/Textarea'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IProfileForm} from 'app/types/form'

const ProfileForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  reset,
  control,
  setValue,
  token,
}: IProfileForm): JSX.Element => {
  const {user} = useAuthState()
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-full justify-between p-1'
    >
      <article className='h-3/5 flex flex-col justify-evenly mb-8'>
        <div className='flex flex-row'>
          <div className='w-3/5'>
            <div className='flex flex-col xl:justify-between'>
              <GitHubInput register={register} defaultValue={user?.githubURL} />
              <GitLabInput register={register} defaultValue={user?.gitlabURL} />
              <BitBucketInput
                register={register}
                defaultValue={user?.bitbucketURL}
              />
              <LinkedInInput
                register={register}
                defaultValue={user?.linkedinURL}
              />
            </div>
          </div>
          <section className='w-2/5'>
            <div className='h-52 xl:h-60 w-52 xl:w-60 my-auto'>
              <UserAvatar image={user?.avatar} />
            </div>
          </section>
        </div>
        <div className='flex flex-col p-0.5'>
          <LangSelect
            token={token}
            control={control}
            defaultValue={user?.languages}
            defaultValues={user?.languages}
            setValue={setValue}
            errors={errors}
          />
        </div>
        <div className='flex flex-col p-0.5'>
          <TechSelect
            token={token}
            control={control}
            defaultValue={user?.technologies}
            defaultValues={user?.technologies}
            setValue={setValue}
            errors={errors}
          />
        </div>
      </article>
      <Textarea register={register} defaultValue={user?.bio} />
      <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
        <CancelButton
          onClickHandler={() => {
            reset({
              githubURL: '',
              gitlabURL: '',
              bitbucketURL: '',
              linkedinURL: '',
              bio: '',
            })
          }}
        />
        <div className='w-16 p-1'>
          <SubmitButton
            value='Save'
            bgColor='green-600'
            errors={Boolean(errors.languages || errors.technologies)}
          />
        </div>
      </aside>
    </form>
  )
}

export default ProfileForm
