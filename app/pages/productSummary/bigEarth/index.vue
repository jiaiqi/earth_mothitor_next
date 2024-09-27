<script setup lang="ts">
import ListItem from '../components/list-item.vue'
import iconRed from '~~/public/img/icon/red.png'
import iconOrange from '~~/public/img/icon/orange.png'
import iconYellow from '~~/public/img/icon/yellow.png'
import iconGreen from '~~/public/img/icon/green.png'
import iconWhite from '~~/public/img/icon/gray.png'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getProdList } from '~/api/shikuang'
import { decode } from '~/utils/base/dataEncry'

definePageMeta({
  path: '/monitor/bigEath',
  name: 'product-catalogue-big-earth',
  layout: 'map-page',
  navName: '地震信息',
})

const route = useRoute()
const type = ref(route.query.type)
const m = ref(route.query.m)

const loading = ref(false)
const draw = ref<any[]>([])
const activeLocation = ref<any>()
const mapRef = ref<any>()
const dayjs = useDayjs()

const search = reactive({
  dateRange: ['2012-01-01', dayjs().format('YYYY-MM-DD')],
  level1: m.value || '',
  level2: '',
  place: '',
  lat1: '',
  lat2: '',
  lon1: '',
  lon2: '',
})
function buildQueryParams(onFilter = false) {
  let par = {}
  if (type.value === '1' && onFilter !== true) {
    // search.dateRange = ['2017-01-01', '2018-01-01']
    search.level1 = search.level1 || '2'
    search.level2 = search.level2 || '3'
  }
  else {
    if (m.value === '7' && onFilter !== true) {
      search.level1 = search.level1 || '7'
    }
    else {
      // search.dateRange = ['2015-01-01', '2023-01-01']
    }
  }
  let syear = ''
  let eyear = ''
  let sdm = ''
  let edm = ''
  if (Array.isArray(search.dateRange) && search.dateRange.length > 0 && search.dateRange[0]) {
    syear = dayjs(search.dateRange[0]).format('YYYY')
    sdm = dayjs(search.dateRange[0]).format('MM-DD')
  }
  if (Array.isArray(search.dateRange) && search.dateRange.length > 1 && search.dateRange[1]) {
    eyear = dayjs(search.dateRange[1]).format('YYYY')
    edm = dayjs(search.dateRange[1]).format('MM-DD')
  }
  par = {
    type: type.value,
    year: syear,
    betyear: eyear,
    dm: sdm,
    betDM: edm,
    slon: search.lon1,
    elon: search.lon2,
    slat: search.lat1,
    elat: search.lat2,
    m: search.level1,
    betm: search.level2,
    localname: search.place,
  }
  return par
}
const page = reactive({
  pageSize: 10,
  total: 0,
  pageNum: 1,
})
const list = ref<any[]>([])
function setIcon(item) {
  const icon = (Number.parseInt(item.m) - 7) * 15 < 6 ? iconOrange : iconRed
  const size = item.m < 7 ? 20 : (Number.parseInt(item.m) - 6) * 20
  return {
    icon,
    size,
  }
}
function getList(onFilter = false) {
  activeLocation.value = null
  mapRef?.value?.clear()
  const par = { ...buildQueryParams(onFilter), pageNum: 1, pageSize: 99999 }
  loading.value = true
  getProdList(par).then((res) => {
    loading.value = false
    draw.value = res.records.map((item) => {
      item.oTime = formatDateTime(item.year, item.monday, item.hour, item.min, item.second)
      // item.icon = loadPointIcon(dayjs().diff(dayjs(item.oTime), 'day'), [30, 30], L)
      item.icon = setIcon(item)
      return item
    })
    list.value = draw.value.slice(0, 10)
    page.total = res.total
    page.pageNum = 1
  }).catch(() => {
    loading.value = false
  })
}

function onPageChange(num) {
  page.pageNum = num
  list.value = draw.value.slice((page.pageNum - 1) * page.pageSize, page.pageNum * page.pageSize)
}

