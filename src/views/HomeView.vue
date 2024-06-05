<script setup>
import ToolTip from '@/components/Input/ToolTip.vue';
import { auth } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const showLogin = ref(false)

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  if (email.value !== '' && password.value !== '') {
    let success
    auth.login(email.value, password.value).then(res => success = res).then(() => {
      if (success) {
          email.value = ''
          password.value = ''
          error.value = ''
          // auth.isAdmin() ? router.push("/admin") : router.push("min-side")
      }
      else {
          error.value = "Forkert email eller kodeord"
          password.value = ''
      }
    })
  }
}

const handleGoToCreate = () => router.push('/opret')
</script>

<template>
  <main class="bg-slate-950">
    <div class="text-center">

      <TransitionGroup>
        <section v-if="!auth.isLoggedIn && showLogin" class="flex justify-center gap-2 md:gap-8 items-center py-24">
          <div class="text-red-500 text-left">
            <h1 class="text-2xl font-semibold">WebContent</h1>
            <p class="text-lg font-semibold text-white p-0 m-0 py-2">Alt-i-en platform til content!</p>
          </div>

          <div class="pb-2 px-4 rounded-lg text-white bg-gray-900 min-w-[300px] max-w-lg shadow-black shadow-lg">
            <div class="grid w-full" @keyup.enter="handleLogin">
                <div class="grid pt-2 w-full">
                    <p class="text-left p-0 py-1">E-mail <ToolTip class="bg-gray-800" label="i">Test credentials <br> Brugernavn: admin <br> Kodeord: test</ToolTip> </p>
                    <input v-model="email" type="email" class="input" />
                </div>
                <div class="grid pb-2 w-full">
                    <p class="text-left p-0 py-1">Kodeord</p>
                    <input v-model="password" type="password" class="input" />
                </div>
                <div class="flex justify-between py-1 text-base w-full">
                    <button @click="handleLogin" class="bg-green-500 p-2 rounded-lg w-1/2 mr-1 hover:bg-green-600 duration-200">Log ind</button>
                    <button @click="handleGoToCreate" class="bg-red-500 p-2 rounded-lg w-1/2 ml-1 hover:bg-red-600 duration-200">Få adgang</button>
                </div>
                <div class="text-base cursor-pointer hover:text-blue-500 duration-300">Glemt kodeord?</div>
                <div v-if="error" class="text-red-600 text-base">
                    * {{ error }}
                </div>
            </div>
          </div>
        </section>

        <section v-else class="flex flex-col justify-center items-center text-center gap-8 py-24">
          <h1 class="md:text-5xl sm:text-3xl text-2xl text-red-500 font-bold max-w-[48rem]">WebContents platform er en all-in-one content løsning.</h1>
          <h3 class="md:text-2xl sm:text-lg text-white font-bold">Lad os komme i gang!</h3>
          <!-- <RouterLink v-if="auth.isUser()" to="/bestil" class="flex justify-center">
            <p class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200">Opret nyt projekt</p>
          </RouterLink> -->
          <div v-if="auth.isUser()" class="flex justify-center gap-2">
            <RouterLink to="/bestil" class="flex justify-center">
              <p class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200">Opret nyt projekt</p>
            </RouterLink>
            <RouterLink to="/min-side" class="flex justify-center">
              <p class="p-2 px-4 text-white bg-red-300 rounded-full font-semibold hover:bg-red-400 duration-200">Gå til dashboard</p>
            </RouterLink>
          </div>
          <RouterLink v-else-if="auth.isAdmin()" to="/admin" class="flex justify-center">
            <p class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200">Gå til dashboard</p>
          </RouterLink>
          <RouterLink v-else-if="auth.isCreator()" to="/min-side" class="flex justify-center">
            <p class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200">Gå til dashboard</p>
          </RouterLink>
          <div v-else class="flex justify-center gap-2">
            <button @click="showLogin = true" class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200 min-w-28">Log ind</button>
            <button @click="handleGoToCreate" class="p-2 px-4 text-white bg-red-300 rounded-full font-semibold hover:bg-red-400 duration-200 min-w-28">Få adgang</button>
          </div>
        </section>
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
            <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-6 grid-cols-1 sm:max-h-[290px] overflow-hidden">
              <div v-for="n in 3" :key="n" class="flex flex-col">
                <div class="md:w-[216px] md:h-[270px] sm:w-[192px] sm:h-[240px] w-[408px] h-[510px] bg-gray-500 rounded-md flex justify-center items-center">
                  <i class="fa-3x fa fa-play text-gray-400"></i>
                </div>
                <p class="text-sm opacity-35 text-left p-0 m-0">{{ n + 3 }}K views via Socialt medie</p>
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