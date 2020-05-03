<template>
<div class="side-page">
  <div v-if="selected === null" class="content">
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
      <filter-options class="column" :options="filters" @input="filterHandler"/>
      <range-slider class="column" :range="range" @input="updateRange"/>
    </div>
    <div class="row results-wrapper">
      <park-element
      @click.native="parkDetails(parking)"
      v-for="(parking, index) in parkings.data" :key="parking.parking_id"
      :parkingInfo="parseParkingInfo(parking, ++index)" />
    </div>
  </div>
  <div v-else class="detail">
    <parking-detail
      :parking="selected"
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
      return {
        address: parking.name,
        postnr: parking.distance_to_nearest_city,
        price: (parking.tariff_payment_fee) ? 'Betald' : 'Gratis',
        index,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid #D9D9D9;
  opacity: 50%;
  margin: 10px 0px;
}

h1 {
  font-size: 36px;
}

.results {
  color: $black;
}

.results-place {
  color: $gray;
}

.side-page {
  background: #FFFFFF;
  box-shadow: 20px 0px 60px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
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
