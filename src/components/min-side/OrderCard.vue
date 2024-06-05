<script setup>
import ToolTip from '../Input/ToolTip.vue';
import { computed, ref } from 'vue';
import ConfirmControls from '../admin/ConfirmControls.vue';
import LinkModal from '../modals/LinkModal.vue';
import { auth } from '@/store/auth';
import AddCreatorModal from '../modals/ScriptModal/AddCreatorModal.vue';
import CreatorModal from '../modals/ScriptModal/CreatorModal.vue';
import { useOrderAPI } from '@/store/api/orderApi';

const model = defineModel()
const emit = defineEmits(["refetch"])
const api = useOrderAPI()

// Toggle switches for information
let toggleContact = ref(model.value.status.category > 0 ? false : true)
let toggleProject = ref(true)
let toggleContent = ref(model.value.status.category > 0 ? false : true)

const handleToggleContact = () => toggleContact.value = !toggleContact.value
const handleToggleProject = () => toggleProject.value = !toggleProject.value
const handleToggleContent = () => toggleContent.value = !toggleContent.value

const handleRemoveCreator = (id) => {
    model.value.creators = model.value.creators.filter(x => x.id === id)
    console.log(model.value.creators);
    api.putOrder(model.value.id, model.value).then(() => emit("refetch"))
}

const isVideo = computed(() => {
    if (model.value.projectType !== 'Statics' && model.value.projectType !== 'Stilbilleder' && model.value.projectType !== '') {
        return true
    }

    return false
})

console.log(model.value.creatorList);

// Compute text and colors to display
const status = computed(() => {
    let tmp;
    switch (model.value.status.category) {
        
        case 1:
            tmp = 'I kø'
            break;
        case 2:
            tmp = 'Planlægning'
            break;
        case 3:
            tmp = 'Igangværende'
            break;
        case 4:
            tmp = 'Feedback'
            break;        
    }

    return tmp
}) 

const statusClass = computed(() => {
    let tmp;
    switch (model.value.status.category) {
        case 1:
            tmp = 'bg-red-500'
            break;
        case 2:
            tmp = 'bg-yellow-500'
            break;
        case 3:
            tmp = 'bg-blue-500'
            break;
        case 4:
            tmp = 'bg-green-500'
            break;        
    }

    return tmp
}) 

const minifyCard = ref(false)

const toggleMinimize = () => {
    minifyCard.value ? miniToMaxi() : maxiToMini()
}

const miniToMaxi = () => {
    minifyCard.value = false
    toggleContact.value = true
    toggleContent.value = true
    toggleProject.value = true
}

const maxiToMini = () => {
    minifyCard.value = true
    toggleContact.value = false
    toggleContent.value = false
    toggleProject.value = false
}
</script>

