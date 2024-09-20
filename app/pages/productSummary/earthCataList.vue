<script
  lang="ts"
  setup
>
import { getEveList, seisserverORList, seisserverSMSList, seisserverXGPList } from '~/api/service'

const routePath = ref([{ name: '首页', path: '/' }, { name: '产品目录列表', path: '/productSummary' }])
const route = useRoute()
const pageType = ref(route.query.type)
switch (pageType.value) {
  case 'cata':
    routePath.value.push({ name: '统一编目目录' })
    break
  case 'sms':
    routePath.value.push({ name: '震源机制解目录' })
    break
  case 'smsxgp':
    routePath.value.push({ name: '震源机制解' })
    break
  case 'soon':
    routePath.value.push({ name: '速报目录' })
    break
}
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const listData = ref([])
const loading = ref(false)
getList()
async function onPageChange(pageNum: number, pageSize: number) {
  queryParams.pageNum = pageNum
  queryParams.pageSize = pageSize
  await getList()
}

function getList1() {
  // 统一编目目录
  seisserverORList(queryParams).then((res) => {
    listData.value = res.records
    total.value = res.total
  })
}
function getList2() {
  // 震源机制解目录
  seisserverSMSList(queryParams).then((res) => {
    listData.value = res.records
    total.value = res.total
  })
}
function getList3() {
  // 震源机制解目录2 震源机制解
  seisserverXGPList(queryParams).then((res) => {
    listData.value = res.records
    total.value = res.total
  })
}
function getList4() {
  // 速报目录
  getEveList(queryParams).then((res) => {
    listData.value = res.records
    total.value = res.total
  })
}
async function getList() {
  switch (pageType.value) {
    case 'cata':
      getList1()
      break
    case 'sms':
      getList2()
      break
    case 'smsxgp':
      getList3()
      break
    case 'soon':
      getList4()
      break
  }
}
</script>

<template>
  <CommonPageContainer :path="routePath" title="产品目录" desc="PRODUCT CATALOG">
    <div class="mt-20px" flex="~ col xl:row">
      <div class="min-h-300px w-full" flex="1">
        <div class="pos-relative w-full items-start overflow-hidden" flex="~ col md:row">
          <div class="w-full flex-1">
            <div v-if="loading" class="h-500px text-center line-height-500px">
              <LoaderL1 />
            </div>
            <el-table :data="listData" border style="width: 100%" header-cell-class-name="bg-#F1F6FF">
              <template v-if="pageType === 'cata'">
                <el-table-column label="震级" prop="m" width="120" />
                <el-table-column label="发震时刻" prop="occurTime" width="180">
                <!-- <template slot-scope="scope">
                  <div>{{ new Date(scope.row.occurTime).toLocaleString() }}</div>
                </template> -->
                </el-table-column>
                <el-table-column label="纬度(°)" prop="latitude" width="100">
                  <template #default="scope">
                    <div>{{ scope.row.latitude }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="经度(°)" prop="longitude" width="150">
                  <template #default="scope">
                    <div>{{ scope.row.longitude }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="深度(km)" prop="depth" width="150" />
                <el-table-column label="位置" prop="location" />
                <el-table-column label="地震类型" prop="eqType" width="180" />
              </template>
              <template v-if="pageType === 'smsxgp'">
                <el-table-column label="发震地点" prop="location" width="180" />
                <el-table-column label="震级" prop="magnitude" width="100" />
                <el-table-column label="发震时刻" prop="originTime" width="180">
                  <template #default="scope">
                    <div>{{ $dayjs(scope.row.originTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="纬度(°)" prop="latitude" width="100" />
                <el-table-column label="经度(°)" prop="longitude" width="100" />
                <el-table-column label="深度(km)" prop="focalDepth" width="100" />
                <el-table-column label="名称" prop="uploader" width="200" />
                <el-table-column label="上传时间" prop="uploadTime" width="180">
                  <template #default="scope">
                    <div>{{ $dayjs(scope.row.uploadTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="下载链接" prop="surl">
                  <template #default="scope">
                    <a style="color:#409EFF" :href="scope.row.surl" target="_blank">下载</a>
                  </template>
                </el-table-column>
              </template>
              <template v-else-if="pageType === 'sms'">
                <el-table-column label="速报震级" prop="magnitude" width="70" />
                <el-table-column label="Mw震级" prop="mwMagnitude" width="70" />
                <el-table-column label="发震时刻" prop="dateTime" width="170">
                  <template #default="scope">
                    <div>{{ $dayjs(scope.row.dateTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="纬度(°)" prop="latitude" width="100">
                  <template #default="scope">
                    <div>{{ scope.row.latitude }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="经度(°)" prop="longitude" width="100">
                  <template #default="scope">
                    <div>{{ scope.row.longitude }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="深度(km)" prop="depth" width="85" />
                <el-table-column label="位置" prop="location" width="200" />
                <el-table-column label="断层面1走向" prop="trend1" width="90" />
                <el-table-column label="断层面2走向" prop="trend2" width="90" />
                <el-table-column label="断层面1倾角" prop="dipAngle1" width="90" />
                <el-table-column label="断层面1滑动角" prop="slidingAngle1" width="90" />
                <el-table-column label="断层面2倾角" prop="dipAngle2" width="90" />
                <el-table-column label="断层面2滑动角" prop="slidingAngle2" width="90" />
                <el-table-column label="矩心深度(KM）" prop="centroidDepth" width="90" />
              </template>
              <template v-else-if="pageType === 'soon'">
                <el-table-column label="震级" prop="m" width="120" />
                <el-table-column label="发震时刻" prop="otime" width="180">
                  <template #default="scope">
                    <div>{{ new Date(scope.row.otime).toLocaleString() }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="纬度(°)" prop="lat" width="100">
                  <template #default="scope">
                    <div>{{ scope.row.lat }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="经度(°)" prop="lon" width="150">
                  <template #default="scope">
                    <div>{{ scope.row.lon }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="深度(km)" prop="depth" width="150" />
                <el-table-column label="位置" prop="localName" />
              </template>
            </el-table>
            <PublicPagination
              v-if="total" :page-size="queryParams.pageSize" :page-num="queryParams.pageNum"
              :total="total" @change="onPageChange"
            />
          </div>
        </div>
        <!-- <div class="w-full xl:w-300px">
        <PublicHotNews />
        <slot name="right" />
      </div> -->
      </div>
    </div>
  </CommonPageContainer>
</template>

<style scoped lang="scss">
:deep(.el-table) {
  --el-table-header-bg-color: #f1f6ff;
}
</style>
