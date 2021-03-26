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
import {useAuthState} from '@hooks/useAuthState'

import Input from '@components/Input'
import Navbar from '@components/Navbar'
import ErrorMessage from '@components/ErrorMessage'

import type {IProjectInput} from 'app/types/project'

const Project: NextPage = ({
  technologies,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {user} = useAuthState()
  const {avatar, username} = {...user}
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
  } = useForm<IProjectInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const router = useRouter()
  const onSubmit = async (data: IProjectInput): Promise<any> => {
    try {
      const response = await axios.post(
        '/project',
        {
          project: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      router.push('/')
      return response
    } catch (error) {
      Promise.reject(error)
    }
  }
  return (
    <div className='min-h-screen'>
      <Head>
        <title>New</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-92v container flex justify-center items-center'>
        <section className='w-3/5 xl:w-4/6 h-5/6 xl:h-4/6 p-4 xl:p-2 border rounded'>
          <header className='h-1/6'>
            <h1 className='h-2/3 text-3xl'>Create a new project</h1>
            <span>
              Please fill out this form to start creating a new project
            </span>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col h-5/6 justify-evenly'
          >
            <div className='h-1/6 flex flex-col justify-evenly'>
              <label htmlFor='owner'>Owner: </label>
              <div className='flex flex-row'>
                <div className='h-full pr-1'>
                  <img src={avatar} alt='user' className='w-6 rounded-full' />
                </div>
                <select
                  id='owner'
                  name='owner'
                  className='md:w-auto'
                  ref={register({required: true})}
                >
                  <option value={username}>{username}</option>
                </select>
              </div>
            </div>
            <Input
              type='text'
              id='name'
              name='name'
              label='Name'
              placeholder='Give a unique and memorable name to your project'
              register={register({
                required: 'project name is required',
              })}
              errors={
                errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )
              }
            />
            <Input
              type='text'
              id='description'
              name='description'
              label='Description'
              placeholder='Consider providing a short description'
              register={register}
              optional
            />
            <div className='h-1/6 flex flex-col mb-6'>
              <label id='technologies' htmlFor='technologies'>
                Technologies :
              </label>
              <Controller
                name='technologies'
                control={control}
                defaultValue=''
                rules={{
                  required: {
                    value: true,
                    message: 'Please select at least one technology',
                  },
                }}
                render={({value, onBlur}) => (
                  <Select
                    id='searchTechnologies'
                    inputId='technologies'
                    name='technologies'
                    aria-labelledby='technologies'
                    defaultValue={value}
                    closeMenuOnSelect={false}
                    isMulti
                    options={technologies}
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
              {errors.technologies && (
                <ErrorMessage>{errors.technologies.message}</ErrorMessage>
              )}
            </div>
            <Input
              type='url'
              id='projectURL'
              name='projectURL'
              label='Url'
              placeholder='Connect this project to an existing one'
              register={register({
                pattern: {
                  value: /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
                  message: 'Please enter a valid URL',
                },
              })}
              errors={
                errors.projectURL && (
                  <ErrorMessage>{errors.projectURL.message}</ErrorMessage>
                )
              }
              optional
            />
            <div className='h-1/6 flex flex-col pt-6 justify-end'>
              <input
                type='submit'
                value='Create Project'
                className='w-2/6 bg-green-800 text-white rounded'
              />
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Project

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
    data: {technologies},
  } = await axios.get('/technology')

  //* return technologies and user token
  return {
    props: {
      technologies,
      token,
    },
  }
}
