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
            guestOnly: true,
            fetching: import('components/pages/Authentication/Login/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Authentication/ConfirmOTP')),
            path: '/login/confirm-otp',
            exact: true,
            guestOnly: true,
            fetching: import('components/pages/Authentication/ConfirmOTP/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Authentication/SetPassword')),
            path: '/login/set-password',
            exact: true,
            guestOnly: true,
            fetching: import('components/pages/Authentication/SetPassword/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Authentication/Password')),
            path: '/login/password',
            exact: true,
            guestOnly: true,
            fetching: import('components/pages/Authentication/Password/fetching'),
          },
          // {
          //   component: loadable(() => import('components/pages/Reserve')),
          //   path: '/cars/reserve/:carId',
          //   exact: true,
          //   fetching: import('components/pages/Reserve/fetching'),
          // },
          {
            component: loadable(() => import('components/pages/Detail')),
            path: '/cars/detail/:id',
            exact: true,
            fetching: import('components/pages/Detail/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Cars')),
            path: '/cars/:brand/:category',
            exact: true,
            fetching: import('components/pages/Cars/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Factor')),
            path: '/checkout',
            exact: true,
            authenticatedOnly: true,
            fetching: import('components/pages/Factor/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Menu')),
            path: '/profile',
            exact: true,
            authenticatedOnly: true,
            fetching: import('components/pages/Menu/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Profile')),
            path: '/profile/edit',
            exact: true,
            authenticatedOnly: true,
            fetching: import('components/pages/Profile/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Documents')),
            path: '/profile/documents',
            exact: true,
            authenticatedOnly: true,
            fetching: import('components/pages/Documents/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Factor')),
            path: '/profile/factor',
            exact: true,
            authenticatedOnly: true,
            fetching: import('components/pages/Factor/fetching'),
          },
          {
            component: loadable(() => import('components/pages/Orders')),
            path: '/profile/orders',
            exact: true,
            authenticatedOnly: true,
            fetching: import('components/pages/Orders/fetching'),
          },
          {
            component: loadable(() => import('components/pages/ChangePassword')),
            path: '/profile/change-password',
            exact: true,
            authenticatedOnly: true,
            fetching: import('components/pages/ChangePassword/fetching'),
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
