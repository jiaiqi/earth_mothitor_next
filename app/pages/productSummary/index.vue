<script lang="ts" setup>
import { getConditionsList, getProList } from '~/api/service'
import { type SrvItem, useServiceStore } from '~/composables/home'
import { encode } from '~/utils/base/dataEncry'

const routePath = [{ name: '首页', path: '/' }, { name: '产品目录列表' }]
const searchValue = ref('')
const inputVal = ref('')
onMounted(() => {
  getList()
})

// 筛选
const filterList = [{
  label: '服务分类',
  value: '',
  key: 'classification',
  options: [
    { label: '地震目录', value: '地震目录' },
    { label: '震源机制解', value: '震源机制解' },
    { label: '地壳应力场', value: '地壳应力场' },
    { label: 'GNSS产品', value: 'GNSS产品' },
    { label: '断层形变', value: '断层形变' },
    { label: '水准产品', value: '水准产品' },
    { label: 'InSAR产品', value: 'InSAR产品' },
    { label: '重力产品', value: '重力产品' },
    { label: '地磁产品', value: '地磁产品' },
    { label: '地电产品', value: '地电产品' },
    { label: '定点形变产品', value: '定点形变产品' },
    { label: '地下流体', value: '地下流体' },
    { label: '地震区划图', value: '地震区划图' },
    { label: '地震构造图', value: '地震构造图' },
    { label: '地震活动断层', value: '地震活动断层' },
    { label: '工程抗震', value: '工程抗震' },
  ],
}, {
  label: '联系单位',
  value: '',
  key: 'institution',
  options: [
    {
      label: '陕西省地震局',
      value: '陕西省地震局',
    },
    {
      label: '中国地震局第二监测中心',
      value: '中国地震局第二监测中心',
    },
    {
      label: '中国地震台网中心',
      value: '中国地震台网中心',
    },
    {
      label: '中国地震局地球物理研究所',
      value: '中国地震局地球物理研究所',
    },
  ],
}]

const filterModel = ref<any>({
  classification: '',
  mdate: '',
  institution: '',
})
function onFilter(model: any) {
  console.log(model, 'onfilter')
  filterModel.value = model
  getList()
}
// 搜索
function onSearch() {
  searchValue.value = inputVal.value
  getList()
}
function clearInput() {
  inputVal.value = ''
  onSearch()
}
// 分页参数更改
function onPageChange(params: { pageNum: number, pageSize: number }) {
  queryParams.pageNum = params.pageNum
  queryParams.pageSize = params.pageSize
  getList()
}

const noData = ref(false)
const loading = ref(true)
const total = ref(0)
const queryParams = reactive(
  {
    pageSize: 9,
    pageNum: 1,
  },
)
const serveUnitList = ref<any[]>([])
const prodList = ref<any[]>([])
function getList() {
  const par = {
    pageNum: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    name: searchValue.value,
    institution: filterModel.value.institution, // 联系单位
  }

  loading.value = true
  getProList(par).then((response) => {
    loading.value = false
    prodList.value = response.records.map((item) => {
      const subList = []
      if (item.classification) {
        subList.push(`产品分类：${item.classification}`)
      }
      if (item.institution) {
        subList.push(`联系单位：${item.institution}`)
      }
      return {
        ...item,
        title: item.name,
        subList,
      }
    })
    queryParams.pageSize = response.size
    queryParams.pageNum = response.current
    total.value = response.total
    if (prodList.value.length > 0) {
      let unitArr: string[] = []
      prodList.value.forEach((item) => {
        unitArr.push(item.cunit)
      })
      unitArr = Array.from(new Set(unitArr))
      serveUnitList.value = unitArr
      noData.value = false
    }
    else {
      noData.value = true
    }
  }).catch((error) => {
    console.error('获取数据失败:', error)
    loading.value = false
  })
}

