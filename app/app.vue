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
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@import '~/assets/global.scss';
</style>
