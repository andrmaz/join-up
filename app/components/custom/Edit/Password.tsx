import * as React from 'react'
import axios from 'axios'

import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {useCookies} from 'react-cookie'

import FormInput from '@components/form/Input/Form'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IEditPassword} from 'app/types/edit'

const Password = ({token}: {token: string}): JSX.Element => {
  const [, setCookie] = useCookies(['session'])
  const {handleSubmit, register, errors, watch} = useForm<IEditPassword>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const watchPassword = watch('newPassword')
  const router = useRouter()
  const onSubmit = async (data: IEditPassword): Promise<any> => {
    try {
      const response = await axios.patch(
        '/user/password',
        {user: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        setCookie('session', response.data.token, {
          path: '/',
          // ? expiration date
          //maxAge: 3600, // Expires after 1hr
          sameSite: true,
          //httpOnly: true,
          //secure: true,
        })
        router.push('/profile')
        return
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-auto justify-between p-1'
    >
      <h2 className='text-2xl mb-4'>Change password</h2>
      <article className='h-auto flex flex-col justify-evenly mb-8'>
        <FormInput
          type='password'
          id='currentPassword'
          name='currentPassword'
          label='Current Password'
          placeholder='please enter your current password'
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
          id='newPassword'
          name='newPassword'
          label='New Password'
          placeholder='please enter a new password'
          register={register({
            required: 'new password is required',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'please enter a valid password',
            },
          })}
          errors={errors}
        />
        <FormInput
          type='password'
          id='confirmNewPassword'
          name='confirmNewPassword'
          label='Confirm New Password'
          placeholder='please confirm your new password'
          register={register({
            validate: value =>
              value === watchPassword || 'passwords must match',
          })}
          errors={errors}
        />
      </article>
      <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
        <CancelButton onClickAction={() => router.push('/profile')} />
        <div className='w-16 p-1'>
          <SubmitButton
            value='Save'
            bgColor='green-600'
            errors={Boolean(
              errors.currentPassword ||
                errors.newPassword ||
                errors.confirmNewPassword
            )}
          />
        </div>
      </aside>
    </form>
  )
}

export default Password
