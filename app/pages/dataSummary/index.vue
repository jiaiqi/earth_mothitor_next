<!-- 技术服务列表页面 -->
<script lang="ts" setup>
import { type SrvItem, useServiceStore } from '~/composables/home'
import { encode } from '~/utils/base/dataEncry'
import { getFlagList, getListPage, getTypeDic } from '~/api/count'

const routePath = [{ name: '首页', path: '/' }, { name: '数据目录' }]

const hostList = ref([])
const cataList = ref([])
const type = ref('')
const type2 = ref('')
const info = ref()
const route = useRoute()
const currentType = ref<string>('')
const allList = ref<{ [key: string]: any[] }>({})
const list = computed(() => {
  if (currentType.value) {
    return allList.value[currentType.value]
  }
  return [] // 当条件不满足时返回空数组
})
onMounted(() => {
  // getList()
  getTypeDic('pageNum=1&pageSize=999').then((res) => {
    cataList.value = res.records
    if (cataList.value.length) {
      currentType.value = cataList.value[0].typeName || ''
      getList()
    }
  })
  getFlagList('pageNum=1&pageSize=10').then((res) => {
    const data = res.records
    hostList.value = data.map((item) => {
      item.title = item.keyName
      return item
    })
  })
})
function getList() {
  const queryString = `pageNum=1&pageSize=999&typeName=${currentType.value}`
  loading.value = true
  getListPage(queryString).then((resp) => {
    loading.value = false
    allList.value[currentType.value] = resp.records.map((item) => {
      item.title = item.sname
      item.richText = item.stext
      return item
    })
    if (route.query.type) {
      type2.value = ''
      if (route.query.type.includes('-')) {
        type2.value = route.query.type.split('-')[1]
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
        {
          label: '观测数据',
          value: '观测数据',
        },
        {
          label: '探测数据',
          value: '探测数据',
        },
        {
          label: '调查数据',
          value: '调查数据',
        },
        {
          label: '实验数据',
          value: '实验数据',
        },
        {
          label: '专题数据',
          value: '专题数据',
        },
        {
          label: '综合数据',
          value: '综合数据',
        },
      ],
    }]
  }
})

function onFilter(data) {
  console.log(data)
}

const loading = ref(true)

function toDetail(item: SrvItem) {
  const store = useServiceStore()
  store.clear()
  store.setValue(item)
  const data = {
    sclassification: item.sclassification,
    cdate: item.cdate,
    cunit: item.cunit,
    sname: item.sname,
    // recom: item.recom,
  }
  navigateTo({
    path: `/technicalService/detail/${item.id}`,
    query: {
      data: encode(data),
    },
  })
}
function htmlToText(htmlString: string) {
  // 使用正则表达式去除 HTML 标签
  let text = htmlString.replace(/<[^>]*>/g, '')

  // 处理特殊字符
  const entities = {
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
    text = text.replace(regex, entities[entity])
  })

  // 返回纯文本
  return text.trim()
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
      <div class="min-h-300px w-full" flex="1">
        <div v-if="loading" class="h-500px text-center line-height-500px">
          <LoaderL1 />
        </div>
        <div class="w-full flex flex-col gap-y-30px overflow-hidden pr-30px">
          <div v-for="item in list" :key="item.id" flex="~" class="w-full cursor-pointer overflow-hidden pb-30px" border="1px dashed transparent b-#E2E8F2" @click="handleClickItem(item)">
            <img src="/img/img2.jpg" class="h-80px w-120px md:h-158px md:w-240px">
            <div class="w-[calc(100%_-_120px)] flex-1 px-20px text-#424242">
              <div class="title" flex="col md:row ~ justify-between">
                <span class="line-clamp-2 text-size-18px text-#111 font-700 line-height-26px" :title="item.title">{{ item.title }}
                </span>
                <span v-if="item.viewNum" class="flex items-center text-#AEAEB2">
                  <i class="i-ri:eye-fill mr-10px" />
                  {{ item.viewNum || '' }}次
                </span>
              </div>
              <div v-if="item.richText" class="line-clamp-4 mt-5px text-#424242 line-height-30px" :title="htmlToText(item.richText)" v-text="htmlToText(item.richText)" />
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
