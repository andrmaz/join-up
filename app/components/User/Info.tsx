export const ProfileInfo = ({value}: {value?: string}): JSX.Element => {
  return (
    <li className='font-bold p-1'>
      {typeof value === 'string' && value.length >= 40
        ? `${value?.slice(0, 40)} ...`
        : value}
    </li>
  )
}
