  <!-- 探测数据 -->
<script lang="ts" setup>
import PopupContent from './popup-content.vue'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getPreitem, getWordList } from '~/api/precursor'
import { hotDataAdd } from '~/api/count'
import { getContinuousList, getContinuousNet, getFlowGnss, getFlowNet, getGnssList, gnssHeadSearch } from '~/api/gnss'
import { getCompanyList } from '~/api/seismometry'
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
    tipText.value = sessionStorage.getItem('tips')
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
  if (data.lineName === '按剖面名称') {
    const data = {}
    getDRlist(data)
      .then((res) => {
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
      })
      .catch(() => {
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

// 地图标记点点击
function markerClick(params) {
  const { data } = params
  marker.value = data
  const val = data
  comTreeList.value = [val]
  station.value = val.childPoint
  highspot.value = val
  getCataList()
}

// 获取数据详情
function getCataList() {
  // 连续站
  getGeophydata({ bid: marker.value.id }).then((res) => {
    const list = res
    deformation.value = list
    platName.value = [{
      collectDataDate: deformation.value[0].date,
      lineName: deformation.value[0].description,
    }]
  })
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
            v-model:active-marker="marker" v-loading="loading"
            :list="station"
            show-marker-popup
            @marker-click="markerClick"
          >
            <template #marker-popup>
              <div v-if="marker && marker.id">
                <PopupContent
                  :marke-arr="marker"
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
