<script lang="ts" setup>
import { Download, Operation } from '@element-plus/icons-vue'
import { decode, encode } from '~/utils/base/dataEncry'

const props = defineProps<{
  list?: any[]
  type?: string
  dataType?: string
}>()
const emit = defineEmits<{
  (e: 'clickItem', item: any): void
}>()
// const pagenum = ref(1)
// const pagesize = ref(10)
const total = ref()
const queryParams = reactive(
  {
    pageSize: 10,
    pageNum: 1,
  },
)
const previewUrl = ref()
const open = ref()
const htmlText = ref()
const mockData = [
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 100,
    id: 1,
  },
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 1458,
    id: 2,
  },
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 562,
    id: 3,
  },
  {
    title: '文物减隔震技术服务(减隔震装置与方率设计)',
    viewNum: 9851,
    id: 4,
  },
]
const list = computed(() => {
  if (props.list) {
    const dataSource = props.list
    total.value = props.list.length
    const start = (queryParams.pageNum - 1) * queryParams.pageSize
    const end = start + queryParams.pageSize
    return dataSource.slice(start, end)
  }
  else {
    return mockData
  }
})
//
function handleSizeChange(val: any) {
  queryParams.pageNum = val.pageNum
}
function openUrl(row: any) {
  // if(row.newsText){

  // }else{
  window.open(row.url)
  // }
}
function openNewsDetail(row: any) {
  if (row.url == '') {
    navigateTo({
      path: `/newsMore/detail/${row.id}`,
      query: {
        data: encode(row),
      },
    })
  }
  else {
    window.open(row.url)
  }
}
function viewpdf(row: any) {
  emit('clickItem', row)
}
function previewfg(row: any) {
  const url = row.url
  if (row.stext) {
    htmlText.value = row.stext
    open.value = true
  }
  else {
    window.open(url)
  }
}
function downLoadpdf(row: any) {
  const url = 'http://www.earthquake.ac.cn/fileservice/fileservice/ecdownload'
  // window.location.href = `${url}?filename=${row.filename}`
  window.open(`${url}?fileid=${row.id}`)
}
onMounted(() => {
})
function handleClickItem(item: any) {
  emit('clickItem', item)
}
</script>

