import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import {loadableReady} from '@loadable/component'

import getStore from 'Redux'
import {ClientRouter} from './router'


const store = getStore()
const MOUNT_NODE = document.getElementById('app')

window.addEventListener('load', async () =>
  loadableReady(async () => {
    await Promise.all(polyfillPackages())
    hydrate(
      <Provider store={store}>
        <ClientRouter />
      </Provider>,
      MOUNT_NODE,
    )
  }),
)

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
const polyfillPackages = () => {
  let packages = []
  return packages
}
