import * as React from 'react'
import axios from 'axios'

import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {useCookies} from 'react-cookie'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'

import {edit} from '@actions/authActions'

import FormInput from '@components/form/Input/Form'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IEditUsername} from 'app/types/edit'

const Username = ({token}: {token: string}): JSX.Element => {
  const dispatch = useAuthDispatch()
  const [, setCookie] = useCookies(['session'])
  const {handleSubmit, register, errors} = useForm<IEditUsername>({
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
  const onSubmit = async (data: IEditUsername): Promise<unknown> => {
    try {
      const response = await axios.patch(
        '/user/username',
        {user: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        edit(dispatch, response.data.user)
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
      <h2 className='text-2xl mb-4'>Change username</h2>
      <article className='h-auto flex flex-col justify-evenly mb-8'>
        <FormInput
          type='text'
          id='username'
          name='newUsername'
          label='Username'
          placeholder='please enter a new username'
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
          type='password'
          id='password-username'
          name='password'
          label='Password'
          placeholder='please enter your password'
          register={register({
            required: 'password is required',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'please enter a valid password',
            },
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
            errors={Boolean(errors.newUsername || errors.password)}
          />
        </div>
      </aside>
    </form>
  )
}

export default Username
