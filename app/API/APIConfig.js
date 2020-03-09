export default {
  hostname: 'https://backend.parsicar.ir/',

  timeout: 10000,
  validateStatus: status => status >= 200 && status < 302,
  headers: {
    'Content-Type': 'application/json',
  },
  endpoints: [
    //authentication
    {
      key: 'preRegister',
      url: 'v2/token/SendVerifyCodeRequest/',
      method: 'POST',
    },
    {
      key: 'register',
      url: 'v2/token/RegisterUserRequest/',
      method: 'POST',
    },
    {
      key: 'login',
      url: 'v2/token/',
      method: 'POST',
    },
    {
      key: 'verifyToken',
      url: 'v2/token/verify/',
      method: 'POST',
    },

    //fetch front content
    {
      key: 'frontContent',
      url: 'v1/placeholders/',
      method: 'GET',
    },

    //cars list
    {
      key: 'carsList',
      url: 'v2/cars/',
      method: 'GET',
    },
    {
      key: 'brandsList',
      url: 'v2/brands/',
      method: 'GET',
    },
    {
      key: 'search',
      url: 'v2/search/',
      method: 'GET',
    },
    {
      key: 'carDetail',
      url: 'v2/cars/:variable/',
      method: 'GET',
    },


  ],
}
