import FormInput from '@components/form/Input/Form'
import type {FormInputType} from 'app/types/form'

const TextInput = ({
  id = 'description',
  name = 'description',
  label = 'Description',
  register,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label={label}
    placeholder={
      defaultValue
        ? defaultValue
        : `Provide a ${name} to get people involved in your project`
    }
    defaultValue={defaultValue ? defaultValue : ''}
    register={register({
      required: `${name} is required`,
      minLength: {
        value: 10,
        message: `please provide a longer ${name}`,
      },
      maxLength: 65535,
    })}
    errors={errors}
  />
)

export default TextInput
