import { useHttp } from '~/utils/useHttp'

// 用户登录统计
export function addCollectUser(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/collectserver/collectUser/add`, data)
}

// 用户登出统计
export function setOutTime(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/collectserver/collectUser/setOutTime?userName=${data}`)
}

// 访问量增加
export function viewNumAdd(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/collectserver/viewNumber/viewNumAdd?${data}`)
}

// 学科分类列表
export function getListPage(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/collectserver/subjectMsg/listPage?${data}`)
}

// 学科类型列表
export function getTypeDic(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/collectserver/typeDic/listPage?${data}`)
}

// 热点数据列表
export function getFlagList(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/collectserver/hotSpot/getFlagData?${data}`)
}

// 热点数据列表
export function getHotSpotListPage(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/collectserver/hotSpot/listPage?${data}`)
}

// 热点数据新增
export function hotDataAdd(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/collectserver/hotSpot/add`, data)
}
