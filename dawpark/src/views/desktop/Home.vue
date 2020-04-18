<template>
  <div class="home">
    <div class="map-page column">
      <map-box :accessToken="accessToken" :mapStyle="mapStyle" :parkings="parkings"></map-box>
    </div>
    <side-page :parkings="parkings" class="side-page column"></side-page>
  </div>
</template>

<script>
import MapBox from '@/components/MapBox.vue';
import SidePage from '@/components/SidePage.vue';
import EventService from '@/services/EventService';

export default {
  components: {
    MapBox,
    SidePage,
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MB_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MB_STYLE,
      parkings: null,
    };
  },
  mounted() {
    EventService.getAllParkings().then((response) => {
      this.parkings = response.data.slice(0, 10);
    })
      .catch((err) => {
        console.log(err);
      });
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
