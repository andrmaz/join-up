import FormInput from '@components/form/Input/lib/Form'
import type {FormInputType} from 'app/types/form'

const BitBucketInput = ({
  register,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id='bitbucketURL'
    name='bitbucketURL'
    label='BitBucket'
    placeholder='your BitBucket username here'
    register={register}
    defaultValue={
      defaultValue ? defaultValue?.slice(22, defaultValue.length - 1) : ''
    }
  />
)

export default BitBucketInput
