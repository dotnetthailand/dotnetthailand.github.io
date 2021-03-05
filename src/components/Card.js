import React from 'react'
import {Link} from 'gatsby';

const titleStyle = {
  fontWeight: '700',
}
const authorLinkStyle = {
  color: '#00BCD4'
}

const Author = ({ children, to }) => (
  <Link style={authorLinkStyle} to={to} className='font-weight-bold'>
    {children}
  </Link>
)

const Card = ({ title, description, timeStamp, authorName, slug }) => {
  const cardTextColor = typeof window !== 'undefined' && getComputedStyle(document.documentElement).getPropertyValue('--card-text-color')

  const cardLinkStyle = { color: cardTextColor, textDecoration: 'none', backgroundColor: '#00BCD4' }
  return (
    <Link
      style={cardLinkStyle}
      to={slug}
    >
      <div className={'card my-4'}>
        <div className='card-body'>
          <h5 className='card-title' style={titleStyle}>{title}</h5>
          <p className='card-text'>{description}</p>
          <h6 className='card-subtitle text-muted'>
            <Author to='/about'>{authorName}</Author> on {timeStamp}
          </h6>
        </div>
      </div>

    </Link>
  )
}

export default Card