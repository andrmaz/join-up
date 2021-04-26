import {DrawerInputsProps} from 'app/types/drawer'

export const CheckboxInput = ({
  register,
  isPending,
}: DrawerInputsProps): JSX.Element => (
  <div className='my-4'>
    <p className='xl:text-2xl'>
      Check if you want to only see available positions:
    </p>
    <div>
      <input
        type='checkbox'
        id='available'
        name='available'
        ref={register}
        disabled={Boolean(isPending)}
        defaultChecked
      />
      <label htmlFor='available'>Available</label>
    </div>
  </div>
)
