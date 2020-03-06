import {makeActionCreator} from '../helpers'
import C from './constants'

export const getFrontContent = makeActionCreator(
  C.FETCH_FRONT_CONTENT,
  'data',
)
export const setHomeData = makeActionCreator(
  C.SET_HOME_DATA,
  'result',
)
