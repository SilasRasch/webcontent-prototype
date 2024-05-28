<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginModal from './components/LoginModal.vue';
import { auth } from './store/auth';

auth.checkOldSession()
</script>

<template>
  <header class="z-50 flex sm:flex-row flex-col items-center justify-between bg-gray-800 sm:py-4 px-12">
    <RouterLink to="/">
      <img alt="logo" src="@/assets/webcontent.png" width="256" />
    </RouterLink>
    

      <div class="flex sm:[&>*]:p-4 [&>*]:p-2 font-semibold items-center text-red-500 text-lg">
        <RouterLink to="/kontrolpanel" v-if="auth.isUser() || auth.isCreator()">Guide</RouterLink>
        <RouterLink to="/admin" v-if="auth.isAdmin()">Bestillinger</RouterLink>
        <RouterLink to="/kontrolpanel" v-if="auth.isAdmin()">Kontrolpanel</RouterLink>
        <RouterLink to="/min-side" v-if="auth.isUser() || auth.isCreator()">Min Side</RouterLink>
        <RouterLink to="/bestil" v-if="auth.isUser()">Bestilling</RouterLink>
        <span v-if="auth.isLoggedIn" class="cursor-pointer fa fa-comments-o text-xl"></span>
        <LoginModal />
        <!-- <span v-if="auth.isLoggedIn" @click="handleLogout" class="cursor-pointer fa fa-sign-out text-xl"></span> -->
      </div>
  </header>

  <!-- <RouterView /> -->
  <RouterView v-slot="{ Component }">
    <Transition name="route" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>

<style scoped>
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

</style>