import axiosConfig from "src/utils/axios/axios"


// login
export async function login(userData: any) {

    try {
        const response = await axiosConfig.post('/auth/login', userData);
        const data = response.data;

        return data.data;
    } catch (error) {
        throw error
    }
}

// user details 
export async function fetchUser(token: any) {
    try {
        const response = await axiosConfig.get('/auth/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data.data;

        return data;
    } catch (error) {
        throw error
    }
}

// update password 
export async function updateUserpassword(userData: any) {
    const response = await axiosConfig.put('/admin/membership/profile/update-password', userData?.userData, {
        headers: {
            'Authorization': `Bearer ${userData?.token}`,
        }
    });
    const data = response.data;

    return data;
}

// update 
export async function updateUser(userData: any) {
    const formData: any = new FormData();
    Object.entries(userData?.userData).forEach(([key, value]: any) => {
        formData.append(key, value ?? '');
    });
    formData.append('_method', 'put');

    const response = await axiosConfig.post(`/admin/membership/profile/update-info`, formData, {
        headers: {
            'Authorization': `Bearer ${userData?.token}`,
            'Content-Type': 'application/form-data'
        }
    });

    return response.data;
}

// logout 
export async function logout(token: any) {
    try {
        const response = await axiosConfig.post('/auth/logout', null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response
    } catch (error) {
        throw error
    }
}
