<template>
  <map-box :accessToken="accessToken" :mapStyle="mapStyle" :parkings="parkings.data"
  :mobile="true"></map-box>
</template>

<script>
import MapBox from '@/components/MapBox.vue';
import EventService from '@/services/EventService';

export default {
  components: {
    MapBox,
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MB_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MB_STYLE,
      parkings: {
        searchResult: null,
        data: null,
      },
    };
  },
  mounted() {
    EventService.getAllParkings().then((response) => {
      this.parkings.data = response.data.slice(0, 10);
    })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
</style>
