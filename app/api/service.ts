import { useHttp } from '~/utils/useHttp'
import { decode, encode } from '~/utils/base/dataEncry'
// 技术服务
export function getRequestUrl(url: string, prot?: number) {
  const config = useRuntimeConfig()
  const PORT = prot || config.public.servPort
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

// 获取速报列表
export function getEveList(data: any) {
  const url = `/infoserver/sb/pageList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&m=${data.m || ''}`
  return useHttp.get(getRequestUrl(url))
}

// 震源机制解
export function seisserverXGPList(data) {
  const url = `/seisserver/XGP/list`
  const PORT = 9528
  return useHttp.post(getRequestUrl(url, PORT), `pageNum=${data.pageNum}&pageSize=${data.pageSize}`, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
}

// 震源机制解目录
export function seisserverSMSList(data: any) {
  const url = `/seisserver/SMS/list`
  const PORT = 9528
  return useHttp.post(getRequestUrl(url, PORT), `pageNum=${data.pageNum}&pageSize=${data.pageSize}`, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
}

// 统一编目目录
export function seisserverORList(data) {
  const url = `/seisserver/OR/list`
  const PORT = 9528
  return useHttp.post(getRequestUrl(url, PORT), `pageNum=${data.pageNum}&pageSize=${data.pageSize}`, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
}

// 产品附件列表
export async function getFileList(data) {
  const url = '/prodSer/fileInAdd/list'
  const res = await useHttp.post(getRequestUrl(url), encode(data))
  return decode(res)
}

// 产品类型字典表列表
export async function dictionaryList(data) {
  const url = `/prodSer/dictionary/list`
  const res = await useHttp.post(getRequestUrl(url), encode(data))
  return decode(res)
}

// 产品图片
export function getLinkFile(id: any) {
  const url = `/prodSer/getLinkFile?id=${id}`
  return useHttp.get(getRequestUrl(url)).then(res => decode(res))
}

// 产品条件查询
export function getProdConditionList(data) {
  const url = `/prodSer/ptemplate/list`
  const params = {
    description: data.description, // 所属产品目录名称
    p_time: data.p_time, // 产品编制时间
    institution: data.institution, // 提供单位
  }
  return useHttp.post(getRequestUrl(url), encode(params)).then(res => decode(res))
}

// 技术服务查询条件查询
export function getProdSerList(data) {
  const url = `/prodSer/ptemplate/list`
  const params = {
    ssort: data.ssort, // 分类
    c_time: data.c_time, // 创建时间
    c_unit: data.c_unit, // 提供单位
  }
  return useHttp.post(getRequestUrl(url), encode(params)).then(res => decode(res))
}
// 科普预览
export function preView(data: any) {
  const url = '/prodSer/downloadImage/?filename='+ data
  return useHttp.get(getRequestUrl(url))
}