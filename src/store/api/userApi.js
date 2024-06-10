import { auth } from "../auth"
import axios from "axios"

export const useUserAPI = () => {
    const baseURL = "https://api.wcp.dk/users" // Public Prod
    // const baseURL = "https://api.nobitches.win/users" // Public test
    // const baseURL = "https://localhost:5267/api/users"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

    // const getBrands = (userId) => {
    //     let url = ''
    //     if (userId) {
    //         url += `?userId=${userId}`
    //     }
        
    //     const config = {
    //         ...baseConfig,
    //         method: 'get',
    //         url: url,
    //     }

    //     return axios(config)
    //         .then((res) => { return res.data })
    // }

    // const getBrand = (cvr) => {
    //     const config = {
    //         ...baseConfig,
    //         method: 'get',
    //         url: `/${cvr}`,
    //         headers: { 'Authorization': auth.token } 
    //     }

    //     return axios(config)
    //         .then((res) => { return res.data })
    // }

    const putUser = (id, user) => {
        const config = {
            ...baseConfig,
            method: 'put',
            url: `/${id}`,
            data: user,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    const changePassword = (id, pswd) => {
        const config = {
            ...baseConfig,
            method: 'put',
            url: `/change-password/${id}`,
            data: pswd,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    const postUser = (user) => {
        if (auth.isAdmin()) {
            const config = {
                ...baseConfig,
                method: 'post',
                url: '/',
                data: user,
                headers: { 'Authorization': auth.token } 
            }
    
            return axios(config)
                .then((res) => { return res })
        }
    }

    return { putUser, postUser, changePassword }
}