<template>
    <div v-if="model" class="grid justify-center text-center w-full mt-[-3rem] text-white">
        <div class="break-words" :class="minifyCard ? 'minimized' : 'maximized'">
            <div class="flex items-center justify-between text-left m-2 bg-red-500 bg-opacity-75 rounded-md p-4 font-semibold text-xl">
                <h3>{{ auth.isCreator() ? model.projectName : `Bestilling ${model.id}` }}</h3>
                <i v-if="!minifyCard" @click="toggleMinimize()" class="fa fa-angle-double-left hover:text-gray-300 duration-200 cursor-pointer"></i>
                <i v-else @click="toggleMinimize()" class="fa fa-angle-double-right hover:text-gray-300 duration-200 cursor-pointer"></i>
            </div>
            
            <div v-if="model.status.state === 1 && !auth.isCreator()" class="flex">
                <h3 class="text-left text-base mx-2 mr-1 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-green-500 w-1/2">
                    Bekræftet!
                </h3>
                <h3 class="text-left text-base mx-2 ml-1 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold w-1/2" :class="statusClass">
                    {{ status }}
                </h3>
            </div>
            <div v-else-if="model.status.state === -1 && !auth.isCreator()">
                <h3 class="text-left text-base mx-2 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-red-500">
                    Annulleret...
                </h3>
            </div>
            <div v-else-if="model.status.state === 2 && !auth.isCreator()">
                <h3 class="text-left text-base mx-2 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-violet-500">
                    Færdig!
                </h3>
            </div>
            <div v-else-if="!auth.isCreator()">
                <h3 class="text-left text-base mx-2 mb-2 bg-opacity-50 rounded-md px-4 py-2 font-semibold bg-orange-500">
                    Afventer bekræftelse...
                </h3>
            </div>

            <!-- Projekt info -->
            
            <div @click="handleToggleProject" class="flex items-center opacity-50 text-left text-base pr-2 cursor-pointer select-none">
                <p class="pr-1.5">
                    Projekt 
                </p>
                <i class="fa fa-chevron-down text-xs mt-1"></i>
            </div>
            
            <hr class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <div v-if="toggleProject" class="-mb-1">
                <div class="grid md:grid-cols-2 grid-cols-1 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:mr-1 md:my-0 my-1">
                        <p class="px-0 font-semibold">Projektnavn</p>
                        <p class="input-value">{{ model.projectName }}</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:ml-1 md:mt-0 mt-1">
                        <p class="px-0 font-semibold">Projekttype</p>
                        <p class="input-value">{{ model.projectType }}</p>
                    </div>
                </div>

                <div v-if="isVideo" class="grid md:grid-cols-3 grid-cols-1 -mt-2 mb-0 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:mr-1 md:mb-0 mb-1">
                        <p class="px-0 font-semibold">Mængde af indhold</p>
                        <p class="input-value">{{ model.contentCount }} stk</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:mx-1 md:my-0 my-1"> 
                        <p class="px-0 font-semibold">Længde af indhold</p>
                        <p class="input-value">{{ model.contentLength }} sekunder</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:ml-1 md:mt-0 mt-1"> 
                        <p class="px-0 font-semibold">Format</p>
                        <p class="input-value">{{ model.format }}</p>
                    </div>
                </div>
                <div v-else class="grid md:grid-cols-2 grid-cols-1 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:mr-1 md:my-0 my-1">
                        <p class="px-0 font-semibold">Mængde af indhold</p>
                        <p class="input-value">{{ model.contentCount }} stk</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:ml-1 md:mt-0 mt-1">
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

            <!-- Content info -->

            <div @click="handleToggleContent" class="flex items-center opacity-50 text-left text-base pr-2 cursor-pointer select-none">
                <p class="pr-1.5">
                    Content 
                </p>
                <i class="fa fa-chevron-down text-xs mt-1"></i>
            </div>
            <hr class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <div v-if="toggleContent" class="">
                <div class="input text-left mb-0 p-2">
                    <div class="text-left bg-slate-800 rounded-lg px-2">
                        <p class="px-0 font-semibold">Noter til indhold</p>
                        <p class="input-value text-wrap overflow-hidden text-ellipsis">{{ model.notes }}</p>
                    </div>
                </div>

                <div v-if="isVideo" class="flex input text-left p-2 -mt-2">
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

                <div v-if="model.extraNotes" class="text-left bg-slate-800 rounded-lg px-2 mx-2 pb-1">
                    <div class="input text-left">
                        <p class="px-0 font-semibold">Ekstra noter</p>
                        <p class="input-value">{{ model.extraNotes }}</p>
                    </div>
                </div>
            </div>

            <div v-if="!auth.isCreator()" @click="handleToggleContact" class="flex items-center opacity-50 text-left text-base pr-2 cursor-pointer select-none">
                <p class="pr-1.5">
                    Kontakt 
                </p>
                <i class="fa fa-chevron-down text-xs mt-1"></i>
            </div>
            <hr v-if="!auth.isCreator()" class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <!-- Contact info -->

            <div v-if="toggleContact && !auth.isCreator()" class="-mb-1"> 
                <div class="grid md:grid-cols-2 grid-cols-1 p-2">
                    <div class="text-left md:mr-1 bg-slate-800 rounded-lg px-2 md:my-0 my-1">
                        <p class="px-0 font-semibold">Brand</p>
                        <p class="input-value" >{{ model.brand }}</p>
                    </div>
                    <div class="text-left md:ml-1 bg-slate-800 rounded-lg px-2 md:mt-0 mt-1">
                        <p class="px-0 font-semibold">CVR</p>
                        <p class="input-value">{{ model.cvr }}</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-3 grid-cols-1 -mt-2 p-2">
                    <div class="text-left md:mr-1 bg-slate-800 rounded-lg px-2 md:mb-0 mb-1">
                        <p class="px-0 font-semibold">Kontaktperson</p>
                        <p class="input-value" >{{ model.contact.name }}</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:mx-1 md:my-0 my-1">
                        <p class="px-0 font-semibold">Telefon</p>
                        <p class="input-value">{{ model.contact.phone }}</p>
                    </div>
                    <div class="text-left bg-slate-800 rounded-lg px-2 md:ml-1 md:mt-0 mt-1">
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

            <p v-if="!auth.isCreator()" class="text-left text-base opacity-50 px-2 select-none">Pris og leveringstid</p>
            <hr v-if="!auth.isCreator()" class="text-black bg-black opacity-50 h-0.5 mb-0 px-2" />

            <!-- Pricing and delivery -->

            <div v-if="model.status.state === 0 && !auth.isCreator()" class="grid md:grid-cols-2 grid-cols-1 p-2" :class="{'text-sm':minifyCard}">
                <div class="text-left bg-slate-800 rounded-lg px-1 mr-1">
                    <p class="font-semibold">Estimeret pris</p>
                    <p class="-mt-4">{{ model.price }} kr ekskl. moms <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">{{ model.price * 1.25 }} kr inkl. moms</ToolTip></p>
                </div>
                <div class="text-left bg-slate-800 rounded-lg px-1 ml-1">
                    <p class="font-semibold">Estimeret leveringstid</p>
                    <p class="-mt-4">{{ model.deliveryTimeFrom }}-{{ model.deliveryTimeTo }} hverdage <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Det er utroligt svært for os at give en præcis deadline for leveringstiden, vi estimerer derfor i intervaller. Husk dog stadig at det er et estimat.</ToolTip></p>
                </div>
            </div>
            <div v-else-if="!auth.isCreator()" class="grid md:grid-cols-2 grid-cols-1 p-2" :class="{'text-sm':minifyCard}">
                <div class="text-left bg-slate-800 rounded-lg px-1 md:mr-1 my-1">
                    <p class="font-semibold text-base">Pris <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">{{ model.price * 1.25 }} kr inkl. moms</ToolTip></p>
                    <p class="-mt-4">{{ model.price }} kr ekskl. moms </p>
                </div>
                <div class="text-left bg-slate-800 rounded-lg px-1 md:ml-1 my-1">
                    <p class="font-semibold text-base">Leveringstid <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Det er utroligt svært for os at give en præcis deadline for leveringstiden, vi giver derfor et interval.</ToolTip></p>
                    <p class="-mt-4">{{ model.deliveryTimeFrom }}-{{ model.deliveryTimeTo }} hverdage </p>
                </div>
            </div>
        </div>
        
        <div v-if="(model.links) && (model.links && model.status.category > 1 && auth.isUser()) || (model.links && auth.isAdmin() || auth.isCreator())" class="flex justify-evenly gap-2 w-full mt-2 bg-slate-600 p-2 rounded-lg">
            <LinkModal name="Scripts" v-model="model.links.scripts" :id="model.id" />
            <LinkModal v-if="(model.status.category > 2 && auth.isAdmin()) || (model.status.category > 3 && auth.isUser()) || auth.isCreator()" name="Content" v-model="model.links.content" :id="model.id" />
            <LinkModal name="Andet" v-model="model.links.other" :id="model.id" />
        </div>


        <div v-if="(model.status.state > 0) && ((model.status.category > 1 && auth.isUser()) || auth.isAdmin() || auth.isCreator())" class="flex flex-col justify-center w-full mt-2 bg-slate-600 p-2 rounded-lg">
            <p class="font-semibold text-lg">Creators</p>
            <div class="flex w-full mt-2 bg-slate-800 rounded-lg" :class="{'justify-center':!auth.isAdmin()}">
                <CreatorModal v-for="creator in model.creatorList" :key="creator.id" :creator="creator" @remove-creator="(n) => handleRemoveCreator(n)" />
                <AddCreatorModal v-model="model" @refetch="$emit('refetch')" />
            </div>
        </div>
        <!-- Confirm controls -->
        <ConfirmControls v-model="model" />
    </div>
    
</template>

<style scoped> 
.order-row {
    @apply bg-opacity-50 bg-red-700 rounded-md text-left
}

.input-value {
    @apply px-0 -mt-4
}

.maximized {
    @apply grid bg-slate-600 rounded-lg mt-0 lg:min-w-[35rem] sm:w-[40rem] sm:max-w-[40rem] p-2 w-[80vw]
}

.minimized {
    @apply grid bg-slate-600 rounded-lg mt-0 md:w-[45vw] sm:w-[30w] w-[35vw] md:max-w-[30rem] min-w-[20rem] p-2 text-sm
}
</style>