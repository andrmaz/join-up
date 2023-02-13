import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const TitleInput = ({
  id,
  name,
  inputProps,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='text'
    id={id}
    name={name}
    label='Title'
    placeholder={defaultValue || 'Give it a unique and memorable title'}
    defaultValue={defaultValue}
    inputProps={inputProps}
    errors={errors}
  />
)

export default TitleInput
