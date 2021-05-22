import * as React from 'react'
import axios from 'axios'

import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useAuthState} from '@hooks/auth/useAuthState'

import {edit} from '@actions/authActions'

import Panel from '@components/navigation/Tablist/Panel'
import FormInput from '@components/form/Input/Form'
import LangSelect from '@components/form/Select/Lang'
import TechSelect from '@components/form/Select/Tech'
import {SubmitButton} from '@components/form/Button/Submit'
import Textarea from '@components/form/Textarea/Textarea'
import CancelButton from '@components/form/Button/Cancel'

import type {SettingPanelProps} from 'app/types/tablist'
import type {IUserContext} from 'app/types/user'
import type {SelectOptions} from 'app/types/form'

const Profile = ({token, isSelectedTab}: SettingPanelProps): JSX.Element => {
  const [techOptions, setTechOptions] = React.useState<
    SelectOptions[] | undefined
  >()
  const [langOptions, setLangOptions] = React.useState<
    SelectOptions[] | undefined
  >()
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
  const {
    handleSubmit,
    register,
    errors,
    control,
    setValue,
  } = useForm<IUserContext>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  React.useEffect(() => {
    ;(async () => {
      const {
        data: {technologies},
      } = await axios.get('/technology', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTechOptions(technologies)
    })()
  }, [token])
  React.useEffect(() => {
    ;(async () => {
      const {
        data: {languages},
      } = await axios.get('/language', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLangOptions(languages)
    })()
  }, [token])
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: IUserContext): Promise<unknown> => {
    try {
      const response = await axios.patch(
        '/user',
        {user: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      edit(dispatch, response.data.user)
      router.push('/profile')
      return
    } catch (error) {
      return Promise.reject(error)
    }
  }
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
                <FormInput
                  type='text'
                  id='githubURL'
                  name='githubURL'
                  label='GitHub'
                  placeholder='your GitHub username here'
                  register={register}
                  defaultValue={githubURL?.slice(19, githubURL.length)}
                />
                <FormInput
                  type='text'
                  id='gitlabURL'
                  name='gitlabURL'
                  label='GitLab'
                  placeholder='your GitLab username here'
                  register={register}
                  defaultValue={gitlabURL?.slice(19, gitlabURL.length)}
                />
                <FormInput
                  type='text'
                  id='bitbucketURL'
                  name='bitbucketURL'
                  label='BitBucket'
                  placeholder='your BitBucket username here'
                  register={register}
                  defaultValue={bitbucketURL?.slice(
                    22,
                    bitbucketURL.length - 1
                  )}
                />
                <FormInput
                  type='text'
                  id='linkedinURL'
                  name='linkedinURL'
                  label='LinkedIn'
                  placeholder='your LinkedIn username here'
                  register={register}
                  defaultValue={linkedinURL?.slice(28, linkedinURL.length - 1)}
                />
              </div>
            </div>
            <section className='w-2/5'>
              <div className='h-52 xl:h-60 w-52 xl:w-60 my-auto'>
                <img
                  className='w-full h-full m-auto rounded-full object-cover'
                  src={avatar}
                  alt='user'
                />
              </div>
            </section>
          </div>
          <div className='flex flex-col p-0.5'>
            <LangSelect
              options={langOptions!}
              control={control}
              defaultValue={languages}
              defaultValues={languages}
              setValue={setValue}
              errors={errors}
            />
          </div>
          <div className='flex flex-col p-0.5'>
            <TechSelect
              options={techOptions!}
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
          <CancelButton onClickAction={() => router.push('/profile')} />
          <div className='w-16 p-1'>
            <SubmitButton
              value='Save'
              bgColor='green-600'
              errors={Boolean(errors.languages || errors.technologies)}
            />
          </div>
        </aside>
      </form>
    </Panel>
  )
}

export default React.memo(Profile)
