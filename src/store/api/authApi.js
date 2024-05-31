import { auth } from "../auth"
import axios from "axios"

export const useAuthAPI = () => {
    // const baseURL = "http://localhost:5267/auth/" // Local Test
    const baseURL = "https://api.nobitches.win/auth/" // Public Prod
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
            data: user
        }

        if (auth.isAdmin()) {
            return axios(config)
                .then((res) => { return res.data })
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
            url: `refresh?id=${id}`,
            withCredentials: true
        }
        
        return axios(config)
            .then((res) => { return res.data })
    }

    return { login, register, authenticate, addAdmin, refreshToken }
}