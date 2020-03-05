import React from 'react'
import {renderRoutes} from 'react-router-config'
import {StaticRouter, BrowserRouter} from 'react-router-dom'

import Routes from './Routes'

export const ClientRouter = () => (
  <BrowserRouter >{renderRoutes(Routes)}</BrowserRouter>
)

export const ServerRouter = props => (
  <StaticRouter {...props}>{renderRoutes(Routes)}</StaticRouter>
)
