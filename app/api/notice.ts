import { useHttp } from '~/utils/useHttp'

export function getList(data?: any) {
  const { apiBase } = data || {}
  return useHttp.post(`${apiBase}/infoserver/sb/list`, data)
}
// 获取列表
export function getEarthList(data?: any) {
  const { pageNum, pageSize, apiBase } = data
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
