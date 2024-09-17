import axios from 'axios';
import { getSession } from 'next-auth/react';
import https from 'https'

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const axiosConfig = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
});


let authToken = '';

export const setAuthToken = (token: string) => {
    authToken = token;
};



axiosConfig.interceptors.request.use(async (config) => {
    const session: any = await getSession();
    const clientToken = session?.myToken;


    if (authToken || clientToken) {

        config.headers!['Authorization'] = `Bearer ${clientToken ?? authToken}`;
    }


    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosConfig;