  <!-- 探测数据 -->
<script lang="ts" setup>
import PopupContent from './popup-content.vue'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getPreitem, getWordList } from '~/api/precursor'
import { hotDataAdd } from '~/api/count'
import { getContinuousList, getContinuousNet, getFlowGnss, getFlowNet, getGnssList, gnssHeadSearch } from '~/api/gnss'
import { getDRlist, getGeophydata } from '~/api/probedata'

definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '探测数据', path: '' }]
const mapRef = ref<any>(null)
const station = ref([])
const dratitle = ref('')
const drawertitle = ref({ title: '', time: '', num: '', nuit: '' })
const drawerTitle = ref('')
const unitList = ref([])
const yearList = ref([])
const loading = ref(false)
const marker = ref<any>(null)
const highspot = ref<any>(null)
const tipText = ref('')
const isChildProvince = ref(false)
const nowProvince = ref('')
const deformation = ref<any[]>([])
const netId = ref(null)
const netList = ref<any[]>([])
const showName = ref(false)
const platName = ref<any[]>([])
const deformationLine = ref<any[]>([])
const comTreeList = ref<any[]>([])
const activeLine = ref(null)
const treeData = [
  {
    lineName: '地震测深',
    children: [{
      lineName: '人工地震测深',
      children: [{
        lineName: '按剖面名称',
      }],
    }],
  },
]
onMounted(() => {
  handleNodeClick({ lineName: '按剖面名称' })
  if (sessionStorage.getItem('tips')) {
    tipText.value = sessionStorage.getItem('tips') as string
  }
})

function searchVal(val) {
  const info = platName.value.find(item => item.lineName?.indexOf(val) !== -1) || null
  if (info) {
    clickMapItem(info)
  }
}
// 地图标记点点击
function clickMapItem(val) {
  activeLine.value = val
  comTreeList.value = [val]
  station.value = val.childPoint
  highspot.value = val
}
function filterVal(id) {
  let info = {}
  // 判断是选择还是输入
  if (id !== '' && Number.isNaN(Number.parseInt(id))) {
    info = station.value.find((item: any) => item.stationName.includes(id)) || {}
    if (JSON.stringify(info) === '{}') {
      return
    }
  }
  else {
    info = station.value.find((item: any) => item.stationName === id || item.stationName === `${id}`) || {}
  }
  if (id === '') {
    return
  }
  if (mapRef.value?.toMarker) {
    mapRef.value.toMarker(info)
  }
}

function handleNodeClick(data: any) {
  if (data.lineName === '按剖面名称') {
    const data = {}
    getDRlist(data).then((res) => {
      const list = res.map((item) => {
        item.staLat = item.beginLatitude
        item.staLon = item.beginLongitude
        item.endLat = item.endLatitude
        item.endLon = item.endLongitude
        return item
      })
      loading.value = false
      showName.value = true
      deformationLine.value = list
      platName.value = list
      // treeData = list
    }).catch(() => {
      ElMessage.error('请先登录')
    })
    const form = {
      keyName: '地震测深数据集',
      url: '/prevention/prospecting?type=0',
      linkUnit: tipText,
    }
    hotDataAdd(form).then()
  }
}

function filterPlatList(val: any) {
  platName.value = val
}

function highLine(params: any) {
  activeLine.value = params
}
</script>

<template>
  <div>
    <ClientOnly>
      <DataCatalogueMap v-loading="loading" page-name="探测数据" :route-path="routePath">
        <template #header>
          <TopFilter :net-list="netList" :station-list="station" type="探测数据" @search="searchVal" @filter="filterVal" />
        </template>
        <template #left>
          <LeftDrawer
            :tree-data="treeData" :node-click="handleNodeClick" :prop="{
              children: 'children',
              label: 'lineName',
            }"
          />
        </template>
        <template #content>
          <LeafletMap
            ref="mapRef"
            v-loading="loading"
            :deformation="deformationLine"
            :list="station"
            show-marker-popup
            @lists="filterPlatList"
            @high-line="highLine"
          >
            <template #marker-popup>
              <div v-if="activeLine && activeLine.id">
                <PopupContent
                  :data="activeLine"
                  title="地震测深"
                />
              </div>
            </template>
          </LeafletMap>
        </template>
      </DataCatalogueMap>
    </ClientOnly>
  </div>
</template>

<style>

</style>
