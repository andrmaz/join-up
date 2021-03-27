import * as React from 'react'

const CardLinkItem = ({value}: {value?: string}): JSX.Element => {
  return (
    <li>
      <a href={value} className='text-blue-600'>
        {typeof value === 'string' && value.length >= 28
          ? `${value?.slice(0, 28)} ...`
          : value}
      </a>
    </li>
  )
}

export default CardLinkItem
