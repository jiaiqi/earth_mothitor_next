<script lang="ts" setup>
function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function toFeedback() {
  ElMessage.warning('功能正在开发中。。。')
}
</script>

<template>
  <div class="pos-fixed bottom-20vh right-50px z-9 min-h-155px flex flex-col rounded-20px bg-#F1F6FF px-10px py-10px" border="1px solid #BCD7FF">
    <div class="flex flex-1 flex-col cursor-pointer select-none items-center justify-center py-10px active:opacity-75" @click="toFeedback">
      <i class="i-ri:chat-smile-fill text-24px text-#2F77C9" />
      <span class="line-height-30px">信息反馈</span>
    </div>
    <div border="1px solid transparent" class="h-1px b-t-#BCD7FF" />
    <div class="flex flex-1 flex-col cursor-pointer select-none items-center justify-center py-10px active:opacity-75" @click="toTop">
      <i class="i-ri:arrow-up-fill text-24px text-#2F77C9" />
      <span class="line-height-30px">回到顶部</span>
    </div>
  </div>
</template>
