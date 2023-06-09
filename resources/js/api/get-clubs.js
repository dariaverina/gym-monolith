import axios from 'axios';

export const getClubs = () => {
  return axios.get('/api/clubs')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};