<script setup lang="ts">
import ListItem from './list-item.vue'
import mini from '~~/public/img/icon/mini.png'
import mini2 from '~~/public/img/icon/mini2.png'
import mini3 from '~~/public/img/icon/mini3.png'
import mini4 from '~~/public/img/icon/mini4.png'
import mini5 from '~~/public/img/icon/mini5.png'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { ElLoading } from '#imports'
import { getList } from '~/api/shikuang'

definePageMeta({
  layout: 'map-page',
})

const routePath = [{ name: '首页', path: '/' }, { name: '地震信息', path: '' }]
const route = useRouter()
const loading = ref(false)
const selTime = ref<number>()
const selLevel = ref<number>()
const selDg = ref('')
const draw = ref<any[]>([])
const draw2 = ref<any[]>([])
const seldate = ref<any>(null)
const activeLocation = ref<any>()
const mapRef = ref<any>()
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
const dayjs = useDayjs()
function fetchData(flag: number) {
  let str = 'pageSize=100&pageNum=1'
  if (selDg.value) {
    str += `&m=${selDg.value}`
  }
  if (selTime.value && seldate.value) {
    str += `&oTime=${dayjs(seldate.value).format('YYYY-MM-DD')}`
  }
  const _loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.9)',
  })
  getList(str).then((res) => {
    draw.value = res.records.map((item) => {
      item.oTime = new Date(item.otime).getTime()
      item.day = Math.floor((Number.parseInt(new Date().getTime()) - Number.parseInt(item.oTime)) / 1000 / 60 / 60 / 24)
      return item
    })
    _loading.close()
    draw2.value = JSON.parse(JSON.stringify(draw.value))
    // draw2.value = draw.value.sort((a, b) => b.oTime - a.oTime)
    // sel()
  }).catch((e) => {
    if (!flag) {
      setTimeout(() => {
        fetchData(1)
      }, 500)
    }
  })
}
onMounted(() => {
  fetchData(0)
})
function setMap(flag) {
  const loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.9)',
  })
  let str = 'pageSize=100&pageNum=1'
  if (selDg.value != '') {
    str += `&m=${selDg.value}`
  }
  if (selTime.value) {
    str += `&oTime=${dayjs(seldate.value).format('YYYY-MM-DD')}`
  }
  getList(str).then((res) => {
    draw.value = [...res.records].map((item) => {
      item.oTime = new Date(i.otime).getTime()
      item.day = Math.floor((Number.parseInt(new Date().getTime()) - Number.parseInt(item.oTime)) / 1000 / 60 / 60 / 24)
      return item
    })
    loading.close()
    draw2.value = draw.value.sort((a, b) => b.oTime - a.oTime)
    drawList()
    // sel()
  }).catch((e) => {
    if (!flag) {
      setTimeout(() => {
        setMap(1)
      }, 500)
    }
  })

  // addDraw(map)
}
function toLocation(item) {
  activeLocation.value = item
  mapRef.value?.toLocation(item)
}
function onFilter(val) {
  const list = JSON.parse(JSON.stringify(draw2.value))
  seldate.value = new Date()
  if ([1, 2, 7, 30, 365].includes(selTime.value)) {
    draw.value = list.filter(item => item.day <= selTime.value)
    seldate.value = seldate.value.setDate(seldate.value.getDate() - selTime.value)
  }
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
function changeMap(val) {

}
function toHome() {
  navigateTo({ path: '/' })
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
      <DataCatalogueMap v-loading="loading" content-height="calc(100vh - 180px)" page-name="地震信息" :route-path="routePath">
        <template #header>
          <div class="bg-white px-15px" flex="~ items-center">
            <span class="text-14px text-#101010 font-600">按时间：</span>
            <el-radio-group v-model="selTime" size="small" @change="onFilter">
              <el-radio :value="1">
                最近24小时内
              </el-radio>
              <el-radio :value="2">
                最近48小时内
              </el-radio>
              <el-radio :value="7">
                最近7天内
              </el-radio>
              <el-radio :value="30">
                最近30天内
              </el-radio>
              <el-radio :value="365">
                最近一年内
              </el-radio>
            </el-radio-group>
            <span class="ml-20px text-14px text-#101010 font-600">按震级：</span>
            <el-radio-group v-model="selDg" size="small" @change="fetchData">
              <el-radio :value="6">
                6.0级以上
              </el-radio>
              <el-radio :value="5">
                5.0级以上
              </el-radio>
              <el-radio :value="4">
                4.0级以上
              </el-radio>
              <el-radio :value="3">
                3.0级以上
              </el-radio>
              <el-radio :value="2">
                3.0级以下
              </el-radio>
            </el-radio-group>
            <el-button class="ml-20px" size="small" @click="reSet">
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
            :map-zoom="2"
            :active-location="activeLocation"
            :list="draw"
            @marker-click="clickMarker"
          >
            <template #marker-popup>
              <div v-if="activeLocation && activeLocation.oTime" class="p-14px">
                <div class="font-600 line-height-34px">
                  发震时间:<span>{{ new Date(activeLocation.oTime).toLocaleString() }}</span>
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
                <div class="font-600 line-height-34px">
                  深度：<span>{{ activeLocation.depth }}KM</span>
                </div>
                <div class="font-600 line-height-34px">
                  位置：<span> {{ activeLocation.localName }}</span>
                </div>
              </div>
              <!-- <PopupContent
                  :marke-arr="marker"
                  :title="dratitle"
                  :data-length="unitList.length"
                  :begin-time="drawertitle.time"
                  :days="drawertitle.num"
                /> -->
            </template>
          </LeafletMap>
        </template>
        <template #right>
          <div flex="~ col" class="pos-absolute bottom-20px right-0 top-80px z-999 w-430px overflow-hidden bg-white py-18px">
            <div class="flex-1 overflow-hidden">
              <el-scrollbar>
                <ListItem v-for="(item, index) in draw.slice(0, 10)" :key="index" :data="item" @click="toLocation(item)" />
              </el-scrollbar>
            </div>
            <div v-if="draw.length && draw.length > 10" class="mt-10px flex items-center justify-center">
              <NuxtLink to="/earthlist">
                更多 <i class="i-ri:arrow-right-double-line ml-5px" />
              </NuxtLink>
            </div>
          </div>
        </template>
      </DataCatalogueMap>
      <div class="bottom-bg h-60px w-full flex items-center bg-white px-32px">
        <!-- <div>
          震级:
          <span class="mr-10px">
            <i class="i-carbon:circle-outline scale-x-0.8 scale-y-0.8 text-12px text-gray" />
            &lt;3
          </span>
          <span class="mr-10px">
            <i class="i-carbon:circle-outline text-12px text-gray" />
            3~4.9
          </span>
          <span class="mr-10px">
            <i class="i-carbon:circle-outline text-16px text-gray" />
            5~6.9
          </span>
          <span class="mr-10px">
            <i class="i-carbon:circle-outline text-18px text-gray" />
            >=7
          </span>
        </div>
        <div>
          时间：
        </div> -->
      </div>
    </ClientOnly>
  </div>
  <!-- <el-container>
    <el-header>
      <div class="header">
        <div class="headerRow">
          <span style="font-size: 15px;line-height: 33px;width: 80px;">按时间：</span>
          <el-radio-group v-model="selTime" size="small" @change="sel">
            <el-radio-button :label="1">
              最近24小时内
            </el-radio-button>
            <el-radio-button :label="2">
              最近48小时内
            </el-radio-button>
            <el-radio-button :label="3">
              最近7天内
            </el-radio-button>
            <el-radio-button :label="4">
              最近30天内
            </el-radio-button>
            <el-radio-button :label="5">
              最近一年内
            </el-radio-button>
          </el-radio-group>
          <span style="font-size: 15px;line-height: 33px;width: 130px;padding-left: 50px;">按震级：</span>
          <el-radio-group v-model="selDg" size="small" @change="sel">
            <el-radio-button :label="6">
              6.0级以上地震
            </el-radio-button>
            <el-radio-button :label="5">
              5.0级以上地震
            </el-radio-button>
            <el-radio-button :label="6">
              4.0级以上地震
            </el-radio-button>
            <el-radio-button :label="4">
              3.0级以上地震
            </el-radio-button>
            <el-radio-button :label="1">
              3.0级以下地震
            </el-radio-button>
          </el-radio-group>
          <el-button style="margin-left:20px;height: 30px;" @click="reSet">
            重置
          </el-button>
        </div>
      </div>
    </el-header>
    <el-container>

      <el-aside width="400px" style="margin-top: 2px;">
        <ul class="box">
          <div v-if="draw.length === 0" class="nodata">
            暂无数据
          </div>
          <li
            v-for="(item, index) in draw"
            :key="index"
            class="smallbox"
            style="display: flex"
          >
            <div style="cursor:pointer" @click="toLocation(item)">
              <div v-if="item.m >= 3" class="left">
                M{{ item.m }}
              </div>
              <div v-if="item.m < 3" class="left" style="background: #f3e11f">
                M{{ item.m }}
              </div>
            </div>
            <div class="right">
              <ul>
                <li style="cursor:pointer;font-weight: bold;" @click="toLocation(item)">
                  {{ item.localName }}
                </li>
                <li style="cursor:pointer;color: #7b7b7b;" @click="toLocation(item)">
                  {{ new Date(item.oTime).toLocaleString('chinese', { hour12: false }) }}
                </li>
                <li class="l">
                  <div>
                    <span>纬度{{ toThreeFloat(item.lat) }}°</span>
                    <span>经度{{ toThreeFloat(item.lon) }}°</span>
                  </div>
                  <span>深度{{ Math.floor(item.depth) }}KM</span>
                  <span style="cursor:pointer;color: blue;text-decoration:underline" @click="goEarths(item)">详情</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <router-link to="/earthlist">
          查看更多>>
        </router-link>
      </el-aside>
    </el-container>
  </el-container> -->
</template>

<style scoped>
.bottom-bg {
  background-image: url('/img/bottom-bg.png');
}
</style>