onMounted(() => {
  getList()
  if (route.query.data) {
    try {
      const data = decode(route.query.data)
      setTimeout(() => {
        toLocation(data)
      }, 200)
    }
    catch (error) {
      console.log(error)
    }
  }
})
function toLocation(item) {
  activeLocation.value = item
  mapRef.value?.toLocation(item)
}
function onFilter() {
  getList(true)
}

function reSet() {
  Object.keys(search).forEach((key) => {
    if (key === 'dateRange') {
      search[key] = ['2012-01-01', dayjs().format('YYYY-MM-DD')]
    }
    else {
      search[key] = ''
    }
  })
}

function clickMarker({ data }) {
  activeLocation.value = data
}
function toThreeFloat(num) { // 保留三位小数
  let number = null
  if (num.toString().split('.').length !== 1 && num.toString().split('.')[1].length < 3) {
    number = Number.parseFloat(num).toFixed(3)
  }
  else if (num.toString().split('.').length === 1) {
    number = `${num.toString()}.000`
  }
  else {
    number = num.toString().substr(0, Number.parseInt(num.toString().indexOf('.')) + 4)
  }
  return number
}

enum LayerType {
  矢量 = 'sl',
  影像 = 'yx',
  地形 = 'dx',
}
function formatDateTime(year, monthDay, h, m, s) {
  return dayjs(`${year}/${monthDay.slice(0, 2)}/${monthDay.slice(2)} ${h}:${m}:${s}`).format('YYYY-MM-DD HH:mm:ss')
}
const unfold = ref(true)
</script>

