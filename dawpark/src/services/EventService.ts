import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'https://dawpark.netlify.app/api',
});

export default {
  getAllParkings() {
    return serverClient.get('/parkings');
  },
};
