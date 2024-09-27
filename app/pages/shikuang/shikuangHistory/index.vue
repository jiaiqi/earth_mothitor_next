<script setup lang="ts">
import ListItem from '../components/list-item.vue'
import mini from '~~/public/img/icon/mini.png'
import mini2 from '~~/public/img/icon/mini2.png'
import mini3 from '~~/public/img/icon/mini3.png'
import mini4 from '~~/public/img/icon/mini4.png'
import mini5 from '~~/public/img/icon/mini5.png'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getHisList } from '~/api/shikuang'
import { decode } from '~/utils/base/dataEncry'

definePageMeta({
  layout: 'map-page',
  navName: '地震信息',
})

const routePath = [{ name: '首页', path: '/' }, { name: '历史上的今天', path: '' }]
const route = useRoute()
const loading = ref(false)
const selTime = ref<number>()
const selDg = ref<any>('')
const listData = ref<any[]>([])
const listBackup = ref<any[]>([])
const seldate = ref<any>(null)
const activeLocation = ref<any>()
const month = ref<any>(new Date().getMonth() + 1)
const day = ref<any>(new Date().getDate())
const mapRef = ref<any>()
const province = ref<any[]>([])
const dayjs = useDayjs()
const currentDate = ref(new Date(dayjs().format('YYYY/MM/DD')))

seldate.value = new Date().setDate(new Date().getDate() - 30)

function setIcon(item) {
  const level = item.m
  let icon = null
  if (level >= 7) {
    icon = mini
  }
  else if (level >= 5) {
    icon = mini2
  }
  else if (level >= 3) {
    icon = mini3
  }
  else if (level < 3) {
    icon = mini4
  }

  const size = item.m === 6 ? 16 : (Number.parseInt(item.m) - 6) * 20
  return {
    icon,
    size,
  }
}

function getList() {
  const pageNum = 1
  const pageSize = 999
  let m = ''
  if (month.value) {
    m = month.value > 9 ? `${month.value}` : `0${month.value}`
  }
  let d = ''
  if (day.value) {
    d = day.value > 9 ? `${day.value}` : `0${day.value}`
  }
  getHisList(pageNum, pageSize, m, d).then((res) => {
    const list = res.records.filter(item => item.lat && item.lon).map((item) => {
      item.icon = setIcon(item)
      return item
    })
    listBackup.value = JSON.parse(JSON.stringify(list))
    // lookearth.value = filterLevel(list)
    listData.value = list
  })
}
function filterLevel(list) {
  const arr: any[] = []
  if (Array.isArray(list) && list.length) {
    list.forEach((item) => {
      if (item.placeName.substr(0, 3) === '内蒙古' || item.placeName.substr(0, 3) === '黑龙江') {
        if (item.m >= 6) {
          arr.push(item)
        }
      }
      else {
        if (province.value.includes(item.placeName.substr(0, 2)) && item.m >= 6 || item.m >= 7) {
          arr.push(item)
        }
      }
    })
  }
  return arr
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
function onFilter(num: any) {
  if (['+1', '-1'].includes(num)) {
    if (num === '+1') { // 下一天
      const date = dayjs(currentDate.value).add(1, 'day')
      day.value = date.date()
      month.value = date.month() + 1
      currentDate.value = new Date(date.format('YYYY-MM-DD'))
    }
    if (num === '-1') { // 上一天
      const date = dayjs(currentDate.value).add(-1, 'day')
      day.value = date.date()
      month.value = date.month() + 1
      currentDate.value = new Date(date.format('YYYY-MM-DD'))
    }
    getList()
  }
  else {
    const list = JSON.parse(JSON.stringify(listBackup.value))
    if (selDg.value === 6) { // 6级以上地震
      listData.value = list.filter((item: any) => item.m >= 6)
    }
    if (selDg.value === 6.5) { // 6.5级以上地震
      listData.value = list.filter((item: any) => item.m >= 6.5)
    }
    if (selDg.value === 7) { // 7级以上地震
      listData.value = list.filter((item: any) => item.m >= 7)
    }
    if (selDg.value === 0) {
      listData.value = list
    }
  }
}

function reSet() {
  selTime.value = 0
  selDg.value = ''
  listData.value = JSON.parse(JSON.stringify(listBackup.value))
}

function goEarths(item) {
  const { id } = item
  navigateTo({ path: '/earthlist', query: { id } })
}

function toHome() {
  mapRef.value?.toHome?.()
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
</script>

<template>
  <div>
    <ClientOnly>
      <div>
        <DataCatalogueMap v-loading="loading" content-height="calc(100vh - 180px)" page-name="历史上的今天" :route-path="routePath">
          <template #header>
            <div class="header flex items-center bg-white px-20px">
              <span class="ml-10px">按震级：</span>
              <el-radio-group v-model="selDg" size="small" @change="onFilter">
                <el-radio-button :value="7">
                  7.0级以上地震
                </el-radio-button>
                <el-radio-button :value="6.5">
                  6.5级以上地震
                </el-radio-button>
                <el-radio-button :value="6.0">
                  6.0级以上地震
                </el-radio-button>
                <el-radio-button :value="0">
                  全部
                </el-radio-button>
              </el-radio-group>
              <span class="ml-10px">按日期：</span>
              <el-input v-model="month" maxlength="2" style="width: 52px;" @input="getList" />&nbsp;&nbsp;月&nbsp;
              <el-input v-model="day" maxlength="2" style="width: 52px;" @input="getList" />&nbsp;&nbsp;日
              <el-button-group size="small" style="margin-left: 10px">
                <el-button @click="onFilter('-1')">
                  上一天
                </el-button>
                <el-button @click="onFilter('+1')">
                  下一天
                </el-button>
              </el-button-group>
              <el-button style="margin-left:20px;height: 28px;" @click="reSet">
                重置
              </el-button>
            </div>
          </template>

          <template #content>
            <LeafletMap
              ref="mapRef"
              show-marker-popup
              :use-leaflet-pm="false"
              :popup-min-width="250"
              :map-zoom="2.5"
              :active-location="activeLocation"
              :list="listData"
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
                </div>
              </template>
            </LeafletMap>
          </template>
          <template #right>
            <div flex="~ col" class="pos-absolute bottom-20px right-0 top-20px z-999 w-430px overflow-hidden bg-white py-18px">
              <div class="flex-1 overflow-hidden">
                <el-scrollbar>
                  <ListItem v-for="(item, index) in listData.slice(0, 10)" :key="index" :data="item" @click="toLocation(item)" />
                </el-scrollbar>
              </div>
              <div v-if="listData.length > 10" class="mt-10px flex items-center justify-center">
                <NuxtLink :to="{ path: '/earthlist', query: { type: 2, data: new Date().toLocaleDateString() } }">
                  更多 <i class="i-ri:arrow-right-double-line ml-5px" />
                </NuxtLink>
              </div>
            </div>
          </template>
        </DataCatalogueMap>
        <div class="bottom-bg h-60px w-full flex items-center justify-end bg-white px-32px">
          <div class="h-30px w-30px cursor-pointer rounded-lg bg-#327BCF text-center text-white line-height-30px" @click="toHome ">
            <i class="i-ri:home-4-fill" />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.bottom-bg {
  background-image: url('/img/bottom-bg.jpg');
  background-repeat: no-repeat;
}
</style>
