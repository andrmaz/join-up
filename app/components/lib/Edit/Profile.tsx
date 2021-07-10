import * as React from 'react'

import {useForm} from 'react-hook-form'
import {useAuthState} from '@hooks/auth/useAuthState'
import useEditUserData from '@hooks/edit/useEditUserData'

import Panel from '@components/navigation/Tablist/Panel'
import SnackBar from '@components/notifications/SnackBar/SnackBar'
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

import type {PanelPropsType} from 'app/types/navigation'
import type {IUserContext} from 'app/types/user'

const EditProfile = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const {user} = useAuthState()
  const {
    avatar,
    bio,
    bitbucketURL,
    githubURL,
    gitlabURL,
    linkedinURL,
    technologies,
    languages,
  } = {
    ...user,
  }
  const {handleSubmit, register, errors, control, setValue, reset} =
    useForm<IUserContext>()
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserData(token)
  return (
    <Panel index={0} isSelectedTab={isSelectedTab}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col h-full justify-between p-1'
      >
        <article className='h-3/5 flex flex-col justify-evenly mb-8'>
          <div className='flex flex-row'>
            <div className='w-3/5'>
              <div className='flex flex-col xl:justify-between'>
                <GitHubInput register={register} defaultValue={githubURL} />
                <GitLabInput register={register} defaultValue={gitlabURL} />
                <BitBucketInput
                  register={register}
                  defaultValue={bitbucketURL}
                />
                <LinkedInInput register={register} defaultValue={linkedinURL} />
              </div>
            </div>
            <section className='w-2/5'>
              <div className='h-52 xl:h-60 w-52 xl:w-60 my-auto'>
                <UserAvatar image={avatar} />
              </div>
            </section>
          </div>
          <div className='flex flex-col p-0.5'>
            <LangSelect
              token={token}
              control={control}
              defaultValue={languages}
              defaultValues={languages}
              setValue={setValue}
              errors={errors}
            />
          </div>
          <div className='flex flex-col p-0.5'>
            <TechSelect
              token={token}
              control={control}
              defaultValue={technologies}
              defaultValues={technologies}
              setValue={setValue}
              errors={errors}
            />
          </div>
        </article>
        <Textarea register={register} defaultValue={bio} />
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
      {isSuccess && (
        <SnackBar
          color='green'
          message={successMessage}
          onClose={handleClose}
        />
      )}
    </Panel>
  )
}

export default React.memo(EditProfile)
