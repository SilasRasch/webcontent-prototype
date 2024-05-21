import { auth } from "../auth"
import { useAxios } from "./useAxios"

const axi = useAxios()

export const useOrderAPI = () => {
    const baseURL = "http://192.168.100.201:8282/api/orders"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

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

        return await axi.request(config).then(() => { return axi.response })
    }

    const postOrder = async (order) => {
        const config = {
            ...baseConfig,
            method: 'post',
            data: order,
        }

        return await axi.request(config).then(() => { return axi.response })
    }

    const deleteOrder = async (id) => {
        const config = {
            ...baseConfig,
            method: 'delete',
            url: toString(id),
        }
        
        return await axi.request(config).then(() => { return axi.response })
    }

    return { getOrders, getOrder, postOrder, putOrder, deleteOrder }
}