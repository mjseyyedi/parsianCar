import React, {useEffect, useState} from 'react'
import {renderRoutes} from 'react-router-config'
import Cookies from 'js-cookie'

import Navbar from 'components/common/Navbar'
import Footer from 'components/common/Footer'
import MobileFooter from 'components/common/MobileFooter'
import Notification from 'components/common/Notification'
import Loading from 'components/common/Loading'

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

  const [messageText, setMText] = useState('')
  const [messageType, setMType] = useState('')
  const [messageVisibility, setVisibility] = useState(false)

  useEffect(() =>{
    if(Authorization){
      props.verifyToken(Authorization)
    }

  } , [Authorization])

  function addNotification(type, text) {
    setMText(text)
    setMType(type)
    setVisibility(true)
  }

  return <React.Fragment>
    {
      props.loading &&  <Loading />
    }
    {!isMobile ? <Navbar userCredential={props.userCredential}/> : null}

    <Notification text={messageText}
                  type={messageType}
                  isOpen={messageVisibility}
                  onClose={() => setVisibility(false)}/>

    {renderRoutes(props.route.routes, {...props, isMobile, Authorization, addNotification})}

    {
      !isMobile ? <Footer /> : <MobileFooter/>
    }
  </React.Fragment>
}

export default Layout
