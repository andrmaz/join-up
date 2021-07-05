import FormInput from '@components/form/Input/Form'
import type {FormInputType} from 'app/types/form'

const DescriptionInput = ({
  register,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id='description'
    name='description'
    label='Description'
    placeholder={
      defaultValue ? defaultValue : 'Consider providing a short description'
    }
    defaultValue={defaultValue ? defaultValue : ''}
    register={register({
      required: 'project description is required',
      minLength: {
        value: 10,
        message: 'please provide a longer description',
      },
      maxLength: 65535,
    })}
    errors={errors}
  />
)

export default DescriptionInput
