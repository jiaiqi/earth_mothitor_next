<script
  setup
  lang="ts"
>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <div>
      <NuxtLoadingIndicator color="var(--color-primary)" />
      <el-config-provider :locale="zhCn">
        <NuxtPage
          :transition="{
            name: 'bounce',
            mode: 'out-in',
          }"
        />
      </el-config-provider>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@import '~/assets/global.scss';
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
@media (min-width: 768px) {
  .md\:flex {
    display: flex !important;
  }
}
.iclient-leaflet-logo.leaflet-control {
  display: none;
}
</style>
