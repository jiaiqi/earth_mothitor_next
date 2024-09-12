// import { useUserStore } from '~/stores/user.store'
// import { getToken } from '~/utils/auth'

function handleError(response) {
  console.log(response)
}
const fetch = $fetch.create({
  // 请求拦截器
  onRequest({ options }) {
    // get方法传递数组形式参数
    // 添加baseURL,nuxt3环境变量要从useRuntimeConfig里面取
    // const { public: { baseApi } } = useRuntimeConfig()
    // if (baseApi) {
    //   options.baseURL = baseApi
    // }
    // 添加请求头,没登录不携带token
    // const userStore = useUserStore()
    // if (!userStore.isLogin)
    // return
    options.headers = new Headers(options.headers)
    // if (getToken()) {
    //   options.headers.set('Authorization', `Bearer ${getToken()}`) // 让每个请求携带自定义token
    // }
  },
  // 响应拦截
  onResponse({ response }) {
    // 成功返回
    return response._data
  },
  // 错误处理
  onResponseError({ response }) {
    handleError(response)
    return Promise.reject(response?._data ?? null)
  },
})

// 自动导出
export const useHttp = {
  get: (url: string, params?: any) => {
    return fetch(url, { method: 'get', params })
  },

  post: (url: string, body?: any, headers?: any) => {
    return fetch(url, { method: 'post', body: body || {}, headers })
  },

  put: (url: string, body?: any) => {
    return fetch(url, { method: 'put', body })
  },

  delete: (url: string, body?: any) => {
    return fetch(url, { method: 'delete', body })
  },
}

export function usePublicConfig() {
  const config = useRuntimeConfig()
  return { ...config.public }
}

export function getBaseUrl(port?: any) {
  const { apiBase } = usePublicConfig()
  return port ? `${apiBase}:${port}` : apiBase
}
