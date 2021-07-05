import FormInput from '@components/form/Input/Form'
import type {FormInputType} from 'app/types/form'

const GitHubInput = ({register, defaultValue}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id='githubURL'
    name='githubURL'
    label='GitHub'
    placeholder='your GitHub username here'
    register={register}
    defaultValue={
      defaultValue ? defaultValue?.slice(19, defaultValue.length) : ''
    }
  />
)

export default GitHubInput
