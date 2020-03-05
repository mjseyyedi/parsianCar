import loadable from '@loadable/component'
import {matchRoutes} from 'react-router-config'

import Layout from 'components/root/Layout'
import Providers from 'components/root/Providers'

import {fetching as layoutFetching} from 'components/root/Layout/fetching'

const Routes = [
  {
    component: Providers,
    routes: [
      {
        component: Layout,
        fetching: layoutFetching,
        routes: [
          {
            component: loadable(() => import('components/pages/Home')),
            path: '/',
            exact: true,
            fetching: import('components/pages/Home/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Authentication/Login')),
            path: '/login',
            exact: true,
            fetching: import('components/pages/Authentication/Login/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Authentication/ConfirmOTP')),
            path: '/login/confirm-otp',
            exact: true,
            fetching: import('components/pages/Authentication/ConfirmOTP/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Authentication/SetPassword')),
            path: '/login/set-password',
            exact: true,
            fetching: import('components/pages/Authentication/SetPassword/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Authentication/Password')),
            path: '/login/password',
            exact: true,
            fetching: import('components/pages/Authentication/Password/fetching'),
          },
        ],
      },
    ],
  },
]

export default Routes

export const getBranch = pathname => {
  const branch = matchRoutes(Routes, pathname)
  const branchHead = branch[branch.length - 1]
  branchHead.match.url = pathname
  const route = {branch, match: branchHead.match}
  return route
}
