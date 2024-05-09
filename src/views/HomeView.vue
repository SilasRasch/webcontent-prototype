<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="relative text-center">
      <img alt="logo" class="w-screen max-h-[50vh] object-cover object-top filter brightness-50 pointer-events-none" src="https://webcontent.dk/wp-content/uploads/2024/01/kal-visuals-DqmXihYx5UE-unsplash-scaled.jpg" />
      <div class="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl">
        <h1 class="text-5xl text-red-500 font-bold max-w-[40vw]">Velkommen til WebContents all-in-one platform!</h1>
        <h3 class="text-2xl text-white font-bold max-w-[40vw] mt-8">Lad os komme i gang!</h3>
        <div class="flex justify-center items-center">
          <RouterLink to="/bestil">
            <p class="btn-red mt-8 mx-1 w-40">Log ind!</p>
          </RouterLink>
          <RouterLink to="/bestil">
            <p class="btn-red mt-8 mx-1 w-40">Opret bruger...</p>
          </RouterLink>
        </div>
      </div>
      
    </div>
    
  </main>
</template>
