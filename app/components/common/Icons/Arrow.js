import React from 'react'

function Arrow({width = 9, height = 17, rotation = '0deg'}) {
  return <svg width={width} height={height}
              style={{transform: `rotate(${rotation})`}}
              viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.44507 16.4598L8.69116 16.2137C8.86694 16.038 8.86694 15.7919 8.69116 15.6161L1.83569 8.72546L8.69116 1.87C8.86694 1.69421 8.86694 1.44812 8.69116 1.27234L8.44507 1.02625C8.26929 0.850464 8.02319 0.850464 7.84741 1.02625L0.429443 8.44421C0.253662 8.62 0.253662 8.86609 0.429443 9.04187L7.84741 16.4598C8.02319 16.6356 8.26929 16.6356 8.44507 16.4598Z" fill="#A09BB2"/>
  </svg>

}

export default Arrow
