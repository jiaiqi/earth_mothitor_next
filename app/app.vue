<script setup lang="ts">
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

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
  --color-primary: #2f77c9;
}

html.dark {
  background: #222;
  color: white;
}
</style>
