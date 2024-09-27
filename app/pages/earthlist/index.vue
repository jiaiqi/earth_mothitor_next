<script  lang="ts" setup>
import { getEveList } from '~/api/catalogue'

const inputVal = ref('')
const searchValue = ref('')
const total = ref(0)
const prodList = ref<any[]>([])// 表格数据
const gnList = ref<any[]>([])// 表格数据-国内
const gwList = ref<any[]>([])// 表格数据-国内
const dataType = ref('地震动态')
const routePath = [{ name: '首页', path: '/' }, { name: '地震动态' }]
const loading = ref(false)
// 筛选
const filterList = [{
  label: '区域',
  value: '',
  key: 'area',
  options: [
    {
      label: '国内',
      value: '国内',
    },
    {
      label: '国外',
      value: '国外',
    },
  ],
}, {
  label: '省份',
  value: '',
  key: 'province',
  options: [
    { label: '北京', value: '北京' },
    { label: '天津', value: '天津' },
    { label: '河北', value: '河北' },
    { label: '山西', value: '山西' },
    { label: '内蒙', value: '内蒙' },
    { label: '辽宁', value: '辽宁' },
    { label: '吉林', value: '吉林' },
    { label: '黑龙江', value: '黑龙江' },
    { label: '上海', value: '上海' },
    { label: '江苏', value: '江苏' },
    { label: '浙江', value: '浙江' },
    { label: '安徽', value: '安徽' },
    { label: '福建', value: '福建' },
    { label: '江西', value: '江西' },
    { label: '山东', value: '山东' },
    { label: '河南', value: '河南' },
    { label: '湖北', value: '湖北' },
    { label: '湖南', value: '湖南' },
    { label: '广东', value: '广东' },
    { label: '广西', value: '广西' },
    { label: '海南', value: '海南' },
    { label: '重庆', value: '重庆' },
    { label: '四川', value: '四川' },
    { label: '贵州', value: '贵州' },
    { label: '云南', value: '云南' },
    { label: '西藏', value: '西藏' },
    { label: '陕西', value: '陕西' },
    { label: '甘肃', value: '甘肃' },
    { label: '青海', value: '青海' },
    { label: '宁夏', value: '宁夏' },
    { label: '新疆', value: '新疆' },
  ],
}, {
  label: '震级',
  value: '',
  key: 'cunit',
  options: [
    {
      label: '3级以下',
      value: '3级以下',
    },
    {
      label: '3-5级',
      value: '3-5级',
    },
    {
      label: '5-7级',
      value: '5-7级',
    },
    {
      label: '7级以上',
      value: '7级以上',
    },
  ],
}, {
  label: '时间',
  value: '',
  key: 'time',
  options: [
    {
      label: '最近24小时',
      value: '最近24小时',
    },
    {
      label: '最近一周',
      value: '最近一周',
    },
    {
      label: '最近一个月',
      value: '最近一个月',
    },
    {
      label: '最近一年',
      value: '最近一年',
    },
  ],
}]
const province = [
  '全部',
  '北京',
  '天津',
  '河北',
  '山西',
  '内蒙古',
  '辽宁',
  '吉林',
  '黑龙江',
  '上海',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  '广东',
  '广西',
  '海南',
  '重庆',
  '四川',
  '贵州',
  '云南',
  '西藏',
  '陕西',
  '甘肃',
  '青海',
  '宁夏',
  '新疆',
  '香港',
  '澳门',
  '台湾',
]
const provinceOptions = [{ label: '北京', value: '北京' }, { label: '天津', value: '天津' }, { label: '河北', value: '河北' }, { label: '山西', value: '山西' }, { label: '内蒙', value: '内蒙' }, { label: '辽宁', value: '辽宁' }, { label: '吉林', value: '吉林' }, { label: '黑龙江', value: '黑龙江' }, { label: '上海', value: '上海' }, { label: '江苏', value: '江苏' }, { label: '浙江', value: '浙江' }, { label: '安徽', value: '安徽' }, { label: '福建', value: '福建' }, { label: '江西', value: '江西' }, { label: '山东', value: '山东' }, { label: '河南', value: '河南' }, { label: '湖北', value: '湖北' }, { label: '湖南', value: '湖南' }, { label: '广东', value: '广东' }, { label: '广西', value: '广西' }, { label: '海南', value: '海南' }, { label: '重庆', value: '重庆' }, { label: '四川', value: '四川' }, { label: '贵州', value: '贵州' }, { label: '云南', value: '云南' }, { label: '西藏', value: '西藏' }, { label: '陕西', value: '陕西' }, { label: '甘肃', value: '甘肃' }, { label: '青海', value: '青海' }, { label: '宁夏', value: '宁夏' }, { label: '新疆', value: '新疆' }]
function onFilter(model: any) {
  // 国内外筛选
  if (model.area === '国外') {
    prodList.value = gwList.value
    filterList[1].options = []
    model.province = ''
    if (model.cunit != '') {
      cunitFilter(prodList.value, model.cunit)
    }
    if (model.time != '') {
      timerFilter(prodList.value, model.time)
    }
  }
  else {
    prodList.value = gnList.value
    filterList[1].options = provinceOptions
    if (model.province != '') {
      prodList.value = gnList.value.filter((item) => {
        return item.localName.includes(model.province)
      })
      if (model.cunit != '') {
        cunitFilter(prodList.value, model.cunit)
      }
    }
  }
  // 省份
  if (model.province != '') {
    prodList.value = gnList.value.filter((item) => {
      return item.localName.includes(model.province)
    })
    if (model.cunit != '') {
      cunitFilter(prodList.value, model.cunit)
    }
  }
  // 时间
  if (model.cunit != '') {
    cunitFilter(prodList.value, model.cunit)
  }
  if (model.time != '') {
    timerFilter(prodList.value, model.time)
  }
}

