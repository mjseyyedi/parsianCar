import {injector} from 'Redux/storeManager'

import reducer from 'Redux/reducers/Home/reducer'
import saga from 'Redux/reducers/Home/saga'

import {getFrontContent} from 'Redux/reducers/Home/actions'

export const fetching = (store, req) => {
  const {dispatch} = store
  injector(store, {home: reducer}, {home: saga})

  return [
    dispatch(getFrontContent())
  ]
}
