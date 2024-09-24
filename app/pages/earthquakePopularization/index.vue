<script
  lang="ts"
  setup
>
import { hotDataAdd } from '~/api/count'
import { getknowledge, getFlagList ,getSchoolList,getBaseList} from '~/api/earthquakePopularization'
import { type SrvItem, useServiceStore } from '~/composables/home'
import { decode, encode } from '~/utils/base/dataEncry'
import {  Search } from '@element-plus/icons-vue'
const routePath = [{ name: '首页', path: '/' }, { name: '地震科普' }]
const searchValue = ref('')
const inputVal = ref('')
const basetype = ref('学校')
const hostList = ref([])
onMounted(() => {
  getList()
  getFlagList('').then((res: any) => {
    const data = res
    hostList.value = data.map((item: any) => {
      item.title = item.fileName
      return item
    })
  })
  getSchoolList( {
    pageSize: 99999,
    pageNum: 1,
  }).then((res:any)=>{
    tableschoolList.value=res.records
  })
})

// 筛选
const filterList = [{
  label: '科普分类',
  value: '',
  key: 'classification',
  options: [
    { label: '技术应用', value: '20' },
    { label: '地震知识', value: '19' },
    { label: '科学访谈', value: '5' },
    { label: '应急避险', value: '4' },
    { label: '地震事件', value: '3' },
  ],
}]
const provinList = [
  { label: "北京", value: "北京" },
  { label: "天津", value: "天津" },
  { label: "河北", value: "河北" },
  { label: "山西", value: "山西" },
  { label: "内蒙", value: "内蒙" },
  { label: "辽宁", value: "辽宁" },
  { label: "吉林", value: "吉林" },
  { label: "黑龙江", value: "黑龙江" },
  { label: "上海", value: "上海" },
  { label: "江苏", value: "江苏" },
  { label: "浙江", value: "浙江" },
  { label: "安徽", value: "安徽" },
  { label: "福建", value: "福建" },
  { label: "江西", value: "江西" },
  { label: "山东", value: "山东" },
  { label: "河南", value: "河南" },
  { label: "湖北", value: "湖北" },
  { label: "湖南", value: "湖南" },
  { label: "广东", value: "广东" },
  { label: "广西壮族自治区", value: "广西壮族自治区" },
  { label: "海南", value: "海南" },
  { label: "重庆", value: "重庆" },
  { label: "四川", value: "四川" },
  { label: "贵州", value: "贵州" },
  { label: "云南", value: "云南" },
  { label: "西藏", value: "西藏" },
  { label: "陕西", value: "陕西" },
  { label: "甘肃", value: "甘肃" },
  { label: "青海", value: "青海" },
  { label: "宁夏", value: "宁夏" },
  { label: "新疆", value: "新疆" }
]
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

// 地震监测
const noData = ref(false)
const loading = ref(true)
const total = ref(0)
const queryParams = reactive(
  {
    pageSize: 9,
    pageNum: 1,
  },
)
const prodList = ref<any[]>([])
const tableschoolList = ref<any[]>([])

// 震害防御
const loading2 = ref(true)
const noData2 = ref(false)
const queryParams2 = reactive(
  {
    schoolName: '',
    schoolProvince: '',
  },
)
const prodList2 = ref<any[]>([])
const total2 = ref(0)

