import { encode } from '~/utils/base/dataEncry'
import { useHttp } from '~/utils/useHttp'

export function getRequestUrl(url: string, port?: number) {
  const config = useRuntimeConfig()
  const PORT = port || config.public.cataPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 用户登录统计
export function addCollectUser(data) {
  return useHttp.post(getRequestUrl(`/collectserver/collectUser/add`), data)
}

// 用户登出统计
export function setOutTime(data) {
  return useHttp.get(getRequestUrl(`/collectserver/collectUser/setOutTime?userName=${data}`))
}

// 访问量增加
export function viewNumAdd(data) {
  return useHttp.get(getRequestUrl(`/collectserver/viewNumber/viewNumAdd?${data}`))
}

// 学科分类列表
export function getListPage(data) {
  const PORT = 9549
  return useHttp.get(getRequestUrl(`/collectserver/subjectMsg/listPage?${data}`, PORT))
}

// 学科类型列表
export function getTypeDic(data) {
  const PORT = 9549
  return useHttp.get(getRequestUrl(`/collectserver/typeDic/listPage?${data}`, PORT))
}

// 热点数据列表
export function getFlagList(data) {
  const PORT = 9549
  return useHttp.get(getRequestUrl(`/collectserver/hotSpot/getFlagData?${data}`, PORT))
}

// 热点数据列表
export function getHotSpotListPage(data) {
  return useHttp.get(getRequestUrl(`/collectserver/hotSpot/listPage?${data}`))
}

// 热点数据新增
export function hotDataAdd(data) {
  const PORT = 9537
  return useHttp.post(getRequestUrl(`/collectserver/hotSpot/add`, PORT), encode(data))
}
