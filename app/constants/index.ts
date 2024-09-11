// import process from '#imports'

export const appName = process.env.NUXT_PUBLIC_TITLE || '国家防震减灾公共服务平台'
export const appDescription = process.env.Nuxt_PUBLIC_DESCRIPTION || '国家防震减灾公共服务平台'

export default async () => {
  // 使用 useRuntimeConfig 获取配置全局函数无需导入
  const config = useRuntimeConfig()
  console.log(config.public)
}
