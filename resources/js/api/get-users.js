import axios from 'axios';

export const getUsers = () => {
  return axios.get('/api/users')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};