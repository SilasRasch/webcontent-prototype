import { auth } from "../auth"
import axios from "axios"

export const useOrderAPI = () => {

    let baseURL;
    const env = import.meta.env.WC_ENVIRONMENT
    if (env === "production") {
        baseURL = "https://api.wcp.dk/data/orders" // Public Prod
    } else if (env === "devlopment") {
        baseURL = "https://api.nobitches.win/data/orders" 
    } else {
        baseURL = "https://localhost:7216/api/orders"
    }

    // const baseURL = "https://api.wcp.dk/data/orders" // Public Prod
    // const baseURL = "https://localhost:7216/api/orders"
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
    }

    const postOrder = (order) => {
        const config = {
            ...baseConfig,
            method: 'post',
            data: order,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
    }

    const deleteOrder = (id) => {
        const config = {
            ...baseConfig,
            method: 'delete',
            url: toString(id),
            headers: { 'Authorization': auth.token } 
        }
        
        return axios(config)
    }

    return { getOrders, getOrder, postOrder, putOrder, deleteOrder }
}