<template>
  <el-table
    v-if="dataType == '标准'" class="custom-table" :data="list" border style="width: 100%"
    :header-cell-style="{ background: '#F1F6FF', color: '#333' }"
  >
    <el-table-column prop="date" label="标准名称" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ scope.row.nationalStandard.split('代')[0] }}
        {{ scope.row.title }}
      </template>
    </el-table-column>
    <el-table-column v-if="type == '2'" prop="undertaker" label="省份" width="90px" align="center" />
    <el-table-column v-if="type == '3'" label="团体名称" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ scope.row.undertaker }}
      </template>
    </el-table-column>
    <el-table-column v-if="type == '3'" label="公布时间" align="center" prop="implDate" width="120px" sortable>
      <template #default="scope">
        <span>{{ $dayjs(scope.row.releaseTime).format('YYYY-MM-DD') }}</span>
      </template>
    </el-table-column>
    <el-table-column v-if="type !== '2' && type !== '3'" prop="businessarea" label="业务领域" align="center" />
    <el-table-column v-if="type !== '3'" prop="releaseTime" label="发布时间" width="120px" sortable align="center">
      <template #default="scope">
        {{ $dayjs(scope.row.releaseTime).format('YYYY-MM-DD') }}
      </template>
    </el-table-column>
    <el-table-column v-if="type !== '3'" prop="implDate" label="实施时间" width="120px" sortable align="center">
      <template #default="scope">
        {{ $dayjs(scope.row.implDate).format('YYYY-MM-DD') }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center" width="200px">
      <template #default="scope">
        <div v-if="type !== '1'">
          <span class="cursor-pointer" @click="openUrl(scope.row)">详情</span>
          <i class="i-ri:more-2-fill text-14px text-#2F77C9" />
        </div>
        <div v-if="type === '1'">
          <el-button type="warning" text :icon="Operation" @click="viewpdf(scope.row)">
            预览
          </el-button>
          <el-button type="success" text :icon="Download" @click="downLoadpdf(scope.row)">
            下载
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    v-else-if="dataType == '学校'" class="custom-table" :data="list" border style="width: 100%"
    :header-cell-style="{ background: '#F1F6FF', color: '#333' }"
  >
    <el-table-column prop="schoolProvince" label="省份" align="center" :show-overflow-tooltip="true" width="300px" />
    <el-table-column prop="schoolName" label="地址" align="center" />
    <el-table-column label="时间" align="center" prop="confirmTime" width="220px" />
  </el-table>
  <el-table
    v-else-if="dataType == '基地'" class="custom-table" :data="list" border style="width: 100%"
    :header-cell-style="{ background: '#F1F6FF', color: '#333' }"
  >
    <el-table-column prop="baseProvince" label="省份" align="center" :show-overflow-tooltip="true" width="300px" />
    <el-table-column prop="baseName" label="地址" align="center" />
    <el-table-column label="时间" align="center" prop="confirmTime" width="220px" />
  </el-table>
  <el-table
    v-else-if="dataType == '新闻动态'" class="custom-table" :data="list" border style="width: 100%"
    :header-cell-style="{ background: '#F1F6FF', color: '#333' }"
  >
    <el-table-column prop="title" label="新闻标题" :show-overflow-tooltip="true" />
    <el-table-column prop="uploadTime" label="上传时间" align="center">
      <template #default="scope">
        {{ scope.row.uploadTime.split('T0')[0] }}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" prop="confirmTime" width="220px">
      <template #default="scope">
        <div>
          <span class="cursor-pointer" @click="openNewsDetail(scope.row)"> 查看详情</span>
          <i class="i-ri:more-2-fill text-14px text-#2F77C9" />
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    v-else-if="dataType == '地震动态'" class="custom-table" :data="list" border style="width: 100%"
    :header-cell-style="{ background: '#F1F6FF', color: '#333' }"
  >
    <el-table-column type="index" width="80" label="序号" />
    <el-table-column prop="m" label="震级" />
    <el-table-column prop="otime" label="发布日期" width="220px">
      <template #default="scope">
        {{ $dayjs(scope.row.otime).format('YYYY-MM-DD hh:mm:ss') }}
      </template>
    </el-table-column>
    <el-table-column label="纬度(°)" prop="lat" />
    <el-table-column label="经度(°)" prop="lon" />
    <el-table-column label="深度(km)" prop="depth" />
    <el-table-column label="位置" prop="localName" width="320px" :show-overflow-tooltip="true" />
  </el-table>
  <el-table
    v-else-if="dataType == '历史今天'" class="custom-table" :data="list" border style="width: 100%"
    :header-cell-style="{ background: '#F1F6FF', color: '#333' }"
  >
    <el-table-column type="index" width="80" label="序号" />
    <el-table-column prop="m" label="震级" />
    <el-table-column prop="earthquakeDate" label="发震时刻" width="220px" />
    <el-table-column label="纬度(°)" prop="lat" />
    <el-table-column label="经度(°)" prop="lon" />
    <el-table-column label="位置" prop="placeName" width="320px" :show-overflow-tooltip="true" />
  </el-table>
  <el-table
    v-else-if="dataType == '点击排行榜'" class="custom-table" :data="list" style="width: 100%"
    :header-cell-style="{ color: '#333' }" :cell-style="{ color: '#333' }" stripe
  >
    <el-table-column type="index" width="80" label="排行" align="center" />
    <el-table-column prop="keyName" label="名称" :show-overflow-tooltip="true" width="520px" />
    <!-- <el-table-column prop="earthquakeDate" label="提供单位" width="220px">
    </el-table-column> -->
    <el-table-column label="浏览量" prop="hotNum" align="center">
      <template #default="scope">
        <span class="text-[#0D73CF]">{{ scope.row.hotNum }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center">
      <template #default="scope">
        <span class="cursor-pointer" @click="handleClickItem(scope.row)">详情</span>
        <i class="i-ri:more-2-fill text-14px text-#2F77C9" />
      </template>
    </el-table-column>
  </el-table>
  <el-table
    v-else :data="list" border class="max-w-1300px" style="width: 100%"
    :header-cell-style="{ background: '#F1F6FF', color: '#333' }"
  >
    <el-table-column prop="sname" label="法规名称" :show-overflow-tooltip="true" />
    <el-table-column prop="stype" label="类型" width="90px" align="center">
      <template #default="scope">
        {{ scope.row.stype == 3 ? '法律' : '法规' }}
      </template>
    </el-table-column>
    <el-table-column label="法规类型" align="center" prop="sclassification" width="150px" />
    <el-table-column prop="cunit" label="联系单位" align="center" />
    <el-table-column fixed="right" label="操作" align="center">
      <template #default="scope">
        <span class="cursor-pointer" @click="previewfg(scope.row)">详情</span>
        <i class="i-ri:more-2-fill text-14px text-#2F77C9" />
      </template>
    </el-table-column>
  </el-table>
  <PublicPagination
    :page-size="queryParams.pageSize" :page-num="queryParams.pageNum" :total="total"
    @change="handleSizeChange"
  />
  <!-- <el-pagination background v-model:currentPage="pagenum" v-model:page-size="pagesize" layout="total,  prev, pager, next"
    :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
  <el-dialog v-model="open" :append-to-body="true" width="85%">
    <div style="padding: 15px 30px;" v-html="htmlText" />
  </el-dialog>
  <!-- <div v-if="type === '上图下文'" class="w-full gap-y-30px pr-30px" grid="~  md:cols-2 xl:cols-3 gap-20px">
    <div v-for="item in list" :key="item.id" class="cursor-pointer overflow-hidden rounded-6px bg-#F6F7FA" @click="handleClickItem(item)">
      <slot name="image" />
      <div class="px-24px py-16px">
        <div class="truncate text-size-18px text-#111 font-700 line-height-26px" :title="item.title">
          {{ item.title }}
        </div>
        <div v-if="item.subList" class="mt-5px hidden truncate text-#424242 md:flex" flex="col gap-10px">
          <div v-for="text in item.subList" :key="text">
            {{ text }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="grid w-full gap-y-30px pr-30px">
    <div v-for="item in list" :key="item.id" class="cursor-pointer pb-30px" border="1px dashed transparent b-#E2E8F2" @click="handleClickItem(item)">
      <div flex="~ items-start md:items-center gap-x-24px " class="w-full">
        <slot name="image">
          <img src="/img/news_img.jpg" class="h-80px w-120px md:h-158px md:w-240px">
        </slot>
        <div class="flex-1 text-#424242">
          <div class="title" flex="col md:row ~ justify-between">
            <span class="line-clamp-2 text-size-18px text-#111 font-700 line-height-26px" :title="item.title">{{ item.title }}
            </span>
            <span v-if="item.viewNum" class="flex items-center text-#AEAEB2">
              <i class="i-ri:eye-fill mr-10px" />
              {{ item.viewNum || '' }}次
            </span>
          </div>
          <div v-if="item.subList" class="mt-15px hidden md:flex" flex="col gap-10px">
            <div v-for="text in item.subList" :key="text">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.subList" class="mt-15px flex text-#424242 md:hidden" flex="col gap-10px">
        <div v-for="text in item.subList" :key="text">
          {{ text }}
        </div>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.custom-table .el-table__header-wrapper tr {
  background-color: #f2f2f2;
  /* 修改表头背景颜色 */
}
</style>
