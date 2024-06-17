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

const baseURL = "https://content.wcp.dk/"

const creatorCards = [ 
  { name: "Christoffer", link: "images/Christoffer.jpg" },
  { name: "Frederikke", link: "images/Frederikke.jpg" },
  { name: "Nanna", link: "images/Nanna.jpg" },
  { name: "Nikita", link: "images/Nikita.jpg" },
  { name: "Nina", link: "images/Nina.jpg" },
]

const videos = ref([
  { id: 'video1', link: 'videos/video1.mp4', isPlaying: false },
  { id: 'video2', link: 'videos/video2.mp4', isPlaying: false },
  { id: 'video3', link: 'videos/video3.mp4', isPlaying: false },
])

function playPause(id, index) {
  var video = document.getElementById(id)

  if (video.paused) {
    video.volume = 0.1
    videos.value[index].isPlaying = true
    video.play()
  } else {
    videos.value[index].isPlaying = false
    video.pause()
  }
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
        <div class="flex justify-center items-center md:w-[50rem] bg-slate-900 rounded-lg py-6 px-4">
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
            <div class="grid md:grid-cols-5 grid-cols-3 mt-4 max-w-fit gap-6 max-h-[32vw] sm:max-h-[33vw] md:max-h-[174px] overflow-hidden">
              <div v-for="creator in creatorCards" :key="creator.name" class="flex flex-col">
                <img class="w-[22vw] sm:w-[24vw] md:w-[120px] bg-gray-500 rounded-md flex justify-center items-center" :src="baseURL + creator.link">
                <p class="text-base text-left p-0 m-0 opacity-80">{{ creator.name }}</p>
              </div>
            </div>
          </div>
          

          <div class="text-xl font-semibold text-left grid justify-center min-w-full">
            <h1 class="text-left my-4">🔥 Populært content</h1>
            <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-6 grid-cols-1 sm:max-h-[47vw] md:max-h-[270px] overflow-hidden">
              <div v-for="video, index in videos" :key="video.id" class="flex flex-col">
                <div class="md:w-[216px] md:h-[270px] sm:w-[37.5vw] w-[75vw] bg-gray-500 rounded-md flex justify-center items-center relative">
                  <video :id="video.id" class="w-full h-full rounded-lg" @click="playPause(video.id, index)">
                    <source :src="baseURL + video.link" type="video/mp4">
                  </video>
                  <i v-show="!video.isPlaying" class="fa-3x fa fa-play text-gray-400 absolute hover:text-gray-300 duration-300 cursor-pointer" @click="playPause(video.id, index)"></i>
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