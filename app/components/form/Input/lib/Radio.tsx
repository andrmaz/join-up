import {DrawerInputsType} from 'app/types/components'

export const RadioInput = ({
  register,
  isPending,
}: DrawerInputsType): JSX.Element => (
  <div className='mt-4'>
    <p className='mb-1'>Match technologies:</p>
    <div className='flex flex-row'>
      <div className='m-1'>
        <input
          type='radio'
          id='any'
          name='match'
          value='any'
          defaultChecked
          ref={register}
          disabled={Boolean(isPending)}
        />
        <label htmlFor='any'>Any</label>
      </div>
      <div className='m-1'>
        <input
          type='radio'
          id='all'
          name='match'
          value='all'
          ref={register}
          disabled={Boolean(isPending)}
        />
        <label htmlFor='all'>All</label>
      </div>
    </div>
  </div>
)
