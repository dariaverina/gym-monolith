import axios from 'axios';

export const getTrainingTimes = () => {
  return axios.get('/api/trainingtimes')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};