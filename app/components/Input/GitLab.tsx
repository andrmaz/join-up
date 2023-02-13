import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const GitLabInput = ({
  id,
  name,
  inputProps,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label='GitLab'
    placeholder='Your GitLab username here'
    inputProps={inputProps}
    defaultValue={
      defaultValue ? defaultValue?.slice(19, defaultValue.length) : ''
    }
  />
)

export default GitLabInput