const serveUnitList = ref<any[]>([])
function getList() {
  const par = {
    pageNum: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    name: searchValue.value,
    typeId: filterModel.value.classification
    // institution: filterModel.value.institution, // 联系单位
    // classification: dataType.value,
  }

  loading.value = true
  getknowledge(par).then((response: any) => {
    loading.value = false
    console.log(response)
    queryParams.pageSize = response.size
    queryParams.pageNum = response.current
    total.value = response.total
    // prodList.value=response.records
    prodList.value = response.records.map((item: any) => {
      return {
        ...item,
        title: item.fileName,
        imgUrl: item.smallImg
      }
    })
  })

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

const dataType = ref<string>('地震科普')
// function changeDataType(type: string) {
//   dataType.value = type
//   if (dataType.value === '震害防御') {
//     getList2()
//   }
//   else {
//     getList()
//   }
// }

const listData = computed(() => {
  return prodList.value
})
const tableData = computed(() => {
  return tableschoolList.value
})
function toDetail(item: any) {
  if (['统一编目目录', '震源机制解目录1', '速报目录', '震源机制解目录2'].includes(item.name)) {
    const typeMap = {
      统一编目目录: 'cata',
      震源机制解目录1: 'sms',
      震源机制解目录2: 'smsxgp',
      速报目录: 'soon',
    }
    navigateTo({ path: '/productSummary/earthCataList', query: { type: typeMap[item.name] } })
  }
  else if (item.linkUrl) {
    if (confirm('您访问的链接即将离开公服网站，是否继续？')) {
      window.open(item.linkUrl)
    }
  }
  else {
    navigateTo({
      path: `/productSummary/productInfo/${item.id}`,
      query: {
        data: encode(item),
      },
    })
    addHot(name, `/monitor/productInfo?id=${item.id}`)
  }

  // navigateTo({
  //   path: `/technicalService/detail/${item.id}`,
  //   query: {
  //     data: encode(data),
  //   },
  // })
}
function changeType(){

}
function handleQuery(){

}
function addHot(name:any, url:any) {
  const form = {
    keyName: `地震科普-${name}`,
    url,
    linkUnit: '',
  }
  hotDataAdd(form)
}
</script>

<template>
  <CommonPageContainer :path="routePath" title="地震科普" desc="EARTHQUAKE SCIENCE POPULARIZATION">
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
    <div class="flex items-center">
      <div>
        <img class="h-25px w-25px m-2" :src="'/img/title_icon.png'" />
      </div>
      <span class="font-semibold">防震减灾科普</span>
    </div>
    <PublicFilter :filter-list="filterList" @change="onFilter" />
    <div v-if="searchValue" class="my-24px">
      找到<span class="px-10px text-#1684FC font-700">{{ total }}</span>条记录
    </div>
    <div class="content" flex="~ col xl:row">
      <div class="min-h-300px w-full" flex="1">
        <div class="pos-relative items-start flex" flex="~ col md:row">
          <div class="flex-1 w-80">
            <div v-if="loading" class="h-500px text-center line-height-500px">
              <LoaderL1 />
            </div>
            <PublicList :list="listData" type="地震科普" @click-item="toDetail">
              <!-- <template #image>
                <img src="/img/productcatalog.jpg" class="h-150px w-full">
              </template> -->
            </PublicList>
            <PublicPagination v-if="total" :page-size="queryParams.pageSize" :page-num="queryParams.pageNum"
              :total="total" @change="onPageChange" />
          </div>
          <div class="flex-none  w-84">
            <PublicHotNews :list="hostList" />
          </div>
        </div>
      </div>
      <!-- <div class="w-full xl:w-300px">
        <PublicHotNews />
        <slot name="right" />
      </div> -->
    </div>
    <div class="pos-relative bg-#F7F9FD pb-90px min-h-screen-260">
      <div class="m-auto min-h-220px container  xl:max-w-1300px">
        <div class="page-content pos-relative z-2  bg-white  py-20px drop-shadow-sm">
          <div class="flex items-center mb-5">
            <img :src="'/img/title_icon.png'" class="h-25px w-25px m-2">
            <span class="font-semibold">科普示范基地学校名录</span>
          </div>
          <el-form :model="queryParams2" ref="queryForm" size="small" :inline="true">
            <el-form-item label="">
              <el-radio-group size="medium" v-model="basetype">
                <el-radio-button label="学校"></el-radio-button>
                <el-radio-button label="基地"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="schoolName">
              <el-input  :prefix-icon="Search" style="width: 240px" size="default" v-model="queryParams2.schoolName" placeholder="请输入搜索信息" clearable />
            </el-form-item>
            <el-form-item label="" prop="schoolProvince">
              <el-select v-model="queryParams2.schoolProvince" style="width: 140px" placeholder="请选择省份" size="default" clearable>
                <el-option v-for="dict in provinList" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  size="mini" @click="handleQuery()">搜索</el-button>
            </el-form-item>
          </el-form>
          <PublicTable :list="tableData" :dataType="dataType" @click-item="toDetail">
            <template #image>
              <img src="/img/productcatalog.jpg" class="h-150px w-full">
            </template>
          </PublicTable>
        </div>
      </div>
    </div>
  </CommonPageContainer>
</template>

<style></style>
