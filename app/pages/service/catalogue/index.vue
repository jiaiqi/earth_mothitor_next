<!-- 强震动 -->
<script lang="ts" setup>
import { getCompanyList } from '~/api/seismometry'
import TopFilter from '~/components/DataCatalogueMap/top-filter.vue'
import LeftDrawer from '~/components/DataCatalogueMap/left-drawer.vue'
import LeafletMap from '~/components/DataCatalogueMap/leaflet-map.vue'
import { getStationStrong, getVibrationList } from '~/api/vibration'
import { hotDataAdd } from '~/api/count'

definePageMeta({
  layout: 'map-page',
})
const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '强震动', path: '' }]
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
function searchStation() {

}
function handleNodeClick(data) {
  if (data.unitName === '国家站网' || data.unitName === '市县站网' || data.unitName === '其他站网') {
    // let par = encode({staLevel: data.unitName})
    const par = { netName: data.unitName }
    getVibrationList(par).then((res) => {
      const list = res
      list.forEach((item, index) => {
        if (item.lat && item.lon) {
          item.staLat = item.lat
          item.staLon = item.lon
        }
        else {
          list.splice(index)
        }
      })
      station.value = list
      treeList.value = list
    }).catch(() => {})
  }
  else if (data.netName) {
    stationName.value = data.netName
    // networkOption.netCode = data.netCode  netCode : data.netCode
    const datas = { netCode: data.netCode }
    getStationStrong(datas).then((res) => {
      const arr = res
      const arr2 = []
      arr.forEach((item) => {
        item.startTime = new Date(item.cTime).toLocaleDateString()
        if (item.netCode == data.netCode) {
          arr2.push(item)
        }
      })
      treeList.value = arr2
      station.value = arr2
      if (arr2.length == 0) {
        ElMessage.error('数据为空')
      }
    })
  }
  else if (data.eventId) {
    staId.value = data.eventId
    // console.log(data.row)
    if (data.row.shockAddr) {
      drawertitle.value = '强震动地震数据信息'
    }
    else {
      drawertitle.value = '强震动地震台站数据信息'
    }
    drawerTitle.value = `_${data.row.staName}`
    markshow.value = true
    showInfo.value = true
    highspot.value = data.row
    marker.value = data.row
  }
  const form = {
    keyName: `强震动数据-${drawerTitle.value}数据集`,
    url: '/service/catalogue',
  }
  if (data.row) {
    form.postUrl = JSON.stringify({
      netCode: data.row.netCode,
      staName: data.row.staName,
    })
  }
  hotDataAdd(form).then()
  if (data.year) {
    // blurValue(data.year)
  }
}

// 获取上报单位台网
function loadNode(node, resolve) {
  if (node.level === 0) {
    loading.value = false
    return resolve([
      {
        unitName: '强震动站网',
      },
      {
        unitName: '强震动事件',
        // children: []
      },
    ])
  }
  else if (node.level === 1) {
    if (node.label === '强震动站网') {
      return resolve([
        {
          unitName: '国家站网',
          leaf: true,
        },
        // 这里注释是为了屏蔽左侧省级站网等内容，下线省级站网
        /*  {
              unitName: '省级站网'
            },
            {
              unitName: '市县站网'
            },
            {
              unitName: '其他站网'
            } */
      ])
    }
    if (node.label === '强震动事件') {
      yearList.value = yearList.value.map((item) => {
        item.unitName = item.year
        item.leaf = true
        return item
      })
      return resolve(yearList.value)
    }
  }
  else if (node.level === 2) {
    if (node.label === '省级站网') {
      const data = node.data
      if (data) {
        let list = []
        const datas = { unitId: 1 }
        getCompanyList(datas)
          .then((res) => {
            list = res
            list = list.map((item) => {
              item.unitName = item.netName
              item.leaf = true
              return item
            })
            return resolve(list)
          })
          .catch(() => {
            resolve({})
          })
      }
    }
  }
}
// 地图标记点点击
function markerClick(params) {
  const { data } = params

  // 判断是输入还是选择
  if (typeof val == 'string' && val != '') {
    treeList.value.map((itm) => {
      if (itm.shockAddr && itm.shockAddr.includes(val)) {
        val = { ...itm }
      }
    })
    if (treeList.value.length == 0 || (treeList.value.length != 0 && !treeList.value[0].shockAddr)) {
      searchStation(val)
      return
    }
    if (typeof val == 'string') {
      return
    }
  }
  if (val == '') {
    return
  }

  markshow.value = true
  marker.value = val
  highspot.value = val
  if (val.shockAddr) {
    drawertitle.value = '强震动地震数据信息'
    drawerTitle.value = val.shockAddr
    getCataList()
  }
  else {
    drawertitle.value = '强震动地震台站数据信息'
    drawerTitle.value = val.staName
    handleNodeClick({ eventId: val.id, row: val })
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <DataCatalogueMap v-loading="loading" page-name="强震动" :route-path="routePath">
        <template #header>
          <TopFilter :net-list="yearList" type="强震动" />
        </template>
        <template #left>
          <LeftDrawer :load-node="loadNode" :node-click="handleNodeClick" />
        </template>
        <template #content>
          <LeafletMap v-model:active-marker="marker" v-loading="loading" :list="station" show-marker-popup @marker-click="markerClick">
            <template #marker-popup>
              <div v-if="marker && marker.staName">
                <PopupContent
                  :marker-arr="marker"
                  :title="isScience ? '科学台阵' : '测震数据'"
                  :data-length="tableData.length"
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
