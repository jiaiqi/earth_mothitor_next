<!-- 地下流体 -->
<script lang="ts" setup>
import PopupContent from './popup-content.vue'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getPreitem, getWordList } from '~/api/precursor'
import { hotDataAdd } from '~/api/count'

definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '地下流体', path: '' }]
const mapRef = ref<any>(null)
const station = ref([])
const treeList = ref([])
const yearList = ref([])
const loading = ref(false)
const stationName = ref('')
const staId = ref<any>(null)
const drawertitle = ref('')
const drawerTitle = ref('')
const marker = ref<any>(null)
const highspot = ref<any>(null)
const showInfo = ref<any>(null)
const markshow = ref<any>(null)
const tipText = ref('')
const isChildProvince = ref(false)
const provinces = ref([])
const thisProvince = ref('')
const restmap = {
  url: '/map-tianditu/rest/maps/地形底图_经纬度',
  urlLon: '/map-tianditu/rest/maps/地形中文注记_经纬度',
}
onMounted(() => {
  getHotList()
  if (sessionStorage.getItem('tips')) {
    tipText.value = sessionStorage.getItem('tips')
  }
  // 子站过滤省局数据
  if (sessionStorage.getItem('province') === '' || !sessionStorage.getItem('province')) {
    isChildProvince.value = false
    handleNodeClick({ itemName: '国家站网' })
  }
  else {
    isChildProvince.value = true
    provinces.value.map((item) => {
      if (sessionStorage.getItem('province').includes(item.netName)) {
        thisProvince.value = item.netCode
        handleNodeClick({
          id: 13,
          item: 411,
          itemName: '水位',
          keyname: '地下流体',
          leaf: true,
        })
      }
    })
  }
})
// 加载热点信息
function getHotList() {
  if (!sessionStorage.getItem('hotInfo')) {
    return
  }
  const name = JSON.parse(sessionStorage.getItem('hotInfo')).keyName
  if (name.split('-')[0] == '地下流体') {
    const id = JSON.parse(sessionStorage.getItem('hotInfo')).postUrl
    setTimeout(() => {
      filterVal(id)
    }, 1800)
  }
}

function filterVal(id) {
  let info = {}
  // 判断是选择还是输入
  if (id != '' && isNaN(Number.parseInt(id))) {
    station.value.map((item) => {
      if (item.stationName.includes(id)) {
        info = item
      }
    })
    if (JSON.stringify(info) == '{}') {
      return
    }
  }
  else {
    station.value.map((item) => {
      if (item.stationCode == id) {
        info = item
      }
    })
  }
  if (id === '') {
    return
  }
  if (mapRef.value?.toMarker) {
    mapRef.value.toMarker(info)
  }
  // markerClick({ data: info })
}
function searchStation() {

}
function handleNodeClick(data) {
  console.log(data)
  highspot.value = null
  markshow.value = false
  station.value = []
  if (data.netName) {
    // this.thisProvince = data.id
  }
  else if (data.itemName === '国家站网') {
    getWordList({}).then((res) => {
      const list = res.map((item) => {
        item.staLat = item.latitude
        item.staLon = item.longitude
        return item
      })
      station.value = list
      if (list.length === 0) {
        ElMessage.error('台站数为空')
      }
    })
  }
  else if (data.keyname) {
    if (data.keyname) {
      // this.stationName = data.netName
      getWordList({ networkCode: thisProvince.value }).then(
        (res) => {
          const list = res.map((item) => {
            item.staLat = item.latitude
            item.staLon = item.longitude
            return item
          })
          station.value = list
          if (list.length === 0) {
            ElMessage.error('台站数为空')
          }
        },
      )
    }
  }
}
// 获取前两层数据
function loadNode(node, resolve) {
  if (node.level === 0) {
    const list = [
      {
        itemName: '国家站网',
      },
      // 注释是为了屏蔽省级站网、市县站网
      /*  {
              itemName: '省级站网'
            },
            {
              itemName: '市县站网'
            },
            {
              itemName: '其他站网',
              leaf: true
            } */
    ]
    return resolve(list)
    // })
  }
  else if (node.level === 1) {
    if (node.data.itemName === '国家站网') {
      const arr = { keyname: '地下流体' }
      getPreitem(arr).then((res) => {
        const list = res.map((item) => {
          item.leaf = true
          return item
        })
        return resolve(list)
      })
    }
    else {
      provinces.value.forEach((key) => {
        key.itemName = key.netName
      })
      return resolve(provinces)
    }
  }
  else if (node.level === 2) {
    // console.log(node)
    thisProvince.value = node.data.netCode
    if (node.data.netName) {
      const arr = { keyname: '地下流体' }
      getPreitem(arr).then((res) => {
        const list = res.map((item) => {
          item.leaf = true
          return item
        })
        return resolve(list)
      })
    }
  }
}
// 地图标记点点击
function markerClick(params) {
  const { data } = params
  marker.value = data
  const val = data
  const form = {
    keyName: `地下流体-${val.stationName}台站数据集`,
    url: '/precursor/fluid',
    linkUnit: tipText,
    postUrl: val.stationName,
  }
  hotDataAdd(form)
}
</script>

<template>
  <div>
    <ClientOnly>
      <DataCatalogueMap v-loading="loading" page-name="地下流体" :route-path="routePath">
        <template #header>
          <TopFilter :net-list="yearList" type="流体" :pointer-list="station" @filter="filterVal" />
        </template>
        <template #left>
          <LeftDrawer
            :load-node="loadNode" :node-click="handleNodeClick" :prop="{
              label: 'itemName',
              children: 'zones',
              isLeaf: 'leaf',
            }"
          />
        </template>
        <template #content>
          <LeafletMap
            ref="mapRef"
            v-model:active-marker="marker" v-loading="loading"
            :restmap="restmap"
            :list="station"
            show-marker-popup
            @marker-click="markerClick"
          >
            <template #marker-popup>
              <div v-if="marker && marker.id">
                <PopupContent
                  :marke-arr="marker"
                  title="流体"
                  :data-length="0"
                  :station-name="stationName"
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
