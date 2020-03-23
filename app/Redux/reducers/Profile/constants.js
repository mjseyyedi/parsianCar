const withPrefix = action => `PROFILE/${action}`

export default {
  GET_USER_INFO: withPrefix('REDUCER/GET_USER_INFO'),
  SET_USER_INFO: withPrefix('REDUCER/SET_USER_INFO'),

  UPDATE_PROFILE: withPrefix('REDUCER/UPDATE_PROFILE'),
  UPDATE_PROFILE_SUCCESS: withPrefix('REDUCER/UPDATE_PROFILE_SUCCESS'),

}
