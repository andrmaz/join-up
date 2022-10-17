import BitBucketInput from '@components/Input/BitBucket'
import EmailInput from '@components/Input/Email'
import FormInput from '@lib/Input/Form'
import GitHubInput from '@components/Input/GitHub'
import GitLabInput from '@components/Input/GitLab'
import type {ISignupInputs} from 'app/types/user'
import {InputSubmit} from '@lib/Input/Submit'
import LangSelect from '@components/Select/Lang'
import Link from 'next/link'
import LinkedInInput from '@components/Input/LinkedIn'
import PasswordInput from '@components/Input/Password'
import TechSelect from '@components/Select/Tech'
import Textarea from '@components/Textarea/Textarea'
import UsernameInput from '@components/Input/Username'
import {useForm} from 'react-hook-form'
import useUserRegister from '@hooks/user/useUserRegister'

const SignupForm = (): JSX.Element => {
  const {register, handleSubmit, watch, errors, control, setValue} =
    useForm<ISignupInputs>()
  const watchPassword = watch('password')
  const [onSubmit] = useUserRegister()
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-18/20 justify-between p-1'
    >
      <article className='w-full h-1/2 flex'>
        <section className='w-3/6 flex flex-col justify-around'>
          <UsernameInput register={register} errors={errors} />
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <FormInput
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            label='Confirm Password'
            placeholder='please confirm your password'
            register={register({
              validate: (value: string) =>
                value === watchPassword || 'passwords must match',
            })}
            errors={errors}
          />
        </section>
        <section className='w-3/6 flex flex-col justify-around'>
          <GitHubInput register={register} />
          <GitLabInput register={register} />
          <BitBucketInput register={register} />
          <LinkedInInput register={register} />
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
      <Textarea register={register} />
      <article className='h-1/5 flex items-center'>
        <aside className='flex flex-row h-1/3 w-full justify-between'>
          <div className='h-full w-1/3'>
            <InputSubmit
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
  )
}

export default SignupForm
