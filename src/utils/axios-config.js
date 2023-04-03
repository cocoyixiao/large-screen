/**
 * 创建统一封装过的 axios 实例
 * @return {http}
 */
import axios from 'axios'
import { getToken } from '@/utils/auth'
// 创建 axios 实例
let http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 60000
})

// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
http.defaults.withCredentials = true

// 添加请求拦截器
http.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['XD-HNTV-TOKEN'] = token
    }
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    let { data } = response
    if (data ===200) {
      return data
    } else {
      return data
    }
  },
  error => {
    let info = {}
    let { status, statusText, data } = error.response
    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      }
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      }
    }
    return Promise.reject(info)
  }
)

export default function() {
  return http
}
