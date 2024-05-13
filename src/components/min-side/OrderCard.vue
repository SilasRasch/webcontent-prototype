<script setup>
import { store } from '@/store/store';
import ToolTip from '../Input/ToolTip.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = parseInt(route.params.id)
const index = store.orders.findIndex((i) => i.orderId === id)

var tmp
if (id > 5) {
    tmp = ref(store.orders[index])
}
else {
    tmp = ref(store.orders[0])
}
const model = tmp

var toggleContact = ref(true)
var toggleProject = ref(true)
var toggleContent = ref(true)

function handleToggleContact() {
    toggleContact.value = !toggleContact.value
}
function handleToggleProject() {
    toggleProject.value = !toggleProject.value
}
function handleToggleContent() {
    toggleContent.value = !toggleContent.value
}

var status = ref('');
var statusClass = ref('bg-red-500')
switch (model.value.status) {
    case 1:
        status.value = 'I kø'
        statusClass.value = 'bg-red-500'
        break;
    case 2:
        status.value = 'Planlægning'
        statusClass.value = 'bg-yellow-500'
        break;
    case 3:
        status.value = 'Igangværende'
        statusClass.value = 'bg-blue-500'
        break;
    case 4:
        status.value = 'Feedback'
        statusClass.value = 'bg-green-500'
        break;        
}
</script>

