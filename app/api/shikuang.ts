import { decode, encode } from '~/utils/base/dataEncry'
import { useHttp } from '~/utils/useHttp'

const apiPort = '9529'
export function getRequestUrl(url: string, port?: number) {
  const config = useRuntimeConfig()
  const PORT = port || apiPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}

// 获取速报列表
export function getList(str: string) {
  const url = getRequestUrl(`/infoserver/sb/pageList?${str}`)
  return useHttp.get(url)
}
// 获取速报列表
export function getList2(data: any) {
  const url = getRequestUrl(`/infoserver/sp/pageList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&flag=${data.flag}`)
  return useHttp.get(url)
}
// 获取速报列表分页
export function getPageList(data: any) {
  const url = getRequestUrl(`/infoserver/sb/pageList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
  return useHttp.get(url)
}
// 历史地震
export function getHisList(pageNum, pageSize, month, day) {
  const url = getRequestUrl(`/infoserver/historybm/list?pageNum=${pageNum}&pageSize=${pageSize}&month=${month}&day=${day}`)
  return useHttp.get(url)
}
// 获权专家研讨
export function getZJList(data: any) {
  const url = getRequestUrl(`/infoserver/sp/zj/pageList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&spid=${data.spid}`)
  return useHttp.get(url)
}
// 获权最新动态
export function getNewList(data: any) {
  const url = getRequestUrl(`/infoserver/sp/dt/getList?spid=${data.spid}`)
  return useHttp.get(url)
}
// 获权威发布列表
export function getQWList(id) {
  const url = getRequestUrl(`/infoserver/sp/qw/getList?spid=${id}`)
  return useHttp.get(url)
}

// 专家产品
export function getCatalogList(id: string | number) {
  const url = getRequestUrl(`/infoserver/sp/catalog/getList?spid=${id}`)
  return useHttp.get(url)
}

export function getCatalogPage(data: any) {
  const url = getRequestUrl(`/infoserver/sp/catalog/pageList?pageNum=${data.pageNum}&pageSize=${data.pageSize}&spid=${data.spid}&catalog=${data.catalog}&title=${data.title}`)
  return useHttp.get(url)
}

// 产品成果
export function getProdList(data: any) {
  const keys = ['pageNum', 'pageSize', 'type', 'year', 'betyear', 'm', 'betm', 'dm', 'betDM', 'slon', 'elon', 'slat', 'elat', 'localname']
  let url = `/infoserver/sp/major/pageList?`
  keys.forEach((key, index) => {
    if (data[key]) {
      const connector = index === 0 ? '' : '&'
      url += `${connector}${key}=${data[key]}`
    }
  })
  url = getRequestUrl(url)
  return useHttp.get(url)
}

// 产品成果(非分页)
export function getProdList2(data: any) {
  const url = getRequestUrl(`/infoserver/sp/major/getList`)
  return useHttp.post(url, data)
}
