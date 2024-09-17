import axiosConfig from "src/utils/axios/axios";

// app version 
export async function getAppVersion() {
    try {
        const response = await axiosConfig.get('/auth/version');
        const data = response.data.data

        return data;
    } catch (error) {
        throw error
    }
}
