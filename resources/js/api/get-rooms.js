import axios from 'axios';

export const getRooms = () => {
  return axios.get('/api/rooms')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};