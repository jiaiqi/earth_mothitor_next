import { decode, encode } from '~/utils/base/dataEncry'
import { useHttp } from '~/utils/useHttp'

const apiPort = 9533

export function getRequestUrl(url: string, port?: number) {
  const config = useRuntimeConfig()
  const PORT = port || apiPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 获取连续站上报单位
export function getContinuous(data) {
  const url = getRequestUrl('/gnss/unit/continuous/list')
  return useHttp.get(url, data)
}

// 获取连续站台网
export function getContinuousNet(data) {
  const url = getRequestUrl('/gnss/network/continuous/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取连续站台站
export function getContinuousList(data) {
  const url = getRequestUrl('/gnss/continuous/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取连续站台站数据
export function getContinuousDataList(data) {
  const url = getRequestUrl('/gnss/continuous/data/list')
  return useHttp.post(url, data)
}

// 获取流动站上报单位
export function getFlow(data) {
  const url = getRequestUrl('/gnss/unit/flow/list')
  return useHttp.post(url, data)
}

// 获取流动站台网
export function getFlowNet(data) {
  const url = getRequestUrl('/gnss/network/flow/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取流动站台站
export function getFlowGnss(data) {
  const url = getRequestUrl('/gnss/flow/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取流动站台站数据
export function getFlowGnssList(data) {
  const url = getRequestUrl('/gnss/flow/data/list')
  return useHttp.post(url, data)
}

// 获取GNSS台站数据
export function getGnssList(data) {
  const url = getRequestUrl('/gnss/station/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取GNSS台站具体数据
export function getGnssData(data) {
  const url = getRequestUrl('/gnss/data/list')
  return useHttp.post(url, data)
}
// 获取GNSS台站具体数据
export function gnssHeadSearch(data) {
  const url = getRequestUrl('/gnss/data/headSearch')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}
