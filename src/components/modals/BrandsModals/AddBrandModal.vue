<script setup>
import DoubleInput from '@/components/Input/DoubleInput.vue';
import { useBrandAPI } from '@/store/api/brandApi';
import { auth } from '@/store/auth';
import { computed, ref } from 'vue';

const emit = defineEmits(["refetch"])
const showModal = ref(false)
const semiConfirm = ref(false)

const handleToggle = () => {
    showModal.value = !showModal.value
    semiConfirm.value = false
    brand.value = { id: 0, name: '', url: '', userId: auth.loggedInUser.id}
}

const brand = ref({ id: 0, name: '', url: '', userId: auth.loggedInUser.id})

const handleSemiConfirm = () => {
    if (validate.value) {
        semiConfirm.value = true
    }
}

const handleAdd = () => {
    if (validate.value) {
        const api = useBrandAPI()
        api.postBrand(brand.value).then(() => {
            handleToggle()
            emit('refetch')
        })
    }
}

const validate = computed(() => {
    if (brand.value.name !== '' && brand.value.userId !== null && brand.value.url !== '')
        return true
    return false
})
</script>

<template>
    <div class="grid items-center justify-center gap-2 bg-slate-900 rounded-lg h-24 fa fa-plus cursor-pointer bg-opacity-80 hover:bg-opacity-100 duration-200"
    @click="handleToggle"></div>

    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 fixed bg-black bg-opacity-50 w-full h-full top-0 left-0">
                <div class="text-base grid justify-center p-2 px-4 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <p class="text-center font-semibold">Opret nyt brand</p>
                    <DoubleInput v-model:firstInput="brand.name" v-model:secondInput="brand.url" required
                    placeholder-one="Navnet på brandet" placeholder-two="Brandets CVR">
                        <template v-slot:slotOne>Brandnavn</template>
                        <template v-slot:slotTwo>URL</template>
                    </DoubleInput>

                    <hr class="text-black bg-black opacity-50 h-0.5 m-1" />

                    <button v-if="!semiConfirm" class="bg-green-500 hover:bg-green-600 duration-200 rounded-lg p-2 mx-1 mt-3"
                    @click="handleSemiConfirm">Tilføj</button>
                    <button v-else class="bg-green-500 hover:bg-green-600 duration-200 rounded-lg p-2 mx-1 mt-3"
                    @click="handleAdd">Er du sikker?</button>
                    <p class="text-sm text-center p-0 mt-2" :class="semiConfirm ? 'text-red-500' : 'text-gray-400'">* Der vil blive pålagt et ekstra brand gebyr på 2500kr / mdl.</p>
                </div>
            </div>
        </Transition>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 0.2s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    transition: all 0.2s ease-in-out;
}

.v-move {
    opacity: 0;
    transition: all 0.2s ease-in-out;
}
</style>