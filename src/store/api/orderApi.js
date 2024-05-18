import { auth } from "../auth"
import axios from "axios"
import { useAxios } from "./useAxios"

const axi = await useAxios()

export const useOrderAPI = () => {
    const baseURL = "http://192.168.100.201:8282/api/orders"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '' }

    const getOrders = async () => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: !auth.isAdmin() ? `?userId=${auth.loggedInUser.id}` : '/'
        }

        return await axi.request(config)
    }

    const getOrder = async (id) => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: `/${id}`
        }

        return await axi.request(config)
    }

    const putOrder = async (id, order) => {
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
    }

    const postOrder = async (order) => {
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
    }

    const deleteOrder = async (id) => {
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

    return { getOrders, getOrder, postOrder, putOrder, deleteOrder }
}