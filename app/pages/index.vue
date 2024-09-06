<script setup>
import { ref } from 'vue'

const online = ref(true) // 假设从某个地方获取在线状态
</script>

<template>
  <Suspense>
    <ClientOnly>
      <div>
        <div v-if="online">
          <Home />
        </div>
        <div v-else text-gray:80>
          You're offline
        </div>
      </div>
    </ClientOnly>
    <template #fallback>
      <div italic op50>
        <div animate-pulse>
          Loading...
        </div>
      </div>
    </template>
  </Suspense>
</template>
