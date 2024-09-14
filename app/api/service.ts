import { useHttp } from '~/utils/useHttp'
import { decode, encode } from '~/utils/base/dataEncry'
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

// 产品目录
export function getProList(data: any) {
  const classStr = data.classification ? `&classification=${data.classification}` : ''
  const nameStr = data.name ? `&name=${data.name}` : ''
  const unitStr = data.institution ? `&unit=${data.institution}` : ''
  const url = `/prodSer/proListPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}&status=1${classStr}${nameStr}${unitStr}`
  return useHttp.get(getRequestUrl(url))
}

// 产品震害防御列表
export async function getConditionsList(data) {
  const url = `/prodSer/pgnss/ConditionsList`
  const response = await useHttp.post(getRequestUrl(url), encode(data))
  return decode(response)
}
