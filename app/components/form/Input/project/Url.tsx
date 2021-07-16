import FormInput from '@components/form/Input/lib/Form'
import type {FormInputType} from 'app/types/form'

const UrlInput = ({
  register,
  errors,
  defaultValue,
}: FormInputType): JSX.Element => (
  <FormInput
    type='url'
    id='projectURL'
    name='projectURL'
    label='Url'
    placeholder={
      defaultValue ? defaultValue : 'Connect this project to an existing one'
    }
    defaultValue={defaultValue ? defaultValue : ''}
    register={register({
      pattern: {
        value:
          /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
        message: 'Please enter a valid URL',
      },
    })}
    errors={errors}
    optional
  />
)

export default UrlInput
