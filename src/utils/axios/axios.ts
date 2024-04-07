import axios from 'axios';

const BASE_API_URL = 'http://192.168.2.102:81/api';
export const BASE_URL = 'http://192.168.2.102:81';


const axiosConfig = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

});


export default axiosConfig;

