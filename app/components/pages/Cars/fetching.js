import {injector} from 'Redux/storeManager'

import saga from 'Redux/reducers/Cars/saga'
import reducer from 'Redux/reducers/Cars/reducer'


import {getCarsList, getBrandsList, searchCars} from 'Redux/reducers/Cars/actions'

export const fetching = (store, req) => {

  const {dispatch} = store
  const {query} = req
  injector(store, {cars: reducer}, {cars: saga})

  if(Object.values(query).some(item => item)){
    return [
      dispatch(searchCars(query)),
      dispatch(getBrandsList())
    ]
  }
  else{
    return [
      dispatch(getCarsList()),
      dispatch(getBrandsList())
    ]
  }


}
