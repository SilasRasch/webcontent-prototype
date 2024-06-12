<script setup>
import { auth } from '@/store/auth';
import { ref } from 'vue';
import { useBrandAPI } from '@/store/api/brandApi';
import AddBrandModal from '../modals/BrandsModals/AddBrandModal.vue';
import BrandModal from '../modals/BrandsModals/BrandModal.vue';

const api = useBrandAPI()
const brands = ref(null)

const fetchBrands = () => {
    api.getBrands(auth.loggedInUser.id).then(data => brands.value = data)
}

fetchBrands()
</script>

<template>
    <div class="grid justify-center items-center">
        <div class="grid bg-slate-800 rounded-lg md:w-[50rem] sm:w-[30rem] w-[85vw] text-lg p-2">
            <div class="relative flex justify-center items-center p-1 m-0 bg-red-500 text-white rounded-xl">
                <h3 class="text-xl font-semibold">Mine brands</h3>
                <!-- <i class="fa fa-filter text-xl absolute right-3 cursor-pointer"></i> -->
            </div>

            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none mt-2" />

            <div v-if="brands" class="mt-2 rounded-lg text-left grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2">
                <AddBrandModal @refetch="fetchBrands()" />
                <BrandModal v-for="brand in brands" :key="brand.id" :brand="brand" />
            </div>
            <div v-else class="bg-slate-900 p-2 m-2 rounded-lg text-left grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2">
                <AddBrandModal />
            </div>
        </div>
    </div>
</template>