<script setup>
import ToolTip from '@/components/Input/ToolTip.vue';
import { auth } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
    let success
    auth.login(email.value, password.value).then(res => success = res).then(() => {
        if (success) {
            email.value = ''
            password.value = ''
            error.value = ''
            auth.isAdmin() ? router.push("/admin") : router.push("min-side")
        }
        else {
            error.value = "Forkert email eller kodeord"
            password.value = ''
        }
    })
}

const handleGoToCreate = () => router.push('/opret')
</script>

<template>
  <main class="bg-slate-950">
    <div class="text-center">
      <section v-if="!auth.isLoggedIn" class="flex justify-center gap-2 md:gap-8 items-center py-8 h-[75vh]">
        <div class="text-red-500 text-left">
          <h1 class="text-2xl font-semibold">WebContent</h1>
          <p class="text-lg font-semibold text-white p-0 m-0 py-2">Alt-i-en platform til content!</p>
        </div>

        <div class="p-2 px-4 rounded-lg text-white bg-gray-900 min-w-[300px] max-w-lg shadow-black shadow-lg">
          <div class="grid w-full">
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
      <section v-else>
        <div class="relative">
          <img alt="logo" class="w-screen max-h-[50vh] object-cover object-top filter brightness-50 pointer-events-none" src="https://webcontent.dk/wp-content/uploads/2024/01/kal-visuals-DqmXihYx5UE-unsplash-scaled.jpg" />
          <div class="z-10 grid justify-center absolute top-[50%] left-2/4 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl max-w-[40vw]">
            <h1 class="md:text-5xl sm:text-3xl text-2xl text-red-500 font-bold">Velkommen til WebContents all-in-one platform!</h1>
            <h3 class="md:text-2xl sm:text-lg text-white font-bold sm:mt-8 my-2">Lad os komme i gang!</h3>
            <div class="flex justify-center items-center">
              <RouterLink to="/bestil">
                <p class="btn-red sm:mt-8 mt-2 mx-1 w-40">Gå til bestilling!</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

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

.input {
    @apply rounded-lg bg-slate-600 p-1 text-lg font-normal
}

</style>