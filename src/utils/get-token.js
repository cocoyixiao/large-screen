import { isAndroid } from './_util'
export function getAppToken() {
  return new Promise((resolve, reject) => {
    if (isAndroid()) {
      try {
        if (window.Android && window.Android.setToken) {
          const str = window.Android.setToken()
          resolve(str)
        }
      } catch (err) {
        console.log('getHbHeaders failed, Android plateform')
      }
    } else {
      reject('null')
    }
  })
}
