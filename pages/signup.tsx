import Head from 'next/head'
import Link from 'next/link'
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import axios from 'axios'

import {useForm} from 'react-hook-form'
import useUserRegister from '@hooks/user/useUserRegister'

import Container from '@components/containers/Container/Container'
import FormInput from '@components/form/Input/Form'
import LangSelect from '@components/form/Select/Lang'
import TechSelect from '@components/form/Select/Tech'
import Textarea from '@components/form/Textarea/Textarea'
import {SubmitButton} from '@components/form/Button/Submit'

import type {ISignupInputs} from 'app/types/user'
import type {
  TechnologiesResponseType,
  LanguagesResponseType,
} from 'app/types/response'
import type {SignUpParamsType} from 'app/types/params'

const SignUp: NextPage<SignUpParamsType> = ({
  technologies,
  languages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {register, handleSubmit, watch, errors, control, setValue} =
    useForm<ISignupInputs>()
  const watchPassword = watch('password')
  const onSubmit = useUserRegister()
  return (
    <Container>
      <Head>
        <title>SignUp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v container flex justify-center items-center'>
        <section className='h-18/20 xl:h-4/5 w-5/6 xl:w-3/5 border border-black rounded p-2'>
          <header className='h-1/10 text-center'>
            <h1 className='text-3xl'>SignUp</h1>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col h-18/20 justify-between p-1'
          >
            <article className='w-full h-1/2 flex'>
              <section className='w-3/6 flex flex-col justify-around'>
                <FormInput
                  type='text'
                  id='username'
                  name='username'
                  label='Username'
                  placeholder='please enter your username'
                  register={register({
                    required: 'username is required',
                    minLength: {
                      value: 3,
                      message: 'username must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 20,
                      message: 'username must be at most 20 characters long',
                    },
                  })}
                  errors={errors}
                />
                <FormInput
                  type='email'
                  id='email'
                  name='email'
                  label='Email'
                  placeholder='please enter your email'
                  register={register({
                    required: 'email is required',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'please enter a valid email address',
                    },
                  })}
                  errors={errors}
                />
                <FormInput
                  type='password'
                  id='password'
                  name='password'
                  label='Password'
                  placeholder='min. 8 char, mix letters and numbers'
                  register={register({
                    required: 'password is required',
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'please enter a valid password',
                    },
                  })}
                  errors={errors}
                />
                <FormInput
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  label='Confirm Password'
                  placeholder='please confirm your password'
                  register={register({
                    validate: value =>
                      value === watchPassword || 'passwords must match',
                  })}
                  errors={errors}
                />
              </section>
              <section className='w-3/6 flex flex-col justify-around'>
                <FormInput
                  type='text'
                  id='githubURL'
                  name='githubURL'
                  label='GitHub'
                  placeholder='your GitHub username here'
                  register={register}
                />
                <FormInput
                  type='text'
                  id='gitlabURL'
                  name='gitlabURL'
                  label='GitLab'
                  placeholder='your GitLab username here'
                  register={register}
                />
                <FormInput
                  type='text'
                  id='bitbucketURL'
                  name='bitbucketURL'
                  label='BitBucket'
                  placeholder='your BitBucket username here'
                  register={register}
                />
                <FormInput
                  type='text'
                  id='linkedinURL'
                  name='linkedinURL'
                  label='LinkedIn'
                  placeholder='your LinkedIn username here'
                  register={register}
                />
              </section>
            </article>
            <article className='h-1/5 w-full flex mt-2'>
              <div className='w-3/6 flex flex-col m-auto p-0.5'>
                <LangSelect
                  options={languages}
                  control={control}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
              <div className='w-3/6 flex flex-col m-auto p-0.5'>
                <TechSelect
                  options={technologies}
                  control={control}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
            </article>
            <Textarea register={register} />
            <article className='h-1/5 flex items-center'>
              <aside className='flex flex-row h-1/3 w-full justify-between'>
                <div className='h-full w-1/3'>
                  <SubmitButton
                    value='SignUp'
                    errors={Boolean(
                      errors.username ||
                        errors.email ||
                        errors.password ||
                        errors.confirmPassword ||
                        errors.languages ||
                        errors.technologies
                    )}
                  />
                </div>
                <Link href='/signin'>
                  <a className='inline-block align-bottom mr-4 text-sm'>
                    Already have an account ? SignIn
                  </a>
                </Link>
              </aside>
            </article>
          </form>
        </section>
      </main>
    </Container>
  )
}

export default SignUp

export const getServerSideProps: GetServerSideProps<SignUpParamsType> =
  async () => {
    const {
      data: {technologies},
    } = await axios.get<TechnologiesResponseType>('/technology')
    const {
      data: {languages},
    } = await axios.get<LanguagesResponseType>('/language')

    return {
      props: {
        technologies,
        languages,
      },
    }
  }