// 震级筛选
function cunitFilter(list, cunit) {
  if (cunit === '3级以下') {
    prodList.value = list.filter((item) => {
      return item.m < 3
    })
  }
  if (cunit === '3-5级') {
    prodList.value = list.filter((item) => {
      return item.m >= 3 && item.m < 5
    })
  }
  if (cunit === '5-7级') {
    prodList.value = list.filter((item) => {
      return item.m >= 5 && item.m < 7
    })
  }
  if (cunit === '7级以上') {
    prodList.value = list.filter((item) => {
      return item.m >= 7
    })
  }
}
// 时间筛选
function timerFilter(list, t) {
  if (t === '最近24小时') {
    prodList.value = list.filter((item) => {
      return item.day <= 1
    })
  }
  if (t === '最近一周') {
    prodList.value = list.filter((item) => {
      return item.day <= 7
    })
  }
  if (t === '最近一个月') {
    prodList.value = list.filter((item) => {
      return item.day <= 30
    })
  }
  if (t === '最近一年') {
    prodList.value = list.filter((item) => {
      return item.day <= 365
    })
  }
}
// 搜索
function onSearch() {
  searchValue.value = inputVal.value
  //   getList()
}
function clearInput() {
  inputVal.value = ''
  onSearch()
}
const listData = computed(() => {
  return prodList.value
})

// 获取表格数据
function getDataList() {
  loading.value = true
  getEveList({ pageNum: 1, pageSize: 9999 }).then((res) => {
    loading.value = false
    res.records.forEach((item) => {
      item.day = Math.floor((Number.parseInt(new Date().getTime()) - Number.parseInt(new Date(item.otime).getTime())) / 1000 / 60 / 60 / 24)
    })
    prodList.value = res.records
    res.records.forEach((item) => {
      item.day = Math.floor((Number.parseInt(new Date().getTime()) - Number.parseInt(new Date(item.otime).getTime())) / 1000 / 60 / 60 / 24)
      if (item.localName.substr(0, 3) === '内蒙古' || item.localName.substr(0, 3) === '黑龙江') {
        gnList.value.push(item)
      }
      else {
        province.includes(item.localName.substr(0, 2)) ? gnList.value.push(item) : gwList.value.push(item)
      }
    })
  }).catch(() => {
    loading.value = false
  })
}
getDataList()
</script>

<template>
  <div>
    <CommonPageContainer :path="routePath" title="地震动态" desc="PROFESSIONAL WEBSITE">
      <template #right>
        <div class="right w-40% flex items-center py-5px" border="1px solid #E5E5EA">
          <div class="px-16px text-center">
            <i class="i-ri:search-2-line text-20px text-black" />
          </div>
          <input v-model="inputVal" placeholder="请输入搜索信息" class="min-w-0 flex-1 indent-16px outline-none">
          <i
            class="i-ri:close-circle-line cursor-pointer text-gray opacity-0"
            :class="{ 'opacity-100': inputVal }" @click="clearInput"
          />
          <el-button type="primary" class="mx-10px md:w-96px" @click="onSearch">
            搜索
          </el-button>
        </div>
      </template>
      <PublicFilter :filter-list="filterList" @change="onFilter" />
      <div v-if="searchValue" class="my-24px">
        找到<span class="px-10px text-#1684FC font-700">{{ total }}</span>条记录
      </div>
      <div v-loading="loading" class="content min-h-400px" flex="~ col xl:row">
        <div class="min-h-300px w-full" flex="1">
          <div class="pos-relative items-start" flex="~ col md:row">
            <div class="flex-1">
              <el-empty v-if="!loading && !listData.length" />
              <PublicTable v-if="listData.length" :list="listData" :data-type="dataType" />
            </div>
          </div>
        </div>
      </div>
    </CommonPageContainer>
  </div>
</template>

<style></style>
