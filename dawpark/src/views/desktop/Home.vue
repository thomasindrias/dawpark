<template>
  <div class="home">
    <div class="map-page column">
      <map-box
      :proximity="proximity"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :parkings="parkings"
      @result="searchHandler($event, 0)"
      @selected="setSelection"
      ref="map"
      ></map-box>
    </div>
    <side-page v-if="parkings.searchResult !== null"
    :parkings="parkings" class="side-page column"
    @proximity="searchHandler($event, 1)"
    @filters="searchHandler($event, 2)"
    @parkingClick="this.$refs.map.goToMarker"
    @selected="selected"
    ref="detail"
    ></side-page>
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
      parkings: {
        searchResult: null,
        data: [],
      },
      proximity: '10000',
      filters: {},
    };
  },
  methods: {
    searchHandler(result, type) {
      if (type === 0) {
        this.parkings.searchResult = result;
      } else if (type === 1) {
        this.proximity = result;
      } else if (type === 2) {
        this.filters = {
          ...(result[0].status ? { toilet: result[0].status } : {}),
          ...(result[1].status ? { shower: result[1].status } : {}),
          ...(result[2].status ? { firstAidEquipment: result[2].status } : {}),
          ...(result[3].status ? { refuseBin: result[3].status } : {}),
        };
      }

      EventService.getProximityParking(
        this.parkings.searchResult.coordinate,
        this.proximity,
        this.filters,
      ).then((response) => {
        this.parkings.data = response.data;
      })
        .catch((err) => {
          console.log(err);
        });
    },
    selected(sel) {
      if (!sel) this.$refs.map.resetToCenter();
    },
    setSelection(parking) {
      this.$refs.detail.parkDetails(parking);
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
