<script setup>
import { ref } from 'vue';
import { useBrandAPI } from '@/store/api/brandApi';
import { auth } from '@/store/auth';

const api = useBrandAPI()
const brands = ref('')
const model = defineModel()

api.getBrands(auth.loggedInUser.id).then(data => brands.value = data)

let open = ref(false)
const mouseOver = ref(false)

const handleToggle = () => open.value = !open.value;

const handleChoice = (brand) => {
    model.value = brand
}

const handleRemove = () => {
    model.value = {
        name: '',
        cvr: '',
        contact: {
            name: '',
            phone: '',
            email: '',
        }
    }
}
</script>

<template>
    <div class="box-border mb-2">
        <p class="px-0 text-left">Brand <strong :class="{'text-red-500': model.name.length < 1}">*</strong></p>
        <div class="flex justify-between select-btn text-left input-field p-2 cursor-pointer select-none items-center min-h-10"
        @click.self="handleToggle" @mouseenter="mouseOver = true" @mouseleave="mouseOver = false"
        >
            <span v-if="model.name.length < 1" class="btn-text text-left opacity-40" @click.self="handleToggle">
                Vælg brand
            </span>

            <div v-else class="flex z-50">
                <button
                class="opacity-100 hover:opacity-50 flex items-center duration-200 mx-0.5"
                @click="handleRemove()"
                >{{ model.name }} <i v-show="mouseOver" class="fa fa-times text-xs pl-1"></i></button>
            </div>
            <span class="arrow-down fa fa-chevron-down px-2 opacity-80" @click.self="handleToggle"></span>
        </div>
        
        <Transition>
            <ul v-if="open" class="list-items my-1 text-left rounded-xl">
                <li v-for="brand in brands" :key="brand" class="item bg-red-300 rounded-lg p-2 input-field hover:opacity-100 cursor-pointer my-1 md:min-w-[17rem]"
                @click="handleChoice(brand)">
                    <span class="item-text mx-1 text-white font-semibold">{{ brand.name }}</span>
                </li>
                <li class="item bg-red-300 rounded-lg p-2 input-field hover:opacity-100 cursor-pointer my-1 md:min-w-[17rem]">
                    <RouterLink :to="{ path:'/min-side', query:{brands: true}}" class="item-text mx-1 text-white font-semibold">Opret nyt brand</RouterLink>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
  transform: translateY(-10px)
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0)
}

.v-enter-active {
  transition: all 0.4s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
    transform: translateY(0)
}

.v-leave-to {
    opacity: 0;
    transform: translateY(-5px)
}

.v-leave-active {
    transition: all 0.2s ease-in-out;
}

.v-move {
    opacity: 0;
    transition: all 0.2s ease-in-out;
}
</style>