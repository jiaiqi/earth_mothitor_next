<script lang="ts" setup>
const notices = [
  { id: 1, message: '7月24日11时31分新疆克孜勒苏州阿图什市发生4.3级地震' },
  { id: 2, message: '7月25日10时45分四川绵阳市发生3.8级地震' },
  { id: 3, message: '7月26日13时20分云南昆明市发生4.1级地震' },
  { id: 4, message: '7月27日15时10分广西南宁市发生3.9级地震' },
]
</script>

<template>
  <div class="m-y-24px h-68px w-full flex overflow-hidden rounded-full px-24px py-16px" style="border: 1px solid #BCD7FF;">
    <div class="bg-gradient-blue inline-block w-113px rounded-full text-center text-16px lh-35px">
      <i class="i-ri-volume-vibrate-fill text-20px" /> 通知公告
    </div>
    <div class="scroll-wrap flex-1 overflow-hidden rounded-full">
      <div class="scroll-content flex flex-1 whitespace-nowrap">
        <div v-for="item in notices" :key="item.id" class="list-item rounded-full p-x-20px lh-34px">
          {{ item.message }}
        </div>
        <div v-for="item in notices" :key="item.id" class="list-item rounded-full p-x-20px lh-34px">
          {{ item.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  margin: 24px 0;
  height: 68px;
  width: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid #bcd7ff;
  border-radius: 50px;
  padding: 16px;
}

.scroll-wrap {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 16px;
}

.scroll-content {
  display: flex;
  align-items: center;
  animation: scrollLeft 60s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% + -32px)); /* 32px 是两个 list-item 之间的间距 */
  }
}

.list-item {
  background-color: #f1f6ff;
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 16px;
  padding-left: 30px;
  &:hover {
    background-color: var(--color-primary);
    color: #fff;
  }
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background-color: #2b94ed;
    border-radius: 2px;
    transform: rotate(45deg);
    transform-origin: center;
    margin-right: 8px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>
