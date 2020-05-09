<template>
<div class="content">
  <a @click="closeDetail" class="back icon"><i class="fas fa-arrow-left"></i></a>
  <div class="row">
    <h1>{{ parking.address }}</h1>
  </div>
  <hr>
  <div class="row results-wrapper">
    <div v-if="parking.status !== null">
      <h3>Status</h3>
      <p>{{parking.status}}</p>
    </div>
    <div class="modified-time has-text-right-tablet"
      v-if="parking.modifiedTime !== null"
    >
      <h3>Senast uppdaterad</h3>
      <p>{{parking.modifiedTime}}</p>
    </div>
    <div class="description">
      <div v-if="parking.closestCity !== null">
        <h3>Närmaste staden</h3>
        <p>{{parking.closestCity}}</p>
      </div>
      <div v-if="parking.description !== null">
        <h3>Beskrivning</h3>
        <p>{{parking.description}}</p>
      </div>
      <div>
        <button @click="GMaps" class="button">
          <span class="icon directions">
            <i class="fas fa-directions"></i>
          </span>
          <span>Vägbeskrivning</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: {
    parking: null,
  },
  computed: {
    directions() {
      return `https://www.google.com/maps/place/${this.parking.coordinates[1]},${this.parking.coordinates[0]}`;
    },
  },
  data() {
    return {
    };
  },
  methods: {
    closeDetail() {
      console.log(this.directions);
      this.$emit('close', true);
    },
    GMaps() {
      window.open(
        this.directions,
        '_blank', // Open new tab
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "bulma";

hr {
  border: 1px solid #D9D9D9;
  opacity: 50%;
  margin: 10px 0px;
}

h1 {
  font-size: 36px;
}

h3 {
  font-size: 18px;
}

.results {
  color: $black;
}

.results-place {
  color: $gray;
}

.content {
  position: relative;
  padding: 90px 50px;
}

.icon {
  font-size: 26px;
}

.icon:hover {
  cursor: pointer;
}

.back {
  display: flex;
  position: absolute;
  top: 20px;
  color: $black;
}

.directions {
  color: $green;
}


.results-wrapper {
  margin-top: 20px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: auto;
  align-content: start;
}

.results-wrapper div {
  margin: 20px 0;
}

.description {
  width: 100%;
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
