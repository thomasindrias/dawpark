<template>
<div class="content">
  <a @click="closeDetail" class="icon"><i class="fas fa-arrow-left"></i></a>
  <div class="row">
    <h1>{{ parking.address }}</h1>
  </div>
  <hr>
  <div class="row results-wrapper">
    <div v-if="parking.status !== null">
      <h3>Status</h3>
      <p>{{parking.status}}</p>
    </div>
    <div class="modified-time" v-if="parking.modifiedTime !== null">
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
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: {
    parking: null,
  },
  data() {
    return {
    };
  },
  methods: {
    closeDetail() {
      this.$emit('close', true);
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
  display: flex;
  position: absolute;
  top: 20px;

  font-size: 26px;
  color: $black;
}

.icon:hover {
  cursor: pointer;
}

.modified-time {
  text-align: right;
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
