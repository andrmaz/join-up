import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'

import {useForm} from 'react-hook-form'
import useAddProject from '@hooks/add/useAddProject'

import {parseCookies} from '@utils/parseCookies'
import {fetchTechnologiesWithToken} from '@api/fetchWithToken'

import Container from '@components/containers/Container/Container'

import NameInput from '@components/form/Input/project/Name'
import DescriptionInput from '@components/form/Input/Description'
import UrlInput from '@components/form/Input/project/Url'
import TechSelect from '@components/form/Select/Tech'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IProjectInput} from 'app/types/project'
import type {ProjectParamsType} from 'app/types/params'

const Project: NextPage<ProjectParamsType> = ({
  token,
  technologies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            <NameInput register={register} errors={errors} />
            <DescriptionInput register={register} errors={errors} />
            <div className='h-1/6 flex flex-col mb-6'>
              <TechSelect
                options={technologies}
                control={control}
                setValue={setValue}
                errors={errors}
              />
            </div>
            <UrlInput register={register} errors={errors} />
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

export const getServerSideProps: GetServerSideProps<ProjectParamsType> = async (
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
