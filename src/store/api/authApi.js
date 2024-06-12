import { auth } from "../auth"
import axios from "axios"

export const useAuthAPI = () => {
    // const baseURL = "http://localhost:5267/auth/" // Local Test
    const baseURL = "https://api.nobitches.win/auth/" // Public test
    // const baseURL = "https://api.wcp.dk/auth/" // Public prod
    const baseConfig = { baseURL: baseURL, method: 'post', url: '' } 
    
    const login = (email, password) => {
        const config = {
            ...baseConfig,
            url: 'login',
            method: 'post',
            withCredentials: true,
            data: {
                email: email,
                password: password,
            }
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const register = (user) => {
        const config = {
            ...baseConfig,
            url: 'register',
            headers: { 'Authorization': auth.token },
            data: user
        }

        if (auth.isAdmin()) {
            return axios(config)
                .then((res) => { return res.data })
        }
    }

    const registerCreator = (creator) => {
        const config = {
            ...baseConfig,
            url: 'registercreator',
            headers: { 'Authorization': auth.token },
            data: creator
        }

        if (auth.isAdmin()) {
            return axios(config)
                .then((res) => { return res })
        }
    }

    const authenticate = () => {
        if (auth.isLoggedIn) {
            const config = {
                ...baseConfig,
                method: 'get',
                url: 'authenticate',
                headers: { 'Authorization': auth.token }
            }
    
            return axios(config)
                .then((res) => { return res.data })
        }
    }

    const addAdmin = (id) => {
        if (auth.isLoggedIn) {
            const config = {
                ...baseConfig,
                url: `addadmin?id=${id}`,
                headers: { 'Authorization': auth.token }
            }
            
            if (auth.isAdmin()) {
                return axios(config)
                    .then((res) => { return res.data })
            }
        }
    }

    const refreshToken = (id) => {
        const config = {
            ...baseConfig,
            url: `refresh?email=${id}`,
            withCredentials: true
        }
        
        return axios(config)
            .then((res) => { return res.data })
    }

    const revoke = () => {
        const config = {
            ...baseConfig,
            url: `revoke`,
            headers: { 'Authorization': auth.token }
        }
        
        return axios(config)
            .then((res) => { return res.data })
            .catch((err) => console.error(err))
    }

    return { login, register, authenticate, addAdmin, refreshToken, revoke, registerCreator }
}