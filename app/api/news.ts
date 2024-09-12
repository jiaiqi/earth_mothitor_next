import { getBaseUrl, useHttp, usePublicConfig } from '~/utils/useHttp'

export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.collePort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}
// 获取新闻动态
export function getNewsList(query: string) {
  return useHttp.get(getRequestUrl(`/collectserver/news/listPage?${query}`))
}
