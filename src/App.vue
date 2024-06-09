<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UserModal from './components/modals/UserModal/UserModal.vue';
import { auth } from './store/auth';
// import ChatModal from './components/modals/ChatModal/ChatModal.vue';
</script>

<template>
  <header class="z-50 flex sm:flex-row flex-col items-center justify-between bg-gray-800 sm:py-4 px-12">
    <RouterLink to="/">
      <img alt="logo" src="@/assets/webcontent.png" width="256" />
    </RouterLink>
    

      <div class="flex sm:[&>*]:p-4 [&>*]:p-2 font-semibold items-center text-red-500 text-lg">
        <RouterLink to="/bestil" v-if="auth.isUser()">Bestil</RouterLink>
        <RouterLink to="/admin" v-if="auth.isAdmin()">Dashboard</RouterLink>
        <RouterLink to="/min-side" v-if="auth.isUser() || auth.isCreator()">Min Side</RouterLink>
        <!-- <ChatModal v-if="auth.isLoggedIn" /> -->
        <UserModal v-if="auth.isLoggedIn" />
        <a href="https://webcontent.dk" target="_blank"><img class="max-h-[28px]" src="https://webcontent.dk/wp-content/uploads/2024/01/cropped-logo-hjemmeside-1-32x32.png"></a>
      </div>
  </header>

  <!-- <RouterView /> -->
  <RouterView v-slot="{ Component }">
    <Transition name="route" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>

<style>
.route-enter-from {
  opacity: 0;
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 0.3s ease-in
}

body {
  @apply bg-slate-950 text-white
}
</style>