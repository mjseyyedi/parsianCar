import axios from 'axios'
import Cookies from 'js-cookie'
import APIConfig from './APIConfig'

axios.defaults.withCredentials = false

const axiosConfig = {
  baseURL: APIConfig.hostname,
  timeout: APIConfig.timeout,
  validateStatus: APIConfig.validateStatus,
  maxRedirects: 0,
  // transformRequest: [data => querystring.stringify(data)],
}

let instance = axios.create(axiosConfig)

const request = async (reqUrl, method, params, data, headers, options) => {
  let url = reqUrl
  if (!params) params = {}
  const Authorization = Cookies.get('Authorization')

  return await instance
    .request({
      url,
      method,
      params,
      data,
      headers:{...headers, Authorization},
      ...options,
    })
    .then(response => {
      if(response.status === 200 || !!response.data) return response.data
      else return response
    })
    .catch(error =>
      error.response ? error.response.data : {status: false, error},
    )
}

const API = {}

APIConfig.endpoints.forEach(endpoint => {
  API[endpoint.key] = (params, body) => {
    return request(
      endpoint.url,
      endpoint.method,
      params,
      body,
      endpoint.headers || APIConfig.headers,
      endpoint.options,
    )
  }
})

export default API
