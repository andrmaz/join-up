import {FormInputType} from 'app/types/form'

const Textarea = ({
  id,
  name,
  inputProps,
  defaultValue,
}: FormInputType): JSX.Element => (
  <article className='h-1/5'>
    <div className='h-full flex flex-col'>
      <label htmlFor={name}>Biography:</label>
      <textarea
        id={id}
        cols={5}
        rows={10}
        maxLength={100}
        placeholder='Tell us your story'
        defaultValue={defaultValue}
        spellCheck={true}
        wrap='hard'
        className=':resize-none p-1 border-2'
        {...inputProps}
      />
    </div>
  </article>
)

export default Textarea
