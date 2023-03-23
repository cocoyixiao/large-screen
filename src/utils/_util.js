
/**
 * [通过参数名获取url中的参数值]
 * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 * @param  {[string]} queryName [参数名]
 * @return {[string]}           [参数值]
 */
export function queryParams(queryName) {
  var query = decodeURI(window.location.search.substring(1))
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == queryName) {
      return pair[1]
    }
  }
  return null
}
/**
 * 用于获取滚动元素
 * @param { Undefined }
 * @return { DOM }
 */
export function bodyOrHtml() {
  if ('scrollingElement' in document) {
    return document.scrollingElement
  }
  if (navigator.userAgent.indexOf('WebKit') != -1) {
    return document.body
  }
  return document.documentElement
}

// 获取滚动条在Y轴上的滚动距离
export function getScrollTop() {
  var scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
  return scrollTop
}

// 获取文档的总高度
export function getScrollHeight() {
  var scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight
  return scrollHeight
}

// 浏览器视口的高度
export function getWindowHeight() {
  var windowHeight = 0
  if (document.compatMode == 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

// 获取滚动条到底部的距离
export function scrollBottomSize() {
  return getScrollHeight() - getScrollTop() - getWindowHeight()
}

// 冻结对象
export function deepFreeze(obj) {
  var propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(function(name) {
    var prop = obj[name]
    if (typeof prop == 'object' && prop !== null) {
      deepFreeze(prop)
    }
  })
  return Object.freeze(obj)
}

// 判断是否是ios
export function isIos() {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

// 判断是否是android
export function isAndroid() {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
}

// 对比两个对象的值是否完全相等 返回值 true/false
export function isObjectValueEqual(a, b) {
  if (!a || !b) return false
  //取对象a和b的属性名
  var aProps = Object.keys(a) //返回指定对象所有自身属性名
  var bProps = Object.keys(b)

  //判断属性名的length是否一致
  if (aProps.length != bProps.length) {
    return false
  }
  //循环取出属性名，再判断属性值是否一致
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}

// 生成图片随机名字
export function guid() {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export function getBlob(canvas) {
  //获取blob对象
  var data = canvas.toDataURL('image/jpeg', 1)
  data = data.split(',')[1]
  data = window.atob(data)
  var ia = new Uint8Array(data.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  return new Blob([ia], {
    name: guid(),
    type: 'image/jpeg'
  })
}

// 生成随机数
export function randomNum(Min, Max) {
  const Range = Max - Min
  const Rand = Math.random()
  return Min + Math.round(Rand * Range)
}

/*
 * 判断是否在微信环境
 */
export function isWeixin() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 判断文件类型
export const isAudio = path => {
  return /\.(opus|flac|webm|weba|wav|ogg|m4a|mp3|oga|mid|amr|aiff|wma|au|aac)/.test(
    path
  )
}

export const isVideo = path => {
  return /\.(mp4|avi|wmv|mpg|mpeg|mov|rm|ram|swf|flv)/.test(path)
}

export const isImage = path => {
  return /\.(xbm|tif|pjp|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)/.test(
    path
  )
}

// 不足10的数字前面加0
export function addZero(val) {
  return val < 10 ? '0' + val : val
}

// 处理POST的数据
export function sortParmas(obj) {
  let keys = Object.keys(obj)
  if (!Array.isArray(keys)) return ''
  keys.sort()
  return keys.map(key => obj[key]).join(',')
}

// 滚动条滚动到指定位置
export function scrollAnimation(currentY, targetY) {
  // 获取当前位置方法
  // const currentY = document.documentElement.scrollTop || document.body.scrollTop

  // 计算需要移动的距离
  let needScrollTop = targetY - currentY
  let _currentY = currentY
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    window.scrollTo(_currentY, currentY)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY)
    } else {
      window.scrollTo(_currentY, targetY)
    }
  }, 1)
}

// 获取元素相对于文档的距离
export function offset(element) {
  var pos = { left: 0, top: 0 }

  var parents = element.offsetParent

  pos.left += element.offsetLeft
  pos.top += element.offsetTop

  while (parents && !/html|body/i.test(parents.tagName)) {
    pos.left += parents.offsetLeft
    pos.top += parents.offsetTop

    parents = parents.offsetParent
  }
  return pos
}

// 根据北京时间转换为当前时区，页面需引入momentjs和moment zone
export function timeToLocal(zoneId, zoneOffset, time) {
  const beijingOffset = 480
  const localTime = (time - beijingOffset + zoneOffset / 60000) * 1000
  // eslint-disable-next-line no-undef
  const timeZoneInvalid = moment.tz.zone(zoneId)
  let temp = ''
  if (!timeZoneInvalid) {
    // eslint-disable-next-line no-undef
    temp = moment(localTime)
  } else {
    // eslint-disable-next-line no-undef
    temp = moment(time * 1000).tz(zoneId)
  }
  return temp
}

// 设置支付的url
export function setPayUrl() {
  let num = 120 //失效时间是几分钟
  let time = new Date(new Date().getTime() + num * 60 * 1000)
  // eslint-disable-next-line no-undef
  Cookies.set('pay_url', location.href, {
    expires: time,
    domain: location.hostname
  })
}

// 转换时间
// format--YMD，MD
// gap-- '/'或 '-'
export function timeToYmd(val, format, gap) {
  const timeStamp = val * 1000
  const time = new Date(timeStamp)
  const year = time.getFullYear()
  const month = addZero(time.getMonth() + 1)
  const date = addZero(time.getDate())
  let str = ''
  if (format === 'YMD') {
    str = year + gap + month + gap + date
  } else {
    str = month + gap + date
  }
  return str
}

// 转换时间为XX-ago
export function timeRelativeTostr(serverTime, time) {
  const dis = serverTime - time
  let arr = ''
  if (dis < 60) {
    arr = 'A moment ago'
  } else if (dis < 60 * 60) {
    arr = parseInt(dis / 60) + ' munites ago'
  } else if (dis < 24 * 60 * 60) {
    arr = parseInt(dis / (60 * 60)) + ' hours ago'
  } else {
    arr = parseInt(dis / (24 * 60 * 60)) + ' days ago'
  }
  return arr
}

// 生成uuID
export function creatUuid() {
  var s = []
  var hexDigits = 'abcdefghijklmnopqrstuvwxyz' + 'www.hanbook.com'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

// 根据URL生成随机串
export function creatYzStr() {
  const hostname = location.hostname
  const frist = hostname.split('.')[1].slice(0, 1)
  const second = location.pathname.replaceAll('/', '').slice(2, 3)
  return { a: frist, b: second }
}

// rgba转16进制
export function rgbToHex(color) {
  var values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',')
  var a = parseFloat(values[3] || 1),
    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
  return (
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  )
}

// 获取URL上所有的参数
export function getUrlQuerys() {
  var url = location.search //获取url中"?"符后的字串
  var obj = {}

  if (url.indexOf('?') !== -1) {
    var str = url.substring(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      obj[strs[i].split('=')[0]] = strs[i].split('=')[1]
    }
  }
  return obj
}

export function getCookie(cookieName) {
  //获取所有的cookie "psw=1234we; rememberme=true; user=Annie"
  var totalCookie = document.cookie
  //获取参数所在的位置
  var cookieStartAt = totalCookie.indexOf(cookieName + '=')
  //判断参数是否存在 不存在直接返回
  if (cookieStartAt == -1) {
    return
  }
  //获取参数值的开始位置
  var valueStartAt = totalCookie.indexOf('=', cookieStartAt) + 1
  //以;来获取参数值的结束位置
  var valueEndAt = totalCookie.indexOf(';', cookieStartAt)
  //如果没有;则是最后一位
  if (valueEndAt == -1) {
    valueEndAt = totalCookie.length
  }
  //截取参数值的字符串
  var cookieValue = unescape(totalCookie.substring(valueStartAt, valueEndAt))
  return cookieValue
}
