import { useHttp } from '~/utils/useHttp'

// 地震动态-历史上的今天
export function getList(pageNum, pageSize, month, day) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/infoserver/historybm/list?pageNum=${pageNum}&pageSize=${pageSize}&month=${month}&day=${day}`)
}
// 获取最新地震列表
export function getList2(data) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/infoserver/sb/list`, data)
}
