<script lang="ts" setup>
const props = defineProps<{
  title: string
  showRight?: boolean
  titleStyle?: 'style2'
}>()
</script>

<template>
  <div class="public-title" :class="{ style2: props.titleStyle === 'style2' }">
    <span class="title-icon" />
    <span class="text mx-20px text-size-20px font-700">
      {{ props.title }}
    </span>
    <span v-if="props.showRight" class="title-icon reverse" />
  </div>
</template>

<style lang="scss" scoped>
.public-title {
  font-weight: 600;
  position: relative;
  &.style2 {
    .text {
      margin-left: 36px;
      margin-right: 36px;
    }
    @mixin style2 {
      content: '';
      display: inline-block;
      width: 240px;
      height: 22px;
      background: linear-gradient(86.47deg, rgba(62, 143, 236, 0) 15%, rgba(67, 154, 255, 1) 150%);
      top: 3px;
      left: -5px;
      transform: skewX(155deg);
      position: relative;
      border-radius: 0 3px 3px 0;
    }
    &::before {
      @include style2;
    }
    &::after {
      @include style2;
      transform: skewX(155deg) rotate(180deg);
      margin-left: 10px;
    }
  }
  .title-icon {
    overflow: hidden;
    @mixin bf {
      content: '';
      display: inline-block;
      height: 15px;
      transform: skewY(-45deg) rotate(45deg);
      border-radius: 2px;
    }
    @mixin before {
      @include bf;
      width: 20px;
      background: linear-gradient(139.61deg, rgba(47, 119, 201, 1) 4.16%, rgba(62, 143, 236, 1) 122.08%);
    }
    @mixin after {
      @include bf;
      width: 8px;
      background: #439aff;
    }
    &::before {
      @include before;
    }
    &::after {
      @include after;
    }
    &.reverse {
      &::before {
        @include after;
      }
      &::after {
        @include before;
      }
    }
  }
}
</style>
