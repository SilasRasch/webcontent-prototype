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
          <div :class="{ 'inactive-link': currPage !== 0, 'active-link': currPage === 0 }" to="/bestil"><p class="order-step">0</p></div>
          <i class="fa fa-long-arrow-right fa-2x" aria-hidden="true"></i>
          <div :class="{ 'inactive-link': currPage !== 1, 'active-link': currPage === 1 }" to="/bestil/first-step"><p class="order-step">1</p></div>
          <i class="fa fa-long-arrow-right fa-2x" aria-hidden="true"></i>
          <div :class="{ 'inactive-link': currPage !== 2, 'active-link': currPage === 2 }" to="/bestil/second-step"><p class="order-step">2</p></div>         
          <i class="fa fa-long-arrow-right fa-2x" aria-hidden="true"></i>
          <div :class="{ 'inactive-link': currPage !== 3, 'active-link': currPage === 3 }" to="/bestil/third-step"><p class="order-step">Bestil</p></div>
      </div>

        <div class="flex justify-center">
          <!-- Next and back buttons -->
          <button @click="handleBack" class="order-arrow-left">
              <i class="fa fa-arrow-left fa-2x text-white" :class="{'arrow': currPage !== 0}" aria-hidden="true"></i>
          </button>
          <!-- Currently rendered component -->
          <TransitionGroup name="order-page" appear tag="div" class="flex">
            <OrderPageZero v-if="currPage === 0" />
            <OrderPageOne v-if="currPage === 1" />
            <OrderPageTwo v-if="currPage === 2" />
            <OrderPageThree v-if="currPage === 3" />
          </TransitionGroup>
          <button @click="handleNext" class="order-arrow-right">
              <i class="fa fa-arrow-right fa-2x text-white" :class="{'arrow': currPage !== 3}" aria-hidden="true"></i>
          </button>
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