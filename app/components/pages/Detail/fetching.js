import {injector} from 'Redux/storeManager'

import saga from 'Redux/reducers/Cars/saga'
import reducer from 'Redux/reducers/Cars/reducer'


import {getCarDetail} from 'Redux/reducers/Cars/actions'

export const fetching = (store, req) => {

  const {dispatch} = store
  const {params} = req.router.match

  injector(store, {cars: reducer}, {cars: saga})
    return [
      dispatch(getCarDetail(params.id)),
    ]



}
