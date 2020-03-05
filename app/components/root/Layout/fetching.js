import {verifyToken} from 'Redux/reducers/global/actions'

export const fetching = (store, req) => {
  console.log(7777,req.cookies)
  const {dispatch} = store
  return [
    dispatch(verifyToken(req.cookies.Authorization))
  ]
}
