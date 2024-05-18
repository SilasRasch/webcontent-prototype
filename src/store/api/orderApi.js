import { auth } from "../auth"
// import { store } from "../store"
import axios from "axios"

const baseURL = "http://192.168.100.201:8282/api/orders"
var baseConfig = { baseURL: baseURL, method: 'get', url: '' }

export const orderApi = {
    getOrders: async () => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: !auth.isAdmin() ? `?userId=${auth.loggedInUser.id}` : '/'
        }

        const res = await axios(config).catch(err => console.error(err))
        const data = await res.data
        return data
    },
    getOrder: async (id) => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: `/${id}`
        }

        const res = await axios(config).catch(err => console.error(err))
        return await res.data
    },
    putOrder: async (id, order) => {
        const config = {
            ...baseConfig,
            method: 'put',
            url: `/${id}`,
            data: order,
        }

        await axios(config)
            .then(response => {
                return response
            })
            .catch(error => console.error(error))
    },
    postOrder: async (order) => {
        const config = {
            ...baseConfig,
            method: 'post',
            data: order,
        }

        await axios(config)
            .then(res => {
                return res
            })
            .catch(error => console.error(error))
    },
    deleteOrder: async (id) => {
        const config = {
            ...baseConfig,
            method: 'delete',
            url: toString(id),
        }
        await axios(config)
            .then(res => {
                return res
            })
            .catch(error => console.error(error))
    }
}