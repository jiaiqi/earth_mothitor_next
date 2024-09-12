<script lang="ts" setup>
const props = defineProps<{
  title: string
  list: string[]
  default?: string
}>()
const unfold = ref(false)
const selected = ref(props.default || '不限')
const tagList = computed(() => ['不限', ...props.list])
</script>

<template>
  <div class="filter-row flex flex-1" border="1px solid #E5E5EA">
    <div class="w-105px bg-#F1F6FF text-center line-height-46px">
      服务分类
    </div>
    <div class="custom-style flex flex-1 items-start px-10px py-5px">
      <div flex="~ items-center wrap 1" class="overflow-hidden" :class="{ 'h-auto': unfold, 'h-30px': !unfold }">
        <span v-for="item in tagList" :key="item" :class="{ active: item === selected }" class="mb-10px cursor-pointer px-20px line-height-30px" @click="selected = item">{{ item }}</span>
      </div>

      <div class="w-100px cursor-pointer select-none text-right line-height-30px" @click="unfold = !unfold">
        展开 <i class="i-ri:arrow-drop-down-fill inline-block transition" :style="unfold ? 'transform: rotate(180deg);' : ''" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: #fff;
  background-color: #1684fc;
  border-radius: 4px;
}
</style>
