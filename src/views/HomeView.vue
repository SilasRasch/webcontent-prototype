<script setup>
import { store } from '@/store/store';
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="bg-slate-950">
    <div class="text-center">
      <div class="relative">
        <img alt="logo" class="w-screen max-h-[50vh] object-cover object-top filter brightness-50 pointer-events-none" src="https://webcontent.dk/wp-content/uploads/2024/01/kal-visuals-DqmXihYx5UE-unsplash-scaled.jpg" />
        <div class="z-10 grid justify-center absolute top-[50%] left-2/4 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl max-w-[40vw]">
          <h1 class="md:text-5xl sm:text-3xl text-2xl text-red-500 font-bold">Velkommen til WebContents all-in-one platform!</h1>
          <h3 class="md:text-2xl sm:text-lg text-white font-bold sm:mt-8 my-2">Lad os komme i gang!</h3>
          <div v-if="!store.isLoggedIn" class="flex justify-center items-center">
            <button @click="store.toggleLoginModal">
              <p class="btn-red sm:mt-8 mt-2 mx-1 w-40">Log ind!</p>
            </button>
            <RouterLink to="/opret">
              <p class="btn-red sm:mt-8 mt-2 mx-1 w-40">Opret bruger...</p>
            </RouterLink>
          </div>
          <div v-else class="flex justify-center items-center">
            <RouterLink to="/bestil">
              <p class="btn-red sm:mt-8 mt-2 mx-1 w-40">Gå til bestilling!</p>
            </RouterLink>
          </div>
        </div>
      </div>
      

      <div class="sm:text-2xl font-semibold py-10 sm:px-2 bg-slate-800 text-white">
        <div class="flex justify-center items-center">
          <div class="flow-element">📝
            <p class="sm:text-xl text-center mt-2">Bestil</p>
          </div>
          <i class="fa fa-2x fa-long-arrow-right"></i>
          <div class="flow-element">👍
            <p class="sm:text-xl text-center mt-2">Bekræft</p>
          </div>
          <i class="fa fa-2x fa-long-arrow-right"></i>
          <div class="flow-element">💬
            <p class="sm:text-xl text-center mt-2">Feedback</p>
          </div>
          <i class="fa fa-2x fa-long-arrow-right"></i>
          <div class="flow-element">📦
            <p class="sm:text-xl text-center mt-2">Produkt</p>
          </div>
        </div>
        
      </div>
    </div>
  </main>
</template>

<style scoped>
.flow-element {
  @apply grid justify-center bg-slate-900 rounded-lg sm:px-2 py-2 sm:min-w-[15vw] lg:min-w-[12rem] sm:text-4xl text-sm
}


i {
  @apply sm:px-2 lg:px-4 xl:px-8
}
</style>