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
