import {FormInputType} from 'app/types/form'

const Textarea = ({
  id,
  name,
  inputProps,
  defaultValue,
}: FormInputType): JSX.Element => (
  <section className='h-1/5'>
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <span className='label-text'>Your bio :</span>
      </label>
      <textarea
        id={id}
        cols={5}
        rows={10}
        maxLength={100}
        placeholder='Tell us your story'
        defaultValue={defaultValue}
        spellCheck={true}
        wrap='hard'
        className='textarea textarea-bordered  textarea-lg w-full max-w-xs :resize-none'
        {...inputProps}
      />
    </div>
  </section>
)

export default Textarea
