import { useHttp } from '~/utils/useHttp'
// 技术服务
export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.servPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 技术服务列表
interface SrvListParams {
  pageNum: number
  pageSize: number
  sClassification?: string
  sType?: string
  sName?: string
  cUnit?: string
  sort?: string
}
interface SrvResponse {
  current: number
  pages: number
  records: any[]
  size: number
  total: number
  searchCount: boolean
}
export function getServiceList(data: SrvListParams): Promise<SrvResponse> {
  let str = `/prodSer/listPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}&like=${data.sClassification}&type=${data.sType}&name=${data.sName}&unit=${data.cUnit}&status=1`
  if (data.sort) {
    str += `&sort=${data.sort}`
  }
  return useHttp.get(getRequestUrl(str))
}
