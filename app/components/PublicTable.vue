<script lang="ts" setup>
import { Operation, Download } from '@element-plus/icons-vue'
import { downStandard } from '~/api/regulation'
const props = defineProps<{
  list?: any[]
  type?: string
  dataType?: string
}>()
const pagenum = ref(1)
const pagesize = ref(10)
const total = ref()
const previewUrl = ref()
const open = ref()
const htmlText = ref()
const emit = defineEmits<{
  (e: 'clickItem', item: any): void
}>()
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
    console.log(props.list)
    const dataSource = props.list
    total.value = props.list.length
    const start = (pagenum.value - 1) * pagesize.value;
    const end = start + pagesize.value;
    return dataSource.slice(start, end);
  }
  else {
    return mockData
  }
})
// 分页大小改变时的回调
function handleSizeChange(val: any) {
  pagesize.value = val;
}
// 当前页改变时的回调
function handleCurrentChange(val: any) {
  pagenum.value = val;
}
function openUrl(url: any) {
  window.open(url)
}
function viewpdf(row: any) {
  // window.open(url)
  downStandard(row.id).then((res: any) => {
    // let url = process.env.VUE_APP_CRIT_API + '/fileservice/ecdownload'
    let blob = new Blob([res], { type: 'application/pdf' })
    let blobURL = URL.createObjectURL(blob)
    previewUrl.value = blobURL + '#toolbar=0'
    console.log(previewUrl)
    window.open(previewUrl.value)

  })
}
function previewfg(row: any) {
  let url = row.url;
  if (row.stext) {
    htmlText.value = row.stext
    open.value = true
  } else {
    window.open(url)
  }
}
function downLoadpdf(row: any) {
  let url = 'http://www.earthquake.ac.cn/fileservice/fileservice/ecdownload'
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
  <el-table class="custom-table" v-if="dataType == '标准'" :data="list" border style="width: 100%"
    :header-cell-style="{ 'background': '#F1F6FF', 'color': '#333' }">
    <el-table-column prop="date" label="标准名称" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ scope.row.nationalStandard.split('代')[0] }}
        {{ scope.row.title }}
      </template>
    </el-table-column>
    <el-table-column v-if="type == '2'" prop="undertaker" label="省份" width="90px" align='center' />
    <el-table-column label="团体名称" v-if="type == '3'" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ scope.row.undertaker }}
      </template>
    </el-table-column>
    <el-table-column label="公布时间" align="center" prop="implDate" width="120px" sortable v-if="type == '3'">
      <template #default="scope">
        <span>{{ $dayjs(scope.row.releaseTime).format('YYYY-MM-DD') }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="businessarea" label="业务领域" v-if="type !== '2' && type !== '3'" align='center' />
    <el-table-column prop="releaseTime" label="发布时间" width="120px" sortable v-if="type !== '3'" align='center'>
      <template #default="scope">
        {{ $dayjs(scope.row.releaseTime).format('YYYY-MM-DD') }}
      </template>
    </el-table-column>
    <el-table-column prop="implDate" label="实施时间" width="120px" sortable v-if="type !== '3'" align='center'>
      <template #default="scope">
        {{ $dayjs(scope.row.implDate).format('YYYY-MM-DD') }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align='center' width="200px">
      <template #default="scope">
        <div v-if="type !== '1'">
          <span class="cursor-pointer" @click="openUrl(scope.row.url)">详情</span>
          <i class="i-ri:more-2-fill text-14px text-#2F77C9" />
        </div>
        <div v-if="type === '1'">
          <el-button type='warning' text :icon="Operation" @click="viewpdf(scope.row)">预览</el-button>
          <el-button type='success' text :icon="Download" @click="downLoadpdf(scope.row)">下载</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table v-else :data="list" border class="max-w-1300px" style="width: 100%"
    :header-cell-style="{ 'background': '#F1F6FF', 'color': '#333' }">
    <el-table-column prop="sname" label="法规名称" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="stype" label="类型" width="90px" align='center'>
      <template #default="scope">
        {{ scope.row.stype == 3 ? '法律' : '法规' }}
      </template>
    </el-table-column>
    <el-table-column label="法规类型" align="center" prop="sclassification" width="150px">
    </el-table-column>
    <el-table-column prop="cunit" label="联系单位" align='center' />
    <el-table-column fixed="right" label="操作" align='center'>
      <template #default="scope">
        <span class="cursor-pointer" @click="previewfg(scope.row)">详情</span>
        <i class="i-ri:more-2-fill text-14px text-#2F77C9" />
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="pagenum" v-model:page-size="pagesize" layout="total, sizes, prev, pager, next"
    :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  <el-dialog v-model="open" :append-to-body=true width="85%">
    <div v-html="htmlText" style="padding: 15px 30px;">
    </div>
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
