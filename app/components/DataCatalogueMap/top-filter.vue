<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

// 定义组件属性
interface Props {
  netList: { value: string, label: string }[]
  stationList?: { id: string, staName: string }[]
  pointerList?: { id: string, shockAddr: string }[]
  yearlist?: { year: string }[]
  type: string
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

// 计算属性
const isSeismic = computed(() => props.type === '测震')
const isStrongMotion = computed(() => props.type === '强震动')
const isSimulatedData = computed(() => props.type === '模拟资料')
const isScienceArray = computed(() => props.type === '科学台阵')

// 监听器
watch(props.netList, () => {
  if (isStrongMotion.value) {
    yearList.value = props.netList.map(item => ({ value: item.year, label: item.year }))
  }
})

watch(props.pointerList, () => {
  locationList.value = props.pointerList.map(item => ({ value: item.id, label: item.shockAddr }))
})

watch(props.stationList, () => {
  stationList2.value = props.stationList.map(item => ({ value: item.id, label: item.staName }))
})

watch(props.yearlist, () => {
  yearList.value = props.yearlist.map(item => ({ value: item.year, label: item.year }))
})

// 方法
function reset() {
  net.value = ''
  station.value = ''
  dateDuring.value = ''
  pointer.value = ''
  year.value = ''
  emit('search', {})
}

function check() {
  if (isSeismic.value) {
    if (station.value === '' && net.value === '' && dateDuring.value === '') {
      alert('请输入至少一个信息')
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
  else if (isScienceArray.value) {
    if (station.value === '') {
      alert('请输入至少一个信息')
      return
    }
    emit('search', station.value)
  }
}

function changeValue(item: string) {
  if (isStrongMotion.value || isSimulatedData.value) {
    emit('filter', item)
  }
}

function changeValue2(item: string | { id: string }) {
  if (isStrongMotion.value) {
    if (typeof item === 'string') {
      emit('filter2', item)
      return
    }
    let data = {}
    props.pointerList.forEach((itm) => {
      if (itm.id === item) {
        data = itm
      }
    })
    emit('filter2', data)
  }
  else if (isSimulatedData.value) {
    emit('filter', item)
  }
}
</script>

<template>
  <!-- 顶部过滤器 -->
  <div>
    <div class="z-999 flex rounded-6px bg-white px-12px py-6px">
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
</style>
