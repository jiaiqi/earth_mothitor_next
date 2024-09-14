import { useHttp } from '~/utils/useHttp'
import { encode } from '~/utils/base/dataEncry'
// 技术服务
export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.servPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

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

// 技术服务列表 带分页参数
export function getServiceList(data: SrvListParams): Promise<SrvResponse> {
  let str = `/prodSer/listPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}&like=${data.sClassification}&type=${data.sType}&name=${data.sName}&unit=${data.cUnit}&status=1`
  if (data.sort) {
    str += `&sort=${data.sort}`
  }
  return useHttp.get(getRequestUrl(str))
}

// 查询单个服务的富文本
export function getHtml(id: any) {
  const par = {
    id,
  }
  const url = `/prodSer/getHtml`
  return useHttp.post(getRequestUrl(url), encode(par))
}

// 增加浏览量
export function addRemod(id: any) {
  const par = {
    id,
  }
  const url = '/prodSer/addRemod'
  return useHttp.post(getRequestUrl(url), encode(par))
}
