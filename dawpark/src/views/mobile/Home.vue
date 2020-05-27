<template>
  <div class="home" id="home">
    <div class="map-page">
      <div class="map">
        <map-box
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :parkings="parkings"
        @result="searchHandler($event, 0)"
        :mobile="true"
        :proximity="proximity"
        @selected="setSelection"
        ref="map"
        ></map-box>
      </div>
    </div>
    <div class="mobile-page">
      <div class="mobile-container" id="mobile">
        <mobile-page
        v-if="parkings.searchResult !== null"
        :parkings="parkings"
        @proximity="searchHandler($event, 1)"
        @filter="searchHandler($event, 2)"
        @parkingClick="this.$refs.map.goToMarker"
        @selected="selected"
        ref="detail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto';
import MapBox from '@/components/MapBox.vue';
import MobilePage from '@/components/MobilePage.vue';
import EventService from '@/services/EventService';

export default {
  components: {
    MapBox,
    MobilePage,
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
      scrollOptions: {
        container: '#home',
        easing: 'ease-in',
        offset: -60,
        force: true,
        cancelable: true,
      },
    };
  },
  methods: {
    searchHandler(result, type) {
      // Clear previous data
      if (this.$refs.detail) this.$refs.detail.selected = null;

      if (type === 0) { // From MapBox
        this.parkings.searchResult = result;
        this.scrollTo('#mobile');
      } else if (type === 1) { // From MobilePage
        this.proximity = result;
      } else if (type === 2) { // If filter is available
        this.filters = {
          ...(result[0].status ? { toilet: result[0].status } : {}),
          ...(result[1].status ? { shower: result[1].status } : {}),
          ...(result[2].status ? { firstAidEquipment: result[2].status } : {}),
          ...(result[3].status ? { refuseBin: result[3].status } : {}),
        };
      }

      // GET parkings by proximity from backend 
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
    scrollTo(element) {
      VueScrollTo.scrollTo(element, 500, this.scrollOptions);
    },
    selected(sel) {
      if (!sel) this.$refs.map.resetToCenter();
    },
    setSelection(parking) {
      this.$refs.detail.parkDetails(parking);
      this.scrollTo('#mobile');
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

.map-page {
  // flex: 1;
  height: 100%;
}

.map {
  height: 100%;
  width: 100%;
}

.mobile-page {
  // flex: 1;
  position: relative;
  z-index: 999;
}

.mobile-container {
  // flex: 1;
  position: absolute;
  top:-30px;
  width: 100%;
  z-index: 999;
}

.column {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
}

.row {
  display: flex;
  flex-basis: 100%;
  flex-direction: row;
  flex: 1;
}
</style>
