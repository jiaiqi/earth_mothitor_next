<script lang="ts" setup>
import { getStandardList, getLawList } from '~/api/regulation'
import { type SrvItem, useServiceStore } from '~/composables/home'
import { encode, decode } from '~/utils/base/dataEncry'

const routePath = [{ name: '首页', path: '/' }, { name: '法规标准列表' }]
const searchValue = ref('')
const inputVal = ref('')
const searchType = ref('0')
onMounted(() => {
  getList()
})

// 筛选
const filterList = reactive([
  {
    label: '标准层级',
    value: '0',
    key: 'classification',
    options: [
      { label: '国家标准', value: '0' },
      { label: '行业标准', value: '1' },
      { label: '地方标准', value: '2' },
      { label: '团体标准', value: '3' },
    ],
  }
])

const options1 = [
  { label: '国家标准', value: '0' },
  { label: '行业标准', value: '1' },
  { label: '地方标准', value: '2' },
  { label: '团体标准', value: '3' },
]
const options2 = [
  { label: '法律', value: '法律' },
  { label: '行政法规', value: '行政法规' },
  { label: '部门规章', value: '部门规章' },
  { label: '省级地方性法规', value: '省级地方性法规' },
  { label: '省级政府规章', value: '省级政府规章' },
]
const filterModel = reactive({
  classification: '',
  mdate: '',
  institution: '',
})
function onFilter(model: any) {
  console.log(model, 'onfilter')
  filterModel.classification = model.classification
  searchType.value = model.classification
  if (dataType.value == '标准') {
    getList()
  } else {
    getList2()
  }
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
    title: searchValue.value,
    type: ''
    // institution: filterModel.value.institution, // 联系单位
  }

  loading.value = true
  getStandardList(encode({ type: searchType.value })).then((res) => {
    // console.log(decode(res))
    const list = decode(res)
    //先按时间排序 
    prodList.value = list.sort(function (a: any, b: any) {
      // console.log(a.releaseTime)
      return b.releaseTime < a.releaseTime ? -1 : 1
    })
    loading.value = false
  })
  //   getStandardList(encode({ pageNum: 1, pageSize: 5 })).then((res) => {
  //   // list.value = decode(res)
  // })
  // getProList(par).then((response) => {
  //   loading.value = false
  //   prodList.value = response.records.map((item) => {
  //     const subList = []
  //     if (item.classification) {
  //       subList.push(`产品分类：${item.classification}`)
  //     }
  //     if (item.institution) {
  //       subList.push(`联系单位：${item.institution}`)
  //     }
  //     return {
  //       ...item,
  //       title: item.name,
  //       subList,
  //     }
  //   })
  //   queryParams.pageSize = response.size
  //   queryParams.pageNum = response.current
  //   total.value = response.total
  //   if (prodList.value.length > 0) {
  //     let unitArr: string[] = []
  //     prodList.value.forEach((item) => {
  //       unitArr.push(item.cunit)
  //     })
  //     unitArr = Array.from(new Set(unitArr))
  //     serveUnitList.value = unitArr
  //     noData.value = false
  //   }
  //   else {
  //     noData.value = true
  //   }
  // }).catch((error) => {
  //   console.error('获取数据失败:', error)
  //   loading.value = false
  // })
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


}
// 获得法规特殊产品列表
function getDisProd() {
  const par = {
    pageNum: 1,
    pageSize: 999,
    like: searchType.value,
  }
  getLawList(par).then((res: any) => {
    console.log(res)
    procList2.value = res.records
  })
  // getProList(par).then((response) => {
  //   const list = response.records
  //   if (list.length) {
  //     list.forEach((item) => {
  //       const subList = []
  //       if (item.classification) {
  //         subList.push(`产品分类：${item.classification}`)
  //       }
  //       if (item.institution) {
  //         subList.push(`联系单位：${item.institution}`)
  //       }
  //       const tableTile = {
  //         name: '标准名称',
  //         type: '业务领域',
  //         releaseData: '发布日期',
  //         effectiveData: '实施日期',
  //         operate: '操作'
  //       }
  //       const obj = {
  //         ...item,
  //         title: item.name,
  //         subList,
  //         tableTile

  //       }
  //       procList2.value.unshift(obj)
  //       console.log(procList2.value)
  //     })
  //   }
  // })
}
const dataType = ref<string>('标准')
function changeDataType(type: string) {
  dataType.value = type
  console.log(filterList)
  if (dataType.value === '法规') {
    searchType.value = ''
    getList2()
    filterList[0].options = options2
  }
  else {
    console.log(filterModel)
    searchType.value = '0'
    console.log(filterModel)
    filterList[0].options = options1
    filterList[0].value = '0'
    // getList()
  }
}

const listData = computed(() => {

  return dataType.value === '法规' ? procList2.value : prodList.value
})
</script>

<template>
  <CommonPageContainer :path="routePath" title="法规标准" desc="REGULATORY STANDARDS">
    <template #right>
      <div class="right w-40% flex items-center py-5px" border="1px solid #E5E5EA">
        <div class="px-16px text-center">
          <i class="i-ri:search-2-line text-20px text-black" />
        </div>
        <input v-model="inputVal" placeholder="请输入搜索信息" class="min-w-0 flex-1 indent-16px outline-none">
        <i class="i-ri:close-circle-line cursor-pointer text-gray opacity-0" :class="{ 'opacity-100': inputVal }"
          @click="clearInput" />
        <el-button type="primary" class="mx-10px md:w-96px" @click="onSearch">
          搜索
        </el-button>
      </div>
    </template>
    <div class=" flex justify-around">
      <div md="w-180px block"
        class="pos-relative mb-20px mr-20px flex cursor-pointer rounded-6px bg-white text-center text-#333 line-height-46px"
        border="1px solid #E5E5EA">
        <div md="h-50% w-full"
          class="bg-gradient-blue-2 pos-absolute top-0 z--1 z-1 h-full w-50% flex items-center rounded-6px transition-all ease-in-out"
          :class="{
            'right-50% md:right-unset': dataType === '标准',
            'md:top-50% md:left-0 right-0 left-unset ': dataType === '法规',
          }">
          <img src="/img/icon/right.png" alt="">
        </div>

        <div class="pos-relative z-2 px-30px" :class="{ 'text-white': dataType === '标准' }" @click="changeDataType('标准')">
          标准
        </div>
        <div class="pos-relative z-2 px-30px" :class="{ 'text-white': dataType === '法规' }" @click="changeDataType('法规')">
          法规
        </div>
      </div>
      <PublicFilterLaw class="w-1080px" :filter-list="filterList" @change="onFilter" />
    </div>

    <div v-if="searchValue" class="my-24px">
      找到<span class="px-10px text-#1684FC font-700">{{ total }}</span>条记录
    </div>

    <div class="content" flex="~ col xl:row">
      <div class="min-h-300px w-full" flex="1">
        <div class="pos-relative items-start" flex="~ col md:row">

          <div class="flex-1">
            <div v-if="loading" class="h-500px text-center line-height-500px">
              <LoaderL1 />
            </div>
            <PublicTable :list="listData" :type="searchType" :dataType="dataType" @click-item="toDetail">
              <template #image>
                <img src="/img/productcatalog.jpg" class="h-150px w-full">
              </template>
            </PublicTable>
          </div>
        </div>
      </div>
    </div>
  </CommonPageContainer>
</template>

<style></style>
