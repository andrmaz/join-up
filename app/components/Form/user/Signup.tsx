import Link from 'next/link'

import {useForm} from 'react-hook-form'
import useUserRegister from '@hooks/user/useUserRegister'

import FormInput from '@components/form/Input/lib/Form'
import UsernameInput from '@components/form/Input/user/Username'
import EmailInput from '@components/form/Input/user/Email'
import PasswordInput from '@components/form/Input/user/Password'
import GitHubInput from '@components/form/Input/user/GitHub'
import GitLabInput from '@components/form/Input/user/GitLab'
import BitBucketInput from '@components/form/Input/user/BitBucket'
import LinkedInInput from '@components/form/Input/user/LinkedIn'
import LangSelect from '@components/form/Select/Lang'
import TechSelect from '@components/form/Select/Tech'
import Textarea from '@components/form/Textarea/Textarea'
import {SubmitButton} from '@components/form/Button/Submit'

import type {ISignupInputs} from 'app/types/user'

const SignupForm = (): JSX.Element => {
  const {register, handleSubmit, watch, errors, control, setValue} =
    useForm<ISignupInputs>()
  const watchPassword = watch('password')
  const onSubmit = useUserRegister()
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
  )
}

export default SignupForm
