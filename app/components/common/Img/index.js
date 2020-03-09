import React from 'react'

import pattern from 'assets/images/pattern.svg'

function Img({ src, alt, className, loaded, ...props }) {
  return (
    <img
      src={src || pattern}
      alt={alt}
      key={alt}
      className={className}
      {...props}
      onError={e => (e.target.src = pattern)}
    />
  )
}

export default Img
