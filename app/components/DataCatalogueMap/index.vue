<!-- 数据目录-公共地图组件 -->
<script lang="ts" setup>
const props = defineProps({
  pageName: String,
  routePath: Array as PropType<PathItem[]>,
  list: Array as PropType<any[]>,
  contentHeight: {
    type: String,
    default: 'calc(100vh - 120px)',
  },
})
interface PathItem {
  name: string
  path?: string
}
</script>

<template>
  <div class="pos-relative bg-blue-100">
    <div class="header pos-absolute left-0 z-999 flex p-20px">
      <PublicBreadcrumbNavigation :path="props.routePath" class="mr-40px rounded-6px bg-white" />
      <slot name="header" />
    </div>
    <slot name="left" />
    <div
      class="h-[calc(100vh_-_120px)]"
      :style="{ height: props.contentHeight }"
    >
      <slot name="content" />
      <slot name="right" />
    </div>
    <slot name="footer" />
  </div>
</template>

<style>

</style>
