<script lang="ts" setup>
import { industry } from '~/api/notice'
import { decode, encode } from '~/utils/base/dataEncry'

const list = ref<any[]>([])
industry(encode({ pageNum: 1, pageSize: 5 })).then((res) => {
  list.value = decode(res)
})

function openUrl(item) {
  window.open(item.url)
}
function openMore(){
  navigateTo({
      path: `/specialList`,
    })
}
</script>

<template>
  <div class="m-x-auto m-y-30px bg-white container md:max-w-1300px">
    <div class="mb-30px flex justify-between">
      <PublicTitle title="专业服务" />
      <div class="flex cursor-pointer items-center font-500" @click="openMore()">
        更多 <i class="i-ri:arrow-right-double-fill" />
      </div>
    </div>
    <div class="grid gap-30px md:grid-cols-2 xl:grid-cols-3">
      <div v-for="item in list.slice(0, 6)" :key="item.id" class="overflow-hidden rounded-20px" border="#E5E5EA 1px solid">
        <div class="h-96px rounded-20px bg-#F1F6FF px-16px py-11px" flex="~ justify-between ">
          <NuxtImg :src="item.photoUrl" placeholder="/img/website.png" class="h-75px w-100px rounded-6px" />
          <div flex="~ 1 col" class="ml-10px">
            <div class="w-[calc(100%_-_10px)] overflow-hidden text-ellipsis whitespace-nowrap font-700" :title="item.deptName">
              {{ item.deptName }}
            </div>
            <div class="line-clamp-2 w-[calc(100%_-_10px)] flex-1 text-14px text-#424242 line-height-25px" :title="item.descrip">
              {{ item.descrip }}
            </div>
          </div>
        </div>
        <div class="flex justify-between px-19px py-9px text-#424242">
          <span class="mr-20px flex-1 overflow-hidden text-ellipsis whitespace-nowrap" :title="item.url">{{ item.url || '' }}</span>
          <div class="flex cursor-pointer items-center font-500" @click="openUrl(item)">
            详情 <i class="i-ri:arrow-right-double-fill" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
