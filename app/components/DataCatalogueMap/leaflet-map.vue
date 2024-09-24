<script lang="ts" setup>
import L from 'leaflet'
import { tiledMapLayer } from '@supermap/iclient-leaflet'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'
import ChangeLayer from './change-layer.vue'
import bit from '~~/public/img/icon/bit.png'
import yy from '~~/public/img/icon/mini.png'
import blue from '~~/public/img/icon/zi.png'

const props = defineProps({
  list: Array,
  activeMaker: Object,
})
const emit = defineEmits(['markerClick', 'update:activeMaker'])
// const activeMaker = ref<any>()
const center = ref<[number, number]>([30.7, 104])
const zoom = ref(4)
const map = ref<any>()
const featureGroup = ref<any>()
const mapInstance = ref<any>()
const layerGroups = ref<any>()
const positionText = ref('')
const mapLayer = ref<any>()
const textLayer = ref<any>()
const showTextLayer = ref(true)

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

function highDraw(data) {
  // 高亮点击的点
  // activeMaker.value = data
  if (data?.staLat && data?.staLon) {
    center.value = [data.staLat, data.staLon]
    mapInstance.value.setView(center.value, 7)
  }
  emit('update:activeMaker', data)
}

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
function onMapReady() {
  mapInstance.value = map.value.leafletObject
  mapInstance.value.on('zoomend', (e: any) => {
    zoom.value = e.target.getZoom()
  })
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
  mapInstance.value.on('mousemove', (e: any) => {
    const { latlng } = e
    positionText.value = `当前鼠标位置：${latlng.lat.toFixed(3)},${latlng.lng.toFixed(3)}`
  })
}
function onMarkerClick(data: any, event: L.LeafletMouseEvent) {
  const content = `${data.staName}`
  highDraw(data)
  L.popup({ minWidth: 350 })
    .setLatLng([data.latlng[0], data.latlng[1]])
    .setContent(content)
    .openOn(mapInstance.value)
  emit('markerClick', { data, event, L })
}
const pointList = computed<any[]>(() => {
  if (props.list?.length) {
    return props.list.map((item: any) => {
      // let icon = bit
      // if (item.id && item.id === activeMaker.value?.id) {
      //   icon = yy
      // }
      return {
        ...item,
        markerIcon: getIcon(bit),
        latlng: [item.staLat, item.staLon],
      }
    })
  }
  else {
    return []
  }
})
</script>

<template>
  <div class="h-full w-full">
    <LMap
      ref="map"
      :min-zoom="3"
      :max-zoom="10"
      :crs="L.CRS.EPSG4326"
      :zoom="zoom"
      :center="center"
      :options="{
        attributionControl: false,
        zoomControl: false,
        preferCanvas: true,
      }"
      use-global-leaflet
      @ready="onMapReady"
    >
      <!-- <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    /> -->
      <LFeatureGroup ref="featureGroup" @ready="onFeatureGroupReady">
        <LMarker v-if="activeMaker && activeMaker.latlng" :lat-lng="activeMaker.latlng" :icon="getIcon(yy)" />
        <LMarker v-for="(item, index) in pointList" v-show="!activeMaker || item.id !== activeMaker.id" :key="index" :lat-lng="item.latlng" :icon="item.markerIcon" @click="onMarkerClick(item, $event)" />
      </LFeatureGroup>
      <LControl position="bottomright">
        <ChangeLayer v-model:show-text-layer="showTextLayer" :layer-name="layerName" @change-base-layer="changeLayer" />
      </LControl>
      <LControlScale position="bottomleft" :imperial="true" :metric="true" />
      <!-- <LControlZoom position="bottomright" /> -->
    </LMap>
    <div class="pos-absolute right-70px top-15px z-999">
      {{ positionText || '' }}
    </div>
    <!-- <LLayerGroup v-if="mapInstance">
      <div>
        <LMarker v-for="(item, index) in pointList" :key="index" :lat-lng="item" :icon="getIcon(bit)" />
      </div>
    </LLayerGroup> -->
  </div>
</template>

<style>

</style>
