<script setup>
import { store } from './store/store.js'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex items-center justify-between bg-gray-800 py-4 px-12">
    <RouterLink to="/">
      <img alt="logo" src="@/assets/webcontent.png" width="256" />
    </RouterLink>
    

      <div class="flex [&>*]:p-4 font-semibold items-center text-red-500 text-lg">
        <RouterLink to="/kontrolpanel" v-if="store.role === 'Bruger' || store.role === 'Creator'">Guide</RouterLink>
        <RouterLink to="/admin-confirm" v-if="store.role === 'Admin'">Bestillinger</RouterLink>
        <RouterLink to="/kontrolpanel" v-if="store.role === 'Admin'">Kontrolpanel</RouterLink>
        <RouterLink to="/min-side" v-if="store.role === 'Bruger' || store.role === 'Creator'">Min Side</RouterLink>
        <RouterLink to="/bestil" v-if="store.role === 'Bruger'">Bestilling</RouterLink>
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