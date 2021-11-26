import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const LinkedInInput = ({
  register,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id='linkedinURL'
    name='linkedinURL'
    label='LinkedIn'
    placeholder='your LinkedIn username here'
    register={register}
    defaultValue={
      defaultValue ? defaultValue?.slice(28, defaultValue.length - 1) : ''
    }
  />
)

export default LinkedInInput
