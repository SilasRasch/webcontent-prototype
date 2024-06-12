import { auth } from "../auth"
import axios from "axios"

export const useBrandAPI = () => {
    // const baseURL = "https://api.wcp.dk/data/brands" // Public Prod
    const baseURL = "https://api.nobitches.win/data/brands" // Public Prod
    // const baseURL = "https://localhost:7216/api/brands"
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

    const getBrands = (userId) => {
        let url = ''
        if (userId) {
            url += `?userId=${userId}`
        }
        
        const config = {
            ...baseConfig,
            method: 'get',
            url: url,
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const getBrand = (cvr) => {
        const config = {
            ...baseConfig,
            method: 'get',
            url: `/${cvr}`,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res.data })
    }

    const putBrand = (cvr, brand) => {
        const config = {
            ...baseConfig,
            method: 'put',
            url: `/${cvr}`,
            data: brand,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    const postBrand = (brand) => {
        const config = {
            ...baseConfig,
            method: 'post',
            url: '/',
            data: brand,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    return { getBrand, getBrands, putBrand, postBrand }
}