import { decode, encode } from '~/utils/base/dataEncry'
import { useHttp } from '~/utils/useHttp'

const aipPort = 9534
export function getRequestUrl(url: string, port?: number) {
  const config = useRuntimeConfig()
  const PORT = port || aipPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 获取台网
export function getPrecursorList(data) {
  const url = getRequestUrl('/precursorserver/prenetwork/list')
  return useHttp.post(url, data)
}

// 获取台站
export function getPrestationList(data) {
  const url = getRequestUrl('/precursorserver/prestation/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取全国台站
export function getWordList(data) {
  const url = getRequestUrl('/precursorserver/upderFluid/station/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取菜单
export function getPreitem(data) {
  const url = getRequestUrl('/precursorserver/preitem/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取前兆台站具体数据
export function getpredataList(data) {
  const url = getRequestUrl('/precursorserver/predata/list')
  return useHttp.post(url, data)
}

export function getData(data) {
  const url = getRequestUrl('/precursorserver/upderFluid/data/getData')
  return useHttp.post(url, data)
}

// 获取地质台站数据
export function geoStationList(data) {
  const url = getRequestUrl('/precursorserver/geological/station/list')
  return useHttp.post(url, data)
}

// 获取地质台站具体数据
export function geoGetData(data) {
  const url = getRequestUrl('/precursorserver/geological/data/getData')
  return useHttp.post(url, data)
}