<template>
    <div class="grid justify-center text-center w-full mt-[-3rem] text-white">
        <div class="grid bg-slate-600 rounded-lg mt-0 md:w-[85vw] sm:w-[80vw] w-[70vw] max-w-[50rem] p-2">
            <h3 class="text-left m-2 bg-red-500 bg-opacity-75 rounded-md p-4 font-semibold text-xl">
                Bestilling {{ model.orderId }}
            </h3>
            <div v-if="model.isConfirmed && !model.isDenied && !model.isComplete" class="flex">
                <h3 class="text-left mx-2 mr-1 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-green-500 w-1/2">
                    Bekræftet!
                </h3>
                <h3 class="text-left mx-2 ml-1 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold w-1/2" :class="statusClass">
                    {{ status }}
                </h3>
            </div>
            <div v-else-if="model.isConfirmed && model.isDenied && !model.isComplete">
                <h3 class="text-left mx-2 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-red-500">
                    Annulleret...
                </h3>
            </div>
            <div v-else-if="model.isConfirmed && !model.isDenied && model.isComplete">
                <h3 class="text-left mx-2 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-violet-500">
                    Færdig!
                </h3>
            </div>
            <div v-else>
                <h3 class="text-left mx-2 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-orange-500">
                    Afventer bekræftelse...
                </h3>
            </div>
            

            <!-- Skal være false hvis abonnement / true ellers -->
            <p @click="handleToggleContact" class="text-left pt-0 opacity-50 px-2 cursor-pointer select-none">
                Kontakt <i class="fa fa-chevron-down text-xs"></i>
            </p>
            <hr class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <div v-if="toggleContact" class="-mb-1"> 
                <div class="grid md:grid-cols-2 grid-cols-1 p-2">
                    <div class="text-left mr-1 bg-slate-800 rounded-lg px-2">
                        <p class="px-0 font-semibold">Brand</p>
                        <p class="input-value" >{{ model.brand }}</p>
                    </div>
                    <div class="text-left ml-1 bg-slate-800 rounded-lg px-2">
                        <p class="px-0 font-semibold">CVR</p>
                        <p class="input-value">{{ model.cvr }}</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-3 grid-cols-1 -mt-2 p-2">
                    <div class="text-left mr-1 bg-slate-800 rounded-lg px-2">
                        <p class="px-0 font-semibold">Kontaktperson</p>
                        <p class="input-value" >{{ model.contact.name }}</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 mx-1 ">
                        <p class="px-0 font-semibold">Telefon</p>
                        <p class="input-value">{{ model.contact.phone }}</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 ml-1 ">
                        <p class="px-0 font-semibold">E-mail</p>
                        <p class="input-value">{{ model.contact.email }}</p>
                    </div>
                </div>

                <div v-if="model.source" class="input text-left -mt-2 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2">
                        <p class="px-0 font-semibold">Hvor har du hørt om os?</p>
                        <p class="input-value">{{ model.source }}</p>
                    </div>
                </div>
            </div>
            
            <p @click="handleToggleProject" class="text-left pt-1 opacity-50 px-2 cursor-pointer select-none">
                Projekt <i class="fa fa-chevron-down text-xs"></i>
            </p>
            <hr class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <div v-if="toggleProject" class="-mb-1">
                <div class="grid md:grid-cols-2 grid-cols-1 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2 mr-1">
                        <p class="px-0 font-semibold">Projektnavn</p>
                        <p class="input-value">{{ model.projectName }}</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 ml-1">
                        <p class="px-0 font-semibold">Projekttype</p>
                        <p class="input-value">{{ model.projectType }}</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-3 grid-cols-1 -mt-2 mb-0 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2 mr-1">
                        <p class="px-0 font-semibold">Mængde af indhold</p>
                        <p class="input-value">{{ model.contentCount }} stk</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 mx-1"> 
                        <p class="px-0 font-semibold">Længde af indhold</p>
                        <p class="input-value">{{ model.contentLength }} sekunder</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 ml-1"> 
                        <p class="px-0 font-semibold">Format</p>
                        <p class="input-value">{{ model.format }}</p>
                    </div>
                </div>

                <div class="input text-left -mt-2 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2 mt-0">
                        <p class="px-0 font-semibold">Tiltænkte platforme</p>
                        <p class="input-value">{{ model.channels }}</p>
                    </div>
                </div>
            </div>

            <!-- Content -->

            <p @click="handleToggleContent" class="text-left pt-1 opacity-50 px-2 cursor-pointer select-none">
                Content <i class="fa fa-chevron-down text-xs"></i>
            </p>
            <hr class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <div v-if="toggleContent" class="">
                <div class="input text-left mb-0 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2">
                        <p class="px-0 font-semibold">Noter til indhold</p>
                        <!-- <textarea class="w-full bg-gray-200 p-2 resize-none" v-model="store.newOrder.notes" disabled></textarea> -->
                        <p class="input-value text-wrap overflow-hidden text-ellipsis">{{ model.notes }}</p>
                    </div>
                </div>

                <div class="flex input text-left p-2 -mt-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2 w-full mr-1">
                        <p class="px-0 font-semibold">Ekstra hook</p>
                        <p v-if="model.extraHook" class="input-value">{{ model.extraHookCount }} stk</p>
                        <p v-else class="input-value">Nej</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 w-full ml-1">
                        <p class="px-0 font-semibold">Ekstra creator</p>
                        <p v-if="model.extraCreator" class="input-value">Ja</p>
                        <p v-else class="input-value">Nej</p>
                    </div>
                </div>

                <div v-if="model.extraNotes" class="text-left bg-slate-800 rounded-lg px-2 mx-2 p-2">
                    <div class="input text-left">
                        <p class="px-0 font-semibold">Ekstra noter</p>
                        <p class="input-value">{{ model.extraNotes }}</p>
                    </div>
                </div>

                <!-- <hr class="text-black bg-black opacity-50 h-0.5 my-2 mb-0 px-2" /> -->
            </div>

            <p class="text-left opacity-50 px-2 select-none">Pris og leveringstid</p>
            <hr class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <!-- Pricing and delivery -->

            <div v-if="!model.isConfirmed" class="grid md:grid-cols-2 grid-cols-1 p-2">
                <div class="text-left bg-slate-800 rounded-lg px-1 mr-1">
                    <p class="font-semibold">Estimeret pris</p>
                    <p class="-mt-4">{{ model.price }} kr ekskl. moms <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">{{ model.price * 1.25 }} kr inkl. moms</ToolTip></p>
                </div>
                <div class="text-left bg-slate-800 rounded-lg px-1 ml-1">
                    <p class="font-semibold">Estimeret leveringstid</p>
                    <p class="-mt-4">{{ model.deliveryTimeFrom }}-{{ model.deliveryTimeTo }} hverdage <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Det er utroligt svært for os at give en præcis deadline for leveringstiden, vi estimerer derfor i intervaller. Husk dog stadig at det er et estimat.</ToolTip></p>
                </div>
            </div>
            <div v-else class="grid md:grid-cols-2 grid-cols-1 p-2">
                <div class="text-left bg-slate-800 rounded-lg px-1 mr-1">
                    <p class="font-semibold">Pris</p>
                    <p class="-mt-4">{{ model.price }} kr ekskl. moms <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">{{ model.price * 1.25 }} kr inkl. moms</ToolTip></p>
                </div>
                <div class="text-left bg-slate-800 rounded-lg px-1 ml-1">
                    <p class="font-semibold">Leveringstid</p>
                    <p class="-mt-4">{{ model.deliveryTimeFrom }}-{{ model.deliveryTimeTo }} hverdage <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Det er utroligt svært for os at give en præcis deadline for leveringstiden, vi giver derfor et interval.</ToolTip></p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped> 
/* [&>*]:text-left [&>*]:mx-2 [&>*]:m-1 md:[&>*]:m-2 */
.order-row {
    @apply bg-opacity-50 bg-red-700 rounded-md text-left
}


.input-value {
    @apply px-0 -mt-4
}
</style>