<!-- 数据目录-公共地图组件 -->
<script lang="ts" setup>
import LeftDrawer from './left-drawer.vue'
import TopFilter from './top-filter.vue'
import LeafletMap from './leaflet-map.vue'

const props = defineProps({
  pageName: String,
  routePath: Array as PropType<PathItem[]>,
  list: Array as PropType<any[]>,
})
const emit = defineEmits(['markerClick'])
interface PathItem {
  name: string
  path?: string
}
const netList = ref<any[]>([])
const searchVal = ref('')
function markerClick(event) {
  emit('markerClick', event)
}
</script>

<template>
  <div class="pos-relative bg-blue-100">
    <div class="header pos-absolute left-0 z-999 flex p-20px">
      <PublicBreadcrumbNavigation :path="props.routePath" class="mr-40px w-342px rounded-6px bg-white" />
      <slot name="header" />
      <!--

      <TopFilter class="ml-40px" :net-list="netList" type="测震" @search="searchVal" /> -->
    </div>
    <slot name="left">
    <!-- <LeftDrawer /> -->
    </slot>
    <div
      class="h-[calc(100vh_-_120px)]"
    >
      <slot name="content" />
      <!-- <LeafletMap :list="props.list" @marker-click="markerClick" /> -->
    </div>
  </div>
</template>

<style>

</style>
