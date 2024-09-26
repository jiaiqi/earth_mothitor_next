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
})

const routePath = [{ name: '首页', path: '/' }, { name: '历史上的今天', path: '' }]
const route = useRoute()
const id = ref(route.query.id)
const loading = ref(false)
const selTime = ref<number>()
const selDg = ref<any>('')
const draw = ref<any[]>([])
const draw2 = ref<any[]>([])
const seldate = ref<any>(null)
const activeLocation = ref<any>()
const month = ref<any>(new Date().getMonth() + 1)
const day = ref<any>(new Date().getDate())
const mapRef = ref<any>()
const lookearth = ref<any[]>([])
const province = ref<any[]>([])
const dayjs = useDayjs()
const currentDate = ref(new Date(dayjs().format('YYYY/MM/DD')))

seldate.value = new Date().setDate(new Date().getDate() - 30)

function showDraw() {}
function loadPointIcon(day, size, L) {
  let Icon = null
  if (day <= 1) {
    Icon = new L.Icon({
      iconUrl: mini, // 图标路径
      iconSize: size,
    })
  }
  else if (day <= 7) {
    Icon = new L.Icon({
      iconUrl: mini2, // 图标路径
      iconSize: size,
    })
  }
  else if (day <= 30) {
    Icon = new L.Icon({
      iconUrl: mini3, // 图标路径
      iconSize: size,
    })
  }
  else if (day <= 365) {
    Icon = new L.Icon({
      iconUrl: mini4, // 图标路径
      iconSize: size,
    })
  }
  else {
    Icon = new L.Icon({
      iconUrl: mini5, // 图标路径
      iconSize: size,
    })
  }
  return Icon
}
function drawList() {
  showDraw()
  const drawList = draw.value.length
  const circles = []
  const circle_map = {}
  for (let i = 0; i < drawList; i++) {
    const num = draw.value[i].m
    const txt = `
        <h4>发震时间:<span>${new Date(draw.value[i].oTime).toLocaleString()}</span></h4><br>
        <h4>震级：<span>${draw.value[i].m}</span></h4><br>
        <h4>经度：<span>${toThreeFloat(draw.value[i].lat)}</span></h4><br>
        <h4>纬度：<span>${toThreeFloat(draw.value[i].lon)}</span></h4><br>
        <h4>深度：<span>${draw.value[i].depth}KM</span></h4><br>
        <h4>位置：<span> ${draw.value[i].localName}</span></h4><br>
      `
    if (num >= 7) {
      let Icon = null
      let zindex = 350
      Icon = loadPointIcon(draw.value[i].day, [25, 25])
      if (draw.value[i].day <= 1) {
        zindex = 999
      }
      const circle = L.marker([draw.value[i].lat, draw.value[i].lon], {
        icon: Icon,
        riseOnHover: true,
      })
        .bindPopup(txt)
        .openPopup()
        .setZIndexOffset(zindex)
      circles.push(circle)
      circle_map[i] = circle
    }
    else if (num >= 5) {
      let Icon = null
      let zindex = 320
      Icon = loadPointIcon(draw.value[i].day, [19, 19])
      if (draw.value[i].day <= 1) {
        zindex = 999
      }
      const circle = L.marker([draw.value[i].lat, draw.value[i].lon], {
        icon: Icon,
        riseOnHover: true,
      })
        .bindPopup(txt)
        .openPopup()
        .setZIndexOffset(zindex)
      circles.push(circle)
      circle_map[i] = circle
    }
    else if (num >= 3) {
      let Icon = null
      let zindex = 290
      Icon = loadPointIcon(draw.value[i].day, [12, 12])
      if (draw.value[i].day <= 1) {
        zindex = 999
      }
      const circle = L.marker([draw.value[i].lat, draw.value[i].lon], {
        icon: Icon,
        riseOnHover: true,
      })
        .bindPopup(txt)
        .openPopup()
        .setZIndexOffset(zindex)
      circles.push(circle)
      circle_map[i] = circle
    }
    else {
      let Icon = null
      let zindex = 260
      Icon = loadPointIcon(draw.value[i].day, [7, 7])
      if (draw.value[i].day <= 1) {
        zindex = 999
      }
      const circle = L.marker([draw.value[i].lat, draw.value[i].lon], {
        icon: Icon,
        riseOnHover: true,
      })
        .bindPopup(txt)
        .openPopup()
        .setZIndexOffset(zindex)
      circles.push(circle)
      circle_map[i] = circle
    }
    circle_group = new L.LayerGroup(circles).addTo(map)
    circle_group2 = circle_group
  }
}
function formatDateTime(date: any) {
  const dateTime = new Date(date)
  const Y = `${dateTime.getFullYear()}-`
  const M = `${dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1}-`
  const D = (dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate())
  return Y + M + D
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
  getHisList(pageNum, pageSize, m, d)
    .then((res) => {
      const list = res.records
      lookearth.value = filterLevel(list)
      draw.value = lookearth.value
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
  draw2.value = JSON.parse(JSON.stringify(draw.value))
  const list = JSON.parse(JSON.stringify(draw.value))
  if (selDg.value === 6) { // 6级以上地震
    draw.value = list.filter((item: any) => item.m >= 6)
  }
  if (selDg.value === 6.5) { // 6.5级以上地震
    draw.value = list.filter((item: any) => item.m >= 6.5)
  }
  if (selDg.value === 7) { // 7级以上地震
    draw.value = list.filter((item: any) => item.m >= 7)
  }
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

function reSet() {
  selTime.value = 0
  selDg.value = ''
  draw.value = JSON.parse(JSON.stringify(draw2.value))
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
          <!-- <TopFilter :net-list="netList" :station-list="station" type="GNSS" @search="searchVal" @filter="filterVal" /> -->
          </template>

          <template #content>
            <LeafletMap
              ref="mapRef"
              show-marker-popup
              :use-leaflet-pm="false"
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
                  <ListItem v-for="(item, index) in draw.slice(0, 10)" :key="index" :data="item" @click="toLocation(item)" />
                </el-scrollbar>
              </div>
              <div class="mt-10px flex items-center justify-center">
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
