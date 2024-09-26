<!-- 活断层探测 -->
<script lang="ts" setup>
import PopupContent from './popup-content.vue'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { hotDataAdd } from '~/api/count'
import { drillList, getPointDrillList, manpowerList, manpowerPointList } from '~/api/probedata'

definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '震防数据', path: '' }]
const router = useRouter()
const mapRef = ref<any>(null)
const station = ref([])
const loading = ref(false)
const marker = ref<any>(null)
const highspot = ref<any>(null)
const tipText = ref('')
const typeName = ref('')
const title = ref('')
const deformationLine = ref<any[]>([])
const deformationLine2 = ref<any[]>([])
const platName = ref<any>()

const runtimeConfig = useRuntimeConfig()
const comTreeList = [
  {
    name: '活动断层(1:250万)',
    url: `${runtimeConfig.public.apiBase}:9540` + '/iserver/services/map-fifth_workspace/rest/maps/全国断裂活动性配L%40fifth_data',
  },
  {
    name: '活动断层(1:25万)',
    url: '',
    children: [
      {
        name: '安徽省',
        url: `${runtimeConfig.public.apiBase}:9540` + '/iserver/services/map-zhenfang25/rest/maps/安徽省1：25万地震构造图%40zhenfang25',
      },
      {
        name: '陕西省',
        url: `${runtimeConfig.public.apiBase}:9540` + '/iserver/services/map-zhenfang25/rest/maps/陕西活断层分布%40zhenfang25',
      },
    ],
  },
  {
    name: '活动断层(1:5万)',
    url: `${runtimeConfig.public.apiBase}:9540` + '/iserver/services/map-zhenfang5/rest/maps/地质所1：5万活动断层填图%40zhenfang5',
  },
  {
    name: '钻孔联合剖面',
  },
  {
    name: '人工地震勘探',
  },
]
onMounted(() => {
  if (sessionStorage.getItem('tips')) {
    tipText.value = sessionStorage.getItem('tips') as string
  }
})
function handleNodeClick(data) {
  debugger
  if (['钻孔联合剖面', '人工地震勘探'].includes(data.name)) {
    typeName.value = data.name
    title.value = data.name
    handleNodeClick2(data)
    return
  }
  if (typeName.value !== '') {
    router.go(0)
  }
  typeName.value = ''
  title.value = '活动断层'

  const form = {
    keyName: '活动断层数据集',
    url: '/prevention/catalogue',
    linkUnit: tipText,
  }
  hotDataAdd(form)
}

// // 查询图层信息
// function mapService(url) {
//   // let layer = null
//   const getLayerInfoService = new LayerInfoService(url)
//   getLayerInfoService.getLayersInfo((ser) => {
//     const result = ser.result
//     // layer = result
//     childLayers = result.subLayers.layers
//     bounds = childLayers[0].bounds

