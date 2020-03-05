import {makeActionCreator} from '../helpers'
import C from './constants'

export const getFrontContent = makeActionCreator(
  C.FETCH_FRONT_CONTENT,
  'data',
)
