import FormInput from '@lib/Input/Form'
import type {FormInputType} from 'app/types/form'

const UrlInput = ({
  id,
  name,
  inputProps,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='url'
    id={id}
    name={name}
    label='Url'
    placeholder={defaultValue || 'Connect this project to an existing one'}
    defaultValue={defaultValue || ''}
    inputProps={inputProps}
    errors={errors}
    optional
  />
)

export default UrlInput
