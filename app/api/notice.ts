import { useHttp } from '~/utils/useHttp'

// 拼接请求地址
export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.cataPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}
// 首页通知公告、地震动态-最新地震动态
export function getList(data?: any) {
  return useHttp.post(getRequestUrl('/infoserver/sb/list'), data, { istoken: true })
}
// 获取列表
export function getEarthList(data?: any) {
  const { pageNum, pageSize } = data
  return useHttp.get(getRequestUrl('/infoserver/sp/pageList'), { pageNum, pageSize })
}
// 获权最新动态列表
export function getConfList(id?: any) {
  return useHttp.get(getRequestUrl('/infoserver/sp/conf/getList'), { id })
}
// 行业链接
export function industry(data: any) {
  return useHttp.post(getRequestUrl('/infoserver/indust/list'), data)
}
