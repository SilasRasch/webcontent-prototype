import { auth } from "../auth"
import axios from "axios"

export const useUserAPI = () => {
    // const baseURL = "https://api.wcp.dk/users" // Public Prod
    const baseURL = "https://api.nobitches.win/users" // Public test
    // const baseURL = "https://localhost:5267/api/users"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

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
            method: 'post',
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

    const resetPassword = (token, password) => {
        if (auth.isAdmin()) {
            const config = {
                ...baseConfig,
                method: 'post',
                url: '/reset-password',
                data: { token: token, password: password},
                headers: { 'Authorization': auth.token } 
            }
    
            return axios(config)
                .then((res) => { return res })
        }
    }

    const forgotPassword = (email) => {
        const config = {
            ...baseConfig,
            method: 'post',
            url: '/forgot-password',
            data: email,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    return { putUser, postUser, changePassword, resetPassword, forgotPassword }
}