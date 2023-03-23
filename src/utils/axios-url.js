const baseUrl = process.env.VUE_APP_BASE_API
const httpPrefix = baseUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'
export default {
  baseUrl,
  httpPrefix
}
