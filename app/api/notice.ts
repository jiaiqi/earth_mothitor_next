import { useHttp } from '~/utils/useHttp'

// 首页通知公告、地震动态-最新地震动态
export function getList(data?: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/infoserver/sb/list`, data)
}
// 获取列表
export function getEarthList(data?: any) {
  const { pageNum, pageSize } = data
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.get(`${apiBase}/infoserver/sp/pageList`, { pageNum, pageSize })
}
// 获权最新动态列表
export function getConfList(id?: any, apiBase?: string) {
  return useHttp.get(`${apiBase}/infoserver/sp/conf/getList`, { id })
}
// 行业链接
export function industry(data: any) {
  const { apiBase } = data
  return useHttp.post(`${apiBase}/infoserver/indust/list`, data)
}
