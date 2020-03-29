import React from 'react'

function Verification({size = 33, type = 'failed'}) {
  return type==='failed' ? <svg width={size} height={size}
                                viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.2646 0.108398C7.43457 0.108398 0.280273 7.2627 0.280273 16.0928C0.280273 24.9229 7.43457 32.0771 16.2646 32.0771C25.0947 32.0771 32.249 24.9229 32.249 16.0928C32.249 7.2627 25.0947 0.108398 16.2646 0.108398ZM16.2646 28.9834C9.11035 28.9834 3.37402 23.2471 3.37402 16.0928C3.37402 9.00293 9.11035 3.20215 16.2646 3.20215C23.3545 3.20215 29.1553 9.00293 29.1553 16.0928C29.1553 23.2471 23.3545 28.9834 16.2646 28.9834ZM22.7744 12.0967C23.0967 11.8389 23.0967 11.3232 22.7744 11.001L21.3564 9.58301C21.0342 9.26074 20.5186 9.26074 20.2607 9.58301L16.2646 13.5791L12.2041 9.58301C11.9463 9.26074 11.4307 9.26074 11.1084 9.58301L9.69043 11.001C9.36816 11.3232 9.36816 11.8389 9.69043 12.0967L13.6865 16.0928L9.69043 20.1533C9.36816 20.4111 9.36816 20.9268 9.69043 21.249L11.1084 22.667C11.4307 22.9893 11.9463 22.9893 12.2041 22.667L16.2646 18.6709L20.2607 22.667C20.5186 22.9893 21.0342 22.9893 21.3564 22.667L22.7744 21.249C23.0967 20.9268 23.0967 20.4111 22.7744 20.1533L18.7783 16.0928L22.7744 12.0967Z" fill="#FE9393"/>
  </svg> : <svg width={size} height={size}
                viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.2646 0.4646C7.43457 0.4646 0.280273 7.68335 0.280273 16.449C0.280273 25.2791 7.43457 32.4333 16.2646 32.4333C25.0303 32.4333 32.249 25.2791 32.249 16.449C32.249 7.68335 25.0303 0.4646 16.2646 0.4646ZM16.2646 3.55835C23.3545 3.55835 29.1553 9.35913 29.1553 16.449C29.1553 23.6033 23.3545 29.3396 16.2646 29.3396C9.11035 29.3396 3.37402 23.6033 3.37402 16.449C3.37402 9.35913 9.11035 3.55835 16.2646 3.55835ZM25.2881 12.0017L23.8057 10.5193C23.5479 10.197 23.0322 10.197 22.71 10.5193L13.6221 19.5427L9.75488 15.6755C9.43262 15.3533 8.98145 15.3533 8.65918 15.6755L7.17676 17.0935C6.91895 17.4158 6.91895 17.9314 7.17676 18.1892L13.042 24.1189C13.3643 24.4412 13.8154 24.4412 14.1377 24.1189L25.2881 13.0974C25.5459 12.7751 25.5459 12.2595 25.2881 12.0017Z" fill="#95FE93"/>
  </svg>


}

export default Verification
