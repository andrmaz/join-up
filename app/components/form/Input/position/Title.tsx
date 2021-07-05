import FormInput from '@components/form/Input/Form'
import type {FormInputType} from 'app/types/form'

const TitleInput = ({
  register,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    id='title'
    name='title'
    label='Title'
    type='text'
    placeholder={defaultValue ? defaultValue : 'Please enter a title'}
    defaultValue={defaultValue ? defaultValue : ''}
    register={register({
      required: {
        value: true,
        message: 'Please enter a title',
      },
    })}
    errors={errors}
  />
)

export default TitleInput
