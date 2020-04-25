<template>
  <map-box
  :accessToken="accessToken"
  :mapStyle="mapStyle"
  :parkings="parkings"
  @result="searchHandler"
  :mobile="true"
  :proximity="proximity"
  ></map-box>
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
        data: [],
      },
      proximity: '10000',
    };
  },
  methods: {
    searchHandler(result) {
      if (typeof (result) === 'object') {
        this.parkings.searchResult = result;
      } else {
        this.proximity = result;
      }

      EventService.getProximityParking(
        this.parkings.searchResult.coordinate,
        this.proximity,
      ).then((response) => {
        this.parkings.data = response.data;
      })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
</style>