function toDetail(item: SrvItem) {
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
const procList2 = ref<any[]>([])
function getList2() {
  const par = {
    pageNum: 1,
    pageSize: queryParams.pageSize,
    auditState: 99,
  }
  procList2.value = []
  getDisProd()
  getConditionsList(par).then((response) => {
    if (response.records.length) {
      response.records.forEach((item) => {
        const obj = { ...item, title: item.name }
        const subList = []
        if (item.classification) {
          subList.push(`产品分类：${item.classification}`)
        }
        if (item.institution) {
          subList.push(`联系单位：${item.institution}`)
        }
        obj.subList = subList
        procList2.value.push(obj)
      })
    }
  })
}
// 获得震害防御特殊产品列表
function getDisProd() {
  const par = {
    pageNum: 1,
    pageSize: 999,
    classification: '震害防御',
  }
  getProList(par).then((response) => {
    const list = response.records
    if (list.length) {
      list.forEach((item) => {
        const subList = []
        if (item.classification) {
          subList.push(`产品分类：${item.classification}`)
        }
        if (item.institution) {
          subList.push(`联系单位：${item.institution}`)
        }
        const obj = {
          ...item,
          title: item.name,
          subList,
        }
        procList2.value.unshift(obj)
      })
    }
  })
}
const dataType = ref<string>('地震监测')
function changeDataType(type: string) {
  console.log(type)
  dataType.value = type
  if (dataType.value === '震害防御') {
    getList2()
  }
  else {
    getList()
  }
}

const listData = computed(() => {
  return dataType.value === '震害防御' ? procList2.value : prodList.value
})
</script>

<template>
  <CommonPageContainer
    :path="routePath"
    title="产品目录"
    desc="PRODUCT CATALOG"
  >
    <template #right>
      <div class="right w-40% flex items-center py-5px" border="1px solid #E5E5EA">
        <div class="px-16px text-center">
          <i class="i-ri:search-2-line text-20px text-black" />
        </div>
        <input
          v-model="inputVal"
          placeholder="请输入搜索信息" class="min-w-0 flex-1 indent-16px outline-none"
        >
        <i class="i-ri:close-circle-line cursor-pointer text-gray opacity-0" :class="{ 'opacity-100': inputVal }" @click="clearInput" />
        <el-button type="primary" class="mx-10px md:w-96px" @click="onSearch">
          搜索
        </el-button>
      </div>
    </template>

    <PublicFilter :filter-list="filterList" @change="onFilter" />
    <div v-if="searchValue" class="my-24px">
      找到<span class="px-10px text-#1684FC font-700">{{ total }}</span>条记录
    </div>

    <div
      class="content"
      flex="~ col xl:row"
    >
      <div class="min-h-300px w-full" flex="1">
        <div class="pos-relative items-start" flex="~ col md:row">
          <div md="w-180px block" class="pos-relative mb-20px mr-20px flex cursor-pointer rounded-6px bg-white text-center text-#333 line-height-46px" border="1px solid #E5E5EA">
            <div
              md="h-50% w-full"
              class="bg-gradient-blue-2 pos-absolute top-0 z--1 z-1 h-full w-50% flex items-center rounded-6px transition-all ease-in-out"
              :class="{
                'right-50% md:right-unset': dataType === '地震监测',
                'md:top-50% md:left-0 right-0 left-unset ': dataType === '震害防御',
              }"
            >
              <img src="/img/icon/right.png" alt="">
            </div>

            <div class="pos-relative z-2 px-30px" :class="{ 'text-white': dataType === '地震监测' }" @click="changeDataType('地震监测')">
              地震监测
            </div>
            <div class="pos-relative z-2 px-30px" :class="{ 'text-white': dataType === '震害防御' }" @click="changeDataType('震害防御')">
              震害防御
            </div>
          </div>
          <div class="flex-1">
            <div v-if="loading" class="h-500px text-center line-height-500px">
              <LoaderL1 />
            </div>
            <PublicList :list="listData" type="上图下文" @click-item="toDetail">
              <template #image>
                <img src="/img/productcatalog.jpg" class="h-150px w-full">
              </template>
            </PublicList>
            <PublicPagination v-if="total" :page-size="queryParams.pageSize" :page-num="queryParams.pageNum" :total="total" @change="onPageChange" />
          </div>
        </div>
      </div>
      <!-- <div class="w-full xl:w-300px">
        <PublicHotNews />
        <slot name="right" />
      </div> -->
    </div>
  </CommonPageContainer>
</template>

<style>

</style>
