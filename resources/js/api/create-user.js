import axios from 'axios';

export const adminCreateUser = async (userData) => {
    try {
        const response = await axios.post(`/api/signup`, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};