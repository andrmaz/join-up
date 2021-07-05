import FormInput from '@components/form/Input/Form'
import type {FormInputType} from 'app/types/form'

const NameInput = ({
  register,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id='name'
    name='name'
    label='Name'
    placeholder={
      defaultValue
        ? defaultValue
        : 'Give a unique and memorable name to your project'
    }
    defaultValue={defaultValue ? defaultValue : ''}
    register={register({
      required: 'project name is required',
      minLength: {
        value: 3,
        message: 'please provide a longer name',
      },
      maxLength: 255,
    })}
    errors={errors}
  />
)

export default NameInput