<template>
  <div>
    <ClientOnly>
      <div>
        <DataCatalogueMap v-loading="loading" content-height="calc(100vh - 180px)" page-name="历史上的今天" :show-path="false">
          <template #header>
            <div class="h-60px flex items-center justify-between bg-white px-20px">
              <div class="" flex="~ items-center">
                <span class="pr-10px text-right">日期</span>
                <el-date-picker
                  v-model="search.dateRange"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
              <div class="" flex="~ items-center ">
                <span class="pr-10px text-right">震级</span>
                <el-input v-model="search.level1" clearable />
                <span class="px-10px">--</span>
                <el-input v-model="search.level2" clearable />
              </div>
              <div class="" flex="~ items-center">
                <span class="pr-10px text-right">地点</span>
                <el-input v-model="search.place" clearable style="width: 200px;" />
              </div>
              <div class="" flex="~ items-center">
                <span class="pr-10px text-right">经度(范围)</span>
                <el-input v-model="search.lat1" clearable />
                <span class="px-10px">--</span>
                <el-input v-model="search.lat2" clearable />
              </div>
              <div class="" flex="~ items-center">
                <span class="pr-10px text-right">纬度(范围)</span>
                <el-input v-model="search.lon1" clearable />
                <span class="px-10px">--</span>
                <el-input v-model="search.lon2" clearable />
              </div>
              <div>
                <el-button class="ml-10px" @click="reSet">
                  重置
                </el-button>
                <el-button type="primary" class="ml-10px" @click="onFilter">
                  查询
                </el-button>
              </div>
            </div>
          <!-- <TopFilter :net-list="netList" :station-list="station" type="GNSS" @search="searchVal" @filter="filterVal" /> -->
          </template>

          <template #content>
            <LeafletMap
              ref="mapRef"
              show-marker-popup
              :use-leaflet-pm="false"
              :show-mouse-position="false"
              :show-change-layer="false"
              :layer-name="LayerType.地形"
              :popup-min-width="250"
              :map-zoom="2.5"
              :active-location="activeLocation"
              :list="draw"
              @marker-click="clickMarker"
            >
              <template #marker-popup>
                <div v-if="activeLocation && activeLocation.lat" class="p-14px">
                  <div v-if="activeLocation.oTime" class="font-600 line-height-34px">
                    发震时间:<span>{{ new Date(activeLocation.oTime).toLocaleString() }}</span>
                  </div>
                  <div v-else-if="activeLocation.earthquakeDate" class="font-600 line-height-34px">
                    发震时间:<span>{{ new Date(activeLocation.earthquakeDate).toLocaleString() }}</span>
                  </div>
                  <div v-if=" activeLocation.localname" class="font-600 line-height-34px">
                    位置：<span>{{ activeLocation.localname }}</span>
                  </div>
                  <div class="font-600 line-height-34px">
                    震级：<span>{{ activeLocation.m }}</span>
                  </div>
                  <div class="font-600 line-height-34px">
                    经度：<span>{{ toThreeFloat(activeLocation.lat) }}</span>
                  </div>
                  <div class="font-600 line-height-34px">
                    纬度：<span>{{ toThreeFloat(activeLocation.lon) }}</span>
                  </div>
                  <div v-if="activeLocation.depth " class="font-600 line-height-34px">
                    深度：<span>{{ activeLocation.depth }}KM</span>
                  </div>
                  <div v-if="activeLocation.localName" class="font-600 line-height-34px">
                    位置：<span> {{ activeLocation.localName }}</span>
                  </div>
                  <div v-else-if="activeLocation.placeName" class="font-600 line-height-34px">
                    位置：<span> {{ activeLocation.placeName }}</span>
                  </div>
                  <div
                    v-else-if="activeLocation.monday && activeLocation.year && activeLocation.min && activeLocation.hour && activeLocation.second"
                    class="font-600 line-height-34px"
                  >
                    发震时间:
                    <span>
                      {{ activeLocation.oTime }}
                    </span>
                    <!-- 发震时间:<span>{{ `${activeLocation.year}${activeLocation.monday} ${activeLocation.hour}:${activeLocation.min}:${activeLocation.second}` }}</span> -->
                  </div>
                </div>
              </template>
            </LeafletMap>
          </template>
          <template #right>
            <div flex="~ col" class="pos-absolute bottom-20px right-0 top-80px z-999">
              <div class="h-full overflow-hidden bg-white pt-18px transition-width" :class="{ 'w-430px': unfold, 'w-0': !unfold }">
                <div class="h-[calc(100%_-_50px)] w-full flex-1 overflow-hidden">
                  <el-scrollbar>
                    <ListItem v-for="(item, index) in list" :key="index" :data="item" @click="toLocation(item)" />
                    <el-empty v-if="list.length === 0" :image-size="200" />
                  </el-scrollbar>
                </div>
                <div class="flex items-center justify-center shadow-inner">
                  <div class="py-10px">
                    <el-pagination class="w-full" hide-on-single-page :pager-count="5" background layout="prev, pager, next" :total="page.total" @current-change="onPageChange" />
                  </div>
                </div>
              </div>
              <div class="right-icon pos-absolute left-0 top-50% w-35px flex flex-col cursor-pointer items-center justify-center py-20px" @click="unfold = !unfold">
                <img src="/img/icon/right.png" alt="" class="transition" :class="{ 'rotate-0': unfold, 'rotate-180': !unfold }">
                <span class="mx-5px mt-5px w-14px text-12px text-white line-height-18px">{{ unfold ? '收起' : '查看' }}列表</span>
              </div>
            </div>
          </template>
        </DataCatalogueMap>
        <!-- <div class="bottom-bg h-60px w-full flex items-center justify-end bg-white px-32px">
          <div class="h-30px w-30px cursor-pointer rounded-lg bg-#327BCF text-center text-white line-height-30px" @click="toHome ">
            <i class="i-ri:home-4-fill" />
          </div>
        </div> -->
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.bottom-bg {
  background-image: url('/img/bottom-bg.jpg');
  background-repeat: no-repeat;
}

:deep(.el-input) {
  --el-input-width: 100px;
}
:deep(.el-date-editor) {
  --el-date-editor-daterange-width: 300px;
}
.right-icon {
  border-radius: 6px 0 0 6px;
  background: linear-gradient(153.71deg, rgba(22, 132, 252, 1) 16.54%, rgba(47, 119, 201, 1) 136.86%);
  transform: translateY(-50%) translateX(-100%);
}
</style>
