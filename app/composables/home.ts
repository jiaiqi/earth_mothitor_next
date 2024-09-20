export interface NewsItem {
  id: number
  title?: string
  date?: number | string // 可选属性
}

export function useNewsStore() {
  const newsList = useState<NewsItem[]>('newsList', () => [])

  function setNewsList(data: any) {
    newsList.value = data
  }
  function getNewsList() {
    return newsList.value
  }

  return {
    newsList,
    setNewsList,
    getNewsList,
  }
}

export interface SrvItem {
  id: string
  sname: string
  stype: string
  cunit: string
  sclassification: string
  stext?: string
  cdate: string
  recom: string
}
export const useServiceStore = defineStore('service', () => {
  const currentService = ref<SrvItem>()
  const setValue = (data: SrvItem) => {
    currentService.value = data
  }
  const getValue = () => currentService.value
  const clear = () => {
    currentService.value = undefined
  }
  return {
    getValue,
    setValue,
    clear,
  }
})
