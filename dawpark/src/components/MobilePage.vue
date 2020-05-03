<template>
  <div class="mobile-page">
    <div class="bar-container">
      <div class="bars">
        <div/>
        <div/>
      </div>
    </div>
    <div
      v-if="selected === null"
      class="content animated slideInUp faster"
    >
      <div class="row">
        <h1>
        <span class="results">{{ parkings.data.length }} Resultat </span>
        <span class="results-place">
          i närheten av
          {{ parkings.searchResult.location }}
          </span>
        </h1>
      </div>
      <hr>
      <div class="row">
        <range-slider class="column" :range="range" @input="updateRange"/>
        <filter-options class="column" :options="filters" @input="filterHandler"/>
      </div>
      <div class="row results-wrapper">
        <park-element
        @click.native="parkDetails(parking)"
        v-for="(parking, index) in parkings.data" :key="parking.parking_id"
        :parkingInfo="parseParkingInfo(parking, ++index)" />
      </div>
  </div>
    <div
      v-else
      class="detail animated slideInLeft faster"
    >
    <parking-detail
      :parking="parseParkingInfo(selected, -1)"
      @close="selected = null"
    />
  </div>
  </div>
</template>

<script>
import ParkElement from '@/components/ParkElement.vue';
import ParkingDetail from '@/components/ParkingDetail.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import RangeSlider from '@/components/RangeSlider.vue';
import moment from 'moment/moment';

require('moment/locale/sv');

moment.locale('sv');

export default {
  components: {
    ParkElement,
    FilterOptions,
    RangeSlider,
    ParkingDetail,
  },
  props: {
    parkings: {},
  },
  watch: {
    selected(val) {
      if (val === null) this.$emit('selected', false);
    },
  },
  data() {
    return {
      filters: ['Filter 1', 'Filter 2', 'Filter 3'],
      range: [1000, 50000], // In meters
      selected: null,
    };
  },
  methods: {
    filterHandler(option) {
      console.log(option);
    },
    parkDetails(parking) {
      this.$emit('parkingClick', parking.parking_id);

      // open detail page
      this.selected = parking;
      this.$emit('selected', true);
    },
    updateRange(option) {
      this.$emit('proximity', option);
    },
    parseParkingInfo(parking, index) {
      // Last time it was modified
      const date = new Date(Date.parse(parking.modified_time));

      return {
        address: parking.name,
        closestCity: parking.distance_to_nearest_city,
        description: parking.description,
        modifiedTime: moment(date).fromNow(),
        price: (parking.tariff_payment_fee) ? 'Betald' : 'Gratis',
        status: (parking.open_status === 'open') ? 'Öppet' : 'Stängt',
        index,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-page {
  position: relative;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 20px 0px 60px rgba(0, 0, 0, 0.3);
  border-radius: 20px 20px 0 0;
}

hr {
  border: 1px solid #D9D9D9;
  opacity: 50%;
  margin: 10px 0px;
}

h1 {
  font-size: 36px;
}

.bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
}

.bars {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 36vw;
}

.bars div {
  background-color: $gray;
  height: 3px;
  margin: 5px;
  border-radius: 3px;
}

.results {
  color: $black;
}

.results-place {
  color: $gray;
}

.content {
  padding: 90px 50px;
}

.results-wrapper {
  margin-top: 40px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: auto;
  align-content: start;
}

.detail {
  margin-top: 20px;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
</style>
