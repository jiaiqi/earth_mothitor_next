<!-- 技术服务列表页面 -->
<script lang="ts" setup>
import { getFlagList, getListPage, getTypeDic } from '~/api/count'

const routePath = [{ name: '首页', path: '/' }, { name: '数据目录' }]

const hostList = ref([])
const cataList = ref<any[]>([])
const type = ref('')
const type2 = ref<any>('')
const info = ref()
const route = useRoute()
const currentType = ref<string>('')
const allList = ref<{ [key: string]: any[] }>({})
const list = computed(() => {
  if (currentType.value) {
    return allList.value[currentType.value]
  }
  else if (Object.keys(allList.value).length) {
    return Object.keys(allList.value).reduce((acc: any[], cur: string) => acc.concat(allList.value[cur]), [])
  }
  return [] // 当条件不满足时返回空数组
})
onMounted(() => {
  // getList()
  getTypeDic('pageNum=1&pageSize=999').then((res: any) => {
    cataList.value = res.records
    if (cataList.value.length) {
      // currentType.value = cataList.value[0].typeName || ''
    }
  })
  getList()
  // 热门推荐
  getFlagList('pageNum=1&pageSize=10').then((res: any) => {
    const data = res.records
    hostList.value = data.map((item: any) => {
      item.title = item.keyName
      return item
    })
  })
})
const loading = ref(true)

function getList() {
  // const queryString = `pageNum=1&pageSize=999&typeName=${currentType.value || ''}`
  const queryString = `pageNum=1&pageSize=999`
  loading.value = true
  getListPage(queryString).then((resp: any) => {
    loading.value = false
    allList.value = resp.records.reduce((acc: any, cur: any) => {
      const key = cur.typeName
      if (acc[key]) {
        acc[key].push(cur)
      }
      else {
        acc[key] = [cur]
      }
      return acc
    }, {})
    // allList.value[currentType.value] = resp.records.map((item: any) => {
    //   item.title = item.sname
    //   item.richText = item.stext
    //   return item
    // })
    if (route.query.type) {
      type2.value = ''
      if (route.query.type.includes('-')) {
        type2.value = (route.query.type as string).split('-')[1]
        type.value = route.query.type as string
      }
      else {
        type.value = route.query.type as string
      }
      // this.sels()
    }
    else {
      info.value = cataList.value[0]
    }
  })
}
// 筛选
const filterList = computed(() => {
  if (cataList.value.length) {
    return [{
      label: '服务分类',
      value: '',
      key: 'ssort',
      options: cataList.value.map((item) => {
        return {
          ...item,
          label: item.typeName,
          value: item.typeName,
        }
      }),
    }]
  }
  else {
    return [{
      label: '服务分类',
      value: '',
      key: 'ssort',
      options: [
      ],
    }]
  }
})

function onFilter(data: any) {
  currentType.value = data.ssort
  if (allList.value[currentType.value]?.length) {
    return
  }
  getList()
}

function removeStylesFromHtml(htmlString: string) {
  // 使用正则表达式移除<style>标签内的内容
  let cleanedHtml = htmlString.replace(/<style\b[^>]*>[\s\S]*<\/style>/g, '')

  // 移除内联样式
  cleanedHtml = cleanedHtml.replace(/ style=".*?"/g, '')

  // 移除class属性
  cleanedHtml = cleanedHtml.replace(/ class=".*?"/g, '')

  // 移除id属性
  cleanedHtml = cleanedHtml.replace(/ id=".*?"/g, '')

  // 移除其他样式相关的属性
  cleanedHtml = cleanedHtml.replace(/ data-.*?=".*?"/g, '')

  return cleanedHtml
}

function htmlToText(htmlString: string) {
  // 使用正则表达式去除 HTML 标签
  // let text = htmlString.replace(/<[^>]*>/g, '')
  let text = htmlString

  // 处理特殊字符
  const entities: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': '\'',
  }

  // 替换 HTML 实体
  Object.keys(entities).forEach((entity) => {
    const regex = new RegExp(entity, 'g')
    text = text.replace(regex, match => entities[match] || match)
  })

  // 返回纯文本
  return text.trim()
}

