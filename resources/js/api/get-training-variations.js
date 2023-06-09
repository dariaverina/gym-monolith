import axios from 'axios';

export const getTrainingVariations = () => {
  return axios.get('/api/trainingvariations')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
};