import { auth } from "../auth"
import axios from "axios"

export const useCreatorAPI = () => {
    // const baseURL = "https://api.wcp.dk/data/creators" // Public Prod
    const baseURL = "https://api.nobitches.win/data/creators"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

    const getCreators = (searchTerm) => {
        let url = ''
        if (searchTerm) {
            url += `?searchTerm=${searchTerm}`
        }
        
        const config = {
            ...baseConfig,
            method: 'get',
            url: url,
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
            .then((res) => { return res })
    }

    return { getCreator, getCreators, getCreatorsByOrder, putCreator }
}