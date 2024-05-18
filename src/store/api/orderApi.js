import { auth } from "../auth"
// import { store } from "../store"
import axios from "axios"

const baseURL = "http://192.168.100.201:8282/api/orders"
var config = { baseURL: baseURL, method: 'get', url: '' }

export const orderApi = {
    getOrders: async () => {
        config.method = 'get'
        config.url = !auth.isAdmin() ? `?userId=${auth.loggedInUser.id}` : '/'

        const res = await axios(config).catch(err => console.error(err))
        const data = await res.data
        return data
    },
    getOrder: async (id) => {
        config.method = 'get'
        config.url = `/${id}`

        const res = await axios(config).catch(err => console.error(err))
        return await res.data
    },
    putOrder: async (id, order) => {
        config.method = 'put'
        config.url = toString(id)

        const uri = '/' + id
        await axios.put(baseURL + uri, order)
            .then(response => {
                return response
            })
            .catch(error => console.error(error))
    },
    postOrder: async (order) => {
        config.method = 'post'
        config.url = ''

        await axios.post(baseURL, order)
            .then(res => {
                return res
            })
            .catch(error => console.error(error))
    },
    deleteOrder: async (id) => {
        config.method = 'delete'
        config.url = toString(id)

        const uri = '/' + id
        await axios.delete(baseURL + uri)
            .then(res => {
                return res
            })
            .catch(error => console.error(error))
    }
}