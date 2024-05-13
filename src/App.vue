<script setup>
import { store } from './store/store.js'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import LoginModal from './components/LoginModal.vue';

const router = useRouter()

function handleLogout() {
  store.logOut()
  router.push("/")
}
</script>

<template>
  <header class="z-50 flex sm:flex-row flex-col items-center justify-between bg-gray-800 sm:py-4 px-12">
    <RouterLink to="/">
      <img alt="logo" src="@/assets/webcontent.png" width="256" />
    </RouterLink>
    

      <div class="flex sm:[&>*]:p-4 [&>*]:p-2 font-semibold items-center text-red-500 text-lg">
        <LoginModal v-if="!store.isLoggedIn" />
        <RouterLink to="/kontrolpanel" v-if="store.role === 'Bruger' || store.role === 'Creator'">Guide</RouterLink>
        <RouterLink to="/admin" v-if="store.role === 'Admin'">Bestillinger</RouterLink>
        <RouterLink to="/kontrolpanel" v-if="store.role === 'Admin'">Kontrolpanel</RouterLink>
        <RouterLink to="/min-side" v-if="store.role === 'Bruger' || store.role === 'Creator'">Min Side</RouterLink>
        <RouterLink to="/bestil" v-if="store.role === 'Bruger'">Bestilling</RouterLink>
        <span v-if="store.isLoggedIn" @click="handleLogout" class="cursor-pointer fa fa-sign-out text-xl"></span>
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
  /* transform: translateY(100px) */
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  /* transform: translateY(-100px) */
}

.route-leave-active {
  transition: all 0.3s ease-in
}

</style>