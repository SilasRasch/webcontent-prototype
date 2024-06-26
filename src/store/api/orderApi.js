import { auth } from "../auth"
import axios from "axios"

export const useOrderAPI = () => {
    const baseURL = "https://api.wcp.dk/data/orders" // Public Prod
    // const baseURL = "https://api.nobitches.win/data/orders"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

    const getOrders = () => {
        const id = auth.loggedInUser.id ? auth.loggedInUser.id : localStorage.getItem("user")
        let url;
        if (auth.isAdmin()) {
            url = '/'
        }
        else if (auth.isUser()) {
            url = `?userId=${id}`
        }
        else if (auth.isCreator()) {
            url = `?creatorId=${id}`
        }

        const config = {
            ...baseConfig,
            method: 'get',
            url: url
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const getOrder = (id) => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: `/${id}`,
            headers: { 'Authorization': auth.token } 
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
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    const postOrder = (order) => {
        const config = {
            ...baseConfig,
            method: 'post',
            data: order,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    const deleteOrder = (id) => {
        const config = {
            ...baseConfig,
            method: 'delete',
            url: toString(id),
            headers: { 'Authorization': auth.token } 
        }
        
        return axios(config)
            .then((res) => { return res })
    }

    return { getOrders, getOrder, postOrder, putOrder, deleteOrder }
}