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
import Select from 'react-select'
import {useForm, Controller} from 'react-hook-form'

import {parseCookies} from '@utils/parseCookies'
//import {useAuthDispatch} from '@hooks/useAuthDispatch'
import {useAuthState} from '@hooks/useAuthState'
import Navbar from '@components/Navbar'
import Input from '@components/Input'
import type {IUserContext} from 'app/types/user'

const Profile: NextPage = ({
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
    /* technologies,
        languages, */
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
  //const dispatch = useAuthDispatch()
  const onSubmit = (data: IUserContext): void => console.log(data)
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-92v py-12 px-32 xl:px-72'>
        <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
          <section className='h-4/5 p-4'>
            <article className='h-3/5 flex flex-col'>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Account Settings</span>
              </div>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Profile</span>
              </div>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Account</span>
              </div>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Emails</span>
              </div>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Notifications</span>
              </div>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Security Logs</span>
              </div>
            </article>
            <article className='h-2/5 flex flex-col'>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Moderation settings</span>
              </div>
              <div className='h-12 border-gray-400 border-2 p-2'>
                <span>Blocked users</span>
              </div>
            </article>
          </section>
          <section className='w-200 h-auto border-2 border-solid rounded'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col h-full justify-between p-1'
            >
              <article className='h-3/5 flex flex-col justify-evenly'>
                <div className='flex flex-row'>
                  <div className='w-3/5'>
                    <div className='flex flex-col xl:justify-between'>
                      <Input
                        type='text'
                        id='githubURL'
                        name='githubURL'
                        label='GitHub'
                        placeholder='your GitHub username here'
                        register={register}
                        defaultValue={githubURL}
                      />
                      <Input
                        type='text'
                        id='gitlabURL'
                        name='gitlabURL'
                        label='GitLab'
                        placeholder='your GitLab username here'
                        register={register}
                        defaultValue={gitlabURL}
                      />
                      <Input
                        type='text'
                        id='bitbucketURL'
                        name='bitbucketURL'
                        label='BitBucket'
                        placeholder='your BitBucket username here'
                        register={register}
                        defaultValue={bitbucketURL}
                      />
                      <Input
                        type='text'
                        id='linkedinURL'
                        name='linkedinURL'
                        label='LinkedIn'
                        placeholder='your LinkedIn username here'
                        register={register}
                        defaultValue={linkedinURL}
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
                <div className='flex flex-col p-1'>
                  <label id='languages' htmlFor='languages'>
                    Languages :
                  </label>
                  <Controller
                    name='languages'
                    control={control}
                    //TODO default languages must be in this format
                    //{ value: 'language', label: 'Language'}
                    /* defaultValue={languages.map(
                                            lang => lang.value
                                        )} */
                    defaultValue=''
                    render={({onBlur, ref}) => (
                      <Select
                        id='selectLanguages'
                        inputId='languages'
                        name='languages'
                        inputRef={ref}
                        aria-labelledby='languages'
                        //TODO default languages must be in this format
                        //{ value: 'language', label: 'Language'}
                        //defaultValue={languages}
                        closeMenuOnSelect={false}
                        isMulti
                        options={langOptions}
                        placeholder='Select your language'
                        blurInputOnSelect={false}
                        onBlur={onBlur}
                        onChange={values => {
                          setValue(
                            'languages',
                            values.map(value => value.label),
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            }
                          )
                        }}
                      />
                    )}
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label id='technologies' htmlFor='technologies'>
                    Technologies :
                  </label>
                  <Controller
                    name='technologies'
                    control={control}
                    //TODO default Technologies must be in this format
                    //{ value: 'technology', label: 'Technology'}
                    /* defaultValue={technologies.map(
                                            tech => tech.value
                                        )} */
                    defaultValue=''
                    render={({onBlur, ref}) => (
                      <Select
                        id='searchTechnologies'
                        inputId='technologies'
                        name='technologies'
                        inputRef={ref}
                        aria-labelledby='technologies'
                        //TODO default Technologies must be in this format
                        //{ value: 'technology', label: 'Technology'}
                        //defaultValue={technologies}
                        closeMenuOnSelect={false}
                        isMulti
                        options={techOptions}
                        placeholder='Choose your tech stack'
                        blurInputOnSelect={false}
                        onBlur={onBlur}
                        onChange={values => {
                          setValue(
                            'technologies',
                            values.map(value => value.label),
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            }
                          )
                        }}
                      />
                    )}
                  />
                </div>
              </article>
              <article className='h-1/5'>
                <div className='h-full flex flex-col mt-8'>
                  <label htmlFor='bio'>Biography:</label>
                  <textarea
                    id='bio'
                    name='bio'
                    ref={register}
                    cols={5}
                    rows={10}
                    maxLength={100}
                    placeholder='Tell us your story'
                    defaultValue={bio}
                    spellCheck={true}
                    wrap='hard'
                    className=':resize-none p-1 border-2'
                  />
                </div>
              </article>
              <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
                <button
                  type='button'
                  className='w-2/6 h-1/5 cursor-pointer bg-gray-600 text-white rounded m-1'
                  onClick={() => router.push('/')}
                >
                  Cancel
                </button>
                <input
                  type='submit'
                  value='Save'
                  className='w-2/6 h-1/5 cursor-pointer bg-green-600 text-white rounded m-1'
                  disabled={Boolean(errors.languages || errors.technologies)}
                />
              </aside>
            </form>
          </section>
        </div>
      </main>
    </div>
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
      techOptions,
      langOptions,
    },
  }
}
