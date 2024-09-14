<!-- 技术服务列表页面 -->
<script lang="ts" setup>
import { getServiceList } from '~/api/service'
import { type SrvItem, useServiceStore } from '~/composables/home'
import { encode } from '~/utils/base/dataEncry'

const routePath = [{ name: '首页', path: '/' }, { name: '技术服务列表' }]
const list = ref<any[]>([])
const serveUnit = ref('')
const searchValue = ref('')
const inputVal = ref('')
const pageSize = ref(5)
const pageNum = ref(1)
const total = ref(0)
const dayjs = useDayjs()
onMounted(() => {
  getList()
})

// 筛选
const filterList = [{
  label: '服务分类',
  value: '',
  key: 'ssort',
  options: [
    {
      label: '非天然地震监测服务',
      value: '非天然地震监测服务',
    },
    {
      label: '地震预警技术与信息服务',
      value: '地震预警技术与信息服务',
    },
    {
      label: '重大工程健康监测与诊断',
      value: '重大工程健康监测与诊断',
    },
    {
      label: '地震安全性评价',
      value: '地震安全性评价',
    },
    {
      label: '地震活动断层探查',
      value: '地震活动断层探查',
    },
    {
      label: '地震灾害风险调查与评估',
      value: '地震灾害风险调查与评估',
    },
    {
      label: '地震地质灾害调查',
      value: '地震地质灾害调查',
    },
    {
      label: '地震信息技术服务',
      value: '地震信息技术服务',
    },
    {
      label: '地震仪器计量检定服务',
      value: '地震仪器计量检定服务',
    },
  ],
}, {
  label: '发布时间',
  value: '',
  key: 'mdate',
  options: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000],
}, {
  label: '联系单位',
  value: '',
  key: 'cunit',
  options: [
    {
      label: '中国地震局工程力学研究所',
      value: '中国地震局工程力学研究所',
    },
    {
      label: '新疆维吾尔自治区地震局',
      value: '新疆维吾尔自治区地震局',
    },
  ],
}]

const filterModel = ref<any>({
  ssort: '',
  mdate: '',
  cunit: '',
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
  pageNum.value = params.pageNum
  pageSize.value = params.pageSize
  getList()
}
const loading = ref(true)
function getList() {
  const par = {
    sType: '',
    sClassification: '',
    cUnit: serveUnit.value,
    sName: searchValue.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }
  if (filterModel.value.ssort) {
    par.sType = filterModel.value.ssort
  }
  // if (filterModel.value.cunit) {
  //   par.cUnit = filterModel.value.cunit
  // }
  loading.value = true
  getServiceList(par).then((res) => {
    loading.value = false
    total.value = res.total
    pageSize.value = res.size
    pageNum.value = res.current
    list.value = res.records.map((item) => {
      return {
        ...item,
        title: item.sname,
        viewNum: item.recom,
        subList: [`服务分类：${item.ssort}`, `联系单位：${item.cunit}`, `发布时间：${dayjs(item.mdate).format('YYYY年MM月DD日')}`],
      }
    })
  }).catch((error) => {
    console.error('获取 HTML 数据失败:', error)
    loading.value = false
  })
}

function toDetail(item: SrvItem) {
  const store = useServiceStore()
  store.clear()
  store.setValue(item)
  const data = {
    sclassification: item.sclassification,
    cdate: item.cdate,
    cunit: item.cunit,
    sname: item.sname,
    recom: item.recom,
  }
  navigateTo({
    path: `/technicalService/detail/${item.id}`,
    query: {
      data: encode(data),
    },
  })
}
</script>

<template>
  <CommonPageContainer
    :path="routePath"
    title="技术服务"
    desc="TECHNICAL SERVICE"
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
        <div v-if="loading" class="h-500px text-center line-height-500px">
          <LoaderL1 />
        </div>
        <PublicList :list="list" @click-item="toDetail" />
        <PublicPagination v-if="total" :page-size="pageSize" :page-num="pageNum" :total="total" @change="onPageChange" />
        <slot />
      </div>
      <div class="w-full xl:w-300px">
        <PublicHotNews />
        <slot name="right" />
      </div>
    </div>
  </CommonPageContainer>
</template>

<style>

</style>
