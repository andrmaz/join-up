import UsernameInput from '@components/form/Input/user/Username'
import PasswordInput from '@components/form/Input/user/Password'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IUserForm} from 'app/types/form'

const UsernameForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  reset,
}: IUserForm): JSX.Element => (
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
      <CancelButton onClickHandler={() => reset()} />
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

export default UsernameForm
