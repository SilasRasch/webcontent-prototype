<script setup>
import { store } from '@/store/store';
import DashboardConfirmed from '@/components/min-side/DashboardConfirmed.vue';
import DashboardPool from '../min-side/DashboardPool.vue';
import DashboardTabControls from '../min-side/DashboardTabControls.vue';

const unconfirmed = store.orders.filter((i) => i.isConfirmed === false)
const cancelled = store.orders.filter((i) => i.isDenied === true)
const closed = store.orders.filter((i) => i.isComplete === true)
</script>

<template>
    <div class="grid justify-center text-center w-full">
        <!-- Tabs -->
        <DashboardTabControls admin />

        <!-- Dashboard -->
        <TransitionGroup tag="div" class="flex justify-center bg-slate-600 rounded-lg [&>*]:max-w-[50rem]" name="dashboard">
            <DashboardPool v-if="store.currDashboardTab === 1" v-model="unconfirmed" admin>Ubekræftede projekter</DashboardPool>
            <DashboardConfirmed v-if="store.currDashboardTab === 2" admin/>
            <DashboardPool v-if="store.currDashboardTab === 3" v-model="cancelled" admin>Annullerede projekter</DashboardPool>
            <DashboardPool v-if="store.currDashboardTab === 4" v-model="closed" admin>Færdige projekter</DashboardPool>
        </TransitionGroup>
        
    </div>
</template>

<style scoped>
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