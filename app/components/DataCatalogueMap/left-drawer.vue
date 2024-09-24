<script setup lang="ts">
const props = defineProps({
  prop: {
    type: Object,
    default: () => {
      return { label: 'unitName', children: 'zones', isLeaf: 'leaf' }
    },
  },
  load: {
    type: Function,
    default: () => {
      return null
    },
  },
  filterNodeMethod: {
    type: Function,
    default: () => {
      return null
    },
  },
  nodeClick: {
    type: Function,
    default: () => {
      return null
    },
  },
})
const filterText = ref('')
const tree = ref(null)
function changeFilterText(event) {
  console.log(event)

  // tree.value.filter(val)
}
const unfold = ref(true)
</script>

<template>
  <!--  台网列表 -->
  <div
    :class="{ 'left--342px': !unfold, 'left-20px': unfold }"
    class="pos-absolute top-80px z-999 box-border min-h-500px w-342px flex flex-col rounded-6px bg-white p-20px transition-all"
  >
    <el-input v-model="filterText" prefix-icon="el-icon-search" placeholder="输入关键字进行过滤" />
    <el-tree
      ref="tree"
      class="mt-16px flex-1 rounded-6px"
      border="1px solid #E5E5EA"
      :props="prop"
      accordion
      :load="load"
      :filter-node-method="filterNodeMethod"
      lazy
      @node-click="nodeClick"
    >
      <template #default="{ node }">
        <span class="text-#2F77C9">
          <i v-if="node.level === 1" class="i-ri:folder-open-fill" />
          <i v-else-if="node.level === 3" class="i-ri:map-pin-2-line" />
          <i v-else class="i-ri:bookmark-fill" />
          <span class="ml-10px text-black">{{ node.label }}</span>
        </span>
      </template>
    </el-tree>
    <div class="right-icon pos-absolute right-0 top-50% h-60px w-35px flex items-center" @click="unfold = !unfold">
      <img src="/img/icon/right.png" alt="" class="cursor-pointer transition" :class="{ 'rotate-0': !unfold, 'rotate-180': unfold }">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-icon {
  border-radius: 0 6px 6px 0;
  background: linear-gradient(153.71deg, rgba(22, 132, 252, 1) 16.54%, rgba(47, 119, 201, 1) 136.86%);
  transform: translateY(-50%) translateX(100%);
}
</style>
