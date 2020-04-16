import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'http://161.35.67.97',
});

export default {
  getAllParkings() {
    return serverClient.get('/parkings');
  },
};
