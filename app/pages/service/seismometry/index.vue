<!-- 测震 -->
<script lang="ts" setup>
import topFilter from '../components/top-filter.vue'
import leftDrawer from '../components/left-drawer.vue'
import { hotDataAdd } from '~/api/count'
import { getAllStation, getArraycatalogdat, getArraystation, getCompanyList, getStation, getarraynetwork, getcata } from '~/api/seismometry'

definePageMeta({
  layout: 'map-page',
})
const dayjs = useDayjs()

const routePath = [{ name: '首页', path: '/' }, { name: '观测数据', path: '/dataSummary' }, { name: '测震', path: '' }]

const isChildProvince = ref(false)
// 1、获取测震站列表
const netList = ref<any[]>([])
async function getStatonList() {
  const params = { unitId: 1 }
  let list = []
  getCompanyList(params).then((res) => {
    list = res
    // alert(JSON.stringify(list))
    netList.value.push({
      value: '全国',
      label: '全国',
    })
    list.forEach((item) => {
      netList.value.push({
        value: item.netCode,
        label: item.netName,
        id: item.id,
      })
    })
    // 子站过滤省份
    // if (sessionStorage.getItem('province') != '') {
    //   list.map((itm) => {
    //     if (sessionStorage.getItem('province').includes(itm.netName)) {
    //       handleNodeClick(itm)
    //       console.log(itm)
    //     }
    //   })
    // }
  })
}
const mapInstance = ref(null)
onMounted(() => {
  getStatonList()
  if (sessionStorage.getItem('province') === '' || !sessionStorage.getItem('province')) {
    isChildProvince.value = false
    handleNodeClick({ unitName: '国家站网', leaf: true })
  }
  else {
    isChildProvince.value = true
  }
})
const tableData = ref([])

// 获取通道数据
function getCataList() {
  console.log(marke.value)
  const arr = { staId: '', netId: '' }
  arr.staId = marke.value.id
  arr.netId = marke.value.netId
  const form = {
    keyName: `测震数据-${drawerTitle.value}数据集`,
    url: '/service/seismometry',
  }
  if (marke.value.staLevel === '省台' || marke.value.staLevel === '市台') {
    form.postUrl = JSON.stringify({
      netCode: marke.value.netCode,
      staName: marke.value.staName,
    })
  }
  else {
    form.postUrl = JSON.stringify({
      staName: drawerTitle,
    })
  }
  hotDataAdd(form)
  if (isProvince.value) {
    return
  }
  getcata(arr).then((res) => {
    tableData.value = res
    // 如查询日期选择器有值
    // if (date1 && date2 && tableData.value.length > 0) {
    //   let starIndex = -1
    //   let endIndex = -1
    //   tableData.value.map((item, index) => {
    //     if (new Date(item.dataDate).toLocaleDateString() ==== date2) {
    //       starIndex = index
    //     }
    //     if (new Date(item.dataDate).toLocaleDateString() ==== date1) {
    //       endIndex = index
    //     }
    //   })
    //   if (starIndex === -1) {
    //     starIndex = 0
    //   }
    //   if (endIndex === -1) {
    //     endIndex = tableData.value.length - 1
    //   }
    //   tableData.value = tableData.value.slice(starIndex, endIndex + 1)
    // }
    // dateData = []
    // tableData.value.forEach((item) => {
    //   const date = getDates(item.dataDate)
    //   dateData.push(date)
    // })
    // // alert(JSON.stringify(dateData))
    // if (tableData.value.length > 0) {
    //   show = true
    //   isActive = true
    //   if (top < 0) {
    //     top = 50
    //   }
    //   drawerTitle.value = `${marke.value.staName}台站`
    // }
    // else {
    //   $message.error('数据为空')
    //   drawerTitle.value = ''
    //   show = false
    //   isActive = false
    // }
    for (let j = 0; j < tableData.value.length; j++) {
      tableData.value[j].dataDate = dayjs(tableData[j].dataDate).format('YYYY-MM-DD')
    }
  })
}

const loading = ref(false)
const station = ref<any[]>([])
const marke = ref({})
const drawerTitle = ref('')
//
const highspot = ref(null) //  存储点击的点
const markshow = ref(false)
const stationName = ref('')
const isProvince = ref(false)
const isScience = ref(false) // 科学台震

