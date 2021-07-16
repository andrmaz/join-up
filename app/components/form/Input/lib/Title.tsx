import FormInput from '@components/form/Input/lib/Form'
import type {FormInputType} from 'app/types/form'

const TitleInput = ({
  id = 'title',
  name = 'title',
  register,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label='Title'
    placeholder={
      defaultValue ? defaultValue : 'Give it a unique and memorable title'
    }
    defaultValue={defaultValue ? defaultValue : ''}
    register={register({
      required: 'title is required',
      minLength: {
        value: 3,
        message: 'please provide a longer title',
      },
      maxLength: 255,
    })}
    errors={errors}
  />
)

export default TitleInput
