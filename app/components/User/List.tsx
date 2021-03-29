export const ProfileList = ({value}: {value?: string[]}): JSX.Element => {
  return (
    <li className='text-red-600'>
      {Array.isArray(value) && value.length > 3
        ? `${value?.filter((_, i: number) => i < 3).toString()}, ...`
        : value?.toString()}
    </li>
  )
}
