import {useForm} from 'react-hook-form'

import UsernameInput from '@components/form/Input/user/Username'
import PasswordInput from '@components/form/Input/user/Password'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IUserContext, IEditUsername} from 'app/types/user'

const UsernameForm = ({
  onSubmit,
}: {
  onSubmit: (data: IEditUsername) => Promise<IUserContext>
}): JSX.Element => {
  const {handleSubmit, register, errors, reset} = useForm<IEditUsername>()
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-auto justify-between p-1'
    >
      <h2 className='text-2xl mb-4'>Change username</h2>
      <article className='h-auto flex flex-col justify-evenly mb-8'>
        <UsernameInput name='newUsername' register={register} errors={errors} />
        <PasswordInput id='username-pwd' register={register} errors={errors} />
      </article>
      <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
        <CancelButton onClick={() => reset()} />
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

export default UsernameForm
