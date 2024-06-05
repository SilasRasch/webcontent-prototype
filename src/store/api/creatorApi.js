import { auth } from "../auth"
import axios from "axios"

export const useCreatorAPI = () => {
    // const baseURL = "http://192.168.100.201:8282/api/creators"
    // const baseURL = "https://api.nobitches.win/data/creators"
    const baseURL = "https://localhost:7216/api/creators"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

    const getCreators = () => {
        const id = auth.loggedInUser.id ? auth.loggedInUser.id : localStorage.getItem("user")
        
        const config = {
            ...baseConfig,
            method: 'get',
            url: !auth.isAdmin() ? `?orderId=${id}` : '/'
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const getCreatorsByOrder = (id) => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: `?orderId=${id}`
        }

        return axios(config)
            .then((res) => { return res.data })
            .catch(() => { return undefined })
    }

    const getCreator = (id) => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: `/${id}`,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const putCreator = (id, creator) => {
        const config = {
            ...baseConfig,
            method: 'put',
            url: `/${id}`,
            data: creator,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
    }

    return { getCreator, getCreators, getCreatorsByOrder, putCreator }
}