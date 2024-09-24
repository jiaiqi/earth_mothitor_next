<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import { tiledMapLayer } from '@supermap/iclient-leaflet'
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'
import bit from '~~/public/img/icon/bit.png'
import yy from '~~/public/img/icon/mini.png'
import blue from '~~/public/img/icon/zi.png'

interface MapListItem {
  id?: string
  netId?: string
  staCode?: string
  lat?: number
  lon?: number
  staLat?: number
  staLon?: number
}

interface DeformationItem {
  latAndLon: [number, number][]
}

interface HighSpot {
  shockAddr?: string
  shockLevel?: string
  depth?: string
  shockDate?: string
  shockTime?: string
  staLat?: number
  staLon?: number
}

interface StationSpot {
  sta_name: string
  instrument: string
  sta_type: string
  data_mining: string
  staLat: number
  staLon: number
  lat: number
  lon: number
}

const props = defineProps<{
  list: MapListItem[]
  deformation?: DeformationItem[]
  highspot?: HighSpot | null
  stationspot?: StationSpot[]
}>()

const emit = defineEmits<{
  (event: 'maplist', item: MapListItem): void
  (event: 'stationDraw', item: StationSpot): void
  (event: 'lists', items: MapListItem[]): void
  (event: 'mapReady', mapInstance: any): void
}>()

const map = ref<L.Map | null>(null)
const loading = ref(true)
const drawer = ref(false)
const drawerTitle = ref('')
const tableData = ref<MapListItem[]>([])
const scale = ref(4)
const center = ref<[number, number]>([30.7, 104])
const layerGroups = ref<L.FeatureGroup | null>(null)
const lyr1 = ref<L.TileLayer | null>(null)
const lyr2 = ref<L.TileLayer | null>(null)
const mapUrl = ref<string | null>(null)
const drawing = ref(false)
const mapList = ref<any[]>([])
const mapShow = computed(() => 'sl')
const lwShow = computed(() => true)

watch(() => props.list, (newVal) => {
  if (!drawing.value) {
    handleListChange(newVal)
  }
})

watch(() => props.deformation, (newVal) => {
  if (newVal) {
    setLine(newVal)
  }
})

watch(() => props.highspot, (newVal) => {
  if (newVal) {
    highDraw(newVal)
  }
})

watch(() => props.stationspot, (newVal) => {
  stationDraw(newVal)
})

watch(mapShow, (newVal) => {
  changeBaseLayer(newVal)
})

watch(lwShow, (newVal) => {
  changeBaseLayer(mapShow.value)
})

