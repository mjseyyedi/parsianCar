import {injector} from 'Redux/storeManager'

import saga from 'Redux/reducers/Cars/saga'
import reducer from 'Redux/reducers/Cars/reducer'


import {getCarsList, getBrandsList} from 'Redux/reducers/Cars/actions'

export const fetching = (store, req) => {
  const {dispatch} = store
  injector(store, {cars: reducer}, {cars: saga})

  return [
    dispatch(getCarsList()),
    dispatch(getBrandsList())
  ]
}
