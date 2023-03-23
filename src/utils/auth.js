import Cookies from 'js-cookie'

const TokenKey = 'XD-HNTV-TOKEN'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token, { expires: 2 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
