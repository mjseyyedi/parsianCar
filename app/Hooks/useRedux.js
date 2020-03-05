import React, {useEffect} from 'react'

import {useStore} from 'react-redux'
import {injector, ejector} from 'Redux/storeManager'

export default function useRedux(reducers, sagas) {
  const store = useStore()
  injector(store, reducers, sagas)

  useEffect(() => {

    return () =>{
      // ejector(store, reducers, sagas)
    }

  } , [reducers, sagas])
}
