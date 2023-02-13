import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const GitHubInput = ({
  id,
  name,
  inputProps,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label='GitHub'
    placeholder='your GitHub username here'
    inputProps={inputProps}
    defaultValue={
      defaultValue ? defaultValue?.slice(19, defaultValue.length) : ''
    }
  />
)

export default GitHubInput
