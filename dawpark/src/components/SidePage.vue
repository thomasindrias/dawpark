<template>
<div class="side-page">
  <div v-if="selected === null"
    class="content animated slideInRight faster"
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
    <div>
      <range-slider :range="range" @input="updateRange"/>
      <filter-options :options="filters" @input="updateFilters"/>
    </div>
    <div class="row results-wrapper">
      <park-element
      @click.native="parkDetails(parking)"
      v-for="(parking, index) in parkings.data" :key="parking.parking_id"
      :parkingInfo="parseParkingInfo(parking, ++index)" />
    </div>
  </div>
  <div v-else
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
    parkDetails(parking) {
      this.$emit('parkingClick', parking.parking_id);

      // open detail page
      this.selected = parking;
    },
    updateFilters(filters) {
      this.$emit('filters', filters);
    },
    updateRange(option) {
      this.$emit('proximity', option);
    },
    parseParkingInfo(parking, index) {
      // Last time it was modified
      const date = new Date(Date.parse(parking.modified_time));

      // Equipments
      const equipments = parking.equipment;
      equipments.forEach((equipment, i) => {
        if (equipment.Type === 'toilet') {
          equipments[i].icon = 'fas fa-restroom';
        } else if (equipment.Type === 'shower') {
          equipments[i].icon = 'fas fa-shower';
        } else if (equipment.Type === 'firstAidEquipment') {
          equipments[i].icon = 'fas fa-first-aid';
        } else if (equipment.Type === 'refuseBin') {
          equipments[i].icon = 'fas fa-dumpster';
        }
      });

      return {
        address: parking.name,
        closestCity: parking.distance_to_nearest_city,
        description: parking.description,
        coordinates: parking.wgs84.coordinates,
        modifiedTime: moment(date).fromNow(),
        price: (parking.tariff_payment_fee) ? 'Betald' : 'Gratis',
        status: (parking.open_status === 'open') ? 'Öppet' : 'Stängt',
        equipments,
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
