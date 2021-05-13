import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'

import {ParsedUrlQuery} from 'querystring'
import axios from 'axios'
import {useForm} from 'react-hook-form'

import {edit} from '@actions/authActions'

import {parseCookies} from '@utils/parseCookies'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useAuthState} from '@hooks/auth/useAuthState'

import Container from '@components/containers/Container/Container'
import FormInput from '@components/form/Input/Form'
import LangSelect from '@components/form/Select/Lang'
import TechSelect from '@components/form/Select/Tech'
import ProfileMenu from '@components/navigation/Menu/Menu'
import {SubmitButton} from '@components/form/Button/Submit'
import Textarea from '@components/form/Textarea/Textarea'

import type {IUserContext} from 'app/types/user'
import CancelButton from '@components/form/Button/Cancel'

const Profile: NextPage = ({
  token,
  techOptions,
  langOptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: IUserContext): Promise<any> => {
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
    <Container>
      <Head>
        <title>Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v container'>
        <section className='h-full p-12'>
          <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
            <ProfileMenu />
            <section className='w-200 h-auto border-2 border-solid rounded'>
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
                          defaultValue={linkedinURL?.slice(
                            28,
                            linkedinURL.length - 1
                          )}
                        />
                      </div>
                    </div>
                    <div className='w-2/5'>
                      <div className='h-3/4 lg:mt-8'>
                        <img
                          className='h-full rounded-full ml-auto'
                          src={avatar}
                          alt='profile'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col p-0.5'>
                    <LangSelect
                      options={langOptions}
                      control={control}
                      defaultValue={languages}
                      defaultValues={languages}
                      setValue={setValue}
                      errors={errors}
                    />
                  </div>
                  <div className='flex flex-col p-0.5'>
                    <TechSelect
                      options={techOptions}
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
                  <CancelButton onClickAction={() => router.push('/')} />
                  <div className='w-16 p-1'>
                    <SubmitButton
                      value='Save'
                      bgColor='green-600'
                      errors={Boolean(errors.languages || errors.technologies)}
                    />
                  </div>
                </aside>
              </form>
            </section>
          </div>
        </section>
      </main>
    </Container>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  //* Get the user's session based on the request
  const {session: token} = parseCookies(context.req)

  //* If no user, redirect to login
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  //* If there is a user,
  const {
    data: {technologies: techOptions},
  } = await axios.get('/technology', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const {
    data: {languages: langOptions},
  } = await axios.get('/language', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return user technologies
  return {
    props: {
      token,
      techOptions,
      langOptions,
    },
  }
}
