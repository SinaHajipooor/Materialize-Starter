import axiosConfig from "src/utils/axios/axios"


// login
export async function login(userData: any) {
    try {
        const response = await axiosConfig.post('/auth/login', userData);
        const data = response.data;

        return data;
    } catch (error) {
        throw error
    }
}



// user details 
export async function fetchUser() {
    try {
        const response = await axiosConfig.get('/auth/user');
        const data = response.data?.data;

        return data;
    } catch (error) {
        throw error
    }
}

// update password 
export async function updateUserpassword(userData: any) {
    try {

        const response = await axiosConfig.put('/admin/membership/core/profile/update-password', userData?.userData);
        const data = response.data;

        return data;
    } catch (error) {
        throw error
    }
}

// update 
export async function updateUser(userData: any) {
    const formData: any = new FormData();
    Object.entries(userData?.userData).forEach(([key, value]: any) => {
        formData.append(key, value ?? '');
    });
    formData.append('_method', 'put');

    const response = await axiosConfig.post(`/admin/membership/core/profile/update-info`, formData, {
        headers: {
            'Content-Type': 'application/form-data'
        }
    });

    return response;
}

// logout 
export async function logout() {
    try {
        const response = await axiosConfig.post('/auth/logout', null);

        return response
    } catch (error) {
        throw error
    }
}
