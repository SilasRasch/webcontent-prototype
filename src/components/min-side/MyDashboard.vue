<script setup>
import { ref } from 'vue';
import DashboardConfirmed from '@/components/min-side/DashboardConfirmed.vue';
import DashboardPool from './DashboardPool.vue';

var currTab = ref(1)

function handleTabClick(item) {
    currTab.value = item
    console.log(currTab.value);
}

const arr = [1,2,3,4,5]
</script>

<template>
    <div class="grid justify-center text-center w-full">
        <!-- Tabs -->
        <div class="flex justify-center rounded-lg p-1 m-1 mb-[-0.5rem]">
            <span class="btn-tab rounded-tl-lg hover:bg-red-500" :class="{'bg-red-500': currTab === 1, 'bg-red-400': currTab !== 1}" @click="handleTabClick(1)">Bekræftet</span>
            <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': currTab === 2, 'bg-red-400': currTab !== 2}" @click="handleTabClick(2)">Ubekræftet</span>
            <span class="btn-tab hover:bg-red-500" :class="{'bg-red-500': currTab === 3, 'bg-red-400': currTab !== 3}" @click="handleTabClick(3)">Annulleret</span>
            <span class="btn-tab rounded-tr-lg hover:bg-red-500" :class="{'bg-red-500': currTab === 4, 'bg-red-400': currTab !== 4}" @click="handleTabClick(4)">Færdige</span>
        </div>

        <!-- Dashboard -->
        <TransitionGroup tag="div" class="flex justify-center bg-slate-300 rounded-lg [&>*]:max-w-[50rem]" name="dashboard">
            <DashboardConfirmed v-if="currTab === 1" />
            <DashboardPool v-if="currTab === 2" v-model="arr">Ubekræftede projekter</DashboardPool>
            <DashboardPool v-if="currTab === 3" v-model="arr">Annullerede projekter</DashboardPool>
            <DashboardPool v-if="currTab === 4" v-model="arr">Færdige projekter</DashboardPool>
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