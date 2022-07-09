import * as React from 'react'

const SearchIcon = (props) => (
  <svg height='1em' width='1em' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g
      fill='none'
      fillRule='evenodd'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <circle cx={8.5} cy={8.5} r={5} />
      <path d='M17.571 17.5 12 12' />
    </g>
  </svg>
)

export default SearchIcon
