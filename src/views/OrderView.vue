<script setup>
import { ref } from 'vue'
import OrderPageZero from '../components/OrderPageZero.vue'
import OrderPageOne from '@/components/OrderPageOne.vue';
import OrderPageTwo from '@/components/OrderPageTwo.vue';
import OrderPageThree from '@/components/OrderPageThree.vue';

var currPage = ref(0);

function handleNext() {
  if (currPage.value < 3) {
    currPage.value++
  }
}

function handleBack() {
  if (currPage.value > 0) {
    currPage.value--
  }
}
</script>

<template>
    <div class="grid justify-center text-center m-4">
        
      <!-- Order "navigation" -->
      <h1 class="text-3xl font-semibold">Bestilling</h1>
      <div class="flex m-2 justify-center [&>*]:m-2 self-center items-center">
        <div class="flex flex-col items-center">
          <p class="order-step w-fit" :class="{ 'inactive-link': currPage !== 0, 'active-link': currPage === 0 }">0</p>
          <span class="mt-1" :class="{'opacity-50':currPage !== 0}">Info</span>
        </div>
        
        <i class="fa fa-long-arrow-right fa-2x pb-5" :class="{'opacity-50':currPage <= 0}" aria-hidden="true"></i>
        
        <div class="flex flex-col items-center">
          <p class="order-step w-fit" :class="{ 'inactive-link': currPage !== 1, 'active-link': currPage === 1 }">1</p>
          <span class="mt-1" :class="{'opacity-50':currPage !== 1}">Kontakt</span>
        </div>
        
        <i class="fa fa-long-arrow-right fa-2x pb-5" :class="{'opacity-50':currPage <= 1}" aria-hidden="true"></i>

        <div class="flex flex-col items-center">
          <p class="order-step w-fit" :class="{ 'inactive-link': currPage !== 2, 'active-link': currPage === 2 }">2</p>  
          <span class="mt-1" :class="{'opacity-50':currPage !== 2}">Projekt</span>
        </div>
              
        <i class="fa fa-long-arrow-right fa-2x pb-5"  :class="{'opacity-50':currPage <= 2}" aria-hidden="true"></i>

        <div class="flex flex-col items-center">
          <p class="order-step w-fit" :class="{ 'inactive-link': currPage !== 3, 'active-link': currPage === 3 }">Bestil</p>
          <span class="opacity-0 mt-1">.</span>
        </div>
      </div>
      <div class="grid justify-center">
        <!-- Next and back buttons -->
        
        <!-- Currently rendered component -->
        <TransitionGroup name="order-page" appear tag="div" class="flex">
          <OrderPageZero v-if="currPage === 0" />
          <OrderPageOne v-if="currPage === 1" />
          <OrderPageTwo v-if="currPage === 2" />
          <OrderPageThree v-if="currPage === 3" />
        </TransitionGroup>

        <div class="flex justify-between w-full">
          <button @click="handleBack" class="mx-6">
            <i class="fa fa-arrow-left fa-2x text-white" :class="{'arrow': currPage !== 0}" aria-hidden="true"></i>
          </button>
          <button @click="handleNext" class="mx-2">
              <i class="fa fa-arrow-right fa-2x text-white" :class="{'arrow': currPage !== 3}" aria-hidden="true"></i>
          </button>
        </div>
      </div>

    </div>

</template>

<style scoped>
.inactive-link {
    @apply bg-red-500 rounded-full
}

.active-link {
    @apply bg-red-700 rounded-full
}

.order-page-enter-from {
  opacity: 0;
  transform: translateX(100px)
}

.order-page-enter-to {
  opacity: 1;
  transform: translateX(0)
}

.order-page-enter-active {
  transition: all 0.6s ease-in-out;
}

.order-page-leave-from {
  opacity: 1;
  transform: translateX(0)
}

.order-page-leave-to {
  opacity: 0;
  transform: translateX(-100px)
}

.order-page-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
}

.order-page-move {
  transition: all 0.5s ease-in-out;
}

</style>