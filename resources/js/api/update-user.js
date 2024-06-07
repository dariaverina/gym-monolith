import axios from 'axios';

export const updateUser = async (userId, updatedUserData) => {
    try {
        const response = await axios.patch(`/api/users/${userId}`, updatedUserData);
        return response.data;
    } catch (error) {
        throw error;
    }
};