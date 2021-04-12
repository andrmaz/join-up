import type {NestedOptions} from 'app/types/form'

export const ProfileSkills = ({value}: {value: NestedOptions}): JSX.Element => {
  return (
    <li className='text-red-600'>
      {value &&
        (value.length > 3
          ? `${value.filter((_, i: number) => i < 4).map(v => v.label)}, ...`
          : `${value.map(v => v.label)}`)}
    </li>
  )
}
