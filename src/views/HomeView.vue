<script setup>
import LoginSection from '@/components/home/LoginSection.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import CreateSection from '@/components/home/CreateSection.vue';
import { auth } from '@/store/auth';
import { ref } from 'vue';

const currTab = ref(0)
const prevTab = ref(0)

const handleShowCreate = () => {
  prevTab.value = currTab.value
  currTab.value = 2
}

const handleShowLogin = () => {
  prevTab.value = currTab.value
  currTab.value = 1
}

const handleGoBack = () => {
  currTab.value = prevTab.value
}
</script>

<template>
  <main class="bg-slate-950">
    <div class="text-center">

      <TransitionGroup>
        <LoginSection v-if="!auth.isLoggedIn && currTab === 1" @show-create="handleShowCreate" />
        <CreateSection v-else-if="!auth.isLoggedIn && currTab === 2" @go-back="handleGoBack" />
        <HeroSection v-else @show-login="handleShowLogin" @show-create="handleShowCreate" />
      </TransitionGroup>

      <div class="font-semibold text-white grid justify-center">
        <div class="flex justify-center items-center md:w-[50rem] bg-slate-900 rounded-xl py-6 px-4">
          <div class="flow-element">📝
            <p class="sm:text-xl text-center mt-2">Bestil</p>
          </div>
          <i class="fa md:text-5xl text-3xl fa-long-arrow-right"></i>
          <div class="flow-element">👍
            <p class="sm:text-xl text-center mt-2">Bekræft</p>
          </div>
          <i class="fa md:text-5xl text-3xl fa-long-arrow-right"></i>
          <div class="flow-element">💬
            <p class="sm:text-xl text-center mt-2">Feedback</p>
          </div>
          <i class="fa md:text-5xl text-3xl fa-long-arrow-right"></i>
          <div class="flow-element">📦
            <p class="sm:text-xl text-center mt-2">Produkt</p>
          </div>
        </div>
      </div>

      <div class="py-8 pb-16 sm:px-2 text-white bg-slate-950 grid justify-center">
        <h3 class="text-2xl font-semibold">Bliv inspireret ✨</h3>
        <div class="grid p-8 rounded-lg text-white bg-slate-900 mt-8 md:w-[50rem]">
          <div class="text-xl font-semibold text-left grid justify-center min-w-full">
            <h1 class="text-left">🔥 Populære creators</h1>
            <div class="grid md:grid-cols-5 grid-cols-3 mt-4 max-w-fit gap-6 max-h-[174px] overflow-hidden">
              <div v-for="n in 5" :key="n" class="flex flex-col">
                <div class="w-[120px] h-[150px] bg-gray-500 rounded-md flex justify-center items-center">
                  <i class="fa-4x fa fa-user text-gray-400"></i>
                </div>
                <p class="text-base text-left p-0 m-0">Creatornavn</p>
              </div>
            </div>
          </div>
          

          <div class="text-xl font-semibold text-left grid justify-center min-w-full">
            <h1 class="text-left my-4">🔥 Populært content</h1>
            <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-6 grid-cols-1 sm:max-h-[240px] md:max-h-[270px] overflow-hidden">
              <div v-for="n in 3" :key="n" class="flex flex-col">
                <div class="md:w-[216px] md:h-[270px] sm:w-[192px] sm:h-[240px] w-[408px] h-[510px] bg-gray-500 rounded-md flex justify-center items-center">
                  <i class="fa-3x fa fa-play text-gray-400"></i>
                </div>
                <!-- <p class="text-sm opacity-35 text-left p-0 m-0">{{ n + 3 }}K views via Socialt medie</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.flow-element {
  @apply grid justify-center bg-slate-950 rounded-lg sm:px-2 py-2 md:min-w-[8rem] min-w-[4rem] md:text-4xl text-lg sm:text-xl
}


i {
  @apply sm:px-4 px-2
}

.input {
    @apply rounded-lg bg-slate-600 p-1 text-lg font-normal
}

.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 0.8s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    position: absolute;
}

.v-move {
    z-index: -100;
    opacity: 0;
}
</style>