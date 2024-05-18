import axios from "axios";
import { ref } from "vue";

export const useAxios = () => {
    const data = ref(null)
    const response = ref(null)
    const isLoading = ref(null)
    
    const request = async (config) => {
        isLoading.value = true
        response.value = await axios(config).catch(err => console.error(err))
        data.value = await response.value.data
        isLoading.value = false
        return data.value
    }

    return { request, data, response, isLoading }
} 

// export const useAxios = (config) => {
//         const data = ref(null)
//         const response = ref(null)
//         const isLoading = ref(true)
//         const error = ref(null)

//         axios(config)
//             .then(res => (response.value = res))
//             .then(json => (data.value = json))
//             .catch(err => (error.value = err))
//             .finally(isLoading.value = false)
        
//         return { data, response, isLoading, error }
// }