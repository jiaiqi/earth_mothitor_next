<!-- 定点形变 -->
<script lang="ts" setup>
import PopupContent from './popup-content.vue'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getPreitem, getPrestationList, getWordList } from '~/api/precursor'
import { hotDataAdd } from '~/api/count'

definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '定点形变', path: '' }]
const route = useRoute()
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
const deformation = ref<any>([])
const navName = ref('')

onMounted(() => {
  getHotList()
  if (sessionStorage.getItem('tips')) {
    tipText.value = sessionStorage.getItem('tips') as string
  }
  // 子站过滤省局数据
  if (sessionStorage.getItem('province') == '' || !sessionStorage.getItem('province')) {
    isChildProvince.value = false
    let par = {}
    if (route.query.type == 1) {
      navName.value = '定点形变'
      par = { item: 221 }
    }
    else {
      navName.value = '倾斜站网'
      par = { item: 231 }
    }
    // 加载页面初始渲染点
    getPrestationList(par).then(
      (res) => {
        const list = res.map((item) => {
          item.staLat = item.sta_lat
          item.staLon = item.sta_lon
          return item
        })
        station.value = list
        if (list.length === 0) {
          ElMessage.error('台站数为空')
        }
      },
    )
  }
  else {
    isChildProvince.value = true
    provinces.value.map((item) => {
      if (sessionStorage.getItem('province').includes(item.netName)) {
        provinces.value = [item]
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
  if (name.split('-')[0] === '定点形变') {
    const id = JSON.parse(sessionStorage.getItem('hotInfo')).postUrl
    setTimeout(() => {
      filterVal(id)
    }, 1200)
  }
}

function filterVal(id) {
  const info = station.value.find(item => item.sta_code == id)

  if (info && mapRef.value?.toMarker) {
    mapRef.value.toMarker(info)
  }
  // markerClick({ data: info })
}
function searchStation() {

}
function handleNodeClick(data) {
  markshow.value = false
  highspot.value = null
  station.value = []
  if (data.netName) {
    thisProvince.value = data.id
  }
  if (thisProvince.value !== '' && data.keyname) {
    stationName.value = data.netName
    getPrestationList({ item: data.item, netId: thisProvince }).then(
      (res) => {
        const list = res.map((item) => {
          item.staLat = item.sta_lat
          item.staLon = item.sta_lon
          return item
        })
        station.value = list
        if (list.length === 0) {
          ElMessage.error('台站数为空')
        }
      },
    )
  }
  else if (data.itemName === '国家站网') {
    getWordList({}).then((res) => {
      let list = res.map((item) => {
        item.staLat = item.sta_lat
        item.staLon = item.sta_lon
        return item
      })
      const a = /^2[2,3]\.*/
      list = list.filter(item => a.test(item.u_item) === true)
      station.value = list
      if (list.length === 0) {
        ElMessage.error('台站数为空')
      }
    })
  }
}
// 获取前两层数据
function loadNode(node, resolve) {
  marker.value = null
  if (node.level === 0) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (isChildProvince.value) {
        return resolve([
          {
            itemName: '省级站网',
          },
          {
            itemName: '跨断层形变',
          },
        ])
      }
      else {
        return resolve([
          {
            itemName: '国家站网',
            leaf: true,
          },
          // 注释是为了屏蔽左侧省级站网等
          /*  {
              itemName: '省级站网'
            },
            {
              itemName: '市县站网'
            },
            {
              itemName: '其他站网'
            }, */
          {
            itemName: '跨断层形变',
          },
        ])
      }
    }, 100)
  }
  else if (node.level === 1) {
    if (node.data.itemName === '跨断层形变') {
      const list = [
        {
          itemName: '定点水准',
          leaf: true,
        },
        {
          itemName: '定点基线',
          leaf: true,
        },
        {
          itemName: '场地水准',
          leaf: true,
        },
        {
          itemName: '场地基线',
          leaf: true,
        },
        {
          itemName: '场地测距',
          leaf: true,
        },
        {
          itemName: '蠕变仪观测',
          leaf: true,
        },
      ]
      return resolve(list)
    }
    else {
      provinces.value = provinces.value.map((key) => {
        key.itemName = key.netName
        return key
      })
      return resolve(provinces)
      // let item1 = { item: node.data.item }
      // getPrecursorList(encode(item1)).then((res) => {
      //   let list = decode(res)
      //   console.log(list)
      //   list.forEach((key) => {
      //     key.item = item1.item
      //     key.itemName = key.netName
      //     key.leaf = true
      //   })
      //   return resolve(list)
      // })
    }
  }
  else if (node.level === 2) {
    const item1 = { item: node.data.item }
    const arr = [
      {
        itemName: '倾斜',
      },
      {
        itemName: '应变',
      },
    ]
    // console.log(node.data)
    return resolve(arr)
  }
  else if (node.level === 3) {
    const arr = { keyname: node.data.itemName }
    getPreitem(arr).then((res) => {
      const list = res.map((item) => {
        item.leaf = true
        return item
      })
      return resolve(list)
    })
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
      <DataCatalogueMap v-loading="loading" page-name="定点形变" :route-path="routePath">
        <template #header>
          <TopFilter type="定点形变" :pointer-list="station" @filter="filterVal" />
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
            :list="station"
            show-marker-popup
            @marker-click="markerClick"
          >
            <template #marker-popup>
              <div v-if="marker && (marker.id || marker.latlng)">
                <PopupContent
                  :marke-arr="marker"
                  title="定点形变"
                  :data-length="deformation.length"
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
