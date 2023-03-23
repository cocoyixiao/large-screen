import axiosInit from './axios-config'

let instance = axiosInit()
export default {
  get(url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.get(url, options)
  },
  post(url, params, headers) {
    let options = {}
    if (headers) {
      options.headers = headers
    }
    return instance.post(url, params, options)
  },
  put(url, params, headers) {
    let options = {}
    if (headers) {
      options.headers = headers
    }
    return instance.put(url, params, options)
  },
  delete(url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.delete(url, options)
  },
  apiurl(url) {
    const apiPrefix = process.env.NODE_ENV === 'development' ? '/restApi' : ''
    return `${apiPrefix}/${url}`
  },
  jsonpUrl(url) {
    const isLocal = location.href.indexOf('8080') > -1
    const prefix = isLocal
      ? '//haina.yiyunzd.cn'
      : process.env.VUE_APP_BASE_API
    return `${prefix}${url}`
  }
}
