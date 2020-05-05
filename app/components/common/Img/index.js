import React from 'react'

import pattern from 'assets/images/pattern.svg'

function Img({ src, alt, className, loaded,onClick, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      key={alt}
      className={className}
      onClick={onClick ? onClick : null}
      {...props}
      // onError={e => (e.target.src = pattern)}
    />
  )
}

export default Img
