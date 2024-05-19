import axios from 'axios';

export const getReviews = () => {
  return axios.get('/api/reviews')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};