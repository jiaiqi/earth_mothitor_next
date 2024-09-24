import { useHttp } from '~/utils/useHttp'
import { decode, encode } from '~/utils/base/dataEncry'

export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.earthquakePort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}
// 地震科普-分类列表
export function getknowledge(data: any) {
    const typeId = data.typeId ? `&typeId=${data.typeId}` : ''
    const url = `/knowledgeserver/knowledge/listPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}&taskState=0${typeId}`
    return useHttp.get(getRequestUrl(url))
}
// 标准法规-标准列表
export function getFlagList(data: any) {
    return useHttp.post(getRequestUrl('/knowledgeserver/knowledge/viewNumberSort'), data)
}
// 地震科普-分类列表
export function getSchoolList(data: any) {
  const schoolName = data.schoolName ? `&schoolName=${data.schoolName}` : ''
  const schoolProvince = data.schoolProvince ? `&schoolProvince=${data.schoolProvince}` : ''
  const url = `/knowledgeserver/knowledgeSchool/listPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}${schoolName}${schoolProvince}`
  return useHttp.get(getRequestUrl(url))
}
// 地震科普-分类列表
export function getBaseList(data: any) {
  const baseName = data.schoolName ? `&baseName=${data.schoolName}` : ''
  const baseProvince = data.schoolProvince ? `&baseProvince=${data.schoolProvince}` : ''
  const url = `/knowledgeserver/knowledgeBase/listPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}${baseName}${baseProvince}`
  return useHttp.get(getRequestUrl(url))
}

// 观看数加
export function viewNumberAdd(data: any) {
  return useHttp.post(getRequestUrl('/knowledgeserver/knowledge/viewNumberAdd'), data)
}