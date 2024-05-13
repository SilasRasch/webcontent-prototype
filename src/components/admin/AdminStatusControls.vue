<script setup>
import { useRouter } from 'vue-router';

const model = defineModel()
const router = useRouter()
const props = defineProps({
    showControls: {
        type: Boolean,
        required: true
    }
})

function handleStatusChange(newCategory) {
    if (newCategory <= 4) {
        model.value.status = newCategory
        model.value.isDenied = false
        model.value.isComplete = false
    } 
    else if (newCategory === 5) {
        model.value.status = 0
        model.value.isDenied = false
        model.value.isComplete = true
    } 
    else if (newCategory === 6) {
        model.value.status = 0
        model.value.isDenied = true
        model.value.isComplete = false
    }
    
    router.push('/admin')
}
</script>

<template>
    <Transition>
        <div v-if="model.isConfirmed && props.showControls">
            <h3 class="text-lg font-semibold">Skift status</h3>
            <div class="flex justify-between gap-2">
                <button v-if="model.status !== 1" @click="handleStatusChange(1)" class="bg-red-500 btn-control"><i class="fa fa-arrow-right"></i> I kø</button>
                <button v-if="model.status !== 2" @click="handleStatusChange(2)"  class="bg-yellow-500 btn-control"><i class="fa fa-arrow-right"></i> Planlægning</button>
                <button v-if="model.status !== 3" @click="handleStatusChange(3)"  class="bg-blue-500 btn-control"><i class="fa fa-arrow-right"></i> I gang</button>
                <button v-if="model.status !== 4" @click="handleStatusChange(4)"  class="bg-green-500 btn-control"><i class="fa fa-arrow-right"></i> Feedback</button>
                <button @click="handleStatusChange(5)"  class="bg-violet-500 btn-control"><i class="fa fa-check"></i></button>
                <button @click="handleStatusChange(6)"  class="bg-red-500 btn-control"><i class="fa fa-trash"></i></button>
            </div>
        </div>
    </Transition>
</template>

<style scoped> 
.btn-control {
    @apply p-2 rounded-lg text-white mb-2 font-semibold w-full shadow-black shadow-sm hover:opacity-80 duration-200
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-25px)
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0)
}

.v-enter-active {
  transition: all 0.6s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
    /* transform: translateY(0) */
}

.v-leave-to {
    z-index: -100;
    opacity: 0;
    /* transform: translateY(25px) */
}

.v-leave-active {
    position: absolute;
}

.v-move {
    z-index: -100;
    opacity: 0;
}
</style>