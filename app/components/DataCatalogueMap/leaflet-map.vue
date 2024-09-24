<script lang="ts" setup>
import L from 'leaflet'
import { tiledMapLayer } from '@supermap/iclient-leaflet'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'
import ChangeLayer from './change-layer.vue'
import bit from '~~/public/img/icon/bit.png'
import yy from '~~/public/img/icon/mini.png'
import blue from '~~/public/img/icon/zi.png'

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
function onFeatureGroupReady() {
  layerGroups.value = featureGroup.value.leafletObject
  changeLayer('sl')
}
function onMapReady() {
  mapInstance.value = map.value.leafletObject
  mapInstance.value.on('zoomend', (e) => {
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
const layerMap = {
  sl: ['http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/矢量底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/矢量中文注记_经纬度'],
  yx: ['http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/影像底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/影像中文注记_经纬度'],
  dx: ['http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/地形底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/地形中文注记_经纬度'],
}
const layerName = ref('sl')
const tiandituMap = computed(() => layerMap[layerName.value][0])
const tiandituText = computed(() => layerMap[layerName.value][1])
function changeLayer(e: string) {
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
onMounted(() => {
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
      @ready="onMapReady"
    >
      <!-- <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    /> -->
      <LFeatureGroup ref="featureGroup" @ready="onFeatureGroupReady" />
      <LControl position="bottomright">
        <ChangeLayer v-model:show-text-layer="showTextLayer" :layer-name="layerName" @change-base-layer="changeLayer" />
      </LControl>
      <LControlScale position="bottomleft" :imperial="true" :metric="true" />
      <!-- <LControlZoom position="bottomright" /> -->
    </LMap>
    <div class="pos-absolute right-70px top-15px z-999">
      {{ positionText || '' }}
    </div>
  </div>
</template>

<style>

</style>
