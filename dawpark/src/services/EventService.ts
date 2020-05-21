import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'https://dawpark.netlify.app/api',
});

interface Filters {
  toilet: boolean;
  shower: boolean;
  firstAidEquipment: boolean;
  refuseBin: boolean;
}

export default {
  // @TODO
  getProximityParking(
    coordinate: string,
    range: number,
    filters: Filters,
  ) {
    return serverClient.get('/parking/proximity', {
      params: {
        coordinate,
        range,
        ...(filters ? {
          toilet: filters.toilet,
          shower: filters.shower,
          firstAidEquipment: filters.firstAidEquipment,
          refuseBin: filters.refuseBin,
        } : {}),
      },
    });
  },
  getAllParkings() {
    return serverClient.get('/parkings');
  },
};
