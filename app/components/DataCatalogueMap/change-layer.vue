<script lang="ts" setup>
const props = defineProps({
  showTextLayer: Boolean,
  layerName: String,
})
const emit = defineEmits(['update:showTextLayer', 'changeBaseLayer'])
function changeBaseLayer(val: string) {
  emit('changeBaseLayer', val)
}
function changeTextLayer() {
  emit('update:showTextLayer', !props.showTextLayer)
}
const showBtns = ref(false)
const btns = [
  {
    name: '地形图',
    key: 'dx',
    icon: '/img/dx.png',
    event: changeBaseLayer,
  },
  {
    name: '矢量图',
    key: 'sl',
    icon: '/img/sl.png',
    event: changeBaseLayer,
  },
  {
    name: '影像图',
    key: 'yx',
    icon: '/img/yx.png',
    event: changeBaseLayer,
  },
  {
    name: '路网开关',
    key: 'lw',
    icon: '/img/lw.png',
    event: changeTextLayer,
  },
]
</script>

<template>
  <div class="">
    <div class="tiggle" @click="showBtns = !showBtns">
      <i class="i-ri:arrow-left-double-fill transition-all" :class="{ 'rotate-180': showBtns, 'rotate-0': !showBtns }" />
    </div>
    <div>
      <div v-for="item in btns" v-show="props.layerName === item.key || showBtns" :key="item.name" class="switch-btn" @click="item.event(item.key)">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.icon" class="image">
          <div class="bottom">
            <span>{{ item.name }}</span>
          </div>
        </el-card>
      </div>
      <!-- <div class="switch-btn sl" @click="changeBaseLayer('sl')">
        <el-card :body-style="{ padding: '0px' }">
          <img src="/img/sl.png" class="image">
          <div class="bottom">
            <span>矢量图</span>
          </div>
        </el-card>
      </div>
      <div class="switch-btn yx" @click="changeBaseLayer('yx')">
        <el-card :body-style="{ padding: '0px' }">
          <img src="/img/yx.png" class="image">
          <div class="bottom">
            <span>影像图</span>
          </div>
        </el-card>
      </div>
      <div class="switch-btn yx" @click="changeTextLayer">
        <el-card :body-style="{ padding: '0px' }">
          <img src="/img/lw.png" class="image">
          <div class="bottom">
            <span>路网开关</span>
          </div>
        </el-card>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.tiggle {
  position: relative;
  top: 60px;
  left: -27px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 1px #a0a0a0;
  background-color: #fff;
  width: 25px;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
}
.switch-btn {
  height: 80px;
  width: 120px;
  padding: 5px;
  border-radius: 5px;
  background-clip: content-box;
  display: inline-block;
  cursor: pointer;
}
.circle {
  width: 80px;
}
:deep(.el-card__body) {
  flex-direction: column;
}
.switch-btn .image {
  width: 100%;
  height: 60px;
  display: block;
  opacity: 0.8;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  margin: 0 auto;
}
.circle .image {
  margin-top: 10px;
  width: 60px;
  border-radius: 40px;
  border: 2px solid #99999966;
}
.bottom {
  text-align: center;
  cursor: default;
  color: #409eff;
}
</style>
