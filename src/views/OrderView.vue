<script setup>
import { store } from '@/store/store.js';
import OrderPageZero from '../components/bestil/OrderPageZero.vue'
import OrderPageOne from '@/components/bestil/OrderPageOne.vue';
import OrderPageTwo from '@/components/bestil/OrderPageTwo.vue';
import OrderPageThree from '@/components/bestil/OrderPageThree.vue';
import OrderPageFour from '@/components/bestil/OrderPageFour.vue';
import { auth } from '@/store/auth';

const arrayToString = (string, array) => {
    string = ''
    array.forEach((item) => {
        string += item + ", "
    })

    // Trim excess
    return string.slice(0, string.length - 2)
}

const updateStrings = () => {
  store.orderDataPageTwo.platforms = arrayToString(store.orderDataPageTwo.platforms, store.channelsArr)
  store.orderDataPageTwo.format = arrayToString(store.orderDataPageTwo.format, store.formatArr)
}

const handlePageClick = (id) => {
  store.currOrderPage = id

  if (store.currOrderPage == 4) {
    updateStrings()
  }
}

const handleNext = () => {
  if (store.currOrderPage < 4) {
    store.currOrderPage++

    if (store.currOrderPage == 4) {
      updateStrings()
    }
  }
}

const handleBack = () => {
  if (store.currOrderPage > 0) {
    store.currOrderPage--
  }
}

store.orderDataPageOne.contact = {
    name: auth.loggedInUser.displayName ? auth.loggedInUser.displayName : '',
    phone: auth.loggedInUser.phone ? auth.loggedInUser.phone : '',
    email: auth.loggedInUser.email ? auth.loggedInUser.email : '',
}
</script>

<template>
  <div class="flex justify-center">
    <div class="grid justify-center text-center m-4 bg-slate-800 rounded-lg w-fit p-4">
      <h1 class="text-3xl font-semibold">Bestilling</h1>
      <div class="flex justify-center [&>*]:m-2 self-center items-center cursor-pointer">
        <div class="flex flex-col items-center" @click="handlePageClick(0)">
          <p class="order-step w-fit" :class="{ 'inactive-link': store.currOrderPage !== 0, 'active-link': store.currOrderPage === 0 }">0</p>
          <span class="mt-1" :class="{'opacity-50':store.currOrderPage !== 0}">Start</span>
        </div>
        
        <i class="fa fa-long-arrow-right fa-2x pb-5" :class="{'opacity-50':store.currOrderPage <= 0}" aria-hidden="true"></i>
        
        <div class="flex flex-col items-center cursor-pointer" @click="handlePageClick(1)">
          <p class="order-step w-fit" :class="{ 'inactive-link': store.currOrderPage !== 1, 'active-link': store.currOrderPage === 1 }">1</p>
          <span class="mt-1" :class="{'opacity-50':store.currOrderPage !== 1}">Kontakt</span>
        </div>
        
        <i class="fa fa-long-arrow-right fa-2x pb-5" :class="{'opacity-50':store.currOrderPage <= 1}" aria-hidden="true"></i>

        <div class="flex flex-col items-center cursor-pointer" @click="handlePageClick(2)">
          <p class="order-step w-fit" :class="{ 'inactive-link': store.currOrderPage !== 2, 'active-link': store.currOrderPage === 2 }">2</p>  
          <span class="mt-1" :class="{'opacity-50':store.currOrderPage !== 2}">Projekt</span>
        </div>
              
        <i class="fa fa-long-arrow-right fa-2x pb-5"  :class="{'opacity-50':store.currOrderPage <= 2}" aria-hidden="true"></i>

        <div class="flex flex-col items-center cursor-pointer" @click="handlePageClick(3)">
          <p class="order-step w-fit" :class="{ 'inactive-link': store.currOrderPage !== 3, 'active-link': store.currOrderPage === 3 }">3</p>
          <span class="mt-1" :class="{'opacity-50':store.currOrderPage !== 3}">Content</span>
        </div>

        <i class="fa fa-long-arrow-right fa-2x pb-5"  :class="{'opacity-50':store.currOrderPage <= 3}" aria-hidden="true"></i>

        <div class="flex flex-col items-center cursor-pointer" @click="handlePageClick(4)">
          <p class="order-step w-fit" :class="{ 'inactive-link': store.currOrderPage !== 4, 'active-link': store.currOrderPage === 4 }">Bestil</p>
          <span class="opacity-0 mt-1">.</span>
        </div>
      </div>

      <TransitionGroup name="order-page" appear tag="div" class="flex md:[&>*]:max-w-[568px]">
        <OrderPageZero v-if="store.currOrderPage === 0" />
        <OrderPageOne v-if="store.currOrderPage === 1" />
        <OrderPageTwo v-if="store.currOrderPage === 2" />
        <OrderPageThree v-if="store.currOrderPage === 3" />
        <OrderPageFour v-if="store.currOrderPage === 4" />
      </TransitionGroup>

      <div class="flex w-full" :class="store.currOrderPage === 0 ? 'justify-end' : 'justify-between'">
        <button v-if="store.currOrderPage > 0" @click="handleBack" class="px-2">
          <i class="fa fa-arrow-left fa-2x" :class="store.currOrderPage !== 0 ? 'arrow' : 'text-slate-800'" aria-hidden="true"></i>
        </button>
        <button v-if="store.currOrderPage < 4" @click="handleNext" class="px-2">
            <i class="fa fa-arrow-right fa-2x" :class="store.currOrderPage !== 4 ? 'arrow' : 'text-slate-800'" aria-hidden="true"></i>
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
  transition: all 0.6s ease-in-out;
  position: absolute;
}

.order-page-move {
  transition: all 0.6s ease-in-out;
}

</style>