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
      <div>
        <range-slider :range="range" @input="updateRange"/>
        <filter-options @input="updateFilters"/>
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
    parkDetails(parking) {
      this.$emit('parkingClick', parking.parking_id);

      // open detail page
      this.selected = parking;
      this.$emit('selected', true);
    },
    updateFilters(filters) {
      this.$emit('filter', filters);
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
