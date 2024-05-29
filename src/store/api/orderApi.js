import { auth } from "../auth"
import axios from "axios"

export const useOrderAPI = () => {
    // const baseURL = "http://192.168.100.201:8282/api/orders"
    const baseURL = "https://api.nobitches.win/data/orders"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

    const getOrders = () => {
        const id = auth.loggedInUser.id ? auth.loggedInUser.id : localStorage.getItem("user")
        
        const config = {
            ...baseConfig,
            method: 'get',
            url: !auth.isAdmin() ? `?userId=${id}` : '/'
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const getOrder = (id) => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: `/${id}`
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const putOrder = (id, order) => {
        const config = {
            ...baseConfig,
            method: 'put',
            url: `/${id}`,
            data: order,
        }

        return axios(config)
    }

    const postOrder = (order) => {
        const config = {
            ...baseConfig,
            method: 'post',
            data: order,
        }

        return axios(config)
    }

    const deleteOrder = (id) => {
        const config = {
            ...baseConfig,
            method: 'delete',
            url: toString(id),
        }
        
        return axios(config)
    }

    return { getOrders, getOrder, postOrder, putOrder, deleteOrder }
}