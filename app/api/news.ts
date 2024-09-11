import { useHttp } from '~/utils/useHttp'

// 获取新闻动态
export function getNewsList(data: string) {
  const config = useRuntimeConfig()
  const apiBase = config.public.cataApi
  return useHttp.post(`${apiBase}/collectserver/news/listPage?${data}`)
}
