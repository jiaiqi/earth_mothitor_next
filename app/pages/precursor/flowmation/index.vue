<!-- 水准 -->
<script lang="ts" setup>
import PopupContent from './popup-content.vue'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getPreitem, getWordList } from '~/api/precursor'
import { hotDataAdd } from '~/api/count'
import { getContinuousList, getContinuousNet, getFlowGnss, getFlowNet, getGnssList, gnssHeadSearch } from '~/api/gnss'
import { getCUnit, getCompany, getCompanyList, getUnit, getYList } from '~/api/deformation'

definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '水准测网', path: '' }]
const mapRef = ref<any>(null)
const station = ref([])
const dratitle = ref('')
const drawerTitle = ref('')
const yearList = ref([])
const loading = ref(false)
const marker = ref<any>(null)
const highspot = ref<any>(null)
const tipText = ref('')
const deformation = ref<any[]>([])
const deformation1 = ref<any[]>([])
const netList = ref<any[]>([])
const unitName = ref('')
const search = ref('')
const dayjs = useDayjs()

onMounted(() => {
  getYearList()
  getHotList()
  handleNodeClick({ type: 'year', netName: '全部' })
  if (sessionStorage.getItem('tips')) {
    tipText.value = sessionStorage.getItem('tips') as string
  }
})
function getYearList() {
  getCompany({}).then((res) => {
    const list = res
    list.forEach((item, index) => {
      for (let i = 0; i < list.length - index; i++) {
        if (list[i] < list[i + 1]) {
          const temp = list[i]
          list[i] = list[i + 1]
          list[i + 1] = temp
        }
      }
    })
    list.forEach((item) => {
      yearList.value.push(
        {
          value: item,
          label: item,
        },
      )
    })
  })
}
// 加载热点信息
function getHotList() {
  if (!sessionStorage.getItem('hotInfo')) {
    return
  }
  const name = JSON.parse(sessionStorage.getItem('hotInfo')).keyName
  if (name.split('-')[0] == '水准数据') {
    const id = JSON.parse(sessionStorage.getItem('hotInfo')).postUrl
    setTimeout(() => {
      filterYear({ lineName: id })
    }, 1200)
  }
}
function filterYear(data) {
  let data2 = {
    year: data,
  }
  if (data.lineName) {
    data2 = {
      lineName: data.lineName,
    }
  }
  getYList(data2).then((res) => {
    const list = res.map((item) => {
      item.time = dayjs(item.time).format('YYYY-MM-DD')
      return item
    })
    deformation.value = list
    deformation1.value = list
  })
}
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

function searchVal(val) {
  search.value = val
}
function filterVal(id) {
  let info = {}
  // 判断是选择还是输入
  if (id !== '' && isNaN(Number.parseInt(id))) {
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

function handleNodeClick(data) {
  if (data.netName === '区域精密水准') {
    station.value = []
    highspot.value = null
  }
  if (data.type === 'year') {
    let data2 = {}
    if (data.netName === '全部') {
      data2 = {
        year: '',
      }
    }
    else {
      data2 = {
        year: data.netName,
      }
    }
    getYList(data2).then((res) => {
      const list = res.map((item) => {
        const time = dayjs(item.time).format('YYYY-MM-DD')
        item.time = time
        return item
      }).filter(item => item.latAndLon.length > 2)
      // let data = []
      deformation.value = list
      deformation1.value = list
    })
  }

  if (data.unit_name) {
    deformation.value = []
    const datas = { id: data.unit_id }
    getCompany(datas).then((res) => {
      let list = res.map((item) => {
        const time = dayjs(item.time).format('YYYY-MM-DD')
        item.time = time
        return item
      })
      list = list.filter(item => item.latAndLon.length > 2)
      deformation.value = list
      deformation1.value = list
    })
  }
}
// 获取前两层数据
function loadNode(node, resolve) {
  if (node.level === 0) {
    loading.value = false
    return resolve([
      {
        netName: '区域精密水准',
      },
    ])
  }
  else if (node.level === 1) {
    station.value = []
    const data = {}
    getCompany(data).then((res) => {
      const list = res
      const yearlist = []
      list.forEach((item, index) => {
        for (let i = 0; i < list.length - index; i++) {
          if (list[i] < list[i + 1]) {
            const temp = list[i]
            list[i] = list[i + 1]
            list[i + 1] = temp
          }
        }
      })
      list.forEach((item) => {
        yearlist.push(
          {
            netName: item,
            type: 'year',
            leaf: true,
          },
        )
      })
      yearlist.unshift(
        {
          netName: '全部',
          type: 'year',
          leaf: true,
        },
      )
      return resolve(yearlist)
    })
  }
  if (node.level === 3) {
    return resolve([])
  }
  if (node.level > 3) {
    return resolve([])
  }
}

// 地图标记点点击
function markerClick(params) {
  const { data } = params
  const val = data
  highspot.value = val
  // val.cTime = setTime(val.cTime).slice(0, 4)
  marker.value = val
  deformation1.value = [{ ...val }]
  getCUnit({}).then((res) => {
    res.map((item) => {
      if (item.id === val.line_id) {
        getUnit({}).then((resp) => {
          resp.map((itm) => {
            if (itm.unit_id === item.unitId) {
              unitName.value = itm.unit_name
            }
          })
        })
      }
    })
  })
  const form = {
    keyName: `水准数据-${val.lineName}台站数据集`,
    url: '/precursor/flowmation',
    postUrl: val.lineName,
  }
  hotDataAdd(form)
}
</script>

<template>
  <div>
    <ClientOnly>
      <DataCatalogueMap v-loading="loading" page-name="水准测网" :route-path="routePath">
        <template #header>
          <TopFilter :net-list="netList" :station-list="station" type="流动形变" @search="searchVal" @filter="filterVal" />
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
                  title="流动形变"
                  :unit="unitName"
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
