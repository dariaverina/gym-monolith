import axios from 'axios';

export const getStudents = () => {
  return axios.get('/api/users?user_type=c')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};