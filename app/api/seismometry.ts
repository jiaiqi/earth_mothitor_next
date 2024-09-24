// 测震
import { useHttp } from '~/utils/useHttp'
import { decode, encode } from '~/utils/base/dataEncry'

export function getRequestUrl(url: string, prot?: number) {
  const config = useRuntimeConfig()
  const PORT = prot || config.public.basePort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 获取上报单位
export function getCompany(data) {
  const url = getRequestUrl('/seisserver/uploaadunit/list')
  return useHttp.get(url, data)
}

// 获取台网信息
export function getCompanyList(data) {
  const PORT = 9528
  const url = getRequestUrl('/seisserver/network/list', PORT)
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 查询台站信息
export function getStation(data) {
  const PORT = 9528
  const url = getRequestUrl('/seisserver/station/pStation/list', PORT)
  return useHttp.get(url, encode(data)).then(res => decode(res))
}

// 查询台站信息
export function getAllStation(data) {
  const PORT = 9528
  const url = getRequestUrl('/seisserver/station/list', PORT)
  // return useHttp.post(url, data).then(res => res)
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 查询台站数量
export function getStationBNum() {
  const url = getRequestUrl('/seisserver/station/list/countdata')
  return useHttp.get(url)
}

// 查询通道信息
export function getcata(data) {
  const PORT = 9528
  const url = getRequestUrl('/seisserver/catalogdata/list', PORT)
  return useHttp.post(url, encode(data)).then(res => decode(res))
}
// 查询通道信息
export function getChannel(data) {
  const url = getRequestUrl('/seisserver/channel/list')
  return useHttp.post(url, data)
}
// 模糊查询
export function likeList(data) {
  const url = getRequestUrl('/seisserver/station/likeList')
  return useHttp.post(url, data)
}
// 数据
export function getData(queryString: string) {
  const url = getRequestUrl(`/seisserver/catalogdata/getData?${queryString}`)
  return useHttp.get(url)
}
// 数据
export function headSearch(data) {
  const url = getRequestUrl(`/seisserver/catalogdata/headSearch`)
  return useHttp.post(url, data)
}

// 获取台阵上报单位
export function getarrayunit(data) {
  const PORT = 9539
  return useHttp.post(getRequestUrl(`/arrayserver/arrayunit/list`, PORT), data)
}

// 获取台阵台网
export function getarraynetwork(data) {
  const PORT = 9537
  return useHttp.post(getRequestUrl(`/arrayserver/arraynetwork/list`, PORT), encode(data)).then(res => decode(res))
}

// 获取台站
export function getArraystation(data) {
  const PORT = 9537
  return useHttp.post(getRequestUrl(`/arrayserver/arraystation/list`, PORT), encode(data)).then(res => decode(res))
}

// 获取台站数据
export function getArraycatalogdat(data) {
  const PORT = 9539
  return useHttp.post(getRequestUrl(`/arrayserver/arraycatalogdata/list`, PORT), encode(data)).then(res => decode(res))
}
