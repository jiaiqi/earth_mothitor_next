import { decode, encode } from '~/utils/base/dataEncry'
import { useHttp } from '~/utils/useHttp'

const apiPort = 9546

export function getRequestUrl(url: string, port?: number) {
  const config = useRuntimeConfig()
  const PORT = port || apiPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}
// 获取大地形变
export function getCompany(data) {
  const url = getRequestUrl('/levelserver/levelline/getyear')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}
// 根据年份获取水准线
export function getYList(data) {
  const url = getRequestUrl('/levelserver/level/lp/yearList')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}
// 获取水准上报单位
export function getUnit(data) {
  const url = getRequestUrl('/levelserver/level/unit/allList')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取水准电
export function getStand(data) {
  const url = getRequestUrl('/level/point/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取水准联系单位
export function getCUnit(data) {
  const url = getRequestUrl('/levelserver/levelline/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取台网信息
export function getCompanyList(data) {
  const url = getRequestUrl('/seisserver/network/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}
