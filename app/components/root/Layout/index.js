import React, {useEffect} from 'react'
import {renderRoutes} from 'react-router-config'
import Cookies from 'js-cookie'

import Navbar from 'components/common/Navbar'
import Footer from 'components/common/Footer'
import MobileFooter from 'components/common/MobileFooter'

const Layout = props => {

  let userAgent = ''
  let Authorization = ''

  if (props.staticContext && props.staticContext.userAgent) {
    userAgent = props.staticContext.userAgent
    Authorization = props.staticContext.Authorization
  } else {
    userAgent = navigator.userAgent
    Authorization = Cookies.get('Authorization')
  }
  let isMobile = Boolean(userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ))

  useEffect(() =>{
    if(Authorization){
      props.verifyToken(Authorization)
    }

  } , [Authorization])



  return <React.Fragment>
    {!isMobile ? <Navbar userCredential={props.userCredential}/> : null}
    {renderRoutes(props.route.routes, {...props, isMobile, Authorization})}

    {
      !isMobile ? <Footer /> : <MobileFooter/>
    }
  </React.Fragment>
}

export default Layout
