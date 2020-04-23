import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'https://dawpark.netlify.app/api',
});

export default {
  // @TODO
  getProximityParking(coordinate: string, range: number) {
    return serverClient.get('/parking/proximity', {
      params: {
        coordinate,
        range,
      },
    });
  },
  getAllParkings() {
    return serverClient.get('/parkings');
  },
};