// 获取科学台阵通道数据
function getCataList2() {
  const arr = { staId: '', netId: '' }
  arr.staId = marke.value.id
  arr.netId = marke.value.netId
  getArraycatalogdat(arr)
    .then((res) => {
      drawerTitle.value = `${marke.value.staCode}台站`
      tableData.value = res.map((item) => {
        item.dataDate = dayjs(dataDate).format('YYYY-MM-DD')
        return item
      })
    })
    .catch((see) => {
      ElMessage.error('获取数据失败', see)
    })
}
// 地图标记点点击
function handleClickMaker(val, L, latlng) {
  marke.value = val
  const content = `aaaaa`
  L.popup({ minWidth: 350 })
    .setLatLng([latlng.lat, latlng.lng])
    .setContent(content)
    .openOn(mapInstance.value)
  debugger
  // console.log(val)
  // console.log(type)
  drawerTitle.value = val.staName
  highspot.value = val
  markshow.value = true
  netList.value.map((item) => {
    if (item.id === val.netId && item.label != '全国') {
      if (['北京', '天津', '上海', '重庆'].includes(item.label)) {
        item.label = `${item.label}市`
      }
      else {
        stationName.value = `${item.label}省`
        const provinceList = ['内蒙', '宁夏', '新疆', '广西', '西藏']
        provinceList.forEach((itm) => {
          if (item.label.includes(itm)) {
            stationName.value = `${item.label}自治区`
          }
        })
      }
    }
  })
  if (marke.value.noiseLevel) {
    isProvince.value = true
  }
  else {
    isProvince.value = false
  }
  if (isScience.value) {
    // 科学台震
    getCataList2()
  }
  else {
    getCataList()
  }
}

// 查询参数
const networkOption = ref({
  netId: 1,
})
function handleNodeClick(data) {
  isScience.value = false
  if (data.unitName === '国家站网') {
    const data = {}
    getAllStation(data)
      .then((res) => {
        const list = res
        station.value = list
        loading.value = false
      })
      .catch(() => {})
  }
  else if (data.netName) {
    stationName.value = data.netName
    // networkOption.netCode = data.netCode
    const datas = { netCode: data.netCode }
    getStation(datas)
      .then((res) => {
        const arr = res
        station.value = arr
        if (arr.length == 0) {
          ElMessage.error('数据为空')
          return
        }
        if (data.isLoad) {

        }
        // if (top < 0) {
        //   top = 50
        // }
        else {
          // isActive = false
          // show = false
        }
      })
      .catch((err) => {
        ElMessage.error('获取数据失败', err)
      })
  }
  else if (data.type === 'sci') {
    isScience.value = true
    networkOption.value.netId = data.id
    const params = networkOption.value
    getArraystation(params)
      .then((res) => {
        const arr = res
        station.value = arr
        // top = 50
      })
      .catch((err) => {
        ElMessage.error('获取数据失败', err)
      })
  }
}

function filterPlatList() {

}
const mapShow = ref(null)

// 获取上报单位台网
function loadNode(node, resolve) {
  if (node.level === 0) {
    loading.value = false
    return resolve([
      {
        unitName: '测震站网',
      },
      {
        unitName: '科学台阵',
      },
    ])
  }
  else if (node.level === 1) {
    if (node.label === '测震站网') {
      // getStationBNum().then((res) => {
      // })
      return resolve([
        {
          unitName: '国家站网',
          leaf: true,
        },
        // 这里注释是为了屏蔽左侧省级站网等内容，下线省级站网
        /* {
              unitName: '省级站网'
              // leaf: true
            },
            {
              unitName: '市县站网'
            },
            {
              unitName: '其他站网'
            } */
      ])
    }
    if (node.label === '科学台阵') {
      const data = {}
      const arr: any[] = []

      getarraynetwork(data).then((res) => {
        const list = res
        list.forEach((item: any) => {
          arr.push({
            unitName: item.netName,
            type: 'sci',
            id: item.id,
            leaf: true,
          })
        })
        return resolve(arr)
      })
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
            list.forEach((item) => {
              item.unitName = item.netName
              item.leaf = true
            })
            return resolve(list)
          })
          .catch(() => {
            resolve({})
          })
      }
    }
    else if (node.label === '市县站网' || node.label === '其他站网') {
      ElMessage.error('数据为空')
      resolve([])
    }
  }
}
const searchVal = ref('')
</script>

<!-- 数据目录-测震 -->
<template>
  <div
    class="pos-relative h-[calc(100vh_-_160px)] w-100vw overflow-hidden"
  >
    <ClientOnly>
      <div class="header pos-absolute left-20px top-20px z-999 w-full flex">
        <PublicBreadcrumbNavigation :path="routePath" class="w-342px rounded-6px bg-white" />
        <topFilter class="ml-40px" :net-list="netList" type="测震" @search="searchVal" />
      </div>

      <MapBox
        v-loading="loading"
        class=" "
        :list="station"
        :highspot="highspot"
        :map-show="mapShow"
        @maplist="handleClickMaker"
        @lists="filterPlatList"
        @map-ready="mapInstance = $event"
      />
      <leftDrawer :load="loadNode" :node-click="handleNodeClick" />
    </ClientOnly>
  </div>
</template>

<style>

</style>