onMounted(() => {
  initializeMap()
  loading.value = false
})
function handleListChange(newVal) {
  if (newVal.length > 0) {
    const arr = [...newVal]
    arr.forEach((item) => {
      if (item.lat && item.lon) {
        item.staLat = item.lat
        item.staLon = item.lon
      }
    })
    mapList.value = arr
    addDraw()
  }
  else {
    mapList.value = []
    addDraw()
  }
}
function initializeMap() {
  map.value = L.map('map', {
    crs: L.CRS.EPSG4326,
    center: center.value,
    maxZoom: 10,
    minZoom: 3,
    zoom: scale.value,
    attributionControl: false,
    zoomControl: false,
    preferCanvas: true,
  })
  emit('mapReady', map.value)
  layerGroups.value = new L.FeatureGroup()
  layerGroups.value.addTo(map.value)

  L.control.scale().addTo(map.value)
  map.value.on('zoomend', (e) => {
    scale.value = e.target.getZoom()
  })

  map.value.pm.addControls({
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

  map.value.on('mousemove', (e) => {
    const latlng = e.latlng
    document.getElementById('mouse-coordinates')!.innerHTML = `当前鼠标位置：${latlng.lat.toFixed(3)},${latlng.lng.toFixed(3)}`
  })
  changeBaseLayer('sl')
  rectangle()
}

function changeBaseLayer(e: string) {
  if (e === 'sl') {
    create2M('http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/矢量底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/矢量中文注记_经纬度')
  }
  else if (e === 'yx') {
    create2M('http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/影像底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/影像中文注记_经纬度')
  }
  else if (e === 'dx') {
    create2M('http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/地形底图_经纬度', 'http://www.earthquake.ac.cn/iserver/services/map-tianditu/rest/maps/地形中文注记_经纬度')
  }
}

function create2M(url1: string, url2: string) {
  if (lyr1.value) {
    lyr1.value.remove()
  }
  if (lyr2.value) {
    lyr2.value.remove()
  }

  if (lwShow.value) {
    lyr1.value = tiledMapLayer(url1)
    lyr2.value = tiledMapLayer(url2)
    lyr1.value.addTo(layerGroups.value!)
    lyr2.value.addTo(layerGroups.value!)
  }
  else {
    lyr1.value = tiledMapLayer(url1)
    lyr1.value.addTo(layerGroups.value!)
  }
}

function rectangle() {
  map.value!.on('pm:remove', (e) => {
    if (props.circle_group1) {
      props.circle_group1.clearLayers()
    }
    emit('lists', [])
  })

  map.value!.on('pm:drawstart', (e) => {
    if (props.circle_group1) {
      props.circle_group1.clearLayers()
    }
    emit('lists', [])
  })

  map.value!.on('pm:create', (e) => {
    if (e.shape === 'Rectangle') {
      const circles = []
      for (let i = 0; i < props.list.length; i++) {
        const item = props.list[i]
        if (item.staLat !== null && item.staLon !== null
          && item.staLat > e.layer._latlngs[0][0].lat
          && item.staLon > e.layer._latlngs[0][0].lng
          && item.staLat < e.layer._latlngs[0][2].lat
          && item.staLon < e.layer._latlngs[0][2].lng) {
          const circle = L.marker([item.staLat, item.staLon], {
            icon: getIcon(yy),
          }).on('click', () => {
            emit('maplist', item)
          })
          circles.push(circle)
        }
      }
      props.circle_group1 = new L.LayerGroup(circles).addTo(map.value!)
      emit('lists', circles)
    }
    else if (e.shape === 'Circle') {
      const circles = []
      for (let i = 0; i < props.list.length; i++) {
        const item = props.list[i]
        if (item.staLat !== null && item.staLon !== null
          && getDistance(item.staLat, item.staLon, e.layer._latlng.lat, e.layer._latlng.lng) * 1000 <= e.layer.options.radius) {
          const circle = L.marker([item.staLat, item.staLon], {
            icon: getIcon(yy),
          }).on('click', () => {
            emit('maplist', item)
          })
          circles.push(circle)
        }
      }
      props.circle_group1 = new L.LayerGroup(circles).addTo(map.value!)
      emit('lists', circles)
    }
  })
}

function getIcon(url: string) {
  return L.icon({
    iconUrl: url,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [-3, -76],
  })
}

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const earthRadius = 6371 // 球形地球的半径，单位km
  const radiansLat1 = lat1 * Math.PI / 180 // 将经纬度转换为弧度
  const radiansLat2 = lat2 * Math.PI / 180
  const radiansLng1 = lng1 * Math.PI / 180
  const radiansLng2 = lng2 * Math.PI / 180
  const deltaLat = radiansLat1 - radiansLat2 // 经度和纬度的差值
  const deltaLng = radiansLng1 - radiansLng2
  const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(radiansLat1) * Math.cos(radiansLat2) * Math.sin(deltaLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) // 计算球面距离
  const distance = earthRadius * c // 将距离转换为km
  return distance
}

function setLine() {
  if (props.line_group) {
    props.line_group.clearLayers()
  }
  const lines = []
  const line_map = {}
  for (let i = 0; i < props.deformation.length; i++) {
    const line = props.deformation[i]
    if (line.latAndLon.length >= 2) {
      const latlngs = line.latAndLon
      const polyline = L.polyline(latlngs, { color: 'red' }).on('click', () => {
        emit('maplist', line)
      })
      lines.push(polyline)
      line_map[i] = polyline
    }
  }
  props.line_group = new L.LayerGroup(lines).addTo(map.value!)
}

function addDraw() {
  if (props.circle_group) {
    props.circle_group.clearLayers()
  }

  const circles = []
  const circle_map = {}
  const myIcon = getIcon(bit)
  for (let j = 0; j < props.list.length; j++) {
    const item = props.list[j]
    if (item.staLat !== null && item.staLon !== null) {
      const circle = L.marker([item.staLat, item.staLon], { icon: myIcon }).on('click', (params) => {
        console.log(params)
        emit('maplist', item, L, params.latlng)
      })
      circles.push(circle)
      circle_map[j] = circle
    }
  }
  props.circle_group = new L.LayerGroup(circles).addTo(map.value!)
}

function highDraw() {
  if (props.circle_group1) {
    props.circle_group1.clearLayers()
  }
  const circles = []
  const myIcon = getIcon(yy)
  if (props.highspot.staLat !== null && props.highspot.staLon !== null) {
    const circle = L.marker([props.highspot.staLat, props.highspot.staLon], { icon: myIcon }).on('click', () => {
      emit('maplist', props.highspot)
    })
    circles.push(circle)
  }
  props.circle_group1 = new L.LayerGroup(circles).addTo(map.value!)
  map.value!.setView([props.highspot.staLat, props.highspot.staLon], 7)
}

function stationDraw() {
  if (props.circle_group2) {
    props.circle_group2.clearLayers()
  }
  const circles = []
  const myIcon = getIcon(blue)
  for (let j = 0; j < props.stationspot.length; j++) {
    const item = props.stationspot[j]
    if (item.staLat !== null && item.staLon !== null) {
      const circle = L.marker([item.staLat, item.staLon], { icon: myIcon }).on('click', () => {
        emit('stationDraw', item)
      })
      circles.push(circle)
    }
  }
  props.circle_group2 = new L.LayerGroup(circles).addTo(map.value!)
}
</script>

<template>
  <div class="map-box pos-relative overflow-hidden">
    <div id="map" v-loading="loading" style="width: 100%; height: 100%;" />
    <div id="mouse-coordinates" class="showLatLon" />
  </div>
</template>

<style scoped lang="scss">
.map-box {
  height: 100%;
  width: 100%;
}
</style>
