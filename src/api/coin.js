import xhr from '../utils/xhr'

export function login(params) {
  return xhr.post(xhr.apiurl('sigapi.php?mod=tvstatisticslogin'), params)
}

export function indexData(params) {
  return xhr.get(xhr.apiurl('sigapi.php?mod=tvstatisticsindex'), params)
}

export function getDoctorDatas(params) {
  return xhr.post(xhr.apiurl('sigapi.php?mod=tvstatisticstoday'), params)
}