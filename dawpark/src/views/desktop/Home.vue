<template>
  <div class="home">
    <search/>
    <div class="map-page column">
      <map-box :accessToken="accessToken" :mapStyle="mapStyle" :parkings="parkings.data"
      @result="searchHandler"></map-box>
    </div>
    <side-page v-if="parkings.data !== null"
    :parkings="parkings" class="side-page column"></side-page>
  </div>
</template>

<script>
import MapBox from '@/components/MapBox.vue';
import SidePage from '@/components/SidePage.vue';
import Search from '@/components/Search.vue';
import EventService from '@/services/EventService';

export default {
  components: {
    MapBox,
    SidePage,
    Search,
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
  methods: {
    searchHandler(result) {
      this.parkings.searchResult = result;

      EventService.getProximityParking(
        result.coordinate,
        20000,
      ).then((response) => {
        console.log(response.data);
        this.parkings.data = response.data;
      })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
}

.side-page {
  flex: 1;
  z-index: 999;
}

.map-page {
  flex: 1.5;
}

</style>
