<template>
  <map-box :accessToken="accessToken" :mapStyle="mapStyle" :parkings="parkings"></map-box>
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
      parkings: {},
    };
  },
  mounted() {
    EventService.getAllParkings().then((response) => {
      this.parkings = response.data;
    })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
</style>
