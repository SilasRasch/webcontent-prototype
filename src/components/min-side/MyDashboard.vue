<script setup>
import { store } from '@/store/store';
import DashboardConfirmed from '@/components/min-side/DashboardConfirmed.vue';
import DashboardPool from './DashboardPool.vue';
import DashboardTabControls from './DashboardTabControls.vue';
import { useOrderAPI } from '@/store/api/orderApi';
import { ref } from 'vue';
import { auth } from '@/store/auth';

const api = useOrderAPI()

const orders = ref(null)
const unconfirmed = ref(null)
const cancelled = ref(null)
const closed = ref(null)
const production = ref(null)

api.getOrders().then((data) => orders.value = data).then((data) => store.orders = data).then(() => {
  if (!auth.isCreator()) {
    unconfirmed.value = store.orders.filter((i) => i.status.state === 0)
    cancelled.value = store.orders.filter((i) => i.status.state === -1)
    closed.value = store.orders.filter((i) => i.status.state === 2)
    // remove at production
    production.value = store.orders.filter((i) => i.status.state === 1 && i.status.category === 3)
  }
  else {
    cancelled.value = store.orders.filter((i) => i.status.state === -1)
    closed.value = store.orders.filter((i) => i.status.state === 2)
    production.value = store.orders.filter((i) => i.status.state === 1 && i.status.category === 3)
  }
})

</script>

<template>
    <div v-if="cancelled && closed && orders" class="-mt-2 grid justify-center text-center w-full">
        <!-- Tabs -->
        <DashboardTabControls />

        <!-- Dashboard -->
        <TransitionGroup v-if="auth.isUser()" tag="div" class="flex justify-center bg-slate-600 rounded-lg [&>*]:max-w-[50rem]" name="dashboard">
          <DashboardConfirmed v-if="store.currDashboardTab === 1" v-model="orders" />
          <DashboardPool v-if="store.currDashboardTab === 2" v-model="unconfirmed">Ubekræftede projekter</DashboardPool>
          <DashboardPool v-if="store.currDashboardTab === 3" v-model="cancelled">Annullerede projekter</DashboardPool>
          <DashboardPool v-if="store.currDashboardTab === 4" v-model="closed">Færdige projekter</DashboardPool>
        </TransitionGroup>
        
        <TransitionGroup v-else-if="auth.isAdmin()" tag="div" class="flex justify-center bg-slate-600 rounded-lg [&>*]:max-w-[50rem]" name="dashboard">
          <DashboardPool v-if="store.currDashboardTab === 1" v-model="unconfirmed" admin>Ubekræftede projekter</DashboardPool>
          <DashboardConfirmed v-if="store.currDashboardTab === 2" v-model="orders" admin/>
          <DashboardPool v-if="store.currDashboardTab === 3" v-model="cancelled" admin>Annullerede projekter</DashboardPool>
          <DashboardPool v-if="store.currDashboardTab === 4" v-model="closed" admin>Færdige projekter</DashboardPool>
        </TransitionGroup>

        <TransitionGroup v-else-if="auth.isCreator()" tag="div" class="flex justify-center bg-slate-600 rounded-lg [&>*]:max-w-[50rem]" name="dashboard">
          <!-- <DashboardConfirmed v-if="store.currDashboardTab === 1" v-model="orders" admin/> -->
          <DashboardPool v-if="store.currDashboardTab === 1" v-model="production" admin>Dine projekter</DashboardPool>
          <DashboardPool v-if="store.currDashboardTab === 2" v-model="cancelled" admin>Annullerede projekter</DashboardPool>
          <DashboardPool v-if="store.currDashboardTab === 3" v-model="closed" admin>Færdige projekter</DashboardPool>
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