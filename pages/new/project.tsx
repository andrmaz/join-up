import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'

import {useForm} from 'react-hook-form'
import {useAuthState} from '@hooks/auth/useAuthState'
import useAddProject from '@hooks/add/useAddProject'

import {parseCookies} from '@utils/parseCookies'
import {fetchTechnologiesWithToken} from '@api/fetchWithToken'

import Container from '@components/containers/Container/Container'
import FormInput from '@components/form/Input/Form'
import TechSelect from '@components/form/Select/Tech'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IProjectInput} from 'app/types/project'
import type {ProjectPageParams} from 'app/types/params'

const Project: NextPage<ProjectPageParams> = ({
  token,
  technologies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {user} = useAuthState()
  const {avatar, username} = {...user}
  const {register, handleSubmit, errors, control, setValue, reset} =
    useForm<IProjectInput>()
  const onSubmit = useAddProject(token)
  return (
    <Container>
      <Head>
        <title>New</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v flex justify-center items-center'>
        <article className='w-3/5 xl:w-1/2 h-4/5 p-4 xl:px-12 rounded border-black border-2 shadow-2xl'>
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
                <div className='h-6 w-6 pr-1'>
                  <img
                    src={avatar}
                    alt='user'
                    className='w-full h-full m-auto rounded-full object-cover'
                  />
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
            <FormInput
              type='text'
              id='name'
              name='name'
              label='Name'
              placeholder='Give a unique and memorable name to your project'
              register={register({
                required: 'project name is required',
                minLength: {
                  value: 3,
                  message: 'please provide a longer name',
                },
                maxLength: 255,
              })}
              errors={errors}
            />
            <FormInput
              type='text'
              id='description'
              name='description'
              label='Description'
              placeholder='Consider providing a short description'
              register={register({
                required: 'project description is required',
                minLength: {
                  value: 10,
                  message: 'please provide a longer description',
                },
                maxLength: 65535,
              })}
              errors={errors}
            />
            <div className='h-1/6 flex flex-col mb-6'>
              <TechSelect
                options={technologies}
                control={control}
                setValue={setValue}
                errors={errors}
              />
            </div>
            <FormInput
              type='url'
              id='projectURL'
              name='projectURL'
              label='Url'
              placeholder='Connect this project to an existing one'
              register={register({
                pattern: {
                  value:
                    /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
                  message: 'Please enter a valid URL',
                },
              })}
              errors={errors}
              optional
            />
            <div className='h-1/6 flex items-end'>
              <div className='w-16 p-1'>
                <SubmitButton
                  value='Create'
                  bgColor='green-600'
                  errors={Boolean(
                    errors.name || errors.description || errors.technologies
                  )}
                />
              </div>
              <CancelButton onClickAction={() => reset()} />
            </div>
          </form>
        </article>
      </main>
    </Container>
  )
}

export default Project

export const getServerSideProps: GetServerSideProps<ProjectPageParams> = async (
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
  const {technologies} = await fetchTechnologiesWithToken(token)

  //* return technologies and user token
  return {
    props: {
      token,
      technologies,
    },
  }
}
