<!-- GNSS -->
<script lang="ts" setup>
import PopupContent from './popup-content.vue'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getPreitem, getWordList } from '~/api/precursor'
import { hotDataAdd } from '~/api/count'
import { getContinuousList, getContinuousNet, getFlowGnss, getFlowNet, getGnssList, gnssHeadSearch } from '~/api/gnss'
import { getCompanyList } from '~/api/seismometry'

definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: 'GNSS', path: '' }]
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
onMounted(() => {
  getHotList()
  if (sessionStorage.getItem('tips')) {
    tipText.value = sessionStorage.getItem('tips') as string
  }
  // 子站过滤省局数据
  if (sessionStorage.getItem('province') === '' || !sessionStorage.getItem('province')) {
    isChildProvince.value = false
    getNetList()
    handleNodeClick({ netCode: 'DZKXSYC', netName: '中国地震科学实验场', type: 'continue', unit_id: 3 })
  }
  else {
    isChildProvince.value = true
  }
})
function getNetList() {
  let list = []
  const datas = { unitId: 1 }
  getCompanyList(datas)
    .then((res) => {
      list = res.map((item) => {
        item.unitName = item.netName
        item.label = item.netName
        item.value = item.netName
        return item
      })
      netList.value = [...list]
    })
    .catch(() => {
    })
}
// 加载热点信息
function getHotList() {
  if (!sessionStorage.getItem('hotInfo')) {
    return
  }
  const name = JSON.parse(sessionStorage.getItem('hotInfo')).keyName
  if (name.split('-')[0] === 'GNSS') {
    const par = JSON.parse(sessionStorage.getItem('hotInfo')).postUrl
    setTimeout(() => {
      if (par.includes('roll')) {
        searchVal(JSON.parse(par))
      }
      else {
        filterVal(par)
      }
    }, 1200)
  }
}
function searchVal(val) {
  let datas = null
  if (val instanceof Object) {
    datas = { ...val }
  }
  else {
    datas = {
      siteName: val,
    }
  }
  gnssHeadSearch(datas).then((res) => {
    const list = res.map((item) => {
      item.staLat = item.latitude
      item.staLon = item.longitude
      item.pointName = item.roll
      item.cTime = item.buildTime
      item.type = 'new'
      return item
    })
    station.value = list
  }).catch((e) => {
    station.value = []
  })
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
  console.log(nowProvince)
  if (data.netName && data.netCode && data.netName.length < 4) {
    nowProvince.value = data.netName
  }
  highspot.value = null
  deformation.value = []
  station.value = []
  if (data.unit_id && data.type === 'flow') {
    let id = data.unit_id
    if (netId.value) {
      id = netId
    }
    getFlowGnss(
      { net_id: id }, //  f_unit_id: data.f_unit_id,
    ).then((res) => {
      const list = res.map((item) => {
        item.type = data.type
        item.staLat = item.lat
        item.staLon = item.lon
        return item
      })
      if (list.length === 0) {
        ElMessage.error('数据为空')
        return
      }
      station.value = list
    })
  }
  else if (data.unit_id && data.type === 'continue') {
    // id.unit_id = data.c_unit_id
    let id = data.unit_id
    if (netId.value) {
      id = netId
    }
    getContinuousList(
      { net_id: id }, //  c_unit_id: data.c_unit_id,
    ).then((res) => {
      const list = res.map((item) => {
        item.type = data.type
        item.staLat = item.lat
        item.staLon = item.lon
        return item
      })
      if (list.length === 0) {
        ElMessage.error('数据为空')
        return
      }
      station.value = list
    })
    // }
  }
  else if (data.netName && data.type === 'continue') {
    const par = {
      roll: nowProvince,
    }
    getGnssList(par).then((res) => {
      const list = res.map((item) => {
        item.staLat = item.latitude
        item.staLon = item.longitude
        item.pointName = item.roll
        item.cTime = item.buildTime
        item.type = 'new'
        return item
      })
      station.value = list
      if (list.length === 0) {
        ElMessage.error('数据为空')
      }
    })
  }
}
// 获取前两层数据
function loadNode(node, resolve) {
  if (node.level === 0) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (isChildProvince.value) {
        return resolve([
          {
            netName: '省级站网',
          },
        ])
      }
      else {
        return resolve([
          {
            netName: '国家站网',
          },
          // 注释是为了屏蔽左侧省级站网等
          /*  {
                netName: '省级站网'
              },
              {
                netName: '其他站网'
              } */
        ])
      }
    }, 100)
  }
  else if (node.level === 1) {
    const arr = []
    if (node.data.netName === '省级站网') {
      let list = []
      const datas = { unitId: 1 }
      getCompanyList(datas)
        .then((res) => {
          list = res.map((item) => {
            item.unitName = item.netName
            return item
          })
          netList.value = [...list]
          // 省级子站
          if (isChildProvince.value) {
            list.map((i) => {
              if (sessionStorage.getItem('province')?.indexOf(i.unitName) !== -1) {
                i.unitName = i.netName
                list = [i]
              }
            })
          }
          return resolve(list)
        })
        .catch(() => {
          resolve({})
        })
    }
    else {
      return resolve([
        {
          netName: '连续观测',
        },
        {
          netName: '流动观测',
        },
      ])
    }
  }
  else if (node.level === 2) {
    if (node.data.netCode) {
      netId.value = node.data.id
      return resolve([
        {
          netName: '连续观测',
        },
        {
          netName: '流动观测',
        },
      ])
    }
    if (node.label === '连续观测') {
      const data = {}
      netId.value = null
      getContinuousNet(data).then((res) => {
        const list = res
        const data = []

        for (let i = 0; i < list.length; i++) {
          const arr = {
            netName: list[i].netName,
            unit_id: list[i].id,
            // c_unit_id: node.data.unit_id,
            netCode: list[i].netCode,
            type: 'continue',
            leaf: true,
          }
          data.push(arr)
        }
        const arr2 = {
          netName: '连续观测目录',
          // unit_id: bench[i].id,
          // c_unit_id: node.data.unit_id,
          // netCode: bench[i].netCode,
          type: 'continue',
          leaf: true,
        }
        data.push(arr2)
        resolve(data)
      })
    }
    else if (node.label === '流动观测') {
      const data = {}
      netId.value = null
      getFlowNet(data).then((res) => {
        const bench = res

        const data = []
        for (let i = 0; i < bench.length; i++) {
          const arr = {
            netName: bench[i].netName,
            unit_id: bench[i].id,
            // f_unit_id: node.data.unit_id,
            netCode: bench[i].netCode,
            type: 'flow',
            leaf: true,
          }
          if (arr.netName !== 'XXX台网') {
            data.push(arr)
          }
        }
        resolve(data)
      })
    }
  }
  else if (node.level > 2) {
    if (node.label === '连续观测') {
      const data = {}
      getContinuousNet(data).then((res) => {
        const list = res
        const bench = list
        const data = []

        for (let i = 0; i < bench.length; i++) {
          const arr = {
            netName: bench[i].netName,
            unit_id: bench[i].id,
            // c_unit_id: node.data.unit_id,
            netCode: bench[i].netCode,
            type: 'continue',
            leaf: true,
          }
          data.push(arr)
        }
        const arr2 = {
          netName: '连续观测目录',
          // unit_id: bench[i].id,
          // c_unit_id: node.data.unit_id,
          // netCode: bench[i].netCode,
          type: 'continue',
          leaf: true,
        }
        data.push(arr2)
        resolve(data)
      })
    }
    else if (node.label === '流动观测') {
      const data = {}
      getFlowNet(data).then((res) => {
        const bench = res
        const data = []
        for (let i = 0; i < bench.length; i++) {
          const arr = {
            netName: bench[i].netName,
            unit_id: bench[i].id,
            // f_unit_id: node.data.unit_id,
            netCode: bench[i].netCode,
            type: 'flow',
            leaf: true,
          }
          if (arr.netName !== 'XXX台网') {
            data.push(arr)
          }
        }
        resolve(data)
      })
    }
  }
}

const dayjs = useDayjs()
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
  if (val.type != 'new') {
    dratitle.value = 'GNSS连续观测站点信息'
    val.cTime = dayjs(val.cTime).format('YYYY-MM-DD HH:mm:ss').slice(0, 4)
    markshow = true
    getCataList(val)
  }
  else {
    staId = val.id
    dratitle.value = 'GNSS台站信息'
    drawerTitle.value = `${val.roll}台站`
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <DataCatalogueMap v-loading="loading" page-name="GNSS" :route-path="routePath">
        <template #header>
          <TopFilter :net-list="netList" :station-list="station" type="GNSS" @search="searchVal" @filter="filterVal" />
        </template>
        <template #left>
          <LeftDrawer
            :load-node="loadNode" :node-click="handleNodeClick" :prop="{
              label: 'netName',
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
              <div v-if="marker && marker.id">
                <PopupContent
                  :marke-arr="marker"
                  :title="dratitle"
                  :data-length="unitList.length"
                  :begin-time="drawertitle.time"
                  :days="drawertitle.num"
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
