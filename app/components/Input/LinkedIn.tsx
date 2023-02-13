import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const LinkedInInput = ({
  id,
  name,
  inputProps,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label='LinkedIn'
    placeholder='your LinkedIn username here'
    inputProps={inputProps}
    defaultValue={
      defaultValue ? defaultValue?.slice(28, defaultValue.length - 1) : ''
    }
  />
)

export default LinkedInInput
