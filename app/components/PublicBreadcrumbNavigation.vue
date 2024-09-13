<script lang="ts" setup>
const props = defineProps({
  path: {
    type: Array,
    default: () => ['首页'],
  },
})
const emit = defineEmits(['navigate'])

function handleClick(index: number, text: string) {
  if (index === 0 && text === '首页') {
    navigateTo('/')
    return
  }
  emit('navigate', index, text)
}
</script>

<template>
  <div class="flex justify-between">
    <div class="flex items-center">
      <div class="pos-relative z-2 h-42px w-42px text-center text-18px text-white line-height-38px">
        <img src="~/assets/images/icons/home.png" alt="" class="pos-absolute h-full w-full">
        <i class="i-ri:home-4-fill" />
      </div>
      <div class="left-text pos-relative left--10px min-w-375px flex pl-20px line-height-34px">
        <div v-for="(item, index) in props.path" :key="item" :class="{ 'cursor-pointer hover:text-blue': index !== props.path.length - 1 }" class="flex items-center" @click="handleClick(index, item)">
          <span>{{ item }}</span>
          <img v-if="props.path.length && props.path.length - 1 > index " src="~/assets/images/icons/right-icon.png" class="mx-15px inline-block h-24px w-24px" alt="">
        </div>
      </div>
    </div>
    <slot name="right">
      <!-- <div class="right w-40% flex py-5px" border="1px solid #E5E5EA">
        <div class="px-16px text-center">
          <i class="i-ri:search-2-line text-20px text-black" />
        </div>
        <input
          placeholder="请输入搜索信息" class="flex-1 indent-16px outline-none"
        >
        <el-button type="primary" class="mx-10px w-96px">
          搜索
        </el-button>
      </div> -->
    </slot>
  </div>
</template>

<style scoped>
.left-text {
  background: linear-gradient(88.74deg, rgba(241, 246, 255, 1) 1.25%, rgba(241, 246, 246, 0) 90.23%);
}
</style>
