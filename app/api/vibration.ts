import { useHttp } from '~/utils/useHttp'
import { decode, encode } from '~/utils/base/dataEncry'

const API_PORT = 9539
export function getRequestUrl(url: string, prot?: number) {
  const config = useRuntimeConfig()
  const PORT = prot || API_PORT
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 获取年份
export function getyear() {
  const url = getRequestUrl('/strongserver/shockevent/getyear')
  return useHttp.post(url)
}

// 获取事件
export function getVibration(data) {
  const url = getRequestUrl('/strongserver/shockevent/getyearsdata')
  return useHttp.post(url, data)
}

// 获取台站
export function getVibrationList(data) {
  const url = getRequestUrl('/strongserver/shockstation/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取数据
export function getEventList(data) {
  const url = getRequestUrl('/strongserver/shockcatalogdata/list')
  return useHttp.post(url, data)
}

// 获取数据
export function getStationList(data) {
  const url = getRequestUrl('/station/list')
  return useHttp.post(url, data)
}

// 查询强震台站信息
export function getStationStrong(data) {
  const url = getRequestUrl('/strongserver/pStation/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 强震动获取数据
export function getDataStrong(data) {
  const url = getRequestUrl('/strongserver/data/getData')
  return useHttp.post(url, data)
}
