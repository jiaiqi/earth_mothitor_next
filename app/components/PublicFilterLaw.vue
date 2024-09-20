<script lang="ts" setup>
const props = defineProps({
  filterList: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['change'])
const list = ref<any[]>([])
watch(() => props.filterList, () => {
  list.value = props.filterList
}, {
  deep: true,
  immediate: true,
})

// const filterList = computed<any[]>(() => props.filterList || [])
watch(() => list.value, () => {
  const currentData = list.value.reduce((acc, cur) => {
    acc[cur.key] = cur.value
    return acc
  }, {})
  emit('change', currentData)
}, {
  deep: true,
})
</script>

<template>
  <div class="filter-box m-y-20px">
    <PublicFilterLawItem v-for="(item, index) in list" :key="index" v-model:model-value="item.value" :list="item.options" :title="item.label" />
  </div>
</template>

<style>

</style>
