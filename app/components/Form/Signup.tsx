import BitBucketInput from '@components/Input/BitBucket'
import EmailInput from '@components/Input/Email'
import GitHubInput from '@components/Input/GitHub'
import GitLabInput from '@components/Input/GitLab'
import type {ISignupInput} from 'app/types/user'
import InputSubmit from '@lib/Input/Submit'
import LangSelect from '@components/Select/Lang'
import Link from 'next/link'
import LinkedInInput from '@components/Input/LinkedIn'
import PasswordInput from '@components/Input/Password'
import TechSelect from '@components/Select/Tech'
import Textarea from '@components/Textarea/Textarea'
import UsernameInput from '@components/Input/Username'
import {trpc} from '@utils/trpc'
import {useForm} from 'react-hook-form'
import {
  emailRegisterOptions,
  passwordRegisterOptions,
  usernameRegisterOptions,
} from '@data/register'

const SignupForm = (): JSX.Element => {
  const result = trpc.auth.register.useMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    control,
    setValue,
  } = useForm<ISignupInput>()
  const subscription = watch('password')
  const onSubmit = async (input: ISignupInput): Promise<void> => {
    result.mutateAsync(input)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-18/20 justify-between p-1'
    >
      <article className='w-full h-1/2 flex'>
        <section className='w-3/6 flex flex-col justify-around'>
          <UsernameInput
            id='name'
            name='name'
            inputProps={register('name', usernameRegisterOptions)}
            errors={errors}
          />
          <EmailInput
            id='email'
            name='email'
            inputProps={register('email', emailRegisterOptions)}
            errors={errors}
          />
          <PasswordInput
            id='password'
            name='password'
            inputProps={register('password', passwordRegisterOptions)}
            errors={errors}
          />
          <PasswordInput
            id='confirm_password'
            name='confirmPassword'
            label='Confirm Password'
            inputProps={register('confirmPassword', {
              ...passwordRegisterOptions,
              validate: (value: string) =>
                value === subscription || 'passwords must match',
            })}
            errors={errors}
          />
        </section>
        <section className='w-3/6 flex flex-col justify-around'>
          <GitHubInput
            id='githubURL'
            name='githubURL'
            inputProps={register('githubURL')}
          />
          <GitLabInput
            id='gitlabURL'
            name='gitlabURL'
            inputProps={register('gitlabURL')}
          />
          <BitBucketInput
            id='bitbucketURL'
            name='bitbucketURL'
            inputProps={register('bitbucketURL')}
          />
          <LinkedInInput
            id='linkedinURL'
            name='linkedinURL'
            inputProps={register('linkedinURL')}
          />
        </section>
      </article>
      <article className='h-1/5 w-full flex mt-2'>
        <div className='w-3/6 flex flex-col m-auto p-0.5'>
          <LangSelect control={control} setValue={setValue} errors={errors} />
        </div>
        <div className='w-3/6 flex flex-col m-auto p-0.5'>
          <TechSelect control={control} setValue={setValue} errors={errors} />
        </div>
      </article>
      <Textarea id='bio' name='bio' inputProps={register('bio')} />
      <article className='h-1/5 flex items-center'>
        <aside className='flex flex-row h-1/3 w-full justify-between'>
          <div className='h-full w-1/3'>
            <InputSubmit
              value='SignUp'
              disabled={Boolean(
                errors.name ||
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
  )
}

export default SignupForm
