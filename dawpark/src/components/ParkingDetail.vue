<template>
<div class="content">
  <a @click="closeDetail" class="icon"><i class="fas fa-arrow-left"></i></a>
  <div class="row">
    <h1>{{ parking.name }}</h1>
  </div>
  <hr>
  <div class="row results-wrapper">
    hej
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