const router = useRouter()
function toPath(url: string) {
  // microApp.setData(name, { path: path })
  // router.push(path)
  if (url === '#') {
    ElMessage.info('正在建设中，敬请期待')
    return
  }
  if (['precursorElectromagnetism,1', 'precursorElectromagnetism,2'].includes(url)) {
    ElMessage.info('地磁数据涉密，请按照有关涉密数据申请要求办理相关手续。')
    return
  }
  if (['precursorGravity'].includes(url)) {
    ElMessage.info('重力数据涉密，请按照有关涉密数据申请要求办理相关手续。')
    return
  }
  let name: any = url
  let type = ''
  if (url.includes(',')) {
    type = url.split(',')[1] as string
    name = url.split(',')[0] as string
  }
  switch (name) {
    case 'serviceSeismometry':// 测震
      name = 'service-seismometry'
      break
    case 'precursorProspecting': // 地震测深
      name = 'precursor-prospecting'
      if (currentType.value === '探测数据') { // 探测数据 地震测深
        name = 'prevention-prospecting'
      }
      break
    case 'precursorFlowMation': // 水准
      name = 'precursor-flowmation'
      break
    case 'precursorCatalogue': // 活断层探测
      name = 'prevention-catalogue'
      break
    default:
      name = camelToKebab(name)
      break
  }
  const query: any = {}
  if (type) {
    query.type = type
  }
  router.push({ name, query })
}
function camelToKebab(camelStr: string) {
  return camelStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
function getImg(name) {
  if (name === '测震') {
    return '/img/cezCatalog.png'
  }
  if (name === '强震动') {
    return '/img/qzdCatalog.png'
  }
  if (name === '地磁') {
    return '/img/dicCatalog.png'
  }
  if (name === '定点形变') {
    return '/img/ddxbCatalog.png'
  }
  if (name === 'GNSS') {
    return '/img/gnssCatalog.png'
  }
  if (name === '水准') {
    return '/img/shuizCatalog.png'
  }
  if (name === '重力') {
    return '/img/zlCatalog.png'
  }
  if (name === '地震测深') {
    return '/img/dzcsCatalog.png'
  }
  if (name === '活断层探测') {
    return '/img/hdcCatalog.png'
  }
  if (name === '地电') {
    return '/img/didCatalog.png'
  }
  if (name === '地下流体') {
    return '/img/dxltCatalog.png'
  }
  return '/img/jianshezhong.jpg'
}
</script>

<template>
  <CommonPageContainer
    :path="routePath"
    title="数据目录"
    desc="data catalogue"
  >
    <PublicFilter :filter-list="filterList" @change="onFilter" />
    <div
      class="content"
      flex="~ col xl:row"
    >
      <div v-loading="loading" class="min-h-300px w-full" flex="1">
        <!-- <div v-if="loading" class="h-500px text-center line-height-500px">
          <LoaderL1 />
        </div> -->
        <el-empty v-if="!loading && !list?.length" />
        <div class="w-full flex flex-col gap-y-30px overflow-hidden pr-30px">
          <div
            v-for="item in list" :key="item.id" flex="~"
            class="w-full cursor-pointer overflow-hidden pb-30px"
            border="1px dashed transparent b-#E2E8F2"
            @click="toPath(item.url)"
          >
            <img :src="getImg(item.sname)" class="h-80px w-120px md:h-158px md:w-240px">
            <div class="w-[calc(100%_-_120px)] flex-1 px-20px text-#424242">
              <div class="title" flex="col md:row ~ justify-between">
                <span
                  class="line-clamp-2 text-size-18px text-#111 font-700 line-height-26px"
                  :title="item.sname"
                >{{ item.sname }}
                </span>
                <span v-if="item.viewNum" class="flex items-center text-#AEAEB2">
                  <i class="i-ri:eye-fill mr-10px" />
                  {{ item.viewNum || '' }}次
                </span>
              </div>
              <div
                v-if="item.stext"
                class="line-clamp-4 mt-5px indent-2rem text-#424242 line-height-30px"
                :title="htmlToText(item.stext)"
                v-html="removeStylesFromHtml(item.stext)"
              />
            </div>
          </div>
        </div>
        <slot />
      </div>
      <div class="w-full xl:w-300px">
        <PublicHotNews :list="hostList" />
        <slot name="right" />
      </div>
    </div>
  </CommonPageContainer>
</template>

<style>

</style>
