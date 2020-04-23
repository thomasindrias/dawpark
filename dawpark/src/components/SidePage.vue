<template>
<div class="side-page">
  <div class="content">
    <div class="row">
      <h1>
      <span class="results">{{ parkings.data.length }} Resultat </span>
      <span class="results-place">
        i närheten av
        {{ parkings.location }}
        </span>
      </h1>
    </div>
    <hr>
    <div class="row">
      <filter-options :options="filters" @input="filterHandler"/>
    </div>
    <div class="row results-wrapper">
      <park-element @click.native="parkDetails(parking)"
      v-for="parking in parkings.data" :key="parking.parking_id"
      :parkingInfo="parseParkingInfo(parking)" />
    </div>
  </div>
</div>
</template>

<script>
import ParkElement from '@/components/ParkElement.vue';
import FilterOptions from '@/components/FilterOptions.vue';

export default {
  components: {
    ParkElement,
    FilterOptions,
  },
  props: {
    parkings: {},
  },
  data() {
    return {
      parkingInfo: {
        address: 'Älgstigen 9',
        postnr: '641 53 Katrineholm',
        price: 'Gratis',
      },
      filters: ['Filter 1', 'Filter 2', 'Filter 3'],
    };
  },
  methods: {
    filterHandler(option) {
      console.log(option);
    },
    parkDetails(parkInfo) {
      // console.log(event);
    },
    parseParkingInfo(parking) {
      return {
        address: parking.name,
        postnr: parking.distance_to_nearest_city,
        price: (parking.tariff_payment_fee) ? 'Betald' : 'Gratis',
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
