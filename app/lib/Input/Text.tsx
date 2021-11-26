import FormInput from '@lib/Input/Form'
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
        : `Provide some details to get people involved in your project`
    }
    defaultValue={defaultValue ? defaultValue : ''}
    register={register({
      required: `${name} field is required`,
      minLength: {
        value: 10,
        message: `please provide a longer ${name} field`,
      },
      maxLength: 65535,
    })}
    errors={errors}
  />
)

export default TextInput
