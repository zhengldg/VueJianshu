import axios from 'axios'
// import { httpErrorMessage, httpErrorTitle } from './config'

axios.default.timeout = 5000
axios.defaults.headers.common['Accept'] = 'application/json'
// axios.defaults.baseURL = '/api/'

const instance = axios.create()

axios.interceptors.request.use = instance.interceptors.request.use
// instance.interceptors.request.use(config => {
//   var token = getToken()
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// }, err => {
//   return Promise.reject(err)
// })
// axios拦截响应
// instance.interceptors.response.use(response => {
//   if (response.data.success) {
//     return response.data
//   } else {
//     const error = response.data.error || { detail: httpErrorMessage, message: httpErrorTitle }
//     return Promise.reject(error)
//   }
// }, err => {
//   if (err) {
//     let error = { details: httpErrorMessage, message: httpErrorTitle }
//     if (err.response.data) {
//       error = err.response.data.error
//     }
//     return Promise.reject(error)
//   }
// })

export default instance