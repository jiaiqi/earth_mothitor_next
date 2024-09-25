<script lang="ts" setup>
import { isPropertySignature } from 'typescript'
import { computed, ref, watch } from 'vue'

// 定义组件属性
interface Props {
  netList?: { value: string, label: string }[]
  stationList?: { id: string, staName: string }[]
  pointerList?: any[]
  yearlist?: { year: string }[]
  type?: string
}

// 定义组件属性类型
const props = withDefaults(defineProps<Props>(), {
  netList: () => [],
  stationList: () => [],
  pointerList: () => [],
  yearlist: () => [],
  type: () => '',
})

// 定义事件
const emit = defineEmits(['search', 'filter', 'filter2', 'filterYear'])
// 定义数据
const net = ref('全国')
const station = ref('')
const dateDuring = ref('')
const pointer = ref('')
const year = ref('')
const yearList = ref<{ value: string, label: string }[]>([])
const locationList = ref<{ value: string, label: string }[]>([])
const stationList2 = ref<{ value: string, label: string }[]>([])
const TimeSelect = ref([])

// 计算属性
const isSeismic = computed(() => props.type === '测震')
const isStrongMotion = computed(() => props.type === '强震动')
const isSimulatedData = computed(() => props.type === '模拟资料')
const isScienceArray = computed(() => props.type === '科学台阵')

// 监听器
watch(() => props.netList, () => {
  if (isStrongMotion.value) {
    yearList.value = props.netList.map(item => ({ value: item.year, label: item.year }))
  }
})
watch(() => props.pointerList, () => {
  let labelKey = 'shockAddr'
  let valueKey = 'id'
  if (props.type === 'GNSS') {
    labelKey = 'pointName'
  }
  else if (props.type === '定点形变') {
    labelKey = 'sta_name'
    valueKey = 'sta_code'
  }
  else if (props.type === '流体') {
    labelKey = 'stationName'
    valueKey = 'stationCode'
  }
  else if (props.type === '电磁') {
    labelKey = 'sta_name'
    valueKey = 'sta_code'
  }
  else if (props.type === '重力') {
    labelKey = 'sta_name'
    valueKey = 'sta_code'
  }
  locationList.value = props.pointerList.map(item => ({ value: item[valueKey], label: item[labelKey] }))
}, { immediate: true, deep: true })

watch(() => props.stationList, () => {
  stationList2.value = props.stationList.map(item => ({ value: item.id, label: item.staName }))
})

watch(() => props.yearlist, () => {
  yearList.value = props.yearlist.map(item => ({ value: item.year, label: item.year }))
})

// 方法
function reset() {
  net.value = ''
  station.value = ''
  dateDuring.value = ''
  pointer.value = ''
  year.value = ''
  TimeSelect.value = []
  emit('search', {})
}

function check() {
  if (props.type === 'GNSS') {
    const par: any = {}
    if (TimeSelect.value?.length === 2 && TimeSelect.value[0] && TimeSelect.value[1]) {
      par.beginTime = new Date(TimeSelect.value[0]).toLocaleDateString().replaceAll('/', '-')
      par.endTime = new Date(TimeSelect.value[1]).toLocaleDateString().replaceAll('/', '-')
    }
    if (pointer.value) {
      par.siteName = pointer.value
      if (!TimeSelect.value?.length) {
        emit('filter', pointer)
      }
    }
    emit('search', par)
  }
  else if (props.type === '测震') {
    if (station.value === '' && net.value === '' && dateDuring.value === '') {
      ElMessage.error('请输入至少一个信息')
      return
    }
    const info = { netCode: net.value }
    if (station.value !== '') {
      info.staName = station.value
    }
    if (dateDuring.value !== '') {
      info.date = dateDuring.value
    }
    emit('search', info)
  }
  else if (props.type === '科学台阵') {
    if (station.value === '') {
      ElMessage.error('请输入至少一个信息')
      return
    }
    emit('search', station.value)
  }
  else if (props.type === '探测数据') {
    if (station.value === '') {
      ElMessage.error('请输入至少一个信息')
      return
    }
    emit('search', station)
  }
}

function changeValue(item: string) {
  emit('filter', item)
}

function changeValue2(item: string | { id: string }) {
  if (props.type === 'GNSS') {
    emit('search', item)
  }
}
const search = ref('')
function searchVal(val) {
  emit('search', search)
}
</script>

<template>
  <!-- 顶部过滤器 -->
  <div class="z-999 flex rounded-6px bg-white px-12px py-6px">
    <el-input v-if="type === '探测数据'" v-model="station" class="select" placeholder="请输入测线名称" />
    <el-select v-if="type === '测震'" v-model="net" class="select" collapse-tags placeholder="请选择台网">
      <el-option v-for="item in netList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-if="type === '测震'" v-model="station" class="select" placeholder="请输入台站名称" />
    <el-date-picker
      v-if="type === '测震'"
      v-model="dateDuring"
      class="select"
      type="daterange"
      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
    />
    <el-select v-if="type === '强震动'" v-model="net" class="select" collapse-tags placeholder="请选择年份" @change="changeValue">
      <el-option v-for="item in yearList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-if="type === '强震动'" v-model="pointer" class="select" collapse-tags placeholder="请选择地点" @change="changeValue2">
      <el-option v-for="item in locationList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-if="type === '强震动'" v-model="station" class="select" placeholder="请输入地点" @input="changeValue2" />
    <el-select v-if="type === '模拟资料'" v-model="pointer" class="select" collapse-tags placeholder="请选择台站" @change="changeValue2">
      <el-option v-for="item in stationList2" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-if="type === '模拟资料'" v-model="year" class="select" collapse-tags placeholder="请选择年份" @change="changeValue">
      <el-option v-for="item in yearList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-if="type === '科学台阵'" v-model="station" class="select" placeholder="请输入台站代码" />
    <el-select v-if="type === '流动形变'" v-model="year" class="select" collapse-tags placeholder="请选择年份" @change="changeValue">
      <el-option v-for="item in yearlist" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-if="type === '流动形变'" v-model="search" class="select" placeholder="请输入测线名称" @input="searchVal" />
    <el-select v-if="type === 'GNSS'" v-model="net" class="select" collapse-tags placeholder="请选择台网" @change="changeValue2">
      <el-option v-for="item in netList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-if="type === 'GNSS'" v-model="pointer" class="select" placeholder="请输入台站名称" />
    <el-date-picker
      v-if="type === 'GNSS'" v-model="TimeSelect" style="margin-left: 10px;" type="daterange" range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <el-select v-if="type === '地震地质'" v-model="pointer" class="select" collapse-tags placeholder="请选择省份" @change="changeValue">
      <el-option v-for="item in netList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-if="type === '地震地质'" v-model="search" class="select" placeholder="请输入项目名称" />
    <el-select v-if="type === '定点形变'" v-model="pointer" class="select" collapse-tags placeholder="请选择台站" @change="changeValue">
      <el-option v-for="item in locationList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-if="type === '流体'" v-model="pointer" class="select" collapse-tags placeholder="请选择台站" @change="changeValue">
      <el-option v-for="item in locationList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-if="type === '流体'" v-model="search" class="select" placeholder="请输入台站名称" @input="changeValue" />
    <el-select v-if="type === '电磁'" v-model="pointer" class="select" collapse-tags placeholder="请选择台站" @change="changeValue">
      <el-option v-for="item in locationList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <div class="flex">
      <el-button type="primary" class="w-70px" @click="check">
        查询
      </el-button>
      <el-button type="" class="w-70px" @click="reset">
        <i class="i-ri:refresh-fill mr-5px text-black" />

        重置
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.select) {
  margin-right: 10px;
  margin-left: 10px;
  .el-range-input,
  .el-input__inner,
  .el-select__wrapper {
    min-width: 120px;
  }
  .el-date-range-picker__header {
    line-height: unset;
  }
}
:deep(.el-range-editor.el-input__wrapper) {
  min-width: var(--el-date-editor-width);
  margin-right: 10px;
}
</style>
