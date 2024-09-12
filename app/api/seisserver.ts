import { useHttp } from '~/utils/useHttp'

export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.cataPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}
// 统计测震
export function getDataNumber(data: any) {
  return useHttp.post(getRequestUrl(`/seisserver/catalogdata/getDataNumber`), data)
}
// 统计GNSS
export function getGNSSDataNumber(data: any) {
  return useHttp.post(getRequestUrl(`/gnss/continuous/data/getDataNumber`), data)
}
// 强震数据
export function getStrongNumber(data: any) {
  return useHttp.post(getRequestUrl(`/strongserver/shockcatalogdata/getDataNumber`), data)
}
// 地下流体数据
export function getUpderFluidNumber(data: any) {
  return useHttp.post(getRequestUrl(`/precursorserver/upderFluid/data/getNumber`), data)
}
// 地球物理
export function getPreDataNumber(data: any) {
  return useHttp.post(getRequestUrl(`/precursorserver/preData/getDataNumber`), data)
}
// 科学台阵
export function getCataDataNumber(data: any) {
  return useHttp.post(getRequestUrl(`/arrayserver/arraycatalogdata/getDataNumber`), data)
}

// 水准
export function getLevelDataNumber(data: any) {
  return useHttp.post(getRequestUrl(`/levelserver/level/line/getDataNumber`), data)
}
