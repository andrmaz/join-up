export const Biography = ({
  register,
  defaultValue,
}: {
  register: (Ref: any) => void
  defaultValue?: string
}): JSX.Element => (
  <article className='h-1/5'>
    <div className='h-full flex flex-col'>
      <label htmlFor='bio'>Biography:</label>
      <textarea
        id='bio'
        name='bio'
        ref={register}
        cols={5}
        rows={10}
        maxLength={100}
        placeholder='Tell us your story'
        defaultValue={defaultValue}
        spellCheck={true}
        wrap='hard'
        className=':resize-none p-1 border-2'
      />
    </div>
  </article>
)
