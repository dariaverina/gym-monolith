import axios from 'axios';

export const getTrainingParticipants = () => {
  return axios.get('/api/trainingparticipants')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};