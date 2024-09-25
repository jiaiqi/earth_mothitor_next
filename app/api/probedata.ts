import { decode, encode } from '~/utils/base/dataEncry'
import { useHttp } from '~/utils/useHttp'

const apiPort = 9527

export function getRequestUrl(url: string, port?: number) {
  const config = useRuntimeConfig()
  const PORT = port || apiPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 获取基础数据
export function getBasic(data) {
  const url = getRequestUrl('/geophyserver/basic/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取基础数据
export function getGeophydata(data) {
  const url = getRequestUrl('/geophyserver/geophydata/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}
// 获取基础数据
export function getDRlist(data) {
  const url = getRequestUrl('/geophyserver/dr/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 钻孔联合剖面列表
export function manpowerList(data) {
  const url = getRequestUrl('/geophyserver/manpower/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 钻孔联合剖面点列表
export function manpowerPointList(data) {
  const url = getRequestUrl(`/geophyserver/manpower/point/pageList?line_id=${data.line_id}&pageNum=1&pageSize=999`)
  return useHttp.get(url, data)
}

// 人工地震勘探列表
export function drillList(data) {
  const url = getRequestUrl('/geophyserver/drill/list')
  return useHttp.post(url, encode(data)).then(res => decode(res))
}

// 获取点基础数据
export function getPointDrillList(data) {
  const url = getRequestUrl(`/geophyserver/drill/point/pageList?pageNum=1&pageSize=999&line_id=${data.line_id}`)
  return useHttp.get(url, data)
}
