import axios from 'axios';

// import https from 'https'

const BASE_API_URL = 'http://192.168.2.102:81/api';
export const BASE_URL = 'http://192.168.2.102:81';


const axiosConfig = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

    // // add this for https request
    //     httpsAgent: new https.Agent({
    //         rejectUnauthorized: false
    //     }),

});


export default axiosConfig;

