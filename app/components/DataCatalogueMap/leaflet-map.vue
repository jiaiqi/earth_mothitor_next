<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet.markercluster'
import { tiledMapLayer } from '@supermap/iclient-leaflet'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'
import ChangeLayer from './change-layer.vue'
import bit from '~~/public/img/icon/bit.png'
import yy from '~~/public/img/icon/mini.png'
import blue from '~~/public/img/icon/zi.png'

const props = defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => {
      return []
    },
  },
  activeMaker: Object,
  deformation: {
    type: Array as PropType<any[]>,
    default: () => {
      return []
    },
  },
  stationspot: {
    type: Array as PropType<any[]>,
    default: () => {
      return []
    },
  },
  showMarkerPopup: {
    type: Boolean,
    default: false,
  },
  useLeafletPm: {
    type: Boolean,
    default: true,
  },
  activeLocation: Object as PropType<any>,
  popupMinWidth: Number,
  mapZoom: Number,
  maxZoom: Number,

})
const emit = defineEmits(['markerClick', 'update:activeMaker', 'lists', 'highLine'])
// const activeMaker = ref<any>()
const center = ref<[number, number]>([30.7, 104])
const zoom = ref(props.mapZoom || 4)
const map = ref(null) as any
const featureGroup = ref<any>()
const mapInstance = ref<any>()
const layerGroups = ref<any>()
const positionText = ref('')
const mapLayer = ref<any>()
const textLayer = ref<any>()
const showTextLayer = ref(true)
const lineData = ref<any[]>([])
const deformationList = ref<any[]>([])
const layerMap = {
  sl: ['http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/矢量底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/矢量中文注记_经纬度'],
  yx: ['http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/影像底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/影像中文注记_经纬度'],
  dx: ['http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/地形底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/地形中文注记_经纬度'],
}
enum LayerType {
  sl = 'sl',
  yx = 'yx',
  dx = 'dx',
}
const layerName = ref<LayerType>(LayerType.sl)
const tiandituMap = computed(() => layerMap[layerName.value][0])
const tiandituText = computed(() => layerMap[layerName.value][1])
function changeLayer(e: LayerType) {
  if (e === layerName.value && mapLayer.value?.remove)
    return
  layerName.value = e
  if (mapLayer.value?.remove) {
    mapLayer.value.remove()
  }
  if (textLayer.value?.remove) {
    textLayer.value.remove()
  }
  mapLayer.value = tiledMapLayer(tiandituMap.value)
  mapLayer.value.addTo(layerGroups.value)
  changeTextLayer()
}
function changeTextLayer() {
  if (textLayer.value?.remove) {
    textLayer.value.remove()
  }
  if (showTextLayer.value) {
    textLayer.value = tiledMapLayer(tiandituText.value)
    textLayer.value.addTo(layerGroups.value)
  }
}
watch(() => showTextLayer.value, () => {
  changeTextLayer()
})

function getIcon(url: string) {
  return L.icon({
    iconUrl: url,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [-3, -76],
  })
}
function onFeatureGroupReady() {
  layerGroups.value = featureGroup.value.leafletObject
  changeLayer(layerName.value)
}
const popupInstance = ref<any>()
function onPopupReady(event) {
  popupInstance.value = event
}
function onMapReady() {
  mapInstance.value = map.value.leafletObject
  mapInstance.value.on('zoomend', (e: any) => {
    zoom.value = e.target.getZoom()
  })
  if (props.useLeafletPm !== false) {
    // 绘制工具
    mapInstance.value.pm.addControls({
      position: 'topright',
      drawPolygon: false,
      drawMarker: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: true,
      drawCircle: true,
      editMode: false,
      dragMode: false,
      cutPolygon: true,
      removalMode: true,
    })
  }

  mapInstance.value.on('mousemove', (e: any) => {
    const { latlng } = e
    positionText.value = `当前鼠标位置：${latlng.lat.toFixed(3)},${latlng.lng.toFixed(3)}`
  })
}
function onMarkerClick(index: number, event: L.LeafletMouseEvent) {
  const data: any = props.list[index]
  if (data?.id) {
    data.latlng = [event.latlng.lat, event.latlng.lng]
  }
  if (data?.staLat && data?.staLon) {
    center.value = [data.staLat, data.staLon]
    mapInstance.value.setView(center.value, 7)
  }
  popupInstance.value.setLatLng(data.latlng).openOn(mapInstance.value)
  emit('update:activeMaker', data)
  emit('markerClick', { data, event, L })
}
const homeMarker = ref<any>()
function toHome() {
  const latlng: [number, number] = [35.560001, 100.000]
  center.value = latlng
  homeMarker.value = { lat: latlng[0], lon: latlng[1] }
  setTimeout(() => {
    homeMarker.value = null
  }, 500)
  zoom.value = 3
  mapInstance.value.setView(center.value, zoom.value)
}
function toLocation(data: any) {
  center.value = [data.lat, data.lon]
  mapInstance.value.setView(center.value, 6)
  popupInstance.value.setLatLng(center.value).openOn(mapInstance.value)
}
function toMarker(data) {
  if (!data?.latlng && data?.staLat && data?.staLon) {
    data.latlng = [data.staLat, data.staLon]
  }
  center.value = [data.staLat, data.staLon]
  mapInstance.value.setView(center.value, 7)
  popupInstance.value.setLatLng(data.latlng).openOn(mapInstance.value)
  emit('update:activeMaker', data)
  emit('markerClick', { data })
}
// 暴露toMarker方法
defineExpose({ toMarker, toLocation, toHome })

const iconMap = {
  red: getIcon(yy),
  blue: getIcon(bit),
}
const activeMarkerId = computed(() => props.activeMaker?.id)
const activeMarkerLatLng = computed(() => props.activeMaker?.latlng)
const popupOptions = ref({
  // offset: [0, 75],
  minWidth: props.popupMinWidth || 350,
})

const mc = ref<any>() // 保存markerCluster实例
watch(() => props.list, (newVal) => {
  let list: any[] = []
  if (newVal.length) {
    list = newVal.map((item, index) => {
      let icon: 'red' | 'blue' = 'blue'
      if (item.id && item.id === activeMarkerId.value) {
        icon = 'red'
      }
      return {
        _item_index: index,
        name: item.staName,
        lat: item.lat || item.staLat,
        lng: item.lon || item.staLon,
        options: {
          draggable: false,
          icon: iconMap[icon],
        },
      }
    })
  }
  if (mapInstance.value) {
    if (mc.value?.clearLayers) {
      mc.value.clearLayers()
    }
    const lMarkerCluster = useLMarkerCluster({
      leafletObject: mapInstance.value,
      markers: list,
    })
    lMarkerCluster.then(({ markerCluster, markers }) => {
      mc.value = markerCluster
      // markerCluster.on('clusterclick', (event) => {
      //   console.log('Cluster clicked')
      // })
      if (markers?.length) {
        markers.forEach((marker, index) => {
          marker.on('click', (event) => {
            onMarkerClick(index, event)
          })
        })
      }
    })
  }
})
watch(() => props.deformation, (newVal) => {
  lineData.value = []
  deformationList.value = []
  if (newVal) {
    deformationList.value = newVal
    if (newVal[0].beginLongitude && newVal[0].beginLatitude) { // 地震测深数据
      setLine()
    }
    else {
      setLine2()
    }
  }
})
// 画线-地震测深数据
function setLine() {
  if (deformationList.value.length) {
    deformationList.value.forEach((item) => {
      const startMark = [item.staLat, item.staLon]
      const endmark = [item.endLat, item.endLon]
      const latlngs = [startMark, endmark]
      lineData.value.push({
        ...item,
        latlngs,
        color: 'red',
      })
    })
  }
}
// 画线
function setLine2() {
  const line = deformationList.value[0]
  if (Array.isArray(line.latAndLon) && line.latAndLon.length >= 2) {
    const latlngs = line.latAndLon
    const data = {
      latlngs,
      color: 'red',
    }
    lineData.value.push(data)
  }
  // }
}
// 高亮线
const activeLine = ref<any>(null)
const lines = computed(() => {
  return lineData.value.map((item) => {
    if (item.id && item.id === activeLine.value) {
      return {
        ...item,
        color: 'blue',
      }
    }
    else {
      return item
    }
  })
})

function highLine(data, event) {
  activeLine.value = data.id
  if (data?.staLat && data?.staLon) {
    // const centerValue = calculateMidpoint(data.staLat, data.staLon, data.endLat, data.endLon)
    // center.value = [centerValue.latitude, centerValue.longitude]
    // center.value = [data.staLat, data.staLon]
    const { latlng } = event
    center.value = [latlng.lat, latlng.lng]
    mapInstance.value.setView(center.value, 7)
  }
  popupInstance.value.setLatLng(center.value).openOn(mapInstance.value)
  emit('highLine', data)
}
</script>

<template>
  <div class="h-full w-full">
    <LMap
      ref="map"
      :min-zoom="2"
      :max-zoom="props.maxZoom || 12"
      :crs="L.CRS.EPSG4326"
      :zoom="zoom"
      :center="center"
      :options="{
        attributionControl: false,
        zoomControl: false,
        preferCanvas: true,
      }"
      :use-global-leaflet="true"
      @ready="onMapReady"
    >
      <!-- <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    /> -->

      <LFeatureGroup ref="featureGroup" @ready="onFeatureGroupReady">
        <LPopup :options="popupOptions" :lat-lng="activeMarkerLatLng" @ready="onPopupReady">
          <slot name="marker-popup" />
        </LPopup>
        <LMarker v-if="activeMaker && activeMaker.latlng" :z-index-offset="999" :lat-lng="activeMarkerLatLng" :icon="getIcon(yy)" />
        <LMarker
          v-if="activeLocation && activeLocation.lat" :z-index-offset="9"
          :lat-lng="[activeLocation.lat, activeLocation.lon]"
        />
        <LMarker
          v-if="homeMarker && homeMarker.lat" :z-index-offset="9"
          :lat-lng="[homeMarker.lat, homeMarker.lon]"
        />
      </LFeatureGroup>
      <LControl position="bottomright">
        <ChangeLayer v-model:show-text-layer="showTextLayer" :layer-name="layerName" @change-base-layer="changeLayer" />
      </LControl>
      <LControlScale position="bottomleft" :imperial="true" :metric="true" />
      <LPolyline
        v-for="(item, index) in lines" :key="index"
        :lat-lngs="item.latlngs"
        :color="item.color || 'green'"
        @click="highLine(item, $event)"
      />
    </LMap>
    <div class="pos-absolute right-70px top-15px z-999">
      {{ positionText || '' }}
    </div>
  </div>
</template>

<style>

</style>
