import {verifyToken} from 'Redux/reducers/global/actions'

export const fetching = (store, req) => {
  const {dispatch} = store
  return [
    // dispatch(verifyToken(req.cookies.Authorization))
  ]
}
