// import { useFetch } from "./useFetch"
import { store } from "../store"
import axios from "axios"

const uri = "http://192.168.100.201:8282/api/orders/"

export const orderApi = {
    getOrders: async () => {
        await axios.get(uri)
            .then(res => {
                store.orders = res.data
                return res.data
            })
            .catch(error => console.error(error))
    },
    getOrder: async (id) => {
        await axios.get(uri + id)
            .then(res => {
                return res
            })
            .catch(error => console.error(error))
    },
    putOrder: async (id, order) => {
        await axios.put(uri + id, order)
            .then(response => {
                return response
            })
            .catch(error => console.error(error))
    },
    postOrder: async (order) => {
        await axios.post(uri, order)
            .then(res => {
                return res
            })
            .catch(error => console.error(error))
    },
    deleteOrder: async (id) => {
        await axios.delete(uri + id)
            .then(res => {
                return res
            })
            .catch(error => console.error(error))
    }
}