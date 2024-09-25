import { useHttp } from '~/utils/useHttp'

export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.cataPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}
// 地震动态-历史上的今天
export function getList(pageNum: number, pageSize: number, month: any, day: any) {
  return useHttp.get(getRequestUrl(`/infoserver/historybm/list?pageNum=${pageNum}&pageSize=${pageSize}&month=${month}&day=${day}`))
}
// 获取最新地震列表
export function getList2(data: any) {
  return useHttp.post(getRequestUrl('/infoserver/sb/list'), data)
}
// 获取速报列表
export function getEveList(data: any) {
  const url = `/infoserver/sb/pageList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`
  return useHttp.get(getRequestUrl(url))
}