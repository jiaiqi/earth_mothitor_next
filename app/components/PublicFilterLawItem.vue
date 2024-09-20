<script lang="ts" setup>
const props = defineProps<{
  title: string
  list: string[]
  modelValue?: string | number
}>()
const emit = defineEmits(['update:modelValue'])
const unfold = ref(false)
const selected = ref(props.modelValue || '')
const options = computed<any[]>(() => [ ...props.list])
function onSelect(item: any) {
  if (item && typeof item === 'object') {
    selected.value = item.value
  }
  else {
    selected.value = item
  }
}
watch(() => selected.value, (newVal) => {
  if (newVal !== props.modelValue) {
    emit('update:modelValue', selected.value)
  }
})
</script>

<template>
  <div class="filter-row flex flex-1" border="1px solid #E5E5EA">
    <div class="w-105px bg-#F1F6FF text-center line-height-46px">
      {{ title }}
    </div>
    <div class="custom-style flex flex-1 items-start px-10px py-5px">
      <div
        flex="~ items-center wrap 1"
        class="overflow-hidden"
        :class="{ 'h-auto': unfold, 'h-30px': !unfold }"
      >
        <span
          v-for="(item, index) in options" :key="index"
          :class="{ active: item?.value === selected || item === selected }"
          class="mb-10px cursor-pointer px-20px line-height-30px"
          @click="onSelect(item)"
        >
          <template v-if="typeof item === 'object'">
            {{ item.label }}
          </template>
          <template v-else>
            <div>
              {{ item }}
            </div>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: #fff;
  background-color: #1684fc;
  border-radius: 4px;
}
</style>
