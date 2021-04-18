import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'

import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useForm} from 'react-hook-form'

import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {login} from '@actions/authActions'
import Input from '@components/Form/Input'
import LangSelect from '@components/Select/Lang'
import TechSelect from '@components/Select/Tech'
import ErrorMessage from '@components/Message/Error'
import {Biography} from '@components/Form/Biography'

import type {ISignupInputs} from 'app/types/user'
import {SubmitButton} from '@components/Button/Submit'

const SignUp = ({
  technologies,
  languages,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setValue,
  } = useForm<ISignupInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const watchPassword = watch('password')
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const [, setCookie] = useCookies(['session'])
  const onSubmit = (data: ISignupInputs): void => {
    axios
      .post('/user/register', {user: data})
      .then(res => {
        if (res.status === 201) {
          login(dispatch, res.data.user)
          setCookie('session', res.data.token, {
            path: '/',
            // ? expiration date
            //maxAge: 3600, // Expires after 1hr
            sameSite: true,
            //httpOnly: true,
            //secure: true,
          })
          router.push('/')
        } else {
          console.log(res.data.error)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className='h-screen container flex justify-center items-center'>
      <Head>
        <title>SignUp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
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
              <Input
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
                errors={
                  errors.username && (
                    <ErrorMessage>{errors.username.message}</ErrorMessage>
                  )
                }
              />
              <Input
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
                errors={
                  errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )
                }
              />
              <Input
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
                errors={
                  errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )
                }
              />
              <Input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                label='Confirm Password'
                placeholder='please confirm your password'
                register={register({
                  validate: value =>
                    value === watchPassword || 'passwords must match',
                })}
                errors={
                  errors.confirmPassword && (
                    <ErrorMessage>
                      {errors.confirmPassword.message}
                    </ErrorMessage>
                  )
                }
              />
            </section>
            <section className='w-3/6 flex flex-col justify-around'>
              <Input
                type='text'
                id='githubURL'
                name='githubURL'
                label='GitHub'
                placeholder='your GitHub username here'
                register={register}
              />
              <Input
                type='text'
                id='gitlabURL'
                name='gitlabURL'
                label='GitLab'
                placeholder='your GitLab username here'
                register={register}
              />
              <Input
                type='text'
                id='bitbucketURL'
                name='bitbucketURL'
                label='BitBucket'
                placeholder='your BitBucket username here'
                register={register}
              />
              <Input
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
          <Biography register={register} />
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
    </div>
  )
}

export default SignUp

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data: {technologies},
  } = await axios.get('/technology')
  const {
    data: {languages},
  } = await axios.get('/language')

  return {
    props: {
      technologies,
      languages,
    },
  }
}
