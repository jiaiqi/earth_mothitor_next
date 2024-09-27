import { encode } from '~/utils/base/dataEncry'
import { useHttp } from '~/utils/useHttp'

// 拼接请求地址
export function getRequestUrl(url: string, port) {
  const config = useRuntimeConfig()
  const PORT = port || config.public.cataPort
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
// 获取速报列表
export function getNoticeList(id: any) {
  return useHttp.get(getRequestUrl('/infoserver/sb/pageList'), { id })
}

// 子站接口
export function childSpotList() {
  const port = 9546
  const url = getRequestUrl('/replyserver/substation/pageList', port)
  return useHttp.post(url, encode({ pageNum: 1, pageSize: 50 }))
}