//     // map.fitBounds([
//     //   [bounds.top, bounds.left],
//     //   [bounds.bottom, bounds.right]
//     // ])
//     // let innerHTML = ''
//     // result.subLayers.layers.map((layer) => {
//     //   return (innerHTML += layer.name + '<br>')
//     // })
//   })
//   service(url)
//   const polygon = L.polygon([[15, 70], [15, 136], [55, 136], [55, 70]])
//   const boundsParam = new QueryByBoundsParameters({
//     queryParams: { name: '全国断裂活动性配L@fifth_data#1' },
//     bounds: polygon.getBounds(),
//   })
//   // let currentmap = map;
//   const self = this
//   queryService(url).queryByBounds(boundsParam, (serviceResult) => {
//     const result = serviceResult.result
//     const resMap = result.recordsets[0].features
//     L.geoJSON(resMap, {
//       style(feature) {
//         return {
//           opacity: 0,
//         }
//       },
//       onEachFeature(feature, layer) {
//         layer.bindPopup(`断层名称：${feature.properties.FaultName}`)
//         layer.on({
//           click: (e) => {
//             self.markshow = true
//             self.marke = feature.properties
//           },
//         })
//       },
//     }).addTo(self.map)
//   })
//   // console.log(resultLayer)
// }
// function service(url) {
//   const mapservice = new MapService(url)
//   // 地图信息
//   mapservice.getMapInfo((callback) => {
//     const result = callback.result
//     let innerHTML
//             = `地图名` + `：${JSON.stringify(result.name, null, 2)}<br>`
//     innerHTML
//             += `中心点` + `:${JSON.stringify(result.center, null, 2)}<br>`
//     innerHTML += `Bounds:${JSON.stringify(result.bounds, null, 2)}<br>`
//   })
// }
// 过滤
function filterNode(value, data) {
  if (!value)
    return true
  return data.name.includes(value)
}
// 获取地图数据
function handleNodeClick2(data) {
  if (data.name === '钻孔联合剖面') {
    const data = {}
    manpowerList(data).then((res) => {
      const list = res
      let pointList: any[] = []
      if (list.length) {
        list.forEach((item: any) => {
          pointList = pointList.concat(item.childPoints.map(i => [i.lon, i.lat]))
        })
      }

      deformationLine.value = list
      deformationLine2.value = [{ latAndLon: pointList }]
      loading.value = false
    }).catch(() => {
      ElMessage.error('请先登录')
    })
    // const form = {
    //   keyName: '钻孔联合剖面数据集',
    //   url: '/prevention/catalogue?type=0',
    // }
    // hotDataAdd(encode(form)).then()
  }
  else {
    const data = {}
    drillList(data).then((res) => {
      const list = res
      let pointList: any[] = []
      if (list.length) {
        list.forEach((item: any) => {
          pointList = pointList.concat(item.childPoints.map(i => [i.lat, i.lon]))
        })
      }
      deformationLine.value = list
      deformationLine2.value = [{ latAndLon: pointList }]
      loading.value = false
    }).catch(() => {
      ElMessage.error('请先登录')
    })
    // const form = {
    //   keyName: '人工地震勘探数据集',
    //   url: '/prevention/catalogue?type=0',
    // }
    // hotDataAdd(encode(form)).then()
  }
}

// 地图标记点点击
function markerClick(params) {
  const { data: val } = params
  marker.value = val
  station.value = val.childPoint
  highspot.value = val
  title.value = typeName.value
  getCataList()
}

// 获取数据详情
function getCataList() {
  const data = {
    line_id: marker.value.id,
    // line_id: 14
  }
  if (title.value === '人工地震勘探') {
    getPointDrillList(data).then((res) => {
      const list = [...res.records]
      const dot = list.map(item => [item.lat, item.lon])
      const arr = [{
        latAndLon: [...dot],
      }]
      deformationLine2.value = arr
    })
  }
  else {
    // 连续站
    manpowerPointList(data).then((res) => {
      const list = [...res.records]
      if (list.length === 0) {
        ElMessage.error('暂无点数据')
        return
      }
      const dot = list.map(item => [item.lat, item.lon])
      const arr = [{
        latAndLon: [...dot],
      }]
      deformationLine2.value = arr
      // deformation = list
      // platName = [{
      //   collectDataDate: deformation[0].date,
      //   lineName: deformation[0].description
      // }]
      // drawer = true
    })
  }
}
function filterPlatList(val) {
  platName.value = val
}
</script>

<template>
  <div>
    <ClientOnly>
      <DataCatalogueMap v-loading="loading" page-name="GNSS" :route-path="routePath">
        <!-- <template #header>
          <TopFilter :net-list="netList" :station-list="station" type="GNSS" @search="searchVal" @filter="filterVal" />
        </template> -->
        <template #left>
          <LeftDrawer
            :tree-data="comTreeList" :node-click="handleNodeClick" :filter-node-method="filterNode" :prop="{
              label: 'name',
            }"
          />
        </template>
        <template #content>
          <LeafletMap
            ref="mapRef"
            v-loading="loading"
            :list="station"
            :deformation="deformationLine2"
            :highspot="highspot"
            @marker-click="markerClick"
            @lists="filterPlatList"
          >
            <template #marker-popup>
              <div v-if="marker && marker.id">
                <PopupContent
                  :marke-arr="marker"
                  :title="title"
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
