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
  if(reqUrl.includes(':variable')){
    url = url.replace(':variable', params.variable)
  }
  if (!params) params = {}
  const Authorization = Cookies.get('Authorization')
  let finalHeaders = headers;
  if(Authorization){
    finalHeaders = {...headers, Authorization}
  }

  return await instance
    .request({
      rejectUnauthorized: false,
      url,
      method,
      params,
      data,
      headers:finalHeaders,
      ...options,
    })
    .then(response => {
      console.log(1, response)
      if(response.status === 200 || !!response.data) return response.data
      else return response
    })
    .catch(error =>{
        console.log(2, error)
        return error.response ? error.response.data : {status: false, error}
    }
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
