import { useHttp } from '~/utils/useHttp'
import { decode, encode } from '~/utils/base/dataEncry'

export function getRequestUrl(url: string) {
  const config = useRuntimeConfig()
  const PORT = config.public.regulationPort
  const baseApi = config.public.apiBase
  return `${baseApi}:${PORT}${url}`
}



// 标准法规-标准列表
export function getStandardList(data: any) {
    return useHttp.post(getRequestUrl('/fileservice/standard/list'), data)
}

// 标准法规-法规列表
export function getLawList(data: any) {
  const like = data.like ? `&like=${data.like}` : ''
  const url = `/fileservice/law/listPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}&status=1${like}`
  return useHttp.get(getRequestUrl(url))
}

// 下载标准
export function downStandard(data: any) {
  const url = '/fileservice/fileservice/ecdownload?fileid='+ data
  return useHttp.get(getRequestUrl(url))
  // return request({
  //   url: '/fileservice/fileservice/ecdownload?fileid=' + data,
  //   headers: {
  //     isToken: true
  //   },
  //   method: 'get',
  //   responseType: 'blob'
  //   // data: qs.stringify(data)
  // })
}