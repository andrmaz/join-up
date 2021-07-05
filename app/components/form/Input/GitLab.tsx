import FormInput from '@components/form/Input/Form'
import type {FormInputType} from 'app/types/form'

const GitLabInput = ({register, defaultValue}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id='gitlabURL'
    name='gitlabURL'
    label='GitLab'
    placeholder='your GitLab username here'
    register={register}
    defaultValue={
      defaultValue ? defaultValue?.slice(19, defaultValue.length) : ''
    }
  />
)

export default GitLabInput
