<script setup>
import { store } from '@/store/store';

const props = defineProps({
    admin: {
        type: Boolean,
        default: false,
  }
})

const handleTabClick = (item) => {
  store.currDashboardTab = item
}
</script>

<template>
    <div v-if="!props.admin" class="flex justify-center rounded-lg p-1 m-1 mb-[-0.5rem]">
        <span class="btn-tab rounded-tl-lg hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 1, 'bg-red-400': store.currDashboardTab !== 1}" @click="handleTabClick(1)">Bekræftet</span>
        <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 2, 'bg-red-400': store.currDashboardTab !== 2}" @click="handleTabClick(2)">Ubekræftet</span>
        <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 3, 'bg-red-400': store.currDashboardTab !== 3}" @click="handleTabClick(3)">Annulleret</span>
        <span class="btn-tab rounded-tr-lg hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 4, 'bg-red-400': store.currDashboardTab !== 4}" @click="handleTabClick(4)">Færdige</span>
    </div>
    
    <div v-else class="flex justify-center rounded-lg p-1 m-1 mb-[-0.5rem]">
        <span class="btn-tab rounded-tl-lg hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 1, 'bg-red-400': store.currDashboardTab !== 1}" @click="handleTabClick(1)">Ubekræftet</span>
        <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 2, 'bg-red-400': store.currDashboardTab !== 2}" @click="handleTabClick(2)">Bekræftet</span>
        <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 3, 'bg-red-400': store.currDashboardTab !== 3}" @click="handleTabClick(3)">Annulleret</span>
        <span class="btn-tab rounded-tr-lg hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 4, 'bg-red-400': store.currDashboardTab !== 4}" @click="handleTabClick(4)">Færdige</span>
    </div>
</template>

<style scoped>
.btn-tab {
    @apply text-lg font-semibold p-2 text-white cursor-pointer duration-200 select-none md:w-28
}
</style>