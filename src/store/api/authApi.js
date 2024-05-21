import { auth } from "../auth"
import { useAxios } from "./useAxios"

const axios = useAxios()

export const useAuthAPI = () => {
    // const baseURL = "http://192.168.100.201:8383/auth/"
    const baseURL = "http://localhost:5267/auth/"
    const baseConfig = { baseURL: baseURL, method: 'post', url: '' }
    
    const login = async (email, password) => {
        const config = {
            ...baseConfig,
            url: 'login',
            method: 'post',
            data: {
                email: email,
                password: password,
            }
        }

        return await axios.request(config)
    }

    const register = async (user) => {
        const config = {
            ...baseConfig,
            url: 'register',
            data: user
        }

        if (auth.isAdmin()) {
            return await axios.request(config)
        }
    }

    const authenticate = async () => {
        if (auth.isLoggedIn) {
            const config = {
                ...baseConfig,
                method: 'get',
                url: 'authenticate',
                headers: { 'Authorization': auth.token }
            }
    
            return await axios.request(config)
        }
    }

    const addAdmin = async (id) => {
        if (auth.isLoggedIn) {
            const config = {
                ...baseConfig,
                url: `addadmin?id=${id}`,
                headers: { 'Authorization': auth.token }
            }
            
            if (auth.isAdmin()) {
                return await axios.request(config)
            }
        }
    }

    return { login, register, authenticate, addAdmin }
}