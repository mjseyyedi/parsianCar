import React, {useEffect} from 'react'
import {useLocation, Route} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {useSelector, useDispatch} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {QueryParamProvider} from 'use-query-params'

import 'components/theme'
import {getBranch} from 'router/Routes'

import reducer from 'Redux/reducers/global/reducer'
import saga from 'Redux/reducers/global/saga'

import {setRouterMatch, setError, verifyToken} from 'Redux/reducers/global/actions'
import {loginSuccess, setLoginNumber} from 'Redux/reducers/Authentication/actions'

import {selectError, selectLoading, selectUserCredential} from 'Redux/reducers/global/selectors'
import useRedux from 'Hooks/useRedux'

import {Events} from 'utils'

const Providers = ({route}) => {
  const reducers = {global: reducer}
  const sagas = {global: saga}
  useRedux(reducers, sagas)

  const dispatch = useDispatch()
  const location = useLocation()
  const match = getBranch(location.pathname).match


  const selectors = useSelector(createStructuredSelector({
    error: selectError(),
    loading: selectLoading(),
    userCredential: selectUserCredential(),
  }))

  const dispatches = {
    setError: data => dispatch(setError(data)),
    verifyToken: data => dispatch(verifyToken(data)),
  }

  useEffect(() => {
    window.addEventListener(Events.CLICK_ON_LOGIN, e => {
      dispatch(loginSuccess(null))
      dispatch(setLoginNumber(null))
    })

  }, [])

  useEffect(() => {
    dispatch(setRouterMatch(match))
  }, [location.pathname])


  return <QueryParamProvider ReactRouterRoute={Route}>
    {renderRoutes(route.routes, {...selectors, ...dispatches})}
  </QueryParamProvider>
}

export default Providers
