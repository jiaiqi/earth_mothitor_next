import { useHttp } from '~/utils/useHttp'

// 统计测震
export function getDataNumber(data: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/seisserver/catalogdata/getDataNumber`, data)
}
// 统计GNSS
export function getGNSSDataNumber(data: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}//gnss/continuous/data/getDataNumber`, data)
}
// 强震数据
export function getStrongNumber(data: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/strongserver/shockcatalogdata/getDataNumber`, data)
}
// 地下流体数据
export function getUpderFluidNumber(data: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/precursorserver/upderFluid/data/getNumber`, data)
}
// 地球物理
export function getPreDataNumber(data: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/precursorserver/preData/getDataNumber`, data)
}
// 科学台阵
export function getCataDataNumber(data: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/arrayserver/arraycatalogdata/getDataNumber`, data)
}

// 水准
export function getLevelDataNumber(data: any) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/levelserver/level/line/getDataNumber`, data)
}
