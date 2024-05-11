<script setup>
import { store } from '@/store/store';
import DashboardConfirmed from '@/components/min-side/DashboardConfirmed.vue';
import DashboardPool from './DashboardPool.vue';

function handleTabClick(item) {
  store.currDashboardTab = item
}

const unconfirmed = store.orders.filter((i) => i.isConfirmed == false)
const cancelled = store.orders.filter((i) => i.isConfirmed == false)
const closed = store.orders.filter((i) => i.isConfirmed == false)
</script>

<template>
    <div class="grid justify-center text-center w-full">
        <!-- Tabs -->
        <div class="flex justify-center rounded-lg p-1 m-1 mb-[-0.5rem]">
            <span class="btn-tab rounded-tl-lg hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 1, 'bg-red-400': store.currDashboardTab !== 1}" @click="handleTabClick(1)">Bekræftet</span>
            <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 2, 'bg-red-400': store.currDashboardTab !== 2}" @click="handleTabClick(2)">Ubekræftet</span>
            <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 3, 'bg-red-400': store.currDashboardTab !== 3}" @click="handleTabClick(3)">Annulleret</span>
            <span class="btn-tab rounded-tr-lg hover:bg-red-500" :class="{'bg-red-500': store.currDashboardTab === 4, 'bg-red-400': store.currDashboardTab !== 4}" @click="handleTabClick(4)">Færdige</span>
        </div>

        <!-- Dashboard -->
        <TransitionGroup tag="div" class="flex justify-center bg-slate-600 rounded-lg [&>*]:max-w-[50rem]" name="dashboard">
            <DashboardConfirmed v-if="store.currDashboardTab === 1" />
            <DashboardPool v-if="store.currDashboardTab === 2" v-model="unconfirmed">Ubekræftede projekter</DashboardPool>
            <DashboardPool v-if="store.currDashboardTab === 3" v-model="cancelled">Annullerede projekter</DashboardPool>
            <DashboardPool v-if="store.currDashboardTab === 4" v-model="closed">Færdige projekter</DashboardPool>
        </TransitionGroup>
        
    </div>
</template>

<style scoped>
.btn-tab {
    @apply text-lg font-semibold p-2 text-white cursor-pointer duration-200 select-none md:w-28
}

.box {
    box-shadow: -6px -6px red;
}

.dashboard-enter-from {
  opacity: 0;
}

.dashboard-enter-to {
  opacity: 1;
}

.dashboard-enter-active {
  transition: all 0.6s ease-in-out;
}

.dashboard-leave-from {
  opacity: 1;
}

.dashboard-leave-to {
  opacity: 0;
}

.dashboard-leave-active {
  transition: all 0.6s ease-in-out;
  position: absolute;
}

.dashboard-move {
  transition: all 0.6s ease-in-out;
}
</style>