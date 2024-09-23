<script
  setup
  lang="ts"
>
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
      <NuxtPage
        :transition="{
          name: 'bounce',
          mode: 'out-in',
        }"
      />
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
