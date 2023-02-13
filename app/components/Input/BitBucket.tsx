import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const BitBucketInput = ({
  id,
  name,
  inputProps,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label='BitBucket'
    placeholder='Your BitBucket username here'
    inputProps={inputProps}
    defaultValue={
      defaultValue ? defaultValue?.slice(22, defaultValue.length - 1) : ''
    }
  />
)

export default BitBucketInput
