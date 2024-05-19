import axios from 'axios';

export const getTrainings = () => {
  return axios.get('/api/trainings')